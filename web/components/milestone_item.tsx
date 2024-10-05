import { Milestone } from "@/src/types/milestone";
import { useEffect, useState } from "react";
import FormItem from "./form_item";

interface MilestoneItemProps {
    onChange: (milestone: Milestone) => void;  // Callback function prop
    index: number;
}

export default function MilestoneItem({ onChange, index }: MilestoneItemProps) {
    const [milestone, setMilestone] = useState<Milestone>({
        index: 0,
        description: "",
        date: "",
        amount: 0,
    });

    // Update state on input changes
    const handleChange = (field: keyof Milestone, value: string | number) => {
        setMilestone((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Call the onChange callback whenever the milestone state changes
    useEffect(() => {
        onChange(milestone);
    }, [milestone, onChange]);

    return (
        <div className="milestone-container">
            <div className="">
                <div className="mt-8">
                    <div className="text-lg">
                        Milestone {index + 1}
                    </div>
                    <div className={"rounded-md bg-slate-800 text-lg border p-2 flex items-center gap-2 m-2 "}>
                        <input
                            type="text"
                            className="grow bg-inherit outline-none"
                            id="description"
                            placeholder="Enter milestone description"
                            value={milestone.description}
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
                        value={milestone.date}
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
                        value={milestone.amount < 1 ? undefined : milestone.amount}
                        onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}