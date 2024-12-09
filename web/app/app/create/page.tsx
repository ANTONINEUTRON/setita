"use client";

import CustomButton from "@/components/buttons/custom_button";
import BasicInformation from "@/components/campaign_creationg_sections/basic_information";
import FundraisingDetails from "@/components/campaign_creationg_sections/fundraising_details";
import Media from "@/components/campaign_creationg_sections/media";
import Verify from "@/components/campaign_creationg_sections/verify";
import { CampaignDetails, Fundraising } from "@/libs/types/fundraising";
import { supportedCurrencies } from "@/libs/types/supported_currencies";
import { useRef, useState } from "react";
import { MdAddLink, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import toast from "react-hot-toast";
import { Category } from "@/libs/types/category";
import { Milestone } from "@/libs/types/milestone";
import axios from "axios";
import {  useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { HELIUS_ENDPOINT } from "@/libs/constants";
import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google';
import AddMilestones from "@/components/campaign_creationg_sections/add_milestones";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export default function CreatePage() {
    const [indexToShow, setIndexToShow] = useState(0);
    const [formData, setFormData] = useState<CampaignDetails>({
        title: "",
        description: "",
        location: "",
        category: Category.education,
        goal: { amount: 0, currency: supportedCurrencies[1].name },
        supportedCurrencies: [supportedCurrencies[1].name],//USDC (which is at this index) by default
        images: [],
        duration: null,
        video: "",
        milestones: []
    });
    const [images, setImages] = useState<File[]>([]);
    const [video, setVideo] = useState<File | null>();
    const { publicKey, sendTransaction } = useWallet();
    const router = useRouter()
    const campaignTrxHash = useRef("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle form data updates
    const updateFormData = (key: string, value: any) => {
        console.log(key);
        console.log(value);
        
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    // Section-specific validation functions
    const validateBasicInformation = () => {
        if (!formData.title) {
            toast.error("Title is required");
            return false;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return false;
        }
        if (!formData.location) {
            toast.error("Location is required");
            return false;
        }
        if (!formData.category) {
            toast.error("Category is required");
            return false;
        }
        if ((formData?.goal?.amount ?? 0) <= 0) {
            toast.error("Goal amount must be greater than zero");
            return false;
        }
        return true;
    };

    const validateFundraisingDetails = () => {
        if (!formData.category) {
            toast.error("Category is required");
            return false;
        }
        // if ((formData?.duration ?? []).length === 0) {
        //     toast.error("Duration must be specified");
        //     return false;
        // }
        if ((formData?.goal?.amount ?? 0) <= 0) {
            toast.error("Goal amount must be greater than zero");
            return false;
        }
        return true;
    };

    const validateMedia = () => {
        if (images.length === 0) {
            toast.error("At least one image is required");
            return false;
        }
        return true;
    };
    const validateMilestones = () => {
        // if (images.length === 0) {
        //     toast.error("At least one image is required");
        //     return false;
        // }
        return true;
    };

    const validateForm = () => {
        return validateBasicInformation() && validateFundraisingDetails() && validateMedia();
    };

    // Handle the "Next" button click
    const handleNext = () => {
        let isValid = true;

        // Validate the current section
        if (indexToShow === 0) {
            isValid = validateBasicInformation();
        } else if (indexToShow === 1) {
            // isValid = validateFundraisingDetails();
            isValid = validateMedia();
        } else if (indexToShow === 2) {
            isValid = validateMilestones();
        }

        // Move to the next section if validation passes
        if (isValid) {
            setIndexToShow(indexToShow + 1);
        }
    };

    const performCreationTransaction = async () => {
        // Check if wallet is connected
        if (!publicKey) {
            toast.error("Please connect your wallet to proceed\n\nHint: Click the profile icon at the top-left");
            throw new Error("no wallet found");
        }

        try {
            const connection = new Connection(HELIUS_ENDPOINT); // Solana mainnet endpoint
            const recipient = new PublicKey("EpG8VkF9Cv4iGBGYvaxAATVDEgd74VjWmsPdKcF9WGwc");
            const amountInLamports = 0.007 * 1e9;
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

            // Transaction setup
            const transaction = new Transaction({
                feePayer: publicKey,
                blockhash,
                lastValidBlockHeight,
            }).add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipient,
                    lamports: amountInLamports,
                })
            );

            // Send transaction
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction({
                blockhash: blockhash, 
                lastValidBlockHeight: lastValidBlockHeight, 
                signature: signature,
            }, "processed")

            campaignTrxHash.current = signature;

            toast.success("Transaction successful! \nCreating the Campaign....");

            router.push("/app/");
        } catch (error) {
            console.log("Transaction failed:", error);
            toast.error("Transaction failed.");
            throw "Transaction failed";
        }
    };


    const saveMediaFiles = async () => {
        const formDataToSend = new FormData();

        // Check if there are images to upload
        if (images && images.length > 0) {
            images.forEach((image: File) => {
                formDataToSend.append(`images`, image); // Append each image file
            });
        }

        // Check if there's a video to upload
        if (video) {
            formDataToSend.append("video", video); // Append video file if it exists
        }

        formDataToSend.append("trxHash", campaignTrxHash.current);

        try {
            // Send the FormData object via axios
            const response = await axios.post("/api/uploadMedia", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });
            
            return response.data;
            
        } catch (error) {
            toast.error("Failed to upload media files");
            console.error("Error uploading media files:", error);
            throw new Error("Failed to upload media files.");
        }
    };


    const handleSubmit = async () => {
        if (validateForm()) {
            setIsProcessing(true);

            try {
                // Perform creation transaction
                // await performCreationTransaction();

                // save video and media files
                toast("Uploading media");
                const { imageUrls, videoUrl } = await saveMediaFiles();
                

                // create fundraing object
                let fundraingObj: Fundraising = {
                    id: "",
                    trxHash: campaignTrxHash.current, 
                    account: publicKey!.toString(),
                    data: {
                        ...formData,
                        images: imageUrls, 
                        video: videoUrl,
                    },//set connected wallet here
                }

                // save object
                // Send the FormData object via axios
                const response = await axios.post("/api/saveCampaign", JSON.stringify(fundraingObj), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });                

                toast.success("Campaign Created Successfully!");

                router.replace("/app/")
            } catch (error) {
                // toast.error("An error occured while creating this campaign");
            }
            setIsProcessing(false);
        }
    };

    const pages = [
        <BasicInformation
            title={formData.title}
            description={formData.description}
            location={formData.location ?? ""}
            category={formData.category}
            goal={formData.goal!}
            supportedCurrencies={formData.supportedCurrencies}
            onDescriptionChange={(description) => updateFormData("description", description)}
            onLocationChange={(location) => updateFormData("location", location)}
            onTitleChange={(title) => updateFormData("title", title)} 
            onCategoryChange={(category) => updateFormData("category", category)}
            onGoalChange={(goal) => updateFormData("goal", goal)}
            onSupportedCurrencyChange={(currencies) => updateFormData("supportedCurrencies", currencies)} />,

        // <FundraisingDetails
        //     category={formData.category}
        //     duration={formData?.duration ?? []}
        //     goal={formData.goal!}
        //     supportedCurrencies={formData.supportedCurrencies}
        //     onCategoryChange={(category) => updateFormData("category", category)}
        //     onDurationChange={(dates) => updateFormData("duration", dates)}
        //     onGoalChange={(goal) => updateFormData("goal", goal)}
        //     onSupportedCurrencyChange={(currencies) => updateFormData("supportedCurrencies", currencies)} />,

        <Media
            images={images}
            video={video ?? null}
            onImagesChange={(images) => setImages(images)}
            onVideoChange={(video) => setVideo(video)} />,

        <AddMilestones 
            milestones={formData.milestones!}
            goal={formData.goal!}
            selectedCurrency={formData.goal!.currency}
            onMilestoneChange={(updatedMilestones)=>{
                updateFormData("milestones", updatedMilestones);
            }}/>,

        <Verify
            images={images}
            video={video ?? null}
            formData={formData} />,

    ];

    return (
        <div className="container md:w-3/5 bg-slate-300 dark:bg-slate-800 shadow-lg shadow-purple-200 mt-18 min-h-screen p-8 rounded-lg border mx-auto">
            <div className={"text-center text-3xl "+roboto.className}>Create Fundraising Campaign</div>

            {/* Form Goes here */}
            <div className="mt-8 min-h-[80vh] flex flex-col justify-between">
                <div className="flex flex-col justify-center ">
                    <ul className="steps steps-horizontal md:mx-auto mx-1">
                        <li
                             onClick={() => setIndexToShow(0)}
                            className={"step " + (indexToShow >= 0 ? "step-primary" : "")}
                        >
                            Campaign Details
                        </li>
                        {/* <li
                             onClick={() => setIndexToShow(1)}
                            className={"step " + (indexToShow >= 1 ? "step-primary" : "")}
                        >
                            Details
                        </li> */}
                        <li
                             onClick={() => setIndexToShow(1)}
                            className={"step " + (indexToShow >= 1 ? "step-primary" : "")}
                        >
                            Media
                        </li>
                        <li
                            onClick={() => setIndexToShow(2)}
                            className={"step " + (indexToShow >= 2 ? "step-primary" : "")}
                        >
                            Milestones
                        </li>
                        <li
                             onClick={() => setIndexToShow(3)}
                            className={"step " + (indexToShow >= 3 ? "step-primary" : "")}
                        >
                            Verify
                        </li>
                    </ul>
                    {pages[indexToShow]}
                </div>
                <div className="flex justify-between mt-8">
                    {indexToShow > 0 ? (
                        <CustomButton
                            onClick={() => setIndexToShow(indexToShow - 1)}
                            icon={<MdArrowBackIos />}
                            text="Previous" />
                    ) : (
                        <div></div>
                    )}

                    {indexToShow !== 3 ? (
                        <CustomButton
                            icon={<MdArrowForwardIos />}
                            text="Next"
                            onClick={handleNext}
                            isIconAfterTitle={true}
                            isProcessing={isProcessing} />
                    ) : (
                        <CustomButton
                            icon={<MdAddLink size={24} />}
                            text="SUBMIT"
                            onClick={handleSubmit}
                            isIconAfterTitle={true}
                            isProcessing={isProcessing} />
                    )}
                </div>
            </div>
        </div>
    );
}
