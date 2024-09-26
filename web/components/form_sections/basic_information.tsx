import { useState } from "react";
import FormItem from "../form_item";

interface BasicInformationProps {
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onLocationChange: (location: string) => void;
}

export default function BasicInformation({
    onTitleChange,
    onDescriptionChange,
    onLocationChange,
}: BasicInformationProps) {
    // Local state to store values before passing them to the parent component
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");

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
        </div>
    );
}


// import FormItem from "../form_item";


// export default function BasicInformation(){
//     return (
//         <div className="mt-8">
//             {/* Sections go here */}
//             <div>
//                 <FormItem
//                     title={"Title"}
//                     subLabel={"Keep the title short and memorable"}>
//                     <input type="text"
//                         className="grow bg-inherit outline-none"
//                         placeholder="Title hoes here..." />
//                 </FormItem>
//             </div>
//             <div>
//                 <FormItem
//                     className="grow"
//                     title={"Description"}
//                     subLabel={"Describe your campaign's purpose, goals, and why it matters."}>
//                     <textarea
//                         className="grow bg-inherit outline-none resize-none min-h-96"
//                         placeholder="Description goes here...">
//                     </textarea>
//                 </FormItem>
//             </div>
//             <div>
//                 <FormItem
//                     title={"Location"}
//                     subLabel={"This could be the geographical focus or the location of the organizers"}>
//                     <input type="text"
//                         className="grow bg-inherit outline-none"
//                         placeholder="Location goes here..." />

//                 </FormItem>
//             </div>
//         </div>
//     )
// }