import {  Fundraising } from "@/src/types/fundraising";
import { Category } from "@/src/types/category";
import { saveFundraisingToDB } from "@/src/utils/firebase_ops";
import {
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const responseBody: ActionGetResponse = {
    icon: "https://setita.com/brand/blink_1.png",
    description: "We have got you covered! Get a blink to share for instant, seamless and accountable donations by Entering the details below",
    title: "Do you have a fundraising goal targetted at social good?",
    label: "Label",
    "links": {
      "actions": <any>[
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
                  "label": Category.education, 
                  "value": Category.education,
                },
                {
                  "label": Category.health,
                  "value": Category.health,
                },
                {
                  "label": Category.environmental,
                  "value": Category.environmental,
                },
                {
                  "label": Category.community,
                  "value": Category.community,
                },
                {
                  "label": Category.others,
                  "value": Category.others,
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

  const docRef = await saveFundraisingToDB(fundraisingObj);

  const payload: ActionPostResponse = await createPostResponse({
    fields: <any>{
      transaction,
      message: "Campaign Created successfully. Your campaign Blink is  https://dial.to/?action=solana-action:https://setita.com/blink/give?did="+docRef.id+"  Copy and share with Donors",
    },
  });
  
  return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

