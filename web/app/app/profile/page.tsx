import ProfileSections from "@/components/profile_sections/profile_sections";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";

export default function ProfilePage(){
    return (
        <div className="pt-8">
            <div className="text-xl pl-14 my-4">
                Account
            </div>
            <div className = "container bg-slate-500 dark:bg-slate-800 shadow-lg w-w-11/12  mt-18 rounded-lg border mx-auto">
                <div className="flex justify-between">
                    <div className="flex my-4">
                        <div>
                            <FaUserCircle size={100} className="w-44 text-secondary" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div>Username</div>
                            <div>wallet address</div>
                            <div>email</div>
                        </div>
                    </div>
                    <div>
                        <button className="bg-secondary m-4 px-4 text-white py-2 rounded-lg">
                            Share
                        </button>
                        <button className="bg-secondary m-4 px-4 text-white py-2 rounded-lg">
                            Edit
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="py-4 px-8 mr-2">
                    Bio of the campaign creator
                </div>
            </div>
            <div className="container mx-auto my-8">
                <ProfileSections />
            </div>
        </div>
    )
}
