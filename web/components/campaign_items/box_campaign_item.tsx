import Image from "next/image";


export default function BoxCampaignItem (){
    return (
        <div className="hover:shadow-md hover:opacity-95">
            <div className="relative bg-secondary m-2 -z-20 rounded-lg">
                {/* Background image */}
                <div
                    className="inset-0 bg-cover bg-center h-72 rounded-lg"
                    style={{
                        backgroundImage: "url('/images/donation.jpg')",
                    }}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-gray-900 opacity-70"></div>
                    {/* Text content */}
                    <div className="relative p-2 text-white top-44">  {/* Adjust the top value as needed */}
                        <div className="text-lg font-bold">Title</div>
                        <div className="text-md">Creator Name</div>
                        <div className="mt-2 text-sm">
                            Donations |{" "}
                            <span className="text-green-500">Your Contribution </span>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}