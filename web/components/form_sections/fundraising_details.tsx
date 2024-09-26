import { Checkbox, DatePicker, InputNumber } from "antd";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import FormItem from "../form_item";
const { RangePicker } = DatePicker;

interface FundraisingDetailsProps {
    onSupportedCurrencyChange: (currencies: string[]) => void;
    onGoalChange: (goal: number) => void;
    onDurationChange: (dates: [any, any]) => void;
}

export default function FundraisingDetails({
    onSupportedCurrencyChange,
    onGoalChange,
    onDurationChange,
}: FundraisingDetailsProps) {
    const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
    const [goal, setGoal] = useState<number>(0);
    const [duration, setDuration] = useState<[any, any] | null>(null);

    // Handlers for updates
    const handleCurrencyChange = (currency: string) => {
        let newCurrencies = [...supportedCurrencies];
        if (newCurrencies.includes(currency)) {
            newCurrencies = newCurrencies.filter((c) => c !== currency);
        } else {
            newCurrencies.push(currency);
        }
        setSupportedCurrencies(newCurrencies);
        onSupportedCurrencyChange(newCurrencies); // Trigger callback
    };

    const handleGoalChange = (value: number) => {
        setGoal(value);
        onGoalChange(value); // Trigger callback
    };

    const handleDurationChange = (dates: any) => {
        setDuration(dates);
        onDurationChange(dates); // Trigger callback
    };

    return (
        <div>
            {/* Supported Currency Section */}
            <FormItem
                title={"Supported Currency"}
                subLabel={"Select which tokens you will accept for donations"}
                className="text-white"
            >
                <Checkbox
                    className="text-white"
                    checked={supportedCurrencies.includes("All")}
                    onChange={() => handleCurrencyChange("All")}
                >
                    All
                </Checkbox>
                <Checkbox
                    className="text-white"
                    checked={supportedCurrencies.includes("USDC")}
                    onChange={() => handleCurrencyChange("USDC")}
                >
                    USDC
                </Checkbox>
                <Checkbox
                    className="text-white"
                    checked={supportedCurrencies.includes("USDT")}
                    onChange={() => handleCurrencyChange("USDT")}
                >
                    USDT
                </Checkbox>
                <Checkbox
                    className="text-white"
                    checked={supportedCurrencies.includes("SOL")}
                    onChange={() => handleCurrencyChange("SOL")}
                >
                    SOL
                </Checkbox>
                <Checkbox
                    className="text-white"
                    checked={supportedCurrencies.includes("SEND")}
                    onChange={() => handleCurrencyChange("SEND")}
                >
                    SEND
                </Checkbox>
            </FormItem>

            {/* Goal Section */}
            <FormItem title={"Goal"} subLabel={"Set the total amount you aim to raise"}>
                <input
                    type="number"
                    className="grow bg-inherit outline-none"
                    placeholder="0.00"
                    value={goal}
                    onChange={(e) => handleGoalChange(Number(e.target.value))}
                />
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">
                        Currency <MdArrowDropDown />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow"
                    >
                        <li>SOL</li>
                        <li>USDC</li>
                    </ul>
                </div>
            </FormItem>

            {/* Duration Section */}
            <FormItem
                title={"Duration"}
                subLabel={"Pick the start and end date for your campaign"}
            >
                <RangePicker
                    style={{ background: "white" }}
                    onChange={handleDurationChange}
                />
            </FormItem>
        </div>
    );
}


// import { Checkbox, DatePicker, InputNumber, Select,  } from "antd";
// import { MdArrowDownward, MdArrowDropDown } from "react-icons/md";
// import FormItem from "../form_item"; 
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// export default function FundraisingDetails(){
    

//     return (
//         <div>
//             <FormItem
            
//                 title={"Supported Currency"}
//                 subLabel={"Select which tokens you will accept for donations"}
//                 className="text-white">
//                 <Checkbox className="text-white" defaultChecked> All</Checkbox >
//                 <Checkbox className="text-white"> USDC</Checkbox >
//                 <Checkbox className="text-white"> USDT</Checkbox >
//                 <Checkbox className="text-white"> SOL</Checkbox >
//                 <Checkbox className="text-white"> SEND</Checkbox >
//             </FormItem>
//             <FormItem
//                 title={"Goal"}
//                 subLabel={"Set the total amount you aim to raise"}>
//                 <input type="number"
//                     className="grow bg-inherit outline-none"
//                     placeholder="0.00" />
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn">Currency <MdArrowDropDown/></div>
//                     <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
//                         <li>SOL</li>
//                         <li>USDC</li>
//                     </ul>
//                 </div>
//             </FormItem>

//             <FormItem
//                 title={"Duration"}
//                 subLabel={"Pick the start and end date for your campaign"}>
//                 <RangePicker style={{"background": "white"}}/>

//             </FormItem>

//         </div>
//     )
// }