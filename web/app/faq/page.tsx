import FaqItem from "@/components/faq_items";
import HomeNavbar from "@/components/navbar/home_navbar";


export default function FAQPage(){
    return (
        <section className="min-h-screen">
            <HomeNavbar />
            <div className="container p-8 mx-10">
                <div className="text-2xl">
                    Frequently Asked Questions
                </div>
                <div className="text-lg">
                    Quick answers for questions you may have
                </div>
                <div className="grid grid-cols-1 rounded-lg bg-gray-300 text-black m-8 ">
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                    <FaqItem
                        title="Hello"
                        details="Hi me down" />
                </div>
            </div>
        </section>
    )
}