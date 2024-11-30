import React, { useState } from "react";

export default function TextArea({ style, placeholder, name, disabled, value, register, rules, errors }) {
    const [inputValue, setInputValue] = useState(value || "");
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <div className="flex items-center border border-transparent bGmobiGrayDark px-3 py-1.5 rounded-[7px]" style={style}>
                <textarea
                    placeholder={`${placeholder}`}
                    className="peer w-full h-[150px] bg-transparent font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px]"
                    style={{ borderColor: 'transparent', border: '0px !important' }}
                    {...register(name, rules)}
                    value={inputValue}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={disabled}
                />
            </div>
            {errors ? (
                <p style={{ color: 'red' }} className="-mt-2">{errors[name]?.message}</p>
            ) : null}
        </>
    );
}
