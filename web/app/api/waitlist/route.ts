import { cFirestore } from "@/firebaseconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
        const { name, email } = await req.json() as unknown as {name:string,email:string,};

        // Handle the form submission, e.g., save to a database or send an email
        // Here, we'll just simulate a successful save with a dummy response
        let res = new NextResponse();
        try {            
            await cFirestore.collection("waitlist").doc(email).set({name:name,email:email});

            return NextResponse.json({ message: 'Success' });
        } catch (error) {            
            return NextResponse.json({ message: 'Failed to join the waitlist' });
        }
}