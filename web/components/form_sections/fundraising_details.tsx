import { Checkbox, DatePicker } from "antd";
import { MdArrowDropDown } from "react-icons/md";
import { useState, useEffect } from "react";
import FormItem from "../form_item";
import { Category } from "@/src/types/category";
import { SupportCurrency, supportedCurrencies as availableCurrencies } from "@/src/types/supported_currencies";
import { CampaignGoal } from "@/src/types/campaign_goal";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

interface FundraisingDetailsProps {
    category: string;
    duration: string[] | null;
    goal: CampaignGoal;
    supportedCurrencies: string[];
    onSupportedCurrencyChange: (currencies: string[]) => void;
    onGoalChange: (goal: CampaignGoal) => void;
    onDurationChange: (dates: [string, string]) => void;
    onCategoryChange: (category: string) => void;
}

export default function FundraisingDetails({
    category,
    duration,
    goal,
    supportedCurrencies,
    onSupportedCurrencyChange,
    onGoalChange,
    onDurationChange,
    onCategoryChange,
}: FundraisingDetailsProps) {
    const [localSupportedCurrencies, setLocalSupportedCurrencies] = useState<string[]>(supportedCurrencies);
    const [localGoal, setLocalGoal] = useState<CampaignGoal>(goal);
    const [localDuration, setLocalDuration] = useState<[any, any] | null>(duration ? [dayjs(duration[0]),dayjs(duration[1])] : null);
    const [localCategory, setLocalCategory] = useState<string>(category);

    // Sync props with local state when they change
    useEffect(() => {
        setLocalSupportedCurrencies(supportedCurrencies);
        setLocalGoal(goal);
        setLocalDuration(duration ? [dayjs(duration[0]), dayjs(duration[1])] : null);
        setLocalCategory(category);
    }, [supportedCurrencies, goal, duration, category]);

    const handleCurrencyChange = (currency: string | "All") => {
        let newCurrencies = [...localSupportedCurrencies];

        if (currency === "All") {
            if (newCurrencies.length === availableCurrencies.length) {
                newCurrencies = [availableCurrencies.find((curr) => curr.name === "USDC")!.name]; // Ensure USDC is always selected
            } else {
                newCurrencies = [...(availableCurrencies.map((sCur)=>sCur.name))]; // Select all
            }
        } else {
            if (newCurrencies.find((curr) => curr === currency)) {
                newCurrencies = newCurrencies.filter((curr) => curr !== currency);
            } else {
                newCurrencies.push(currency);
            }

            if (newCurrencies.length === 0) {
                newCurrencies = [availableCurrencies.find((curr) => curr.name === "USDC")!.name];
            }

            if (newCurrencies.length === availableCurrencies.length) {
                newCurrencies = [...(availableCurrencies.map((sCur)=>sCur.name))]; // Select all
            }
        }

        setLocalSupportedCurrencies(newCurrencies);
        onSupportedCurrencyChange(newCurrencies); // Trigger callback
    };

    const handleGoalChangeAmount = (amount: number) => {
        const newGoal = { ...localGoal, amount };
        setLocalGoal(newGoal);
        onGoalChange(newGoal);
    };

    const handleGoalChangeCurrency = (currency: SupportCurrency) => {
        const newGoal: CampaignGoal = { ...localGoal, currency: currency.name };
        setLocalGoal(newGoal);
        onGoalChange(newGoal);
    };

    const handleDurationChange = (dates: any) => {
        setLocalDuration(dates);
        
        onDurationChange([dates[0].valueOf(), dates[1].valueOf()]);
    };

    const handleCategoryChange = (value: string) => {
        setLocalCategory(value);
        onCategoryChange(value);
    };

    return (
        <div>
            {/* Category Section */}
            <FormItem
                title={"Category"}
                subLabel={"Select the category of your campaign"}
            >
                <select
                    className="bg-inherit w-full"
                    value={localCategory}
                    onChange={(event) => handleCategoryChange(event.target.value)}>
                    <option value={Category.education}>{Category.education}</option>
                    <option value={Category.health}>{Category.health}</option>
                    <option value={Category.environmental}>{Category.environmental}</option>
                    <option value={Category.community}>{Category.community}</option>
                    <option value={Category.others}>{Category.others}</option>
                </select>
            </FormItem>

            {/* Supported Currency Section */}
            <FormItem
                title={"Supported Currency"}
                subLabel={"Select which tokens you will accept for donations"}
                className="text-white">
                <Checkbox
                    className="text-white"
                    checked={localSupportedCurrencies.length === availableCurrencies.length}
                    onChange={() => handleCurrencyChange("All")}>
                    All
                </Checkbox>

                {availableCurrencies.map((currency) => (
                    <Checkbox
                        key={currency.address}
                        className="text-white"
                        checked={localSupportedCurrencies.some((curr) => curr === currency.name)}
                        onChange={() => handleCurrencyChange(currency.name)}>
                        {currency.name}
                    </Checkbox>
                ))}
            </FormItem>

            {/* Goal Section */}
            <FormItem title={"Goal"} subLabel={"Set the total amount you aim to raise"}>
                <input
                    type="number"
                    className="grow bg-inherit outline-none"
                    placeholder="0.00"
                    value={localGoal.amount < 1 ? undefined : localGoal.amount}
                    onChange={(e) => handleGoalChangeAmount(Number(e.target.value))} />

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">
                        {localGoal.currency ? (
                            <div>
                                {localGoal.currency}
                            </div>
                        ) : (
                            <div>
                                Currency
                            </div>
                        )}
                        <MdArrowDropDown />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 w-32 rounded-box z-[1] w-30 p-2 shadow">
                        {availableCurrencies.map((currency) => (
                            <li key={currency.address} className="p-4" onClick={() => handleGoalChangeCurrency(currency)}>
                                {currency.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </FormItem>

            {/* Duration Section */}
            <FormItem
                title={"Duration"}
                subLabel={"Pick the start and end date for your campaign"}
            >
                <RangePicker
                    style={{ background: "beige", width: '100%' }}
                    value={localDuration}
                    onChange={handleDurationChange}
                />
            </FormItem>
        </div>
    );
}
