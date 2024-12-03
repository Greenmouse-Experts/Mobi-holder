import React, { useState } from 'react';

const RadioButtonGroup = ({ options, selectedOption, className }) => {
    const [selected, setSelected] = useState(selectedOption);

    return (
        <>
            <div className={`flex w-full items-center sm:space-x-2 space-y-2 sm:space-y-0 ${className ? className : 'flex-col sm:flex-row'}`}>
                {options.map((option, index) => (
                    <div className="flex w-full flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0" key={index}>
                        <label
                            className={`cursor-pointer flex justify-between items-center px-6 py-3 w-full bg-mobiRadioBg rounded-lg transition ${selectedOption === option.slug
                                ? 'text-white border border-purple-700'
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
