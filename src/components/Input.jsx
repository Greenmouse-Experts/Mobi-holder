import React, { useState } from "react";

export default function Input({ icon, type, style, placeholder, name, disabled, value, register, rules, errors }) {
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || ""); 
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <div className="flex items-center border border-transparent bGmobiGrayDark px-3 py-1.5 rounded-[7px]" style={style}>
                {icon ? (
                    <img src={`/${icon}`} alt="icon" />
                ) : null}

                <input
                    type={type === 'password' ? (passwordOpen ? 'text' : type) : type}
                    placeholder={`${placeholder}`}
                    className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px]"
                    style={{ borderColor: 'transparent', border: '0px !important' }}
                    {...register(name, rules)}
                    value={inputValue}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={disabled}
                />

                {type === 'password' ? (
                    <img
                        src={passwordOpen ? `/eyeOpen.svg` : `/eyeClosed.svg`}
                        className="cursor-pointer"
                        alt="toggle visibility"
                        onClick={() => setPasswordOpen(!passwordOpen)}
                    />
                ) : null}
            </div>
            {errors ? (
                <p style={{ color: 'red' }} className="-mt-2">{errors[name]?.message}</p>
            ) : null}
        </>
    );
}
