import React from "react";
import DashboardStats from "./layouts/DashboardStats";
import Table from "../../../components/Tables";
import Badge from "../../../components/Badge";
import Header from "../header";
import MembersAnalysis from "./layouts/MembersAnalysis";
import SubscriptionAnalysis from "./layouts/SubscriptionAnalysis";

const TableData = [
    {
        organization: 'Greenmouse Tech',
        role: 'Product Designer',
        date: '03-10-2024',
        status: 'active',
    },
    {
        organization: 'Afrima Lmt',
        role: 'Sales Rep',
        date: '03-10-2024',
        status: 'active',
    },
    {
        organization: 'Greenmouse Tech',
        role: 'Product Designer',
        date: '03-10-2024',
        status: 'active',
    },
    {
        organization: 'Greenmouse Tech',
        role: 'Product Designer',
        date: '03-10-2024',
        status: 'pending',
    },
];

const NewTableData = [
    {
        organization: 'Google Event',
        date: '03-10-2024',
        ticketType: 'Paid',
    },
    {
        organization: 'Google Event',
        date: '03-10-2024',
        ticketType: 'Paid',
    },
    {
        organization: 'Google Event',
        date: '03-10-2024',
        ticketType: 'Free',
    },
];

const TableHeaders = ["Organisations", "Role", "Date", "Status", "Action"];

const NewTableHeaders = ["Organisations", "Renewal Date", "Current Status", "Action"];


export default function OrgDashboard() {
    document.documentElement.style.position = null;

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header greeting profile organisation />
                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2 md:px-0 px-3">
                        <DashboardStats />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[63%] md:w-[63%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={<span>New Members</span>} filter exportData
                                tableBtn={<button className="bg-mobiPink text-white px-2 py-1 rounded-md">Add New User</button>}
                                tableHeader={TableHeaders}>
                                {TableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.organization}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.role}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                        <td className="px-3 py-3"><Badge status={data.status} /></td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>

                        <div className="lg:w-[37%] md:w-[37%] w-full flex-grow h-full flex flex-col gap-5">
                            <MembersAnalysis />
                        </div>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">

                        <div className="lg:w-[35%] md:w-[35%] w-full flex flex-col gap-5">
                            <SubscriptionAnalysis />
                        </div>

                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={<span>Upcoming Events</span>} filter exportData
                                tableHeader={NewTableHeaders}>
                                {NewTableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.organization}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.ticketType} /></td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}