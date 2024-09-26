import { Radio } from "antd";

interface VerifyProps {
    onTermsAccepted: (accepted: boolean) => void; // Callback for terms acceptance
}

export default function Verify({ onTermsAccepted }: VerifyProps) {
    const handleTermsChange = (e: any) => {
        onTermsAccepted(e.target.value === "accept"); // Trigger callback with true if accepted, false otherwise
    };

    return (
        <div className="p-4 my-8">
            <div className="my-2 text-xl font-bold">
                Verify Your Campaign Details
            </div>
            <div className="border rounded-lg p-4">
                <div className="my-4">
                    <div className="text-lg">Title of the campaign</div>
                </div>
                <div className="my-4">
                    <div className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, asperiores odio. Similique autem consequatur animi magni, voluptas aperiam perferendis. Dicta excepturi pariatur quo ipsum error deleniti quas explicabo beatae minima?
                    </div>
                </div>
                <div className="my-4">
                    <div className="text-lg">Location</div>
                </div>
                <div className="my-4">
                    <div className="text-lg">Date</div>
                </div>
                <div className="my-4">
                    <div className="text-lg">Target Amount SOL</div>
                </div>
                <div className="my-4">
                    <div className="text-lg">Supported Tokens</div>
                </div>
                <div className="p-4 border border-dashed rounded-lg mt-8">
                    <div className="font-semibold text-md mb-4">MEDIA</div>
                    <div className="text-lg">Title of the campaign</div>
                </div>
            </div>

            <Radio.Group onChange={handleTermsChange} className="dark:text-white mt-10 flex flex-col">
                <Radio value="accept" className="dark:text-white">I accept the Terms and Conditions</Radio>
                <Radio value="decline" className="dark:text-white" checked>I do not accept the Terms and Conditions</Radio>
            </Radio.Group>
        </div>
    );
}

// import { Radio } from "antd";

// export default function Verify(){
//     return (
//         <div className="p-4 my-8">
//             <div className="my-2 text-xl font-bold">
//                 Verify Your Campaign Details
//             </div>
//             <div className="border rounded-lg p-4">
//                 <div className="my-4">
//                     <div className="text-lg ">Title of the campaign</div>
//                 </div>
//                 <div className="my-4">
//                     <div className="">
//                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, asperiores odio. Similique autem consequatur animi magni, voluptas aperiam perferendis. Dicta excepturi pariatur quo ipsum error deleniti quas explicabo beatae minima?
//                     </div>
//                 </div>
//                 <div className="my-4">
//                     <div className="text-lg ">Location</div>
//                 </div>
//                 <div className="my-4">
//                     <div className="text-lg ">Date</div>
//                 </div>
//                 <div className="my-4">
//                     <div className="text-lg ">Target Amount SOL</div>
//                 </div>
//                 <div className="my-4">
//                     <div className="text-lg ">Supported Tokens</div>
//                 </div>
//                 <div className="p-4 border border-dashed rounded-lg mt-8">
//                     <div className="font-semibold text-md mb-4">MEDIA</div>
//                     <div className="text-lg ">Title of the campaign</div>
//                 </div>
//             </div>

//             <Radio className="dark:text-white mt-10">I accept the Terms and Conditions</Radio>
//         </div>
//     )
// }