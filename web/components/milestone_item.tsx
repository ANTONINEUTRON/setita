import { Milestone } from "@/src/types/milestone";
import { useEffect, useState } from "react";

interface MilestoneItemProps {
    onChange: (milestone: Milestone) => void;  // Callback function prop
    index: number;
    milestone: Milestone;
    onRemove: () => void;
}

export default function MilestoneItem({ onChange, index, onRemove, milestone }: MilestoneItemProps) {
    const [localMilestone, setLocalMilestone] = useState<Milestone>(milestone);

    // Handle changes in individual fields of the milestone object
    const handleChange = (field: keyof Milestone, value: string | number) => {
        setLocalMilestone((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Use useEffect to trigger onChange callback when localMilestone updates
    useEffect(() => {
        onChange(localMilestone);  // Return updated milestone object
    }, [localMilestone]);

    return (
        <div className="milestone-container">
            <div className="">
                <div className="mt-8">
                    <div className="text-lg flex justify-between items-center">
                        <span>Milestone {index + 1}</span>
                        <div onClick={onRemove} className="btn btn-sm btn-circle btn-ghost">X</div>
                    </div>
                    <div className="rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2">
                        <input
                            type="text"
                            className="grow bg-inherit outline-none"
                            id="description"
                            placeholder="Enter milestone description"
                            value={localMilestone.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <div>
                    <input
                        type="date"
                        className="rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2 grow bg-inherit outline-none"
                        id="duedate"
                        value={localMilestone.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        className="rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2 grow bg-inherit outline-none"
                        id="amount"
                        placeholder="Amount"
                        min="0"
                        step="0.01"
                        value={localMilestone.amount === 0 ? "" : localMilestone.amount}
                        onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}
