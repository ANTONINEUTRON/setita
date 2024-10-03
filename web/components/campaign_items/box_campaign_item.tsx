import { Fundraising } from "@/src/types/fundraising";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


export default function BoxCampaignItem ({campaign}:{campaign: Fundraising}){

    useEffect(()=>{
        console.log(campaign);
        
    });

    return (
        <Link href={"../dn/"+campaign.id}>
            <div className="hover:shadow-xl hover:opacity-80">
                <div className="relative bg-secondary m-2 -z-20 rounded-lg">
                    {/* Background image */}
                    <div
                        className="inset-0 bg-cover bg-center h-72 rounded-lg"
                        style={{
                            backgroundImage: "url('/images/donation.jpg')",
                        }}>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-gray-900 opacity-70"></div>
                        {/* Text content */}
                        <div className="relative p-2 text-white top-44">  
                            <div className="text-lg font-bold line-clamp-2">
                                {campaign.data.title}
                            </div>
                            <div className="text-md line-clamp-2">
                                {campaign.data.description}
                            </div>
                            {/* <div className="mt-2 text-sm">
                                Donations |{" "}
                                <span className="text-green-500">Your Contribution </span>
                            </div> */}
                        </div>
                    </div>


                </div>
            </div>
         </Link>

    )
}