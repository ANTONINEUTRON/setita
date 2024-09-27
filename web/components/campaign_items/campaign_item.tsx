import Link from "next/link"
import { MdArrowForward, MdShare } from "react-icons/md"
import ExtendedButton from "../buttons/extended_button"
import ShareButton from "../buttons/share_button"

export default function CampaignItem(){
    return (
        <div className="border border-primary rounded-lg shadow-md my-5 flex justify-between m-5 p-8">
            <div className="w-5/6 flex flex-col ">
                <span className="font-semibold text-xl mb-4">
                    Title
                </span>
                <div className=" line-clamp-3">
                    Descritpion Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, labore praesentium! Ad minima reiciendis nisi! Laudantium error suscipit soluta doloremque? Ipsum sed, culpa esse laborum obcaecati dolore doloribus commodi rerum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse cum sequi corrupti, voluptatum assumenda ducimus iste non sint error praesentium repellat. Incidunt, voluptates ex. Labore harum tempora nulla ducimus molestias.
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <ShareButton />

                <Link href={"/testId"}>
                    <ExtendedButton
                        text="Open"
                        className="py-1 text-lg font-semibold"
                        icon={<MdArrowForward />} />
                </Link>
            </div>
        </div>
    )
}

