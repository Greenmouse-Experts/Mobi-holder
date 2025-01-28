import React from "react";

const StaffCard = () => {
    return (
        <div className="w-[400px] rounded-lg shadow-lg border border-gray-300 bg-white">
            {/* Header */}
            <div className="bg-green-600 text-white p-3 flex justify-end items-center gap-2 rounded-t-lg">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"></div>
                <div className="text-sm font-semibold">Greenmouse Ltd</div>
            </div>

            {/* Body */}
            <div className="py-4 px-3">
                <div className="flex items-start gap-4">
                    {/* Profile Placeholder */}
                    <div className="w-24 h-24 bg-gray-300 -mt-8 rounded-full flex items-center justify-center">
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 -mt-2 gap-2">
                        <p className="text-blue-600 my-2 font-medium">
                            Name : <span className="text-black"> ----- </span>
                        </p>
                        <p className="text-blue-600 font-medium my-2">
                            Staff ID : <span className="text-black"> ----- </span>
                        </p>
                        <p className="text-blue-600 font-medium">
                            Category : <span className="text-black"> VIP </span>
                        </p>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-md">
                        <span className="text-sm text-gray-500">QR</span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-3 mt-4 pt-3 text-sm">
                    <div>
                        <p className="text-blue-600">Date Issued</p>
                        <p className="text-black"> ----- </p>
                    </div>
                    <div>
                        <p className="text-blue-600">Role</p>
                        <p className="text-black"> ----- </p>
                    </div>
                    <div>
                        <p className="text-blue-600">Card Number</p>
                        <p className="text-black"> ----- </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCard;
