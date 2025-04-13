import React from "react";
import { dateFormat } from "../helpers/dateHelper";

const StaffCard = ({ data, background, company, textColor }) => {
    const cardData = data.individual ?? data.member;

    return (
        <div className="md:w-[90%] w-full rounded-lg shadow-lg border border-gray-300 bg-white" style={{ backgroundColor: `${background}`, color: `${textColor}` }}>
            {/* Header */}
            <div className="text-white p-3 flex justify-end items-center gap-2 rounded-t-lg">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"></div>
                <div className="text-sm font-semibold">{data.organization ? data.organization.companyName : company}</div>
            </div>

            {/* Body */}
            <div className="py-4 px-3">
                <div className="flex items-start gap-4">
                    {/* Profile Placeholder */}
                    <div className="w-24 h-24 bg-gray-300 -mt-8 rounded-full flex items-center justify-center">
                        {cardData.photo ? (
                            <img src={`${cardData.photo}`} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 -mt-5 gap-2">
                        <p className="my-2 font-medium">
                            Name : <span className="font-bold text-sm"> {cardData.firstName} {cardData.lastName} </span>
                        </p>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-3 mt-4 pt-3 gap-5 text-sm">
                    <div>
                        <p className="">Date Issued</p>
                        <p className="font-semibold"> {dateFormat(data.dateIssued, 'dd-MM-yyyy')} </p>
                    </div>
                    <div>
                        <p className="">Role</p>
                        <p className="font-semibold"> {data.designation} </p>
                    </div>
                    <div className="px-5">
                        <p className="">Card Number</p>
                        <p className="uppercase"> {data.cardNumber.split('-')[0]} </p>
                    </div>
                    <div>
                        <p className="">Expiry Date</p>
                        <p className="font-semibold"> {dateFormat(data.expiryDate, 'dd-MM-yyyy')} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCard;
