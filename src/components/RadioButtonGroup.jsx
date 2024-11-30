import React, { useState } from 'react';

const RadioButtonGroup = ({ options, selectedOption }) => {
    const [selected, setSelected] = useState(selectedOption);

    return (
        <>
            <div className="flex flex-col sm:flex-row w-full items-center sm:space-x-2 space-y-2 sm:space-y-0">
                {options.map((option, index) => (
                    <div className="flex w-full flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0" key={index}>
                        <label
                            className={`cursor-pointer flex justify-between items-center px-6 py-3 w-full bGmobiGrayDark rounded-lg border transition ${selectedOption === option.slug
                                ? 'text-white border-purple-700'
                                : ''
                                }`}
                            onClick={() => setSelected(option.slug)}
                        >
                            {option.name}

                            <label
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div
                                    className={`relative w-6 h-6 flex items-center justify-center rounded-full border-2 transition ${selectedOption === option.slug ? 'border-[rgba(163,36,242,1)]' : 'border-gray-400'
                                        }`}
                                >
                                    {selectedOption === option.slug && (
                                        <div className="w-4 h-4 rounded-full bg-purple-700" />
                                    )}
                                </div>
                                <input
                                    type="radio"
                                    name="custom-radio"
                                    value="Free"
                                    className="hidden"
                                    checked={selectedOption === option.slug}
                                    onChange={() => setSelected(option.slug)}
                                />
                            </label>

                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RadioButtonGroup;
