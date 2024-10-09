
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getBN, StreamflowSolana, Types } from "@streamflow/stream";
import { HELIUS_ENDPOINT } from "../constants";
import { Milestone } from "../types/milestone";
import { SupportCurrency, supportedCurrencies } from "../types/supported_currencies";
import * as splToken from '@solana/spl-token';
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { DonationDetails } from "../types/donation";
import { Fundraising } from "../types/fundraising";
import toast from "react-hot-toast";
import { BN } from "@streamflow/stream/dist/solana";

// StreamflowSolana client.
const solanaClient = new StreamflowSolana.SolanaStreamClient(
    HELIUS_ENDPOINT
);
// Connection to Solana
const connection = new Connection(HELIUS_ENDPOINT);

export async function fetchUserBalance(currency: string, publicKey: PublicKey): Promise<number> {
    // Find the supported currency
    const currencyInfo = supportedCurrencies.find((c) => c.name === currency);

    if (!currencyInfo) {
        throw new Error(`Currency ${currency} is not supported`);
    }

    if (currency === 'SOL') {
        // Fetch SOL balance directly
        const solBalanceLamports = await connection.getBalance(publicKey);
        const solBalance = solBalanceLamports / 1_000_000_000; // Convert from lamports to SOL
        console.log(solBalance);
        
        return solBalance;
    } else {
        // Fetch SPL token balance for USDC, USDT, SEND, etc.
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            { mint: new PublicKey(currencyInfo.address) }
        );

        if (tokenAccounts.value.length === 0) {
            return 0; // If no token accounts are found, return 0 balance
        }

        // Get the token balance (assuming there's only one account for simplicity)
        const tokenAccountInfo = tokenAccounts.value[0].account.data.parsed.info;
        const tokenBalance = tokenAccountInfo.tokenAmount.amount;
        const tokenDecimals = tokenAccountInfo.tokenAmount.decimals;

        // Convert to human-readable token balance
        return tokenBalance / Math.pow(10, tokenDecimals);
    }
}

export async function sumMilestoneAmount(milestones: Milestone[]): Promise<number> {
    // Use reduce to sum the 'amount' field of each milestone in the array
    const totalAmount = milestones.reduce((accumulator, currentMilestone) => {
        return accumulator + currentMilestone.amount;
    }, 0); 

    return totalAmount;
}


/**
 * Creates a transaction for transferring SPL tokens.
 * 
 */
export async function createSPLTokenTransferTransaction(
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


export async function createInitialAmountTransaction(
    amount:number, 
    currency: SupportCurrency, 
    payerPubKey: PublicKey, 
    campaign: Fundraising,
    blockhash: string,
    lastValidBlockHeight: number): Promise<Transaction> {
    // Transfer initial donation
    let transaction: Transaction;

    // Filter and create appropriete transaction
    switch (currency.name) {
        case supportedCurrencies[3].name: //SEND TOKEN
            transaction = await createSPLTokenTransferTransaction(
                connection,
                payerPubKey,
                new PublicKey(campaign.account),
                new PublicKey(supportedCurrencies[3].address),
                amount * Math.pow(10,currency.decimals)
            );
            break;
        case supportedCurrencies[2].name: //USDT
            transaction = await createSPLTokenTransferTransaction(
                connection,
                payerPubKey,
                new PublicKey(campaign.account),
                new PublicKey(supportedCurrencies[2].address),
                amount * Math.pow(10,currency.decimals)
            );
            break;
        case supportedCurrencies[1].name: //USDC
            transaction = await createSPLTokenTransferTransaction(
                connection,
                payerPubKey,
                new PublicKey(campaign.account),
                new PublicKey(supportedCurrencies[1].address),
                amount * Math.pow(10,currency.decimals)
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
                    toPubkey: new PublicKey(campaign.account),
                    lamports: amount * Math.pow(10,currency.decimals),
                })
            );
            break;
    }
    return transaction
}

export async function saveMilestones(
    milestones: Milestone[],
    recipient: string,
    currency: SupportCurrency,
    wallet: any
    ){
        console.log("hellooo got into milestone");
        for(let i= 0; i<milestones.length; i++){
            let milestone = milestones[i];

            let date = new Date(milestone.date);
            console.log("Date is " + date.getTime());
            console.log(milestone.amount);
            console.log(currency.decimals);
            
            console.log("the getbn is " + getBN(milestone.amount, currency.decimals));
            const totalPeriods = Math.max(1, (date.getTime() - Date.now()) / 1000);
            const amountPerPeriod = getBN(milestone.amount / totalPeriods, currency.decimals);

            const createStreamParams: Types.ICreateStreamData = {
                recipient: recipient, // Recipient address.
                tokenId: currency.address, // Token mint address.
                start: Math.floor(Date.now() / 1000), // Timestamp (in seconds) when the stream/token vesting starts.
                amount: getBN(milestone.amount, currency.decimals), // depositing 100 tokens with 9 decimals mint.
                period: totalPeriods, // Time step (period) in seconds per which the unlocking occurs.
                cliff: Math.floor(date.getTime() / 1000), // Vesting contract "cliff" timestamp in seconds.
                cliffAmount: getBN(0, currency.decimals), // Amount unlocked at the "cliff" timestamp.
                amountPerPeriod: amountPerPeriod, // Release rate: how many tokens are unlocked per each period.
                name: milestone.description, // The stream name or subject.
                canTopup: false, // setting to FALSE will effectively create a vesting contract.
                cancelableBySender: true, // Whether or not sender can cancel the stream.
                cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
                transferableBySender: true, // Whether or not sender can transfer the stream.
                transferableByRecipient: false, // Whether or not recipient can transfer the stream.
                automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
                withdrawalFrequency: 2, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
            };

            const solanaParams = {
                sender: wallet.adapter, // SignerWalletAdapter or Keypair of Sender account
                isNative: false,// [optional] [WILL CREATE A wSOL STREAM] Wether Stream or Vesting should be paid with Solana native token or not
            };

            try {
                const { ixs, tx, metadata } = await solanaClient.create(createStreamParams, solanaParams);
                console.log(ixs);
                console.log(tx);
                console.log(metadata);
                // toast.success("Your donatio")
            } catch (error) {
                // handle exception
                // toast.error(exception as any)
                console.log(error);

            }
        }
        
}