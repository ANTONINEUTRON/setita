"use client"

import CampaignDashboard from "@/components/campaign_dashboard"
import CampaignOwnerDashboard from "@/components/campaign_owner_dashboard"
import { useState } from "react"


interface ViewDonationPageProps{
    params: {id: string}
}

export default function ViewDonationPage({params}: ViewDonationPageProps){
    const [isTheOwner, setIsTheOwner] = useState(false)

    return isTheOwner
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