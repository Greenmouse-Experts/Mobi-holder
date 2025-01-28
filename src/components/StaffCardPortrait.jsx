import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile placeholder

const StaffCard = () => {
  return (
    <div className="w-[320px] rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden">
      {/* Header with profile image */}
      <div className="bg-green-300 h-24 flex flex-col items-center justify-end pb-6 relative">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 absolute bottom-[-30px]">
          <FaUserCircle className="text-gray-400 text-5xl" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 text-center mt-8">
        <p className="text-gray-500 font-medium">Name</p>
        <p className="text-black font-semibold text-lg">-----</p>

        <p className="text-gray-500 font-medium mt-2">Staff ID</p>
        <p className="text-black font-semibold text-lg">-----</p>

        <p className="text-gray-500 font-medium mt-2">Category</p>
        <p className="text-black font-semibold text-lg">VIP</p>
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-3 border-t border-gray-300">
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Date Issued</p>
          <p className="text-black">-----</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Role</p>
          <p className="text-black">-----</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Card Number</p>
          <p className="text-black">-----</p>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
