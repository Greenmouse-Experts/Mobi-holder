import React from "react";

export default function SearchInput(props) {
    return (
        <>
            <div className="flex items-center border w-full border-mobiSearchDark bg-mobiSearchDark md:px-3 px-1.5 py-1 rounded-[7px]">
                {props.icon ?
                    <img src={`/${props.icon}`} />
                    :
                    null}

                <input
                    type={props.type}
                    placeholder={`${props.placeholder}`}
                    className="peer w-full h-full bg-transparent font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder:opacity-1 focus:placeholder:opacity-100 text-sm md:px-3 px-1 py-1 rounded-[7px]"
                    style={{ borderColor: 'transparent', border: '0px !important' }}
                />

                {props.appendIcon ?
                    <img src={`/${props.appendIcon}`} className="md:w-[20px] w-[20px]" />
                    :
                    null}
            </div>        </>
    )
}