import React, { useState, useEffect, useRef } from "react";

const MultipleSelect = ({accessType, selectedData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedData ? selectedData : 'Choose Access Type');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (data) => {
        setIsOpen(false); // Close dropdown when an option is clicked
        setSelected(data);
        accessType(data);
    };

    return (
        <div ref={dropdownRef} className="relative w-full px-6 py-4.5 rounded-[7px] w-64 border border-transparent bGmobiGrayDark">
            {/* Trigger Button */}
            <a
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-mobiFormGray h-full text-sm py-4 font-medium rounded-md focus:outline-none cursor-pointer"
            >
                {selected}
                <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
            </a>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 mt-2 left-0 w-full bg-gray-800 border border-gray-700 bGmobiGrayDark rounded-md shadow-lg">
                    <div className="py-2">
                        {/* Option 1 */}
                        <label
                            className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer"
                            onClick={() => handleOptionClick('Open')}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    defaultChecked={selected === 'Open'}
                                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-600 focus:ring-offset-gray-800"
                                />
                                <span className="ml-2">Opened</span>
                            </div>
                        </label>

                        {/* Option 2 */}
                        <label
                            className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer"
                            onClick={() => handleOptionClick('Semi-Open')}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    defaultChecked={selected === 'Semi-Closed'}
                                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-600 focus:ring-offset-gray-800"
                                />
                                <span className="ml-2">Semi Open</span>
                            </div>
                        </label>

                        {/* Option 3 */}
                        <label
                            className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer"
                            onClick={() => handleOptionClick('Closed')}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    defaultChecked={selected === 'Closed'}
                                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-600 focus:ring-offset-gray-800"
                                />
                                <span className="ml-2">Closed</span>
                            </div>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultipleSelect;
