"use client"

import CustomButton from "@/components/buttons/custom_button";
import BoxCampaignItem from "@/components/campaign_items/box_campaign_item";
import Link from "next/link";
import { useState } from "react";

export default function DonationPage() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    return (
        <section className="p-8 flex items-center justify-center min-h-[70vh]">
            {
                isUserLoggedIn ? (
                    <div className="min-h-screen container mx-auto">
                        {/* List of campigns */}
                        <div className="p-4">
                            {/* Header */}
                            <div className=" mb-6">
                                <span className="text-2xl font-bold dark:text-white text-primary mb-2">
                                    DONATIONS
                                </span>
                                {/* Items goes here */}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container px-4">
                                    <BoxCampaignItem />
                                    <BoxCampaignItem />
                                    <BoxCampaignItem />
                                    <BoxCampaignItem />
                                </div>
                            </div>
                            
                        </div>
                        {/* Add Button */}
                        {/* <div className="fixed bottom-16 right-16 hover:shadow-2xl  border border-secondary bg-primary text-white flex items-center rounded-full">
                            <span className="m-2 mx-6 ">
                                Add
                            </span>
                            <MdAdd className="text-4xl bg-purple-300 rounded-full" />
                        </div> */}
                    </div>
                ) : (
                    <EmptyDonations />
                )
            }
        </section>
    )
}


function EmptyDonations() {
    return (
        <div className="flex flex-col items-center w-full">
            Show user donations from site
        </div>
    )
}