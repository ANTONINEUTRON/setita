"use client"

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import PContributions from "./campaign_sections/p_contributions";
import PMilestones from "./campaign_sections/p_milestones";
import PProposals from "./campaign_sections/p_proposals";
import PUpdates from "./campaign_sections/p_updates";
import AppBar from "./navbar/app_bar";
import Sidebar from "./navbar/side_bar";

export default function CampaignDashboard(){
    const [indexToShow, setIndexToShow] = useState(0)

    const pages = [
        <PContributions />,
        <PMilestones />,
        <PProposals />,
        <PUpdates />
    ]

    return (
        <div>
            <div className='z-50 bg-primary flex justify-center items-center fixed top-0 right-0 left-0'>
                <div className="drawer w-10 lg:hidden inline-block text-white ml-8 text-xl ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className=" drawer-button">
                            <FaBars className='' />
                        </label>
                    </div>
                    <div className="drawer-side w-80">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu text-base-content min-h-full bg-primary p-4">
                            {/* Sidebar content here */}
                            <Sidebar
                                onNavSelect={(index) => setIndexToShow(index)}
                                indexToShow={indexToShow}
                                showSidebar={true} 
                                isPublicView={true}/>

                        </ul>
                    </div>
                </div>
                <AppBar />
            </div>
            <div className="flex h-full mt-10 md:mt-0">
                {/* Sidebar */}
                <Sidebar
                    onNavSelect={(index) => setIndexToShow(index)}
                    indexToShow={indexToShow} 
                    isPublicView={true} />

                {/* Main Content */}
                <div className="flex-grow px-8 lg:pl-64 lg:mt-11 lg:min-h-screen">
                    {/* Placeholder for main content */}
                    {
                        pages[indexToShow]
                    }
                </div>
            </div>
        </div>
    );
}