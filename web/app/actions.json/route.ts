import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
import { NextResponse } from "next/server";

export const GET = async () => {
    const payload: ActionsJson = {
        rules: [
            // map all root level routes to an action
            {
                pathPattern: "/blink/create",
                apiPath: "/blink/create",
            },
            {
                pathPattern: "/blink/give",
                apiPath: "/blink/give",
            },
        ],
    };

    return NextResponse.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};

export const OPTIONS = GET;