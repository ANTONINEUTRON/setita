"use client"

import { MdAdd } from "react-icons/md";
import CustomButton from "../buttons/custom_button";
import FormItem from "../form_item";
import MilestoneItem from "../milestone_item";
import { useEffect, useRef, useState } from "react";
import { Milestone } from "@/libs/types/milestone";

export default function CreateMilestones(){
    const milestoneIndexRef = useRef(1);
    const [milestones, setMilestones] = useState<Milestone[]>([]); // Track milestones


    // Handle adding a new milestone
    const handleAddMilestone = () => {
        console.log(milestones);
        
        setMilestones([...milestones, { index: milestoneIndexRef.current, description: "", date: "", amount: 0.0 }]);
        milestoneIndexRef.current += 1;
        console.log(milestones);
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


    return (
        <div className="p-4 my-8">
            <FormItem
                title={"Milestones"}
                subLabel={"You can add and remove milestones "}>
                <div className="relative w-full">
                    {milestones.length <= 0 ? (
                        <div className="text-center my-8">
                            No milestone has been added yet
                        </div>
                    ) :
                    milestones.map((milestone, index) => (
                        <MilestoneItem
                            key={index}
                            index={index}
                            milestone={milestone}
                            onRemove={() => handleRemoveMilestone(milestone.index)}
                            onDescriptionChange={(desc) => handleMilestoneChange(index, { ...milestone, description: desc })}
                            onAmountChange={(amt) => handleMilestoneChange(index, { ...milestone, amount: amt })}
                            onDateChange={(dte) => handleMilestoneChange(index, { ...milestone, date: dte })}
                            />
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