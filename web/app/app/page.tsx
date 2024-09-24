"use client"
import { Md2kPlus, MdAdd, MdArrowForward, MdIosShare, MdKeyboardDoubleArrowDown, MdShare } from "react-icons/md";
import CustomButton from "@/components/buttons/custom_button";
import { useState } from "react";
import Link from "next/link";
import BoxCampaignItem from "@/components/campaign_items/box_campaign_item";
import ExtendedButton from "@/components/buttons/extended_button";
import CampaignItem from "@/components/campaign_items/campaign_item";

export default function AppPage(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <section className="p-8 flex items-center justify-center min-h-[70vh]">
                {
                    isUserLoggedIn ? (
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
                            <div className="fixed bottom-16 right-16 hover:shadow-2xl  border border-secondary bg-primary text-white flex items-center rounded-full">
                                <span className="m-2 mx-6 ">
                                    Add
                                </span>
                                <MdAdd className="text-4xl bg-purple-300 rounded-full" />
                            </div>
                        </div>
                    ):(
                        <EmptyCampaign/>
                    )
                }
        </section>
    )
}

function EmptyCampaign() {
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
                    <div>
                        <CustomButton
                            className="mt-7 p-5 "
                            text="Create A Campaign" />
                    </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container p-4 ">
                    <BoxCampaignItem />
                    <BoxCampaignItem />
                    <BoxCampaignItem />
                </div>
            </div>
        </div>
    )
}