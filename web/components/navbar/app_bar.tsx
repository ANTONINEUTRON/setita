"use client"

import Link from "next/link";
import Image from 'next/image';
import WalletButton from "../wallet_button";

interface AppBarProps{
    isFullLength?: boolean
}

export default function AppBar({isFullLength}:AppBarProps){
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
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" />
                            </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content text-white font-bold rounded-box z-[2] mt-3 w-52 p-2  shadow-xl bg-secondary">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        // <div>
        //     <header className=" bg-primary sticky">
        //         <div className="flex justify-between items-center p-4 container m-auto">
                    
                    

        //             {/* <Link href="https://dial.to/?action=solana-action:https://setita.com/blink/create">
        //                 <button className="px-6 py-2 bg-secondary text-white rounded hover:bg-blue-700">
        //                     Get Started
        //                 </button>
        //             </Link> */}
        //             {/* <div>
        //                 <WalletButton />
        //             </div> */}

        //         </div>
        //     </header>
        // </div>
    )
}