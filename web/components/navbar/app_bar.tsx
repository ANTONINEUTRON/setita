"use client"

import Link from "next/link";
import Image from 'next/image';
import { FaGoogle, FaUserCircle } from "react-icons/fa";
import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import WalletButton from "../buttons/wallet_button";
import ExtendedButton from "../buttons/extended_button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAtom, useAtomValue } from "jotai";
import { showWalletAtom } from "@/libs/atoms/wallet_atoms";

export default function AppBar(){
    const [isUserIn, setIsUserIn] = useState(false);
    const { connected,connecting, disconnect,publicKey } = useWallet(); 
    const [address, setAddress] = useState("");

    useEffect(() => {
        setIsUserIn(connected);  
        if(connected){
            let pKey = publicKey?.toString()
            setAddress(pKey!.slice(0, 6) + "......." + pKey!.slice(pKey!.length - 5, pKey!.length - 1));
        }
    }, [connected]);

    return (
        <div className="navbar bg-primary container mx-auto rounded-md text-white">
            <div className="navbar-start">
                <Link href={"/"} className="btn btn-ghost text-xl">
                    <Image src="/brand/setita.png" width="400" height="150" alt={'setita_logo'} className="h-7 w-32" /> 
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="hover:opacity-60">
                        <Link href={"/app/"}>Campaigns</Link>
                    </li>
                    
                    <li className="hover:opacity-60" >
                        <Link href={"/app/dn"}>Donations</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button"  
                    className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
                            {
                                connecting
                                    ? (<AiOutlineLoading3Quarters className="animate-spin bg-white" />)
                                    : (<FaUserCircle size={40} className="text-secondary" />)
                            }
                        </div>
                    </div>
                    {
                        isUserIn 
                            ? (
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content text-white font-bold rounded-box z-[2] mt-3 w-52 p-2  shadow-xl bg-secondary">
                                    <div>
                                        <li className="flex justify-center text-center text-primaryAccent mb-4">
                                            {address}
                                        </li>
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                {/* <span className="badge">New</span> */}
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li onClick={()=>disconnect()}><a>Disconnect</a></li>
                                    </div>
                                </ul>
                            ):(
                                <div
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content  text-white font-bold rounded-box z-[2] mt-3 w-52  shadow-xl bg-secondary">
                                        <span className=" mx-auto mb-4">Sign in with your wallet</span>
                                        <div className="mx-auto">
                                            <WalletButton />
                                        </div>
                                        {/* <span className="mx-auto my-2">OR</span>
                                        <div className="mx-auto">
                                            <ExtendedButton 
                                                text="Google Using Okto"
                                                icon={<FaGoogle className="p-2 mx-auto" />}/>
                                        </div> */}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
        
    )
}