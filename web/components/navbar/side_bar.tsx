import { FaDonate, FaEdit, FaFileAlt, FaFlagCheckered, FaInfo, FaInfoCircle } from 'react-icons/fa';
import { MdAdd, MdAddCircle } from 'react-icons/md';
import ExtendedButton from '../buttons/extended_button';

interface SidebarProps{
    onNavSelect: (index: number)=>void,
    indexToShow: number,
    showSidebar?: boolean,
    isPublicView?: boolean,
}

export default function Sidebar({onNavSelect, indexToShow, showSidebar, isPublicView}:SidebarProps) {
    const sideBarItemStyle = "md:p-4 hover:opacity-70 hover:bg-purple cursor-pointer flex text-lg justify-between border rounded-lg mt-4 md:mx-4 ";

    return (
        <div className={`lg:fixed lg:top-14 bg-primary min-h-screen shadow-lg lg:flex text-white transition-all duration-300 flex-col ${showSidebar ?"" :"hidden"}`}>
            {/* Sidebar Content */}
            <div className="flex-grow w-60 ">
                <ul className="pt-4">
                    {
                        isPublicView == true ? (
                            <div>
                            <li 
                                onClick={() => (document.getElementById('donate_modal') as any).showModal()}
                                className={"md:p-4 hover:opacity-70 hover:bg-purple cursor-pointer flex text-lg justify-between border my-10 md:mx-4  bg-secondary rounded-3xl"}>
                                <div>DONATE</div>
                                <MdAddCircle className='text-2xl' />
                            </li>
                            </div>
                            
                        ):(
                            <div className='mb-10'></div>
                        )
                    }

                    <li onClick={() => onNavSelect(0)} className={sideBarItemStyle + (indexToShow == 0 && " bg-purple-800")}>
                        <div>Details</div>
                        <FaInfoCircle />
                    </li>
                    <li onClick={() => onNavSelect(1)} className={sideBarItemStyle + (indexToShow == 1 && " bg-purple-800")}>
                        <div>Contributions</div>
                        <FaDonate />
                    </li>
                    <li onClick={() => onNavSelect(2)} className={sideBarItemStyle + (indexToShow == 2 && " bg-purple-800")}>
                        <span>Milestones</span>
                        <FaFlagCheckered />
                    </li>
                    <li onClick={() => onNavSelect(3)} className={sideBarItemStyle + (indexToShow == 3 && " bg-purple-800")}>
                        <span>Proposals</span>
                        <FaFileAlt />
                    </li>
                    <li onClick={() => onNavSelect(4)} className={sideBarItemStyle + (indexToShow == 4 && " bg-purple-800")}>
                        <span>Updates</span>
                        <FaEdit />
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}