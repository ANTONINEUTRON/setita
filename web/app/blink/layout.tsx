import AppBar from "@/components/app_bar";
import React from "react"

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <AppBar />
            {children}
        </div>
    );
}
