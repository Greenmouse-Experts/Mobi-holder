import { useEffect, useState, forwardRef } from "react";
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
    disablePastDates,
    minDate,
    register,
    rules,
    errors,
    watch,
    setValue,
    options = [],
    value = "",
    onChange,
    ...props
}) {
    const [inputValue, setInputValue] = useState(value);
    const [passwordOpen, setPasswordOpen] = useState(false);

    // Properly integrate with react-hook-form
    const { ref, onChange: registerOnChange, ...registerProps } = register ? register(name, rules) : { ref: null, onChange: () => { } };

    // Sync with external value changes
    useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    // Handle all input changes consistently
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (setValue) {
            setValue(name, newValue, { shouldValidate: true });
        }
        if (registerOnChange) {
            registerOnChange(e); // Trigger react-hook-form's onChange
        }
        if (onChange) {
            onChange(newValue); // Trigger custom onChange if provided
        }
    };

    const handleDateChange = (date) => {
        let dateValue;

        if (date) {
            if (type === "datetime") {
                // For datetime, use full ISO string
                dateValue = date.toISOString();
            } else {
                // For date-only, create clean YYYY-MM-DD string
                const localDate = new Date(date);
                localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
                dateValue = localDate.toISOString().split('T')[0];
            }
        } else {
            dateValue = ""; // Use empty string instead of null for better form handling
        }

        setInputValue(dateValue);

        // Update react-hook-form state
        if (setValue) {
            setValue(name, dateValue, { shouldValidate: true });
        }

        // Trigger react-hook-form's onChange
        if (registerOnChange) {
            const event = {
                target: {
                    name,
                    value: dateValue,
                    type: "text" // Some validators need this
                }
            };
            registerOnChange(event);
        }

        // Trigger custom onChange
        if (onChange) onChange(dateValue);
    };


    return (
        <>
            <div className="flex items-center border border-transparent bGmobiGrayDark px-3 py-1.5 rounded-[7px]" style={style}>
                {icon && <img src={`/${icon}`} alt="icon" />}

                {(type === "date" || type === "datetime") ? (
                    <DatePicker
                        selected={inputValue ? new Date(inputValue) : null}
                        onChange={handleDateChange}
                        showTimeSelect={type === "datetime"}
                        dateFormat={type === "datetime" ? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy"}
                        minDate={
                            disablePastDates ? new Date() :
                                minDate ? new Date(minDate) :
                                    null
                        }
                        maxDate={disableFutureDates ? new Date() : null}
                        placeholderText={placeholder}
                        customInput={
                            <CustomDateInput
                                placeholder={placeholder}
                                onClick={(e) => e.preventDefault()}
                                ref={ref}
                            />
                        }
                        disabled={disabled}
                        wrapperClassName="w-full montserrat"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        {...props}
                    />
                ) : type === "select" ? (
                    <select
                        className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:border-0 disabled:cursor-auto transition-all text-base px-3 py-3 rounded-[7px]"
                        value={inputValue}
                        onChange={handleChange}
                        disabled={disabled}
                        ref={ref}
                        {...registerProps}
                        {...props}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
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
                        value={inputValue}
                        onChange={handleChange}
                        ref={ref}
                        {...registerProps}
                        disabled={disabled}
                        {...props}
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