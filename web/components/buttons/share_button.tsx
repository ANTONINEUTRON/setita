import { Fundraising } from "@/src/types/fundraising";
import { IconCopy } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { MdCopyAll, MdShare } from "react-icons/md";
import ExtendedButton from "./extended_button";

export default function ShareButton({campaign}: {campaign: Fundraising}) {

    const copy = (text: string)=>{
        navigator.clipboard.writeText(text);

        // Alert the copied text
        toast.success("Copied!");
    }

    return (
        <div>
            <ExtendedButton
                text="Share"
                className="bg-blue-300"
                onClick={() => (document.getElementById('my_modal_5') as any).showModal()}
                icon={<MdShare className="bg-blue-300 p-1 rounded-full" />} />

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-2">Share with Donors</h3>
                    <div className="text-lg font-semibold">Donation Link</div>
                    <span>Your donors can access tools for accessibility</span>
                    <div className="flex justify-between items-center border rounded-lg">
                        <div className="pl-1 md:pl-4 line-clamp-1">{("setita.com/dn/" + campaign.id)}</div>
                        <div onClick={() => copy("https://setita.com/dn/"+campaign.id)} className="flex btn border p-1 rounded-lg bg-slate-700 hover:bg-primary shadow-2xl ">
                            <IconCopy />
                            Copy
                        </div>
                    </div>
                    
                    <div className="font-bold flex justify-center my-4">OR</div>

                    <div className="text-lg font-semibold">Blinks</div>
                    <span>Enable your donors to donate via social media</span>
                    <div className="flex justify-between items-center border rounded-lg">
                        <div className="pl-1 md:pl-4 line-clamp-1">{"setita.com/blink/give?did="+campaign.id}</div>
                        <div onClick={() => copy("https://dial.to/?action=https://setita.com/blink/give?did=" + campaign.id)} className="flex btn border p-1 rounded-lg  bg-slate-700 hover:bg-primary shadow-2xl ">
                            <IconCopy />
                            Copy
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    )
}