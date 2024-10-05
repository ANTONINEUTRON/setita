import { Fundraising } from "@/src/types/fundraising";
import { fetchCampaigns, getFundraisingByAddress, saveFundraisingToDB } from "@/src/utils/firebase_ops";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // const address: string = formData["address"];

        let campaigns = await fetchCampaigns();

        return NextResponse.json(campaigns);
    } catch (error) {
        console.error("Error fetching all campaigns", error);
        return NextResponse.error();
    }
}

export async function POST(req: NextRequest) {
    const formData = await req.json();

    try {
        const address: string = formData["address"];
        
        let campaigns = await getFundraisingByAddress(address);

        return NextResponse.json(campaigns);
    } catch (error) {
        console.error("Error getting  campaign by address", error);
        return NextResponse.error();
    }
}