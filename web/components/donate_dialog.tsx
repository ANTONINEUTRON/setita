"use client"
import { HELIUS_ENDPOINT } from "@/src/constants";
import { Fundraising } from "@/src/types/fundraising";
import { Milestone } from "@/src/types/milestone";
import { supportedCurrencies } from "@/src/types/supported_currencies";
import { createInitialAmountTransaction, fetchUserBalance, saveMilestones, sumMilestoneAmount } from "@/src/utils/donation_ops";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowDropDown, MdAdd } from "react-icons/md";
import CustomButton from "./buttons/custom_button";
import FormItem from "./form_item";
import MilestoneItem from "./milestone_item";

export default function DonateDialog({ campaign }: { campaign: Fundraising }) {
    const milestoneIndexRef = useRef(1);
    const [amount, setAmount] = useState(0.0); // Total donation amount
    const [currency, setCurrency] = useState<string>("");
    const [milestones, setMilestones] = useState<Milestone[]>([]); // Track milestones
    const [error, setError] = useState<string | null>(null); // Track error message
    const { publicKey, wallet, sendTransaction, } = useWallet();
    const [userBalance, setUserbalance] = useState(0);

    // Calculate the total amount of all milestones
    const totalMilestoneAmount = milestones.reduce((acc, milestone) => acc + milestone.amount, 0);
    // Connection to Solana
    const connection = new Connection(HELIUS_ENDPOINT);


    // Reset state
    const resetState = () => {
        setAmount(0);
        setCurrency("");
        setMilestones([]);
        setError(null);
    };

    // Handle adding a new milestone
    const handleAddMilestone = () => {
        setMilestones([...milestones, { index: milestoneIndexRef.current, description: "", date: "", amount: 0.0 }]);
        milestoneIndexRef.current += 1; 
    };

    const handleRemoveMilestone = (index: number) => {
        const newMilestones = milestones.filter((milestone, i) => milestone.index !== index); // Remove milestone by index
        setMilestones([...newMilestones]);
    };

    // Update milestone on change
    const handleMilestoneChange = (index: number, updatedMilestone: Milestone | null) => {
        // Create a copy of the existing milestones
        const newMilestones = [...milestones];

        // Check if the updatedMilestone is null (remove), or update the milestone at the index
        if (updatedMilestone === null) {
            // Remove the milestone at the specified index
            newMilestones.splice(index, 1);
        } else {
            // Update the milestone at the specified index
            newMilestones[index] = updatedMilestone;
        }

        setMilestones(newMilestones);
    };

    useEffect(()=>{
        console.log("fetching curre"+currency);
        
        if(currency != ""){
            setUserBalance();
        }
    },[currency]);

    async function setUserBalance() {
        try {
            let bal = await fetchUserBalance(currency, publicKey!);
            setUserbalance(bal);
        } catch (error) {
            toast.error( (error as any).toString());
        }
    }

    const handleDonate = async()=>{
        console.log("CLICJ");
        
        if(publicKey == null){
            toast("Please connect your wallet before you can donate");
        }else{
            //validate transaction
            if(currency == ""){
                toast("Please select a currency");
            }else if((amount + await sumMilestoneAmount(milestones)) > userBalance){
                toast("Your total donation surpass your balance")
            }else{
                //perform transaction
                try{
                    //Get blockhash
                    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

                    const supportedCurr = supportedCurrencies.find((value, index) => value.name == currency)!;
                    //perform initial transfer
                    let trf = await createInitialAmountTransaction(
                         amount, 
                         supportedCurr,
                         publicKey,
                         campaign,
                         blockhash,
                         lastValidBlockHeight,
                    );

                    // confirm transaction

                    // Send transaction
                    const signature = await sendTransaction(trf, connection);
                    await connection.confirmTransaction({
                        blockhash: blockhash,
                        lastValidBlockHeight: lastValidBlockHeight,
                        signature: signature,
                    }, "processed")

                    toast.success("Initial commitment made successfully")

                    //if milestone is set, use streamflow to sign each transaction

                    if(milestones.length >0){
                         let trxHash = await saveMilestones(
                            milestones,
                            campaign.account,
                            supportedCurr,
                            wallet,
                        );
                    }
                    // prepare donation object, save to backend
                    let donationToSave = {
                        
                    }
                }catch(error){
                    toast.error("An unexpected error occured!")
                    console.log(error);
                    
                }
            }
        }
    }

    return (
        <dialog id="donate_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button onClick={() => resetState()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h3 className="font-bold text-lg">DONATE</h3>

                {
                    currency && publicKey && (
                        <div className="flex justify-around dark:text-white text-black text-md font-semibold mt-4">
                            <div>{publicKey.toString().substring(0,10)}....</div>
                            <div>
                                {currency}: <span>{userBalance ?? "..."}</span>
                            </div>
                        </div>
                    )
                }

                <FormItem title={"Amount"} subLabel={"Set the initial amount you want to donate"}>
                    <input
                        type="number"
                        className="grow bg-inherit outline-none"
                        placeholder="$0.00"
                        value={amount}
                        step={"any"}
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
                            className="dropdown-content menu bg-base-100 w-32 rounded-box z-[1] p-2 shadow">
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
                            milestone={milestone}
                            onRemove={() => handleRemoveMilestone(milestone.index)}
                            onDescriptionChange = {(desc)=>handleMilestoneChange(index, {...milestone, description: desc})}
                            onAmountChange = {(amt)=>handleMilestoneChange(index, {...milestone, amount: amt})}
                            onDateChange = {(dte)=>handleMilestoneChange(index, {...milestone, date: dte})}
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

                <button onClick={handleDonate} className="w-full bg-primary hover:opacity-80 py-4 mt-4 text-white">
                    Donate
                </button>
            </div>
        </dialog>
    );

    
}
