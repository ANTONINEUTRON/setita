"use client"

import CampaignDashboard from "@/components/campaign_dashboard"
import CampaignOwnerDashboard from "@/components/campaign_owner_dashboard"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"


interface ViewDonationPageProps{
    params: {id: string}
}

export default function ViewDonationPage({params}: ViewDonationPageProps){
    const [isTheOwner, setIsTheOwner] = useState(false)
    const {connected} = useWallet();

    useEffect(()=>{
        // Load campaign details
        // display appropriete campaign
    },[])

    return !isTheOwner
        ?(
            <div>
                <CampaignOwnerDashboard />
            </div>
        ):(
            <div>
                <CampaignDashboard />
            </div>
        )
}