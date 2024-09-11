"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


export default function WalletButton(){
    return (
        <div>
            <div className="border hover:border-slate-900 rounded">
                <WalletMultiButton style={{}} />
            </div>
        </div>
    );
}