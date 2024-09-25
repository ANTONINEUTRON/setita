import { Checkbox, DatePicker, InputNumber, Select,  } from "antd";
import { MdArrowDownward, MdArrowDropDown } from "react-icons/md";
import FormItem from "../form_item"; 
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function FundraisingDetails(){
    

    return (
        <div>
            <FormItem
            
                title={"Supported Currency"}
                subLabel={"Select which tokens you will accept for donations"}
                className="text-white">
                <Checkbox className="text-white" defaultChecked> All</Checkbox >
                <Checkbox className="text-white"> USDC</Checkbox >
                <Checkbox className="text-white"> USDT</Checkbox >
                <Checkbox className="text-white"> SOL</Checkbox >
                <Checkbox className="text-white"> SEND</Checkbox >
            </FormItem>
            <FormItem
                title={"Goal"}
                subLabel={"Set the total amount you aim to raise"}>
                <input type="number"
                    className="grow bg-inherit outline-none"
                    placeholder="0.00" />
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">Currency <MdArrowDropDown/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
                        <li>SOL</li>
                        <li>USDC</li>
                    </ul>
                </div>
            </FormItem>

            <FormItem
                title={"Duration"}
                subLabel={"Pick the start and end date for your campaign"}>
                <RangePicker style={{"background": "white"}}/>

            </FormItem>

        </div>
    )
}