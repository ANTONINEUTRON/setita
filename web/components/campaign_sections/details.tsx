import { Fundraising } from "@/libs/types/fundraising";
import ShareButton from "../buttons/share_button";

export default function CampaignDetails({ campaign }: { campaign: Fundraising }){
    return (
        <div className="mt-8 p-4">
            <div className=" flex justify-between">
                <div className="indicator">
                    <h1 className="text-3xl font-bold mb-4">Campaign Details</h1>
                    {/* {
                        !campaign.trxHash && (
                            <span className="badge badge-sm indicator-item text-white p-2 bg-primary">Created with Blinks</span>
                        )
                    } */}
                </div>
                <ShareButton
                    campaign={campaign} />
            </div>
            

            <div className="border rounded-lg p-4">
                {/* Title */}
                <div className="mt-4">
                    <div className="text-lg font-semibold">
                        {campaign.data.title || "N/A"}
                    </div>
                </div>

                {/* Description */}
                <div className="mt-2 mb-4">
                    <div >{campaign.data.description || "N/A"}</div>
                </div>

                {/* Location */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Location</div>
                    <div >{campaign.data.location || "N/A"}</div>
                </div>

                {/* Category */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Donation category</div>
                    <div >{campaign.data.category || "N/A"}</div>
                </div>

                {/* Dates */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Duration</div>
                    <div >
                        {
                            campaign.data.duration ? (
                                <div className="flex justify-between border p-2 m-2 border-dashed rounded-lg">
                                    <div className="">
                                        Start: {new Date(campaign.data.duration[1] as any).toDateString()}
                                    </div>
                                    <div>
                                        End: {new Date(campaign.data.duration[0] as any).toDateString()}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Date not set
                                </div>
                            )
                        }
                    </div>
                </div>


                <div className="my-4">
                    <div className="text-lg font-semibold">Target Amount</div>
                    <div>
                        {campaign.data.goal?.amount || "N/A"} {campaign.data.goal?.currency || ""}
                    </div>
                </div>

                {/* Supported Tokens */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Supported Tokens</div>
                    <div >
                        {campaign.data.supportedCurrencies?.map((currency) => (
                            <div>{currency}</div>
                        ))}

                    </div>
                </div>

                {/* Media Section */}
                <div className="p-4 border border-dashed rounded-lg mt-8">
                    <div className="font-semibold text-md mb-4">MEDIA</div>

                    {/* Images */}
                    <div className="text-lg font-semibold">Images</div>
                    <div className="flex flex-wrap mt-2">
                        {campaign.data.images ? (
                            campaign.data.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Campaign image ${index + 1}`}
                                    className="w-32 h-32 object-cover mr-2 mb-2"/>
                            ))
                        ) : (
                            <div>No images uploaded</div>
                        )}
                    </div>

                    {/* Video */}
                    <div className="text-lg font-semibold mt-4">Video</div>
                    <div className="mt-2">
                        {campaign.data.video ? (

                            <video controls className="w-full h-auto mt-2">
                                <source src={campaign.data.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div>No video uploaded</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}