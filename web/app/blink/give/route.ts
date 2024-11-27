import { Donation, DonationDetails, } from "@/libs/types/donation";
import { Fundraising } from "@/libs/types/fundraising";
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
import { getFundRaisingRecord, saveDonationRecordToDB } from "@/libs/utils/firebase_ops";
import { supportedCurrencies } from "@/libs/types/supported_currencies";
import { createSPLTokenTransferTransaction } from "@/libs/utils/donation_ops";

const headers = createActionHeaders();

export async function GET(request: NextRequest) {
    try{
        let donationId: string = request.nextUrl.searchParams.get('did') ?? "";
        
        // Access firebase to get donation record
        const fundRaisingData: Fundraising = await getFundRaisingRecord(donationId);
        
        const responseBody: ActionGetResponse = {
            icon: fundRaisingData.data.images ? fundRaisingData.data.images[0] : "https://setita.com/brand/blink_2.png",
            description: fundRaisingData.data.description,
            title: "Donate to "+fundRaisingData.data.title,
            label: "Label",
            error: {
                message: ""
            },
            "links": {
                "actions": <any>[
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
                                "options": getSupportedCurrencies(fundRaisingData),
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

// Determine Amount Based on selected currency multiplier
    // Determine Amount Based on selected currency multiplier
function getSupportedCurrencies(fundraising: Fundraising): {
    label: string; 
    value: string; 
}[] {
    return fundraising.data.supportedCurrencies ?
        fundraising.data.supportedCurrencies.map((currency)=>({
            label: currency,
            value: currency,
        })) 
        : supportedCurrencies.map((currency) => ({
        label: currency.name,
        value: currency.name,
    }));
}

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
        const recipientPublicKey = new PublicKey(fundRasingRecord.account); //get from store

        // Determine Amount Based on selected currency multiplier
        const amount = donationData.donationType == supportedCurrencies[0].name ? donationData.amount * 1e9 : donationData.amount * 1e6;

        // Connection to the Solana cluster
        const connection = new Connection(clusterApiUrl('mainnet-beta'));

        //Get blockhash
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        
        // Transaction setup
        let transaction: Transaction;

        // Filter and create appropriete transaction
        switch (donationData.donationType) {
            case supportedCurrencies[3].name: //SEND TOKEN
                transaction = await createSPLTokenTransferTransaction(
                    connection,
                    payerPubKey,
                    recipientPublicKey,
                    new PublicKey(supportedCurrencies[3].address),
                    amount,
                );
                break;
            case supportedCurrencies[2].name: //USDT
                transaction = await createSPLTokenTransferTransaction(
                    connection,
                    payerPubKey,
                    recipientPublicKey,
                    new PublicKey(supportedCurrencies[2].address),
                    amount,
                );
                break;
            case supportedCurrencies[1].name: //USDC
                transaction = await createSPLTokenTransferTransaction(
                    connection,
                    payerPubKey,
                    recipientPublicKey,
                    new PublicKey(supportedCurrencies[1].address),
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
            fields: <any>{
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
