"use client"
import { MdAdd, MdClose, MdKeyboardDoubleArrowDown } from "react-icons/md";
import CustomButton from "@/components/buttons/custom_button";
import { useEffect, useState } from "react";
import Link from "next/link";
import CampaignItem from "@/components/campaign_items/campaign_item";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "@/components/buttons/wallet_button";
import ExtendedButton from "@/components/buttons/extended_button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Fundraising } from "@/libs/types/fundraising";
import axios from "axios";
import BoxCampaignItem from "@/components/campaign_items/box_campaign_item";
import { useAtom } from "jotai";
import { showWalletAtom } from "@/libs/atoms/wallet_atoms";

export default function AppPage(){
    const [isUserHaveCampaign, setIsUserHaveCampaign] = useState(false);
    const {connected, publicKey} = useWallet();
    const [campaigns, setCampaigns] = useState<Fundraising[]>([]);

    useEffect(()=>{
        init();
    },[connected])


    async function init() {
        try {
            if (connected) {
                let json = { address: publicKey?.toString() }
                
                // fetch user records
                let response = await axios.post("/api/fetchCampaigns", json, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });    
                
                let fCampaigns = response.data;

                if(fCampaigns.length > 0){
                    setCampaigns(fCampaigns);
                    setIsUserHaveCampaign(true);
                }
            } else {
                setIsUserHaveCampaign(false);
            }
        } catch (error) {
            toast.error((error as any).toString());

            console.log(error);
            
        }
    }

    return (
        <section className="p-8 flex items-center justify-center min-h-[70vh]">
                {
                    isUserHaveCampaign ? (
                        <div className="min-h-screen container mx-auto">
                            {/* List of campigns */}
                            <div className="p-4">
                                {/* Header */}
                                <div className=" mb-6">
                                    <span className="text-2xl font-bold dark:text-white text-primary">
                                        YOUR CAMPAIGNS
                                    </span>
                                </div>
                                {/* Items goes here */}
                                {
                                    campaigns.map((campaign)=>(
                                        <CampaignItem 
                                            key={campaign.id}
                                            campaign={campaign} />
                                    ))
                                }
                            </div>
                            {/* Add Button */}
                            <Link href={"/app/create"}>
                                <div className="fixed bottom-16 right-16 hover:shadow-2xl hover:opacity-85 border border-secondary bg-primary text-white flex items-center rounded-full">
                                    <span className="m-1 mx-6 font-semibold text-xl">
                                        Add
                                    </span>
                                    <MdAdd className="text-4xl bg-purple-400 rounded-full" />
                                </div>
                            </Link>
                        </div>
                    ):(
                        <EmptyCampaign/>
                    )
                }
        </section>
    )
}


function EmptyCampaign() {
    const { connected, } = useWallet(); // Get wallet connection info
    const router = useRouter(); // For navigation
    const [showPrompt, setShowPrompt] = useState(false); // Track if we need to show wallet connect prompt
    // const { ready, authenticated, user, login, logout } = usePrivy();

    const showCreateCampaignForm = async () => {
        if (!connected) {
            // Show wallet connection prompt instead of the "Create A Campaign" button
            setShowPrompt(true);
            // toast.error("Connect your wallet in order to create campaign");
        } else {
            // If the wallet is connected, redirect to /app/create
            router.push('/app/create/');
        }
    };

    useEffect(()=>{
        if(showPrompt && connected){
            // If the wallet is connected, redirect to /app/create
            router.push('/app/create/');
        }

        // if (ready) {
        //     console.log("privy ready");
        // }

    },[connected])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="px-4 md:px-12 animate-marquee text-center text-red-700">
                <span>
                    In this section of the app, interaction is still on Devnet; transactions and balances here are not reflected on the mainnet
                </span>
                
            </div>
            <div className="flex flex-col justify-between h-[85vh] items-center bg-fixed lg:w-3/6 mb-4">
                <div className="flex flex-col items-center mt-16">
                    <div className="text-4xl font-extrabold mb-4 text-center text-secondary from-primary to-secondary">
                        WELCOME!
                    </div>
                    <div className="text-2xl font-medium mb-4 text-center mx-3">
                        It looks like you haven't created any fundraising campaigns yet.
                        <div className="mt-4 font-serif font-normal">
                            But don't worry, getting started is easy!
                        </div>
                    </div>

                    {showPrompt ? (
                        <div className="bg-secondary text-white p-6 rounded-lg">
                            <div className="flex justify-between gap-3">
                                <h2 className="text-md font-bold mb-4">
                                    Connect to create a campaign
                                </h2>
                                <span onClick={() => setShowPrompt(false)} className="flex justify-end mb-10 ml-8 text-xl font-bold">
                                    <MdClose />
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center">
                                <WalletButton />
                                {/* <button onClick={login}>Privy</button> */}
                                {/* <div className="m-5">OR</div>
                                <ExtendedButton
                                    text="Sign in With Google"
                                    icon={<FaGoogle className="p-2 mx-auto" />} /> */}
                            </div>
                        </div>
                    ) : (
                        // <Link href="/app/create/">
                            <CustomButton
                                className="mt-7 p-5"
                                onClick={showCreateCampaignForm}
                                text="Create A Campaign" />
                        // </Link>
                        
                    )}
                </div>

                <div className="flex flex-col items-center text-2xl">
                    <div className="dark:text-tertiary text-primary">
                        Do you want to Donate?
                    </div>
                    <MdKeyboardDoubleArrowDown className="text-3xl dark:text-tertiary text-primary animate-bounce mt-2" />
                </div>
            </div>

            <FeaturedCampaigns />
        </div>
    );
}


function FeaturedCampaigns(){
    const [campaigns, setCampaigns] = useState<Fundraising[]>([]);

    useEffect(()=>{
        fetchCampaigns()
    },[]);

    const fetchCampaigns = async ()=>{
        // fetch user records
        let response = await axios.get("/api/fetchCampaigns",  {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let fCampaigns = response.data;

        if (fCampaigns) {
            if(fCampaigns.length > 3){
                setCampaigns(fCampaigns.slice(0,3));
            }else{
                setCampaigns(fCampaigns);
            }
        }
    }

    return campaigns && (
        <div className="border rounded-lg w-full p-4 mx-16">
            <div className="flex justify-between items-end container mx-auto px-5 mb-4">
                <span className="font-bold text-2xl text-secondary">
                    Featured Campaigns
                </span>
                <div>
                    <Link href={"/app/dn"}>
                        <span className="hover:text-blue-600 text-primary dark:text-tertiary">
                            see more
                        </span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
                {
                    campaigns.map((campaign,index)=>(
                        <BoxCampaignItem 
                            key={index}
                            campaign={campaign} />
                    ))
                }
            </div>
        </div>
    )
}