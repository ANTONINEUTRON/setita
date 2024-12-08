import { Milestone } from "@/libs/types/milestone";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

interface MilestoneItemProps {
    // onChange: (milestone: Milestone) => void;  // Callback function prop
    index: number;
    milestone: Milestone;
    selectedGoalCurrency: string;
    onRemove: () => void;
    onDescriptionChange: (desc: string)=>void;
    onAmountChange: (desc: number)=>void;
    onDateChange: (desc: string)=>void;
}

export default function MilestoneItem({ 
    onDescriptionChange, 
    onAmountChange, 
    selectedGoalCurrency, 
    onDateChange, 
    index, 
    onRemove, 
    milestone }: MilestoneItemProps) {
    // const [localMilestone, setLocalMilestone] = useState<Milestone>(milestone);

    // Handle changes in individual fields of the milestone object
    // const handleChange = (field: keyof Milestone, value: string | number) => {
    //     const newMileStone = {
    //         ...localMilestone,
    //         [field]: value,
    //     };
    //     setLocalMilestone(newMileStone);
    //     onChange(newMileStone); 
    // };

    // Use useEffect to trigger onChange callback when localMilestone updates
    // useEffect(() => {
    //      // Return updated milestone object
    // }, [localMilestone]);

    return (
        <div className="w-full md:m-8">
            <div className="my-8">
                <div className="text-lg flex justify-between items-center">
                    <span>Milestone {index + 1}</span>
                    <div onClick={onRemove} className="btn btn-sm btn-circle btn-ghost">
                        <FaX />
                    </div>
                </div>
                <div>
                    <div className="rounded-md bg-slate-800 text-lg border p-2 flex items-center m-2">
                        <input
                            type="text"
                            className="w-full bg-inherit outline-none"
                            id="description"
                            placeholder="Enter milestone description"
                            value={milestone.description}
                            onChange={(e) => onDescriptionChange(e.target.value)} />
                    </div>
                    <div className="rounded-md bg-slate-800 text-lg border p-2 flex items-center m-2">
                        <input
                            type="number"
                            className="w-full bg-inherit outline-none"
                            id="amount"
                            placeholder="Amount"
                            step="any"
                            value={milestone.amount}
                            onChange={(e) => onAmountChange(parseFloat(e.target.value))} />
                        {selectedGoalCurrency}
                    </div>
                </div>
                <hr className="mt-8"/>
            </div>

            {/* <div className="flex justify-between"> */}
                {/* <div>
                    <input
                        type="date"
                        className="rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2 grow bg-inherit outline-none"
                        id="duedate"
                        value={milestone.date}
                        onChange={(e) => onDateChange( e.target.value)}
                    />
                </div> */}

                
        </div>
    );
}
