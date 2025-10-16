import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile placeholder
import { dateFormat } from "../helpers/dateHelper";

const StaffCardPortrait = ({ data, background, company, textColor }) => {
  const cardData = data.individual ?? data.member;
  const org = data?.company ?? data.organization;
  // return <>{JSON.stringify(companyData)}</>;
  return (
    <div
      className="w-full rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden"
      style={{ backgroundColor: `${background}`, color: `${textColor}` }}
    >
      <div className="m-6">
        <div className="h-10 w-fit aspect-square rounded-full bg-gray-300 ">
          {org.photo ? (
            <img
              src={org.photo}
              alt="Organization Logo"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div
          className="text-lg mt-2 font-semibold"
          style={{
            color: cardData.textColor,
          }}
        >
          {org.companyName}
        </div>
      </div>
      {/* Header with profile image */}
      <div className="h-24 flex flex-col items-center justify-end pb-6 relative">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 absolute bottom-[-30px]">
          {cardData.photo ? (
            <img
              src={`${cardData.photo}`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-5xl" />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 text-center mt-8">
        <p className="font-medium">Name</p>
        <p className="font-semibold text-lg">
          {cardData.firstName} {cardData.lastName}
        </p>
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-3 border-t border-gray-300">
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Date Issued</p>
          <p className="">{dateFormat(data.dateIssued, "dd-MM-yyyy")}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Role</p>
          <p className="">{data.designation}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Card Number</p>
          <p className="uppercase"> {data.cardNumber} </p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Organisation</p>
          <p className="">{company}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Expiry Date</p>
          <p className="">{dateFormat(data.expiryDate, "dd-MM-yyyy")}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffCardPortrait;
