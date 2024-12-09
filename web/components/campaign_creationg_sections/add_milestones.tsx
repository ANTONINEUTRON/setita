"use client"

import { MdAdd } from "react-icons/md";
import CustomButton from "../buttons/custom_button";
import FormItem from "../form_item";
import MilestoneItem from "../milestone_item";
import { useEffect, useRef, useState } from "react";
import { Milestone } from "@/libs/types/milestone";
import { CampaignGoal } from "@/libs/types/campaign_goal";
import toast from "react-hot-toast";

interface AddMilestonesProp{
    selectedCurrency: string;
    milestones: Milestone[];
    goal: CampaignGoal;
    onMilestoneChange: (milestones: Milestone[])=>void;
}

export default function AddMilestones({
    selectedCurrency,
    goal,
    milestones: initialMileStone,
    onMilestoneChange,
}:AddMilestonesProp){
    const milestoneIndexRef = useRef(1);
    const [milestones, setMilestones] = useState<Milestone[]>([]); // Track milestones
    const [directDonation, setDirectDonation] = useState<number>(goal.amount)

    useEffect(()=>{
        setMilestones(initialMileStone)
        console.log("Effect called");
        
        // calculate and set direct donations
        let sum = milestones.reduce((total, milestone) => {
            // Check if amount exists and is a valid number before adding
            return total + (milestone.amount || 0);
        }, 0);
        const dirDon = goal.amount - sum;
        if(dirDon < 1){
            toast.error("The milestones doesn't add up to the goal\nPlease rectify it")
        }else{
            setDirectDonation(dirDon);
        }
        
    },[initialMileStone])

    // Handle adding a new milestone
    const handleAddMilestone = () => {
        const newMilestones = [...milestones, {
            index: milestoneIndexRef.current,
            description: "",
            date: "",
        }];
        setMilestones(newMilestones);
        onMilestoneChange(newMilestones);

        milestoneIndexRef.current += 1;
    };

    const handleRemoveMilestone = (index: number) => {
        const newMilestones = milestones.filter((milestone, i) => milestone.index !== index); // Remove milestone by index
        setMilestones([...newMilestones]);
        onMilestoneChange(newMilestones);
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
        onMilestoneChange(newMilestones);
    };


    return (
        <div className="p-4 my-4">

            <FormItem
                title={"Milestones"}
                subLabel={"You can add and remove milestones "}>
                <div className="w-full mx-auto">
                    {milestones.length <= 0 ? (
                        <div className="text-center my-8">
                            No milestone has been added yet
                        </div>
                    ) :
                    (
                        <div>
                            <div className="flex justify-evenly my-4 text-lg">
                                <span className="text-green-800 dark:text-green-300">Goal: {goal.amount+" "+goal.currency}</span>
                                <span className={directDonation < 1 ? "text-red-500" :"text-secondary"}>Direct Donation: {directDonation} {goal.currency}</span>
                            </div>
                            {milestones.map((milestone, index) => (
                                <div className="">
                                    
                                    <div className="w-11/12 pl-8 md:pl-0">
                                        <MilestoneItem
                                            key={index}
                                            index={index}
                                            selectedGoalCurrency={selectedCurrency}
                                            milestone={milestone}
                                            onRemove={() => handleRemoveMilestone(milestone.index)}
                                            onDescriptionChange={(desc) => handleMilestoneChange(index, { ...milestone, description: desc })}
                                            onAmountChange={(amt) => handleMilestoneChange(index, { ...milestone, amount: amt })}
                                            onDateChange={(dte) => handleMilestoneChange(index, { ...milestone, date: dte })} />
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    )}
                </div>
                
            </FormItem>

            <CustomButton
                text="Add Milestone"
                icon={<MdAdd />}
                className="mt-6"
                onClick={handleAddMilestone} // Add Milestone button handler
            />
        </div>
    )
}