import React from "react";

const SimpleInput = React.forwardRef<
  HTMLInputElement,
  {
    label?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, name, ...inputProps }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        ref={ref}
        className="px-3 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...inputProps}
      />
    </div>
  );
});

SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
