import { Fundraising } from "@/src/types/fundraising";
import { getFundraisingByAddress, saveFundraisingToDB } from "@/src/utils/firebase_ops";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.json();

    try {
        const address: string = formData["address"];
        
        let campaigns = await getFundraisingByAddress(address);

        return NextResponse.json(campaigns);
    } catch (error) {
        console.error("Error uploading media:", error);
        return NextResponse.error();
    }
}