import React from "react";

export default function Badge(props) {
    return (
        <>
            <div className={`w-full flex justify-center rounded-md py-3 px-1 ${props.status}`}>
                <p className="text-xs capitalize">{props.status}</p>
            </div>
        </>
    )
}