import { useState, useEffect } from "react";
import FormItem from "../form_item";
import { CampaignGoal } from "@/libs/types/campaign_goal";
import { SupportCurrency, supportedCurrencies as availableCurrencies } from "@/libs/types/supported_currencies";
import { Category } from "@/libs/types/category";
import { MdArrowDropDown } from "react-icons/md";

interface BasicInformationProps {
    category: string;
    goal: CampaignGoal;
    supportedCurrencies: string[];
    title: string; // The current title from formData
    description: string; // The current description from formData
    location: string; // The current location from formData
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onLocationChange: (location: string) => void;
    onSupportedCurrencyChange: (currencies: string[]) => void;
    onGoalChange: (goal: CampaignGoal) => void;
    onCategoryChange: (category: string) => void;
}

export default function BasicInformation({
    title: initialTitle, // Renamed to initialTitle to differentiate from the local state
    description: initialDescription, // Renamed to initialDescription
    location: initialLocation, // Renamed to initialLocation
    category,
    goal,
    supportedCurrencies,
    onTitleChange,
    onDescriptionChange,
    onLocationChange,
    onSupportedCurrencyChange,
    onGoalChange,
    onCategoryChange,
}: BasicInformationProps) {
    // Local state to store values before passing them to the parent component
    const [title, setTitle] = useState<string>(initialTitle);
    const [description, setDescription] = useState<string>(initialDescription);
    const [location, setLocation] = useState<string>(initialLocation);
    const [localSupportedCurrencies, setLocalSupportedCurrencies] = useState<string[]>(supportedCurrencies);
    const [localGoal, setLocalGoal] = useState<CampaignGoal>(goal);
    const [localCategory, setLocalCategory] = useState<string>(category);

    // Update local state when the parent changes the values
    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    useEffect(() => {
        setDescription(initialDescription);
    }, [initialDescription]);

    useEffect(() => {
        setLocation(initialLocation);
    }, [initialLocation]);

    // Sync props with local state when they change
    useEffect(() => {
        setLocalSupportedCurrencies(supportedCurrencies);
        setLocalGoal(goal);
        setLocalCategory(category);
    }, [supportedCurrencies, goal, category]);


    // Handlers for input changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onTitleChange(newTitle); // Pass the updated title to the parent
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        onDescriptionChange(newDescription); // Pass the updated description to the parent
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        onLocationChange(newLocation); // Pass the updated location to the parent
    };
    
    const handleCurrencyChange = (currency: string | "All") => {
        // new supported currencies will be held here
        let newCurrencies = [...localSupportedCurrencies];

        // Determine supported currencies list
        if (currency === "All") {
            if (newCurrencies.length === availableCurrencies.length) {
                newCurrencies = [availableCurrencies.find((curr) => curr.name === "USDC")!.name]; // Ensure USDC is always selected
            } else {
                newCurrencies = [...(availableCurrencies.map((sCur) => sCur.name))]; // Select all
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
                newCurrencies = [...(availableCurrencies.map((sCur) => sCur.name))]; // Select all
            }
        }

        setLocalSupportedCurrencies(newCurrencies);
        onSupportedCurrencyChange(newCurrencies); // Trigger callback to parent component

        //Check if the goal currency is contained in new supported currency
        // If it is not there set the first currency as goal currency
        if(!newCurrencies.includes(localGoal.currency)){
            handleGoalChangeCurrency(newCurrencies[0])
        }
    };

    const handleGoalChangeAmount = (amount: number) => {
        const newGoal = { ...localGoal, amount };
        setLocalGoal(newGoal);
        onGoalChange(newGoal);
    };

    const handleGoalChangeCurrency = (currency: string) => {
        const newGoal: CampaignGoal = { ...localGoal, currency: currency };
        setLocalGoal(newGoal);
        onGoalChange(newGoal);
    };

    const handleCategoryChange = (value: string) => {
        setLocalCategory(value);
        onCategoryChange(value);
    };

    return (
        <div className="mt-8">
            {/* Title Section */}
            <div>
                <FormItem title={"Title"} subLabel={"Keep the title short and memorable"}>
                    <input
                        type="text"
                        className="grow bg-inherit outline-none"
                        placeholder="Title goes here..."
                        value={title}
                        onChange={handleTitleChange} // Update title
                    />
                </FormItem>
            </div>

            {/* Description Section */}
            <div>
                <FormItem
                    className="grow"
                    title={"Description"}
                    subLabel={"Describe your campaign's purpose, goals, and why it matters."}
                >
                    <textarea
                        className="grow bg-inherit outline-none resize-none min-h-96"
                        placeholder="Description goes here..."
                        value={description}
                        onChange={handleDescriptionChange} // Update description
                    />
                </FormItem>
            </div>

            {/* Location Section */}
            <div>
                <FormItem
                    title={"Location"}
                    subLabel={"This could be the geographical focus or the location of the organizers."}
                >
                    <input
                        type="text"
                        className="grow bg-inherit outline-none"
                        placeholder="Location goes here..."
                        value={location}
                        onChange={handleLocationChange} // Update location
                    />
                </FormItem>
            </div>

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
                subLabel={"Select which tokens you will accept for donations"}>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" 
                            onChange={() => handleCurrencyChange("All")} 
                            checked={localSupportedCurrencies.length === availableCurrencies.length} 
                            className="checkbox" />
                        <span className="label-text pl-2">All</span>
                    </label>
                </div>
                {/* <input
                    checked={localSupportedCurrencies.length === availableCurrencies.length}
                    onChange={() => handleCurrencyChange("All")}>
                    <span className="dark:text-white">All</span>
                </input> */}

                {availableCurrencies.map((currency) => (
                    // <div className="form-control">
                    <label key={currency.address} className="label cursor-pointer">
                        <input type="checkbox"
                            key={currency.address} 
                            onChange={() => handleCurrencyChange(currency.name)} 
                            checked={localSupportedCurrencies.some((curr) => curr === currency.name)}
                            className="checkbox" />
                        <span className="label-text pl-2">{currency.name}</span>
                    </label>
                    // </div> 
                    // <input
                    //     key={currency.address}
                    //     checked={localSupportedCurrencies.some((curr) => curr === currency.name)}
                    //     onChange={() => handleCurrencyChange(currency.name)}>
                    //     <span className="dark:text-white">{currency.name}</span>
                    // </input>
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
                        {supportedCurrencies.map((currency,index) => (
                            <li key={index} className="p-4" onClick={() => handleGoalChangeCurrency(currency)}>
                                {currency}
                            </li>
                        ))}
                    </ul>
                </div>
            </FormItem>

        </div>
    );
}
