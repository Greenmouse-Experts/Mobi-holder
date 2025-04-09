import React, { useEffect, useState } from "react";
import DashboardStats from "./layouts/DashboardStats";
import Table from "../../../components/Tables";
import Badge from "../../../components/Badge";
import Subscription from "./layouts/Subscription";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { useOrganizationApi } from "../../../api/hooks/useOrganizationApi";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";

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

const TableHeaders = ["Organisation", "Card Number", "Expiry Date", "Status", "Action"];

const NewTableHeaders = ["Organisations", "Renewal Date", "Current Status", "Action"];


export default function Dashboard() {
    document.documentElement.style.position = null;
    const { getOrganisations } = useOrganizationApi();
    const user = useSelector((state) => state.userData.data);
    const [organisations, setOrganisations] = useState([]);
    const [orgCards, setOrgCards] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const { mutate } = useApiMutation();

    const getOrganisationsData = async () => {
        try {
            const data = await getOrganisations("");
            setOrganisations(data);
        } catch (error) {
            console.error("Error fetching organizations:", error);
            throw error;
        }
    };


    const getIDCards = () => {
        mutate({
            url: "/api/idcards/fetch/cards",
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrgCards(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }



    const getAllEvents = () => {
        mutate({
            url: `/api/events/events`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);

                // Get tomorrow's date
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                // Filter events starting **tomorrow or later**
                const futureEvents = response.data.data.filter(event => {
                    const eventStartDate = new Date(event.startDate);
                    return eventStartDate >= tomorrow;
                });

                setAllEvents(futureEvents);
                setIsLoadingEvents(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    useEffect(() => {
        getOrganisationsData();
        getIDCards();
        getAllEvents();
    }, []);


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header greeting profile data={user} />
                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2 md:px-0 px-3">
                        <DashboardStats orgData={organisations} idCards={orgCards} events={allEvents} />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
                            <Table title="" subTitle={<span>Organization IDs</span>}
                                tableHeader={TableHeaders}>
                                {orgCards.length > 0 ?
                                    orgCards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, 4)
                                    .map((data, index) => (
                                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                            <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{data.cardNumber}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{data?.expiryDate ? dateFormat(data?.expiryDate, 'dd-MM-yyyy') : '---'}</td>
                                            <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                            <td className="px-3 py-3">
                                                <span className="flex w-full justify-center">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    isLoading ?
                                        <tr>
                                            <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                <Loader size={20} />
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                NO ID Cards Available
                                            </td>
                                        </tr>
                                }
                            </Table>
                        </div>

                        <div className="lg:w-[35%] md:w-[35%] w-full flex-grow h-full flex flex-col gap-5">
                            <Table title="" subTitle={<span>Upcoming Events</span>}
                            >
                                {allEvents.length > 0 ?
                                    allEvents
                                        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                                        .slice(0, 4)
                                        .map((data, index) => (
                                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.startDate, 'dd-MM-yyy')}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.endDate, 'dd-MM-yyy')}</td>
                                            </tr>
                                        ))
                                    :
                                    isLoadingEvents ?
                                        <tr>
                                            <td colSpan={3} className="text-center py-10 font-semibold text-gray-500">
                                                <Loader size={20} />
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={3} className="text-center py-10 font-semibold text-gray-500">
                                                No Data Available
                                            </td>
                                        </tr>
                                }
                            </Table>
                        </div>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Subscription />
                        </div>

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Table title="" subTitle={<span>Organisations Joined</span>}
                                tableHeader={NewTableHeaders}>
                                {organisations.length > 0 ?
                                    organisations
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .slice(0, 4)
                                        .map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.dateJoined, 'dd-MM-yyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                    ))
                                    :
                                    isLoading ?
                                        <tr>
                                            <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                <Loader size={20} />
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                No Organization Joined
                                            </td>
                                        </tr>
                                }
                            </Table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}