"use client";

import CustomButton from "@/components/buttons/custom_button";
import BasicInformation from "@/components/form_sections/basic_information";
import FundraisingDetails from "@/components/form_sections/fundraising_details";
import Media from "@/components/form_sections/media";
import Verify from "@/components/form_sections/verify";
import { CampaignDetails } from "@/src/types/fundraising";
import { supportedCurrencies } from "@/src/types/supported_currencies";
import { useState } from "react";
import { MdAddLink, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Category } from "@/src/types/category";

export default function CreatePage() {
    const [indexToShow, setIndexToShow] = useState(0);
    const [formData, setFormData] = useState<CampaignDetails>({
        title: "",
        description: "",
        location: "",
        category: Category.education,
        goal: { amount: 0, currency: supportedCurrencies[0] },
        supportedCurrencies: [],
        images: [],
    });

    // Handle form data updates
    const updateFormData = (key: string, value: any) => {
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
        return true;
    };

    const validateFundraisingDetails = () => {
        if (!formData.category) {
            toast.error("Category is required");
            return false;
        }
        if ((formData?.duration ?? []).length === 0) {
            toast.error("Duration must be specified");
            return false;
        }
        if ((formData?.goal?.amount ?? 0) <= 0) {
            toast.error("Goal amount must be greater than zero");
            return false;
        }
        return true;
    };

    const validateMedia = () => {
        if (formData.images.length === 0) {
            toast.error("At least one image is required");
            return false;
        }
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
            isValid = validateFundraisingDetails();
        } else if (indexToShow === 2) {
            isValid = validateMedia();
        }

        // Move to the next section if validation passes
        if (isValid) {
            setIndexToShow(indexToShow + 1);
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Final form data:", formData);
            toast.success("Campaign submitted successfully!");
            // Proceed with form submission logic (e.g., send data to API)
        }
    };

    const pages = [
        <BasicInformation
            title={formData.title}
            description={formData.description}
            location={formData.location ?? ""}
            onDescriptionChange={(description) => updateFormData("description", description)}
            onLocationChange={(location) => updateFormData("location", location)}
            onTitleChange={(title) => updateFormData("title", title)} />,

        <FundraisingDetails
            category={formData.category}
            duration={formData?.duration ?? []}
            goal={formData.goal!}
            supportedCurrencies={formData.supportedCurrencies}
            onCategoryChange={(category) => updateFormData("category", category)}
            onDurationChange={(dates) => updateFormData("duration", dates)}
            onGoalChange={(goal) => updateFormData("goal", goal)}
            onSupportedCurrencyChange={(currencies) => updateFormData("supportedCurrencies", currencies)} />,

        <Media
            images={formData.images}
            video={formData.video ?? null}
            onImagesChange={(images) => updateFormData("images", images)}
            onVideoChange={(video) => updateFormData("video", video)} />,

        <Verify
            formData={formData} />,
    ];

    return (
        <div className="container md:w-3/5 bg-slate-300 dark:bg-slate-800 shadow-lg shadow-purple-200 mt-18 min-h-screen p-8 rounded-lg border mx-auto">
            <div className="text-center text-3xl">CREATE CAMPAIGN</div>

            {/* Hot Toast Notification */}
            <Toaster />

            {/* Form Goes here */}
            <div className="mt-8 min-h-[80vh] flex flex-col justify-between">
                <div className="flex flex-col justify-center ">
                    <ul className="steps steps-horizontal md:mx-auto mx-1">
                        <li
                            onClick={() => setIndexToShow(0)}
                            className={"step " + (indexToShow >= 0 ? "step-primary" : "")}
                        >
                            Basic Information
                        </li>
                        <li
                            onClick={() => setIndexToShow(1)}
                            className={"step " + (indexToShow >= 1 ? "step-primary" : "")}
                        >
                            Details
                        </li>
                        <li
                            onClick={() => setIndexToShow(2)}
                            className={"step " + (indexToShow >= 2 ? "step-primary" : "")}
                        >
                            Media
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
                            text="Go Back"
                        />
                    ) : (
                        <div></div>
                    )}

                    {indexToShow !== 3 ? (
                        <CustomButton
                            icon={<MdArrowForwardIos />}
                            text="Next"
                            onClick={handleNext}
                            isIconAfterTitle={true}
                        />
                    ) : (
                        <CustomButton
                            icon={<MdAddLink size={24} />}
                            text="SUBMIT"
                            onClick={handleSubmit}
                            isIconAfterTitle={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
