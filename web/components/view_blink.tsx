"use client"
import '@dialectlabs/blinks/index.css';
import { useState, useEffect } from 'react';
import { Action, Blink, ActionsRegistry, useAction } from "@dialectlabs/blinks";
// @ts-ignore
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// needs to be wrapped with <WalletProvider /> and <WalletModalProvider />
const UnfurlBlink = () => {
    const [actionSt, setActionSt] = useState<Action | null>(null);
    const actionApiUrl = 'https://setita.com/blink/create';
    
    // useAction initiates registry, adapter and fetches the action.
    const { adapter } = useActionSolanaWalletAdapter(clusterApiUrl(WalletAdapterNetwork.Mainnet));
    // const adapter = new UnsafeBurnerWalletAdapter();
    const { action } = useAction({ url: actionApiUrl, adapter });

    return action ? <Blink action={action} websiteText={new URL(actionApiUrl).hostname} /> : null;
}

export default UnfurlBlink