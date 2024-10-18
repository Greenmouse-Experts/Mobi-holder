import React from "react";
import SearchInput from "../../../components/SearchInput";
import settings from "../../../assets/settings.svg";
import notifications from "../../../assets/notifications.svg"
import Greeting from "./layouts/Greetings";
import DashboardStats from "./layouts/DashboardStats";
import Table from "../../../components/Tables";
import Badge from "../../../components/Badge";
import Subscription from "./layouts/Subscription";
import { Link } from "react-router-dom";

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
    },
    {
        organization: 'Google Event',
        date: '03-10-2024',
    },
    {
        organization: 'Google Event',
        date: '03-10-2024',
    },
    {
        organization: 'Google Event',
        date: '03-10-2024',
    },
];

const TableHeaders = ["Organisations", "Role", "Date", "Status", "Action"];

const NewTableHeaders = ["Organisations", "Renewal Date", "Current Status", "Action"];


export default function Dashboard() {
    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <div className="w-full lg:flex-row md:flex-row flex flex-col gap-5">
                        <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col gap-5">
                            <div className="w-full flex gap-10">
                                <div className="flex w-full flex-grow">
                                    <SearchInput appendIcon="search.svg" type="password" placeholder="Enter keyword to search" />
                                </div>

                                <div className="flex gap-5">
                                    <div className="lg:flex md:flex hidden p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <img src={settings} />
                                    </div>
                                    <div className="lg:flex md:flex flex p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <Link to={'/app/notification'} className="w-full">
                                            <img src={notifications} />
                                        </Link>
                                    </div>
                                    <div className="lg:hidden md:hidden flex p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <img src="/userProfilexs.png" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex">
                                <Greeting />
                            </div>
                        </div>

                        <div className="flex lg:w-[30%] md:w-[30%] w-full flex-col">
                            <div className="w-full flex flex-col gap-6 p-2 rounded-md bg-mobiSearchDark">
                                <div className="flex items-center justify-center border w-full border-mobiSearchDark bGmobiGrayDark px-3 py-1 rounded-[7px]">
                                    <div className="flex flex-grow">
                                        <p className="text-sm font-semibold">My Profile</p>
                                    </div>
                                    <div className="flex">
                                        <img src="/userProfilexs.png" />
                                    </div>
                                </div>

                                <div className="w-full flex px-3 gap-3">
                                    <div className="flex">
                                        <img src="/userProfileLg.png" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-base font-semibold">Chukka Uzo</p>
                                        <p className="text-sm text-mobiRomanSilver">Individual Account</p>
                                        <div className="flex gap-2">
                                            <p className="text-mobiBlue">ID: 364888484</p>
                                            <div className="flex flex-col justify-center">
                                                <svg width="13" height="17" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" y="3.59106" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                                    <rect x="3.59082" y="0.5" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 px-3 mt-2 mb-2">
                                    <div className="flex flex-col  gap-1">
                                        <p className="text-mobiRomanSilver text-center lg:text-xs md:text-sm sm:text-sm text-xs">Type</p>
                                        <p className="text-sm text-center">Individual</p>
                                    </div>

                                    <div className="w-[1px] mx-2 lg:h-full md:h-full min-h-[20px] border border-mobiRomanSilver" />

                                    <div className="flex flex-col gap-1">
                                        <p className="text-mobiRomanSilver text-center lg:text-xs md:text-sm sm:text-sm text-xs">Date Joined</p>
                                        <p className="text-sm text-center">09-10-22</p>
                                    </div>

                                    <div className="w-[1px] mx-2 lg:h-full md:h-full min-h-[20px] border border-mobiRomanSilver" />

                                    <div className="flex flex-col gap-1">
                                        <p className="text-mobiRomanSilver text-center lg:text-xs md:text-xs sm:text-sm text-xs">Status</p>
                                        <p className="text-sm text-center">VERIFIED</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2">
                        <DashboardStats />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={<span>Recent IDs</span>} filter exportData tableBtn={'Create New ID'}
                                tableHeader={TableHeaders}>
                                {TableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3">{data.organization}</td>
                                        <td className="px-3 py-3">{data.role}</td>
                                        <td className="px-3 py-3">{data.date}</td>
                                        <td className="px-3 py-3"><Badge status={data.status} /></td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>

                        <div className="lg:w-[35%] md:w-[35%] w-full flex-grow h-full flex flex-col gap-5">
                            <Table title="This Month" subTitle={<span>Upcoming Events</span>}
                            >
                                {NewTableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-4">{data.organization}</td>
                                        <td className="px-3 py-4">{data.date}</td>
                                        <td className="px-3 py-4">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        
                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Subscription />
                            </div>

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={'Upcoming Subscriptions'} filter exportData
                                tableHeader={NewTableHeaders}>
                                {TableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3">{data.organization}</td>
                                        <td className="px-3 py-3">{data.date}</td>
                                        <td className="px-3 py-3"><Badge status={data.status} /></td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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