import React, { useState, useEffect, useRef } from "react";

const SelectField = ({ options, selectedOption, label, errors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');
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
        selectedOption(data);
    };

    return (
        <>
            <div ref={dropdownRef} className="relative w-full px-6 py-4.5 rounded-[7px] border border-transparent bGmobiGrayDark">
                {/* Trigger Button */}
                <a
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full text-mobiFormGray h-full text-sm py-4 font-medium rounded-md focus:outline-none cursor-pointer"
                >
                    <p className="w-full flex-grow">
                        {selected}
                    </p>
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
                        <div className="py-2 flex flex-col gap-3">
                            {/* Options */}
                            {options.map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer"
                                    onClick={() => handleOptionClick(option.name)}
                                >
                                    <div className="flex items-center">
                                        <span className="ml-2">{option.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {errors ? (
                <p style={{ color: 'red' }} className="-mt-2">{label ? label : 'This field'} is required</p>
            ) : null}
        </>
    );
};

export default SelectField;
