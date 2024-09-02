import { Donation, DonationDetails, DonationType } from "@/src/types/donation";
import { Fundraising } from "@/src/types/fundraising";
import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    ACTIONS_CORS_HEADERS,
    createActionHeaders,
} from "@solana/actions";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from 'next/server'
import * as splToken from '@solana/spl-token';
import { getFundRaisingRecord, saveDonationRecordToDB } from "@/src/utils/firebase_ops";



const headers = createActionHeaders();


export async function GET(request: NextRequest) {
    try{
        let donationId: string = request.nextUrl.searchParams.get('did') ?? "";
        
        // Access firebase to get donation record
        const fundRaisingData: Fundraising = await getFundRaisingRecord(donationId);

        
        const responseBody: ActionGetResponse = {
            icon: "https://setita.com/brand/blink_2.png",
            description: fundRaisingData.data.description,
            title: "Donate to "+fundRaisingData.data.title+" by "+fundRaisingData.data.email,
            label: "Label",
            error: {
                message: ""
            },
            "links": {
                "actions": [
                    {
                        "label": "Donate ", // button text
                        "href": "/blink/give?did=" + donationId+"&amount=",
                        "parameters": [
                            {
                                "type": "number",
                                "name": "amount",
                                "label": "Amount",
                                "required": true,
                            },
                            {
                                "type": "radio",
                                "name": "currency",
                                "label": "Currency",
                                "options": [
                                    {
                                        "label": "SOL",
                                        "value": DonationType.SOL,
                                    },
                                    {
                                        "label": "SEND",
                                        "value": DonationType.SEND,
                                    },
                                    {
                                        "label": "USDC",
                                        "value": DonationType.USDC,
                                    },
                                ],
                                "required": true,
                            },
                        ]
                    },
                ]
            }
        }

        const response = NextResponse.json(responseBody, { headers: ACTIONS_CORS_HEADERS });

        return response
    } catch (err) {
        console.log(err);
        let message = 'An unknown error occurred';

        if (typeof err == 'string') message = err;

        return new Response(message, {
            status: 400,
            headers,
        });
    }
}

export const OPTIONS = GET;

export async function POST(request: NextRequest) {
    try {
        const body: ActionPostRequest = await request.json();

        // Access response data and get user inputs
        let donationId: string = request.nextUrl.searchParams.get('did') ?? "";
        
        const data = body.data as any;
        
        const donationData:DonationDetails = {
            amount: data.amount,
            donationType: data.currency,
        };

        const donation: Donation = {
            details: donationData,
            address: body.account,
            donationId: donationId,
        }
        
        // Receiver's public key
        const payerPubKey: PublicKey = new PublicKey(body.account);

        //
        const fundRasingRecord: Fundraising = await getFundRaisingRecord(donationId);
        const recipientPublicKey = new PublicKey(fundRasingRecord.account); //get from db

        const SOLANA_MAINNET_USDC_PUBKEY =
            new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
        const SOLANA_MAINNET_SEND_PUBKEY = new PublicKey('SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa');

        // Amount to be sent (0.007 SOL)
        const amount = DonationType.SOL ? donationData.amount * 1e9 : donationData.amount * 1e6;

        // Connection to the Solana cluster
        const connection = new Connection(clusterApiUrl('mainnet-beta'));

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        
        // Transaction setup
        let transaction: Transaction;

        // Filter and create appropriet transaction
        switch (donationData.donationType) {
            case DonationType.SEND.toString():
                transaction = await createSPLTokenTransferTransaction(
                    connection,
                    payerPubKey,
                    recipientPublicKey,
                    SOLANA_MAINNET_SEND_PUBKEY,
                    amount,
                );
                break;
            case DonationType.USDC.toString():
                transaction = await createSPLTokenTransferTransaction(
                    connection,
                    payerPubKey,
                    recipientPublicKey,
                    SOLANA_MAINNET_USDC_PUBKEY,
                    amount,
                );
                break;
            default:
                transaction = new Transaction({
                     feePayer: payerPubKey,
                     blockhash,
                     lastValidBlockHeight,
                 }).add(
                     SystemProgram.transfer({
                         fromPubkey: payerPubKey,
                         toPubkey: recipientPublicKey,
                         lamports: amount,
                     })
                 );
                break;
        }

        //Store Donation Record
        saveDonationRecordToDB(donation);

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: "CONGRATS! You have donated "+donation.details.amount+" "+donation.details.donationType+" to this Campaign. You are a Hero in GOLDEN CAPE",
            },
        });

        return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
    } catch (err) {
        let message = 'An unknown error occurred';
        if (typeof err == 'string') message = err;
        return new Response(message, {
            status: 400,
            headers,
        });
    }
}


/**
 * Creates a transaction for transferring SPL tokens.
 * 
 */
async function createSPLTokenTransferTransaction(
    connection: Connection,
    sender: PublicKey,
    recipient: PublicKey,
    mintAddress: PublicKey,
    amount: number
): Promise<Transaction> {
    try {
        // Get the associated token account of the sender
        const senderTokenAccount = await splToken.getAssociatedTokenAddress(
            mintAddress,
            sender,
            false,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        // Get the associated token account of the recipient
        const recipientTokenAccount = await getAssociatedTokenAddress(
            mintAddress,
            recipient,
            true,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const ifexists = await connection.getAccountInfo(senderTokenAccount);

        let instructions = [];

        if (!ifexists || !ifexists.data) {
            let createATAiX = splToken.createAssociatedTokenAccountInstruction(
                sender,
                recipientTokenAccount,
                recipient,
                mintAddress,
                splToken.TOKEN_PROGRAM_ID,
                splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            );
            instructions.push(createATAiX);
        }

        let transferInstruction = splToken.createTransferInstruction(
            senderTokenAccount,
            recipientTokenAccount,
            sender,
            amount,
        );
        instructions.push(transferInstruction);


        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        return new Transaction({
            feePayer: sender,
            blockhash,
            lastValidBlockHeight,
        }).add(...instructions);
    } catch (error) {
        console.error("Error creating SPL token transfer transaction:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}
