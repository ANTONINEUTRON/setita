import { IconCopy } from "@tabler/icons-react";
import { MdCopyAll, MdShare } from "react-icons/md";
import ExtendedButton from "./extended_button";

export default function ShareButton() {
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
                        <div className="pl-4">https://srv1509-files.hstgr.io/5</div>
                        <div className="flex border p-1 rounded-lg bg-slate-700 hover:bg-primary shadow-2xl ">
                            <IconCopy />
                            Copy
                        </div>
                    </div>
                    <div className="font-bold flex justify-center my-4">OR</div>
                    <div className="text-lg font-semibold">Blinks</div>
                    <span>Your donors can donate via social media</span>
                    <div className="flex justify-between items-center border rounded-lg">
                        <div className="pl-4">https://srv1509-files.hstgr.io/5</div>
                        <div className="flex border p-1 rounded-lg hover:bg-primary shadow-2xl ">
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