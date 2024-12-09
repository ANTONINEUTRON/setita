import { CampaignDetails } from "@/libs/types/fundraising";
import { Radio } from "antd";

interface VerifyProps {
    formData: CampaignDetails,
    images: File[],
    video: File | null,
}

export default function Verify({ formData, images, video }: VerifyProps) {
    return (
        <div className="p-4 my-8">
            <div className="my-2 text-xl font-bold">
                Verify Your Campaign Details
            </div>

            <div className="border rounded-lg p-4">
                {/* Title */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Title of the campaign</div>
                    <div >{formData?.title || "N/A"}</div>
                </div>

                {/* Description */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Description</div>
                    <div >{formData?.description || "N/A"}</div>
                </div>

                {/* Location */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Location</div>
                    <div >{formData?.location || "N/A"}</div>
                </div>

                {/* Category */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Donation category</div>
                    <div >{formData?.category || "N/A"}</div>
                </div>

                {/* Dates */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Duration</div>
                    <div >
                        {
                            formData?.duration ? (
                                <div className="flex justify-between border p-2 m-2 border-dashed rounded-lg">
                                    <div className="">
                                        Start: {new Date(formData?.duration[1] as any).toDateString()}
                                    </div>
                                    <div>
                                        End: {new Date(formData?.duration[0] as any).toDateString()}
                                    </div>
                                </div>
                            ):(
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
                        {formData?.goal?.amount || "N/A"} {formData?.goal?.currency || ""}
                    </div>
                </div>


                <div className="my-4">
                    <div className="text-lg font-semibold">Milestones</div>
                    <div>
                        {formData?.milestones?.map(
                            (milestone, index)=>(
                                <div>
                                    Milestone {index+1}
                                    <div className="pl-4">{milestone.description} - {milestone.amount + " " + formData?.goal?.currency}</div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Supported Tokens */}
                <div className="my-4">
                    <div className="text-lg font-semibold">Supported Tokens</div>
                    <div >
                        {formData?.supportedCurrencies?.map((currency)=>(
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
                        {images?.length > 0 ? (
                            images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Campaign image ${index + 1}`}
                                    className="w-32 h-32 object-cover mr-2 mb-2"
                                />
                            ))
                        ) : (
                            <div>No images uploaded</div>
                        )}
                    </div>

                    {/* Video */}
                    <div className="text-lg font-semibold mt-4">Video</div>
                    <div className="mt-2">
                        {video ? (

                            <video controls className="w-full h-auto mt-2">
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div>No video uploaded</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-center mt-8 mx-4 md:mx-16 ">
                On submitting and creating this fundraising campaign, you agree to the terms and conditions and privacy policy of Setita.
            </div>
        </div>
    );
}
