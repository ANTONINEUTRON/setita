"use client"

import CustomButton from "@/components/buttons/custom_button";
import BoxCampaignItem from "@/components/campaign_items/box_campaign_item";
import SearchFilterComponent from "@/components/search_filter_component";
import { Fundraising } from "@/libs/types/fundraising";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DonationPage() {
    const { connected, publicKey } = useWallet();
    const [campaigns, setCampaigns] = useState<Fundraising[] | null>(null);

    useEffect(() => {
        init();
    }, [])


    async function init() {
        try {
            let json = { address: publicKey?.toString() }
            console.log(json);

            // fetch user records
            let response = await axios.get("/api/fetchCampaigns", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let fCampaigns = response.data;

            if (fCampaigns.length > 0) {

                setCampaigns(fCampaigns);
            }else{
                setCampaigns([]);
            }
        } catch (error) {
            toast.error((error as any).toString());

            setCampaigns([]);
        }
    }


    return (
        <section className="md:p-8 flex items-center justify-center min-h-[70vh]">
            {
                <div className="min-h-screen container mx-auto">
                    {/* List of campigns */}
                    <div className="p-4">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold dark:text-white text-primary mb-2">
                                    DONATE
                                </span>
                                <SearchFilterComponent />
                            </div>
                            {/* Items goes here */}
                            {
                                campaigns === null 
                                ? (
                                    <div className="min-h-[80vh] w-full flex items-center justify-center text-center">
                                        <AiOutlineLoading3Quarters 
                                            className="animate-spin w-16 h-16" />
                                    </div>
                                ) 
                                : (
                                    campaigns 
                                    ? (
                                        <div className = "grid grid-cols-1 md:grid-cols-3 container px-4 py-4" >
                                            {
                                                campaigns.map((campaign)=>(
                                                    <BoxCampaignItem 
                                                        campaign={campaign}/>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <EmptyDonations />
                                    )
                                )
                                
                            }
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}


function EmptyDonations() {
    return (
        <div className="flex flex-col items-center w-full">
            No Ongoing campaign to Donate to
        </div>
    )
}