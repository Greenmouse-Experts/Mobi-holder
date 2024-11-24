import React from "react";

const AvatarInitials = ({ name, size = "12", bgColor = "blue-500", textColor = "white" }) => {
    // Function to extract initials
    const getInitials = (name) => {
        if (!name) return "NN"; // Default to "NN" for no name
        const words = name.split(" ");
        const initials =
            words.length > 1
                ? `${words[0][0]}${words[1][0]}` // First letter of first & last name
                : words[0][0]; // Only first letter if a single name
        return initials.toUpperCase();
    };

    return (
        <div
            className={`flex items-center justify-center w-${size} h-${size} rounded-full bg-${bgColor} text-${textColor} text-lg font-bold`}
            style={{ lineHeight: 1 }}
        >
            {getInitials(name)}
        </div>
    );
};

export default AvatarInitials;
