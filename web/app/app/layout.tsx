import AppBar from "@/components/app_bar";


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <div>
            <div className="fixed z-50 top-0 md:right-8 md:left-8">
                <AppBar />
            </div>
            <div className="min-h-screen mt-14">
                {children}
            </div>
        </div>
    )
}