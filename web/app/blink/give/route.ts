import { cFirestore } from "@/firebaseconfig";
import { DONATION_COLLECTION, FUNDRAISING_COLLECTION } from "@/src/constants";
import { Donation } from "@/src/types/donation";
import { Category, Fundraising } from "@/src/types/fundraising";
import {
    ActionPostResponse,
    createActionHeaders,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
// import { addDoc, collection } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from 'next/server'



export async function GET(request: NextRequest) {
    // console.log(request.url.);
console.log(request.nextUrl.searchParams);

    let donationId: string = request.nextUrl.searchParams.get('did') ?? "";
    // Access firebase to get donation record
    const userRecord: Fundraising = await getFundRaisingRecord(donationId);

    const responseBody: ActionGetResponse = {
        icon: "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: userRecord.data.description,
        title: "Donate to "+userRecord.data.title+"\n by "+userRecord.data.email,
        label: "Label",
        "links": {
            "actions": [
                {
                    "label": "Donate", // button text
                    "href": "/blink/give?did="+donationId,
                    "parameters": [
                        {
                            "type": "number",
                            "name": "amount",
                            "label": "Amount (SOL)",
                            "required": true,
                        },
                    ]
                }
            ]
        }
    }

    const response = NextResponse.json(responseBody, { headers: ACTIONS_CORS_HEADERS });

    return response
}

export const OPTIONS = GET;

export async function POST(request: NextRequest) {
    const body: ActionPostRequest = await request.json();
    let donationId: string = request.nextUrl.searchParams.get('did') ?? "";

    // validate the client provided input
    let payerPubKey: PublicKey = new PublicKey(body.account);

    // Connection to the Solana cluster
    const connection = new Connection(clusterApiUrl('mainnet-beta'));

    // Receiver's public key
    const recipientPublicKey = new PublicKey('EpG8VkF9Cv4iGBGYvaxAATVDEgd74VjWmsPdKcF9WGwc');

    // Amount to be sent (0.007 SOL)
    const amountInLamports = 0.007 * 1e9;

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Transaction setup
    const transaction = new Transaction({
        feePayer: payerPubKey,
        blockhash,
        lastValidBlockHeight,
    }).add(
        SystemProgram.transfer({
            fromPubkey: payerPubKey,
            toPubkey: recipientPublicKey,
            lamports: amountInLamports,
        })
    );

    const donation: Donation = {
        ...body.data as unknown as Donation,
        address: body.account,
        donationId: donationId,
    }

    saveToDB(donation);

    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: "CONGRATS! You have donated to this Campaign. You are a Hero in GOLDEN CAPE",
        },
    });

    return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

async function getFundRaisingRecord(donationId: string): Promise<Fundraising> {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);

    let docSnap = await fcColl.doc(donationId).get();

    return docSnap.data() as Fundraising;
}


async function saveToDB(donation: any) {
    const dnColl = cFirestore.collection(DONATION_COLLECTION);

    // Create a reference to the collection
    const docRef = await dnColl.add(donation);

    // update
    docRef.update({ id: docRef.id });
    return docRef;
}
