import FormItem from "../form_item";


export default function BasicInformation(){
    return (
        <div className="mt-8">
            {/* Sections go here */}
            <div>
                <FormItem
                    title={"Title"}
                    subLabel={""}
                >
                    <input type="text"
                        className="grow bg-inherit outline-none"
                        placeholder="Keep the title short and memorable" />

                </FormItem>
            </div>
            <div>
                <FormItem
                    className="grow"
                    title={"Description"}
                    subLabel={"Describe your campaign's purpose, goals, and why it matters."}
                >
                    <textarea
                        className="grow bg-inherit outline-none resize-none min-h-96"
                        placeholder="Description goes here...">
                    </textarea>
                </FormItem>
            </div>
            <div>
                <FormItem
                    title={"Location"}
                    subLabel={"This could be the geographical focus or the location of the organizers"}
                >
                    <input type="text"
                        className="grow bg-inherit outline-none"
                        placeholder="Location goes here..." />

                </FormItem>
            </div>
        </div>
    )
}