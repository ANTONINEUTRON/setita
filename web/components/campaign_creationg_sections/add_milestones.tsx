"use client"

import { MdAdd } from "react-icons/md";
import CustomButton from "../buttons/custom_button";
import FormItem from "../form_item";
import MilestoneItem from "../milestone_item";
import { useEffect, useRef, useState } from "react";
import { Milestone } from "@/libs/types/milestone";

interface AddMilestonesProp{
    selectedCurrency: string;
    milestones: Milestone[];
    onMilestoneChange: (milestones: Milestone[])=>void;
}

export default function AddMilestones({
    selectedCurrency,
    milestones: initialMileStone,
    onMilestoneChange,
}:AddMilestonesProp){
    const milestoneIndexRef = useRef(1);
    const [milestones, setMilestones] = useState<Milestone[]>([]); // Track milestones

    useEffect(()=>{
        setMilestones(initialMileStone)
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
                    milestones.map((milestone, index) => (
                        <div className="w-11/12 pl-8 md:pl-0">
                            <MilestoneItem
                                key={index}
                                index={index}
                                selectedGoalCurrency={selectedCurrency}
                                milestone={milestone}
                                onRemove={() => handleRemoveMilestone(milestone.index)}
                                onDescriptionChange={(desc) => handleMilestoneChange(index, { ...milestone, description: desc })}
                                onAmountChange={(amt) => handleMilestoneChange(index, { ...milestone, amount: amt })}
                                onDateChange={(dte) => handleMilestoneChange(index, { ...milestone, date: dte })}
                                />
                        </div>
                    ))}
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