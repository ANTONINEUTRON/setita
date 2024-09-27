import { MdArrowForward } from "react-icons/md";
import ExtendedButton from "../buttons/extended_button";

export default function PMilestones() {
    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold">Milestones</h1>
            <div role="tablist" className="tabs tabs-boxed">
                <a role="tab" className="tab tab-active text-lg">Proposed milestones</a>
                <a role="tab" className="tab text-lg">Concluded</a>
            </div>
            <div>
                {/* Milestone item */}
                
                <div className="border border-primary rounded-lg shadow-md hover:shadow-2xl my-5 flex justify-between m-5 p-8">
                    <div className="w-5/6 flex flex-col ">
                        <span className="font-semibold text-xl mb-4">
                            Wallet Address and Name
                        </span>
                        <div className=" line-clamp-3">
                            Descritpion Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, labore praesentium! Ad minima reiciendis nisi! Laudantium error suscipit soluta doloremque? Ipsum sed, culpa esse laborum obcaecati dolore doloribus commodi rerum.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse cum sequi corrupti, voluptatum assumenda ducimus iste non sint error praesentium repellat. Incidunt, voluptates ex. Labore harum tempora nulla ducimus molestias.
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <ExtendedButton
                            text="View"
                            // open modal onclick
                            icon={<MdArrowForward />} />

                    </div>
                </div>
            </div>
        </div>
    )
}