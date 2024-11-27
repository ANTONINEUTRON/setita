"use client"

import CustomButton from "@/components/buttons/custom_button"
import ExtendedButton from "@/components/buttons/extended_button"
import CampaignDashboard from "@/components/campaign_dashboard"
import CampaignOwnerDashboard from "@/components/campaign_owner_dashboard"
import DonateDialog from "@/components/donate_dialog"
import { Fundraising } from "@/libs/types/fundraising"
import { Milestone } from "@/libs/types/milestone"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdAdd, MdArrowDropDown } from "react-icons/md"


interface ViewDonationPageProps{
    params: {id: string}
}

export default function ViewDonationPage({params}: ViewDonationPageProps){
    const [isTheOwner, setIsTheOwner] = useState(false)
    const {connected, publicKey} = useWallet();
    const router = useRouter();
    const [campaign, setCampaign] = useState<Fundraising | null>()

    useEffect(()=>{
        fetchDetails();
    },[connected])


    const fetchDetails = async()=>{
        try {
            // Load campaign details
            // fetch user records
            let response = await axios.get("/api/campaign?did="+params.id, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // display appropriete campaign
            // if not found, redirect to donations page

            let fCampaign = response.data as Fundraising;

            setCampaign(fCampaign);

            if (connected) {
                if(publicKey?.toString() == fCampaign.account){
                    setIsTheOwner(true);
                }else{
                    setIsTheOwner(false);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Couldn't find the campaign with the specified ID");
            router.push("../app/dn");
        }
    }

    return campaign 
            ? (
                <div>
                    {
                        isTheOwner
                            ? (
                                <div>
                                    <CampaignOwnerDashboard 
                                        campaign={campaign}/>
                                </div>
                            ) : (
                                <div>
                                    <CampaignDashboard
                                        campaign={campaign} />
                                </div>
                            )
                    }

                    <DonateDialog 
                        campaign={campaign}/>

                    {/* Mobile look */}
                    <ExtendedButton
                        icon={<MdAdd />}
                        text="Donate"
                        onClick={() => (document.getElementById('donate_modal') as any).showModal()}
                        className='absolute bottom-10 right-11 md:hidden' />
                </div>
            )
            : (
                <div className="min-h-screen w-full flex justify-center items-center">
                    <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
                </div>
            )
}

