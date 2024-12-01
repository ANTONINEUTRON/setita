import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function SearchFilterComponent(){
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className={"relative flex items-center space-x-4 p-4 rounded-md "}>
            {/* Filter Icon */}
            {!showSearch && (<div className="relative">
                <button
                    className="btn btn-circle btn-outline"
                    onClick={() => setShowFilter(!showFilter)}>
                    <FaFilter />
                </button>
                {showFilter && (
                    <ul className="absolute left-0 bg-secondary text-white  mt-2 p-2 shadow-md rounded-box z-50 menu menu-compact">
                        <li>
                            <a onClick={() => alert("Community selected")}>Community</a>
                        </li>
                        <li>
                            <a onClick={() => alert("Environmental selected")}>
                                Environmental
                            </a>
                        </li>
                        <li>
                            <a onClick={() => alert("Health selected")}>Health</a>
                        </li>
                    </ul>
                )}
            </div>)}

            {/* Search Icon */}
            <div className="relative">
                {!showSearch && (
                    <button
                        className="btn btn-circle btn-outline"
                        onClick={() => setShowSearch(!showSearch)}>
                        <FaSearch />
                    </button>)}
                {showSearch && (
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="md:w-96 input input-bordered" />

                        <button onClick={() => setShowSearch(!showSearch)} className="btn hover:bg-primary ml-8">
                            <MdClose />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
