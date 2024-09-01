import { cFirestore } from "@/firebaseconfig";
import { FUNDRAISING_COLLECTION } from "@/src/constants";
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
  // return new Response('Hello, from API!');
  const responseBody: ActionGetResponse = {
    icon: "https://setita.com/brand/blink_1.png",
    description: "We have got you covered! Get a blink to share for instant, seamless and accountable donations by Entering the details below",
    title: "You have a fundraising goal targetted at social good?",
    label: "Label",
    "links": {
      "actions": [
        {
          "label": "Create Campaign (0.007 SOL)", // button text
          "href": "/blink/create",
          "parameters": [
            {
              "type": "text",
              "name": "title",
              "label": "Title",
              "required": true,
            },
            {
              "type": "textarea",
              "name": "description",
              "label": "Description",
              "required": true,
            },
            {
              "type": "select",
              "name": "category",
              "label": "Category",
              "options": [
                {
                  "label": "Education", 
                  "value": Category.education.toString(),
                },
                {
                  "label": "Healthcare",
                  "value": Category.health.toString(),
                },
                {
                  "label": "Environmental Sustainability",
                  "value": Category.environmental.toString(),
                },
                {
                  "label": "Community Development",
                  "value": Category.community.toString(),
                }
              ],
            },
            {
              "type": "email",
              "name": "email",
              "label": "Creator Email - for enquiry",
              "required": true,
            },
            {
              "type": "radio",
              "name": "terms",
              "label": "Terms and conditions",
              "options": [
                {
                  "value": "Yes",
                  "label": "You agree to the setita terms and conditions.",
                }
              ]
            }
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

  const fundraisingObj: Fundraising = {
    ...(body as unknown as Fundraising),
    id: "",
  }

  const docRef = await saveToDB(fundraisingObj);

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: "Campaign Created successfully. Your campaign link is https://dial.to/?action=solana-action:https://setita.com/blink/give?did="+docRef.id+" Copy it and share to Donors",
    },
  });
  
  return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

async function saveToDB(fundraisingObj: Fundraising) {
  const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);
  //save to ipfs
  // Create a reference to the collection
  const docRef = await fcColl.add(fundraisingObj);

  // update
  docRef.update({ id: docRef.id });
  return docRef;
}

