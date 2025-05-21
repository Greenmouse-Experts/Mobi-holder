import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";










const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <div
        onClick={onClick}
        ref={ref}
        className="peer w-full h-full bg-transparent font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all text-base px-3 py-3 rounded-[7px] cursor-pointer"
    >
        {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
));












export default function Input({
    icon,
    type,
    style,
    placeholder,
    name,
    disabled,
    disableFutureDates,
    register,
    rules,
    errors,
    watch, // Watch all form values
    setValue, // Set value manually
    options = [], // For select input
    value = "", // Default value if nothing is passed
    onChange,
    ...props
}) {
    const [inputValue, setInputValue] = useState(value); // Local state for input value
    const [passwordOpen, setPasswordOpen] = useState(false);

    // Update input value if "watch" is passed
    const watchAll = watch ? watch() : {}; // Ensure watch is optional
    const inputWatchValue = watchAll?.[name]; // Get the value for this specific input

    useEffect(() => {
        if (inputWatchValue !== undefined) {
            setInputValue(inputWatchValue); // Sync value with form state
        }
    }, [inputWatchValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (setValue) {
            setValue(name, newValue); // Update form state if setValue is passed
        } else {
            setInputValue(newValue); // Update local state if no setValue
        }
        if (onChange) onChange(newValue); // Trigger onChange if provided
    };

    return (
        <>
            <div className="flex items-center border border-transparent bGmobiGrayDark px-3 py-1.5 rounded-[7px]" style={style}>
                {icon && <img src={`/${icon}`} alt="icon" />}

                {(type === "date" || type === "datetime") ? (
                    <DatePicker
                        selected={inputValue ? new Date(inputValue) : null}
                        onChange={(date) => {
                            const isoDate = date.toISOString();
                            if (setValue) setValue(name, isoDate);
                            setInputValue(isoDate);
                            if (onChange) onChange(isoDate);
                        }}
                        showTimeSelect={type === "datetime"}
                        dateFormat={type === "datetime" ? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy"}
                        maxDate={disableFutureDates ? new Date() : null}
                        placeholderText={placeholder}
                        customInput={<CustomDateInput placeholder={placeholder} />}
                        disabled={disabled}
                        wrapperClassName="w-full montserrat"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />
                )
                    : type === "select" ? (
                        <select
                            className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all text-base px-3 py-3 rounded-[7px]"
                            {...register(name, rules)}
                            value={inputValue} // Controlled value for select input
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
                            type={type === "password" ? (passwordOpen ? "text" : "password") : type}
                            max={disableFutureDates ? new Date().toISOString().split("T")[0] : null}
                            placeholder={placeholder}
                            className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px]"
                            {...register(name, rules)}
                            value={inputValue} // Controlled value for the input field
                            onChange={handleChange}
                            autoComplete="off"
                            {...props} // Spread any additional props
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
