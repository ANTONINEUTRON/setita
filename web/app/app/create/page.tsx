"use client"

import CustomButton from "@/components/buttons/custom_button";
import FormItem from "@/components/form_item"
import BasicInformation from "@/components/form_sections/basic_information";
import FundraisingDetails from "@/components/form_sections/fundraising_details";
import Media from "@/components/form_sections/media";
import Verify from "@/components/form_sections/verify";
import { useState } from "react"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MdAddLink, MdArrowBackIos, MdArrowForwardIos, MdNoteAdd } from "react-icons/md";

export default function CreatePage(){
    const [indexToShow, setIndexToShow] = useState(0)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        dates: [],
        goal: 0,
        currencies: [],
        images: [],
        video: null,
        isTermAccepted: false,
    })


    const pages = [
        <BasicInformation
            onDescriptionChange={(description) => { }}
            onLocationChange={(location) => { }}
            onTitleChange={(title) => { }} />,

        <FundraisingDetails
            onDurationChange={(dates) => { }}
            onGoalChange={(goalAmount) => { }}
            onSupportedCurrencyChange={(currencies) => { }} />,

        <Media
            onImagesChange={(images) => { }}
            onVideoChange={(video) => { }} />,

        <Verify
            onTermsAccepted={(isTermAccepted) => { }} />
    ];


    return (
        <div 
            className="container md:w-3/5 bg-slate-300 dark:bg-slate-800 shadow-lg shadow-purple-200 mt-18 min-h-screen p-8 rounded-lg border mx-auto">
                <div className="text-center text-3xl">
                    CREATE CAMPAIGN
                </div>
                {/* Form Goes here */}
                <div className="mt-8 min-h-[80vh] flex flex-col justify-between">
                    <div className="flex flex-col justify-center ">
                        <ul className="steps steps-horizontal md:mx-auto mx-1">
                            <li onClick={() => console.log("Tapped")} className={"step " + (indexToShow >= 0 ? "step-primary" : "")}>Basic information</li>
                            <li className={"step " + (indexToShow >= 1 ? "step-primary" : "")}>Details</li>
                            <li className={"step " + (indexToShow >= 2 ? "step-primary" : "")}>Media</li>
                            <li className={"step " + (indexToShow >= 3 ? "step-primary" : "")}>Verify</li>
                        </ul>
                        {
                            pages[indexToShow]
                        }
                    
                    </div>
                    <div className="flex justify-between mt-8">
                    {(indexToShow > 0) ? (
                        <CustomButton
                            onClick={() => setIndexToShow(indexToShow - 1)}
                            icon={<MdArrowBackIos />}
                            text="Go Back" />
                    ) : (
                        <div></div>
                    )}

                    {(indexToShow !== 3) ?
                        (
                            <CustomButton
                                icon={<MdArrowForwardIos />}
                                text="Next"
                                onClick={()=>setIndexToShow(indexToShow+1)}
                                isIconAfterTitle={true} />
                        ):(
                            <CustomButton
                                icon={<MdAddLink size={24} />}
                                text="SUBMIT"
                                isIconAfterTitle={true} />
                        )
                    }
                    </div>
                </div>
        </div>
    )
}