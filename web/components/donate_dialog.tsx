"use client"
import { Fundraising } from "@/src/types/fundraising";
import { Milestone } from "@/src/types/milestone";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdAdd } from "react-icons/md";
import CustomButton from "./buttons/custom_button";
import FormItem from "./form_item";
import MilestoneItem from "./milestone_item";
import { StreamflowSolana, } from "@streamflow/stream";

// StreamflowSolana.
const solanaClient = new StreamflowSolana.SolanaStreamClient(
    "https://api.mainnet-beta.solana.com",
);

export default function DonateDialog({ campaign }: { campaign: Fundraising }) {
    const [amount, setAmount] = useState(0); // Total donation amount
    const [currency, setCurrency] = useState<string>();
    const [milestones, setMilestones] = useState<Milestone[]>([]); // Track milestones
    const [error, setError] = useState<string | null>(null); // Track error message
    
    // Calculate the total amount of all milestones
    const totalMilestoneAmount = milestones.reduce((acc, milestone) => acc + milestone.amount, 0);

    //reset state
    const resetState = () => {
        setAmount(0);
        setCurrency("");
        setMilestones([]);
        setError(null);
    }
    
    useEffect(()=>{
        console.log("Amount is");

        console.log(amount);
        console.log(currency);
        console.log(milestones);

        console.log(error);
    },[milestones, amount, currency])
    // Handle adding a new milestone
    const handleAddMilestone = () => {
        setMilestones([...milestones, { index: milestones.length, description: "", date: "", amount: 0 }]);
    };

    // Update milestone on change
    const handleMilestoneChange = (index: number, updatedMilestone: Milestone) => {
        const newMilestones = [...milestones];
        newMilestones[index] = updatedMilestone; // Update specific milestone by index

        const newTotalMilestoneAmount = newMilestones.reduce((acc, milestone) => acc + milestone.amount, 0);

        // Check if new total exceeds the total donation amount
        if (newTotalMilestoneAmount > amount) {
            setError("The total milestone amount cannot exceed the donation amount.");
        } else {
            setError(null);
            setMilestones(newMilestones);
        }
    };

    return (
        <dialog id="donate_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button onClick={() => resetState()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h3 className="font-bold text-lg">DONATE</h3>

                <FormItem title={"Total Donation"} subLabel={"Set the total amount you want to donate"}>
                    <input
                        type="number"
                        className="grow bg-inherit outline-none"
                        placeholder="$0.00"
                        value={amount < 1 ? undefined : amount}
                        onChange={(e) => setAmount(Number(e.target.value))} />

                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn">
                            {currency ? (
                                <div>{currency}</div>
                            ) : (
                                <div>Currency</div>
                            )}
                            <MdArrowDropDown />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 w-32 rounded-box z-[1] w-30 p-2 shadow">
                            {(campaign.data?.supportedCurrencies ?? []).map((currency) => (
                                <li
                                    key={currency}
                                    className="p-4"
                                    onClick={() => setCurrency(currency)}>
                                    {currency}
                                </li>
                            ))}
                        </ul>
                    </div>
                </FormItem>

                {/* Milestone UI */}
                <div>
                    {milestones.map((milestone, index) => (
                        <MilestoneItem
                            key={index}
                            index={index}
                            onChange={(updatedMilestone) => handleMilestoneChange(index, updatedMilestone)}
                        />
                    ))}
                </div>

                {/* Display error if total milestone amount exceeds total donation */}
                {error && <p className="text-red-500">{error}</p>}

                <CustomButton
                    text="Add Milestone"
                    icon={<MdAdd />}
                    className="mt-6"
                    onClick={handleAddMilestone} // Add Milestone button handler
                />

                <button className="w-full bg-primary hover:opacity-80 py-4 mt-4 text-white">
                    Donate
                </button>
            </div>
        </dialog>
    );
}