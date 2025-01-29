import React, { useState } from "react";

export default function Input({
    icon,
    type,
    style,
    placeholder,
    name,
    disabled,
    disableFutureDates,
    value,
    options = [], // For select input
    register,
    rules,
    errors,
    onChange
}) {
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <>
            <div className="flex items-center border border-transparent bGmobiGrayDark px-3 py-1.5 rounded-[7px]" style={style}>
                {icon && <img src={`/${icon}`} alt="icon" />}

                {type === "select" ? (
                    <select
                        className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all text-base px-3 py-3 rounded-[7px]"
                        {...register(name, rules)}
                        value={inputValue}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        <option value="" disabled>{placeholder}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type === "password" ? (passwordOpen ? "text" : type) : type}
                        max={disableFutureDates ? new Date().toISOString().split("T")[0] : null}
                        placeholder={placeholder}
                        className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px]"
                        style={{ borderColor: "transparent", border: "0px !important" }}
                        {...register(name, rules)}
                        value={value}
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={disabled}
                    />
                )}

                {type === "password" && (
                    <img
                        src={passwordOpen ? "/eyeOpen.svg" : "/eyeClosed.svg"}
                        className="cursor-pointer"
                        alt="toggle visibility"
                        onClick={() => setPasswordOpen(!passwordOpen)}
                    />
                )}
            </div>
            {errors?.[name] && <p style={{ color: "red" }} className="-mt-2">{errors[name]?.message}</p>}
        </>
    );
}
