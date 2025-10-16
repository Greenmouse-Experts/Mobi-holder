import React from "react";
import { dateFormat } from "../helpers/dateHelper";

const StaffCard = ({ data, background, company, textColor }) => {
  const cardData = data.individual ?? data.member;
  const organizationName = data.organization
    ? data.organization.companyName
    : company;
  const org = data.organization;
  return (
    <div
      className="md:w-[400px] w-full rounded-lg shadow-xl border border-gray-200 overflow-hidden p-4"
      style={{ backgroundColor: `${background}`, color: `${textColor}` }}
    >
      {/* Redesigned Layout: Focus on vertical flow and clear separation */}
      <div className="flex flex-col gap-4">
        {/* Header Section: Organization and Card Info */}
        <div
          className="flex justify-between items-start border-b pb-3 border-opacity-30"
          style={{
            borderColor:
              textColor === "#000000"
                ? "rgba(0,0,0,0.2)"
                : "rgba(255,255,255,0.3)",
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="h-10 w-fit aspect-square rounded-full bg-gray-300">
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
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {organizationName}
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full"></div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Expires:</p>
            <p className="font-bold text-base leading-none">
              {dateFormat(data.expiryDate, "MM/yy")}
            </p>
          </div>
        </div>

        {/* Profile Section: Image, Name, Designation */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div
            className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 border-2"
            style={{
              borderColor: textColor === "#000000" ? "#ffffff" : "#000000",
            }}
          >
            {cardData.photo ? (
              <img
                src={`${cardData.photo}`}
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            ) : (
              <span className="text-xs text-gray-600">No Photo</span>
            )}
          </div>

          {/* Name and Role */}
          <div className="flex-1 min-w-0">
            <p className="text-xl font-extrabold leading-tight truncate">
              {cardData.firstName} {cardData.lastName}
            </p>
            <p className="text-xs mt-0.5 font-medium opacity-80 truncate">
              {data.designation}
            </p>
          </div>
        </div>

        {/* Footer Section: Dates and Card Number */}
        <div
          className="flex justify-between text-xs pt-2 border-t border-opacity-30"
          style={{
            borderColor:
              textColor === "#000000"
                ? "rgba(0,0,0,0.2)"
                : "rgba(255,255,255,0.3)",
          }}
        >
          <div>
            <p className="opacity-80">Issued:</p>
            <p className="font-bold">
              {dateFormat(data.dateIssued, "dd-MM-yyyy")}
            </p>
          </div>
          <div className="text-right">
            <p className="opacity-80">Card No:</p>
            <p className="font-bold uppercase">{data.cardNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
