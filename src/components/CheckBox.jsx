import React from "react";
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react";

export default function Checkbox({ name, register, rules, errors, label, value, onChange }) {
    return (
        <div className="flex flex-col gap-3">
            <MaterialCheckbox
                {...register(name, rules)}
                id={name}
                color="black"
                label={label}
                checked={value} // Controlled component
                onChange={(e) => onChange(e.target.checked)} // Call parent function
            />
            {errors?.[name] && (
                <p style={{ color: "red" }} className="-mt-2">{errors[name]?.message}</p>
            )}
        </div>
    );
}
