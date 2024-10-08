import React from "react";

export default function Input(props) {
    return (
        <>
            <div className="flex items-center border border-transparent bg-mobiGrayDark px-3 py-1.5 rounded-[7px]" style={{ backgroundColor: 'rgb(82, 81, 81)' }}>
                {props.icon ?
                    <img src={`/${props.icon}`} />
                    :
                    null}

                <input
                    type={props.type}
                    placeholder={`${props.placeholder}`}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-[7px]"
                    style={{ backgroundColor: 'rgb(82, 81, 81)', borderColor: 'transparent', border: '0px !important' }}
                />

                {props.appendIcon ?
                    <img src={`/${props.appendIcon}`} />
                    :
                    null}
            </div>        </>
    )
}