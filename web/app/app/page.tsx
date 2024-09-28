"use client"
import { Md2kPlus, MdAdd, MdArrowForward, MdClose, MdIosShare, MdKeyboardDoubleArrowDown, MdShare } from "react-icons/md";
import CustomButton from "@/components/buttons/custom_button";
import { useState } from "react";
import Link from "next/link";
import BoxCampaignItem from "@/components/campaign_items/box_campaign_item";
import CampaignItem from "@/components/campaign_items/campaign_item";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "@/components/buttons/wallet_button";
import ExtendedButton from "@/components/buttons/extended_button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AppPage(){
    const [isUserHaveCampaign, setIsUserHaveCampaign] = useState(true);
    const {connected} = useWallet();


    return (
        <section className="p-8 flex items-center justify-center min-h-[70vh]">
                {
                    !isUserHaveCampaign ? (
                        <div className="min-h-screen container mx-auto">
                            {/* List of campigns */}
                            <div className="p-4">
                                {/* Header */}
                                <div className=" mb-6">
                                    <span className="text-2xl font-bold dark:text-white text-primary">
                                        CAMPAIGNS
                                    </span>
                                </div>
                                {/* Items goes here */}
                                <CampaignItem />
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
    const { connected, select, wallet } = useWallet(); // Get wallet connection info
    const router = useRouter(); // For navigation
    const [showPrompt, setShowPrompt] = useState(false); // Track if we need to show wallet connect prompt

    const showCreateCampaignForm = async () => {
        if (!connected) {
            // Show wallet connection prompt instead of the "Create A Campaign" button
            setShowPrompt(true);
        } else {
            // If the wallet is connected, redirect to /app/create
            router.push('/app/create/');
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-between h-[85vh] items-center bg-fixed w-3/6 mb-4">
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
                            <div className="flex justify-between">
                                <h2 className="text-md font-bold mb-4">
                                    Connect to create a campaign
                                </h2>
                                <span onClick={() => setShowPrompt(false)} className="flex justify-end mb-5 text-xl font-bold">
                                    <MdClose />
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center">
                                <WalletButton />
                                <div className="m-5">OR</div>
                                <ExtendedButton
                                    text="Google"
                                    onClick={() => showWidgetModal()}
                                    icon={<FaGoogle className="p-2 mx-auto" />} />
                            </div>
                        </div>
                    ) : (
                        <CustomButton
                            className="mt-7 p-5"
                            onClick={showCreateCampaignForm}
                            text="Create A Campaign"
                        />
                    )}
                </div>

                <div className="flex flex-col items-center text-2xl">
                    <div className="dark:text-tertiary text-primary">
                        Do you want to Donate?
                    </div>
                    <MdKeyboardDoubleArrowDown className="text-3xl dark:text-tertiary text-primary animate-bounce mt-2" />
                </div>
            </div>

            <div className="border rounded-lg w-full p-4 mx-16">
                <div className="flex justify-between items-end container mx-auto px-5 mb-4">
                    <span className="font-bold text-2xl text-secondary">
                        Featured Campaigns
                    </span>
                    <div>
                        <Link href={""}>
                            <span className="hover:text-blue-600 text-primary dark:text-tertiary">
                                see more
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container p-4">
                    <BoxCampaignItem />
                    <BoxCampaignItem />
                    <BoxCampaignItem />
                </div>
            </div>
        </div>
    );
}

function showWidgetModal(): void {
    throw new Error("Function not implemented.");
}
