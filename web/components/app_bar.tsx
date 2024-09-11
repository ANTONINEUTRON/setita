"use client"

import Link from "next/link";
import Image from 'next/image';
import WalletButton from "./wallet_button";

export default function AppBar(){
    return (
        <div>
            <header className=" bg-primary sticky">
                <div className="flex justify-between items-center p-4 container m-auto">
                    <Image src="/brand/setita.png" width="400" height="150" alt={'setita_logo'} className="h-7 w-32" />

                    {/* <Link href="https://dial.to/?action=solana-action:https://setita.com/blink/create">
                        <button className="px-6 py-2 bg-secondary text-white rounded hover:bg-blue-700">
                            Get Started
                        </button>
                    </Link> */}
                    <WalletButton />
                </div>
            </header>
        </div>
    )
}