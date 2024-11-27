import { Fundraising } from "@/libs/types/fundraising"
import Link from "next/link"
import { MdArrowForward, MdShare } from "react-icons/md"
import ExtendedButton from "../buttons/extended_button"
import ShareButton from "../buttons/share_button"

interface CampaignItemProps{
    campaign: Fundraising,
}

export default function CampaignItem({campaign}: CampaignItemProps){
    return (
        <div className="border border-primary rounded-lg min-h-40 shadow-md my-5 flex justify-between m-5 p-8">
            <div className="w-5/6 flex flex-col ">
                <span className="font-semibold text-xl mb-4">
                    {campaign.data.title}
                </span>
                <div className=" line-clamp-3">
                    {campaign.data.description}
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <ShareButton 
                    campaign={campaign}/>

                <Link href={"dn/testId"}>
                    <ExtendedButton
                        text="Open"
                        className="py-1 text-lg font-semibold"
                        icon={<MdArrowForward />} />
                </Link>
            </div>
        </div>
    )
}

