import { useEffect, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, placeholder, type, disabled }, ref) => (
  <div
    onClick={disabled ? undefined : onClick}
    ref={ref}
    className={`peer w-full h-full bg-transparent font-normal outline-none focus:outline-none transition-all text-base px-3 py-3 rounded-[7px] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
  >
    {value || <span className="text-gray-400">{placeholder}</span>}
  </div>
));

const Input = ({
  icon,
  type = "text",
  style,
  placeholder,
  name,
  disabled = false,
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  register,
  rules,
  errors,
  setValue,
  options = [],
  value: externalValue = "",
  onChange,
  rows = 4, // For textarea
  className = "", // Additional className for the container
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(externalValue);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // React Hook Form integration
  const { ref, onChange: registerOnChange, ...registerProps } = register
    ? register(name, rules)
    : { ref: null, onChange: () => { } };

  // Sync with external value changes
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== internalValue) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  // Handle regular input changes
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue, e);
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    let dateValue;

    if (date) {
      if (type === "datetime") {
        dateValue = date.toISOString();
      } else {
        // Create clean YYYY-MM-DD string in local timezone
        const localDate = new Date(date);
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
        dateValue = localDate.toISOString().split("T")[0];
      }
    } else {
      dateValue = "";
    }

    updateValue(dateValue);
  };

  // Unified value update function
  const updateValue = (newValue, event) => {
    setInternalValue(newValue);

    // Update react-hook-form state if using setValue
    if (setValue) {
      setValue(name, newValue, { shouldValidate: true });
    }

    // Trigger react-hook-form's onChange
    if (registerOnChange) {
      const e = event || {
        target: {
          name,
          value: newValue,
          type: type === "textarea" ? "textarea" : "text",
        },
      };
      registerOnChange(e);
    }

    // Trigger custom onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  // Determine input type for password fields
  const resolvedType = type === "password" ? (passwordVisible ? "text" : "password") : type;

  // Date picker props
  const datePickerProps = {
    selected: internalValue ? new Date(internalValue) : null,
    onChange: handleDateChange,
    showTimeSelect: type === "datetime",
    dateFormat: type === "datetime" ? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy",
    minDate: disablePastDates ? new Date() : minDate ? new Date(minDate) : null,
    maxDate: disableFutureDates ? new Date() : null,
    placeholderText: placeholder,
    customInput: (
      <CustomInput
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        ref={ref}
      />
    ),
    disabled,
    wrapperClassName: "w-full",
    showYearDropdown: true,
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 100,
    ...props,
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div
        className={`flex items-center border border-transparent bg-gray-100 text-black px-3 py-1.5 rounded-[7px] ${errors?.[name] ? "border-red-500" : ""
          }`}
        style={style}
      >
        {icon && (
          <img src={`/${icon}`} alt="icon" className="mr-2" />
        )}

        {/* Date/Datetime Picker */}
        {(type === "date" || type === "datetime") && (
          <DatePicker {...datePickerProps} />
        )}

        {/* Select Input */}
        {type === "select" && (
          <select
            className="w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base px-3 py-3 rounded-[7px]"
            value={internalValue}
            onChange={handleInputChange}
            disabled={disabled}
            ref={ref}
            {...registerProps}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Textarea Input */}
        {type === "textarea" && (
          <textarea
            className="w-full h-full bg-transparent text-black outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all placeholder:opacity-70 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px] resize-none"
            placeholder={placeholder}
            value={internalValue}
            onChange={handleInputChange}
            rows={rows}
            ref={ref}
            disabled={disabled}
            {...registerProps}
            {...props}
          />
        )}

        {/* Regular Input (text, password, email, etc.) */}
        {!["date", "datetime", "select", "textarea"].includes(type) && (
          <input
            type={resolvedType}
            max={disableFutureDates && type === "date" ? new Date().toISOString().split("T")[0] : null}
            placeholder={placeholder}
            className="w-full h-full bg-transparent text-black font-normal outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all placeholder:opacity-70 focus:placeholder:opacity-100 text-base px-3 py-3 rounded-[7px]"
            value={internalValue}
            onChange={handleInputChange}
            ref={ref}
            disabled={disabled}
            {...registerProps}
            {...props}
          />
        )}

        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            className="ml-2 focus:outline-none"
            onClick={() => setPasswordVisible(!passwordVisible)}
            disabled={disabled}
          >
            <img
              src={passwordVisible ? "/eyeOpen.svg" : "/eyeClosed.svg"}
              alt="toggle visibility"
              className="h-5 w-5"
            />
          </button>
        )}
      </div>

      {/* Error message */}
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;