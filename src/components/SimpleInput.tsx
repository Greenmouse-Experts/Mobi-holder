import React, { forwardRef } from "react";

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default forwardRef<HTMLInputElement, SimpleInputProps>(
  function SimpleInput({ label, ...props }, ref) {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
    );
  },
);
