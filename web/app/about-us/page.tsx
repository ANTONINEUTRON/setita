import FaqItem from "@/components/faq_items";
import HomeNavbar from "@/components/navbar/home_navbar";


export default function AboutUsPage(){
    return (
        <section className="min-h-screen">
            <HomeNavbar />
            <div className="container p-8 mx-10">
                <div className="text-2xl">
                    About Setita
                </div>
                <div className="text-lg">
                    Know what we offer
                </div>
                <div className="grid grid-cols-1 rounded-lg bg-gray-300 text-black m-8 ">
                    
                </div>
            </div>
        </section>
    )
}