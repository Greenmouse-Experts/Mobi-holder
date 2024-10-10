import { useState } from 'react';

const DropdownMenu = ({ buttonLabel, children, btnClass, color }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button to trigger the dropdown */}
            <button
                onClick={toggleDropdown}
                className={btnClass}
            >
                <span className='flex'>{buttonLabel}</span>
                <span className='flex flex-col h-full justify-center'>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.617188L5 9.61719L10 0.617188H0Z" fill={color} />
                    </svg>

                </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;