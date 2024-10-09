import React, { useState } from 'react';

const RangeSlider = (props) => {
    const [value, setValue] = useState(props.value); // Initial value of the slider

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="w-full w-full mx-auto p-4">
            {/* Range Slider */}
            <input
                disabled
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleInputChange}
                className="
          w-full 
          h-[2px] 
          bg-gray-300 
          dark:bg-gray-700 
          appearance-none 
          rounded-lg
          cursor-pointer 
          accent-blue-500
          focus:outline-none
          focus:ring-2 
          focus:ring-blue-500 
          focus:ring-opacity-50
        "
                style={{
                    background: `linear-gradient(to right, #3b82f6 ${value}%, #d1d5db ${value}%)`, // Custom background
                }}
            />
        </div>
    );
};

export default RangeSlider;
