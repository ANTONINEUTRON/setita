import { Fundraising } from "@/src/types/fundraising";
import { saveFundraisingToDB } from "@/src/utils/firebase_ops";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData =  await req.json();
    try { 
        console.log("ENTER SERVER");
        
        console.log(formData);
        
        const fundRaisingobj: Fundraising = formData as any as Fundraising;

        console.log("ABOUT TO SERVER");
        console.log(fundRaisingobj);
        
        saveFundraisingToDB(fundRaisingobj);

        return NextResponse.json({message: "Saved"})
    } catch (error) {
        console.error("Error uploading media:", error);
        return NextResponse.error();
    }
}