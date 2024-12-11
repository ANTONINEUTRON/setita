"use client"
import { Fundraising } from "@/libs/types/fundraising";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfileCampaigns() {
    const { publicKey } = useWallet();
    const [campaigns, setCampaigns] = useState<Fundraising[]>()
    
    async function init() {
        try {
                let json = { address: publicKey?.toString() }

                // fetch user records
                let response = await axios.post("/api/fetchCampaigns", json, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let fCampaigns = response.data;

                if (fCampaigns.length > 0) {
                    setCampaigns(fCampaigns);
                }
        } catch (error) {
            toast.error((error as any).toString());

            console.log(error);
        }
    }

    return (
        <div>
            Tab content 1
        </div>
    )
}