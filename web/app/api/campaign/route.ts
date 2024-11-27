import { getFundRaisingRecord } from "@/libs/utils/firebase_ops";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        let donationId: string = req.nextUrl.searchParams.get('did') ?? "";

        let campaign = await getFundRaisingRecord(donationId);

        return NextResponse.json(campaign);
    } catch (error) {
        console.error("Error getting campaign", error);
        return NextResponse.error();
    }
}
