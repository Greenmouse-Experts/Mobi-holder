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


const TableHeaders = ["Organisation", "Card Number", "Expiry Date", "Status"];

const NewTableHeaders = ["Organisations", "Date Joined", "Current Status"];


export default function Dashboard() {
    document.documentElement.style.position = null;
    const { getOrganisations } = useOrganizationApi();
    const user = useSelector((state) => state.userData.data);
    const [organisations, setOrganisations] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
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
                setIsLoading(false)
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




    const getSubscriptions = () => {
        mutate({
            url: `/api/users/individual/subscriptions`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptions(response.data.data);
            },
            onError: () => {
                setSubscriptions([]);
            }
        })
    }




    useEffect(() => {
        getOrganisationsData();
        getIDCards();
        getAllEvents();
        getSubscriptions();
    }, []);


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header greeting profile data={user} title={'Dashboard'} />
                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2 md:px-0 px-3">
                        <DashboardStats orgData={organisations} idCards={orgCards} subscriptions={subscriptions} events={allEvents} />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
                            <Table
                                title=""
                                subTitle={<span>Organization IDs</span>}
                                tableHeader={TableHeaders}
                                hasNumber={false}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                hidePagination
                            >
                                {orgCards.length > 0 ? (
                                    orgCards
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .slice(0, 4)
                                        .map((data, index) => (
                                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{data.cardNumber}</td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    {data?.expiryDate ? dateFormat(data?.expiryDate, 'dd-MM-yyyy') : '---'}
                                                </td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    <Badge status={data.status} />
                                                </td>
                                            </tr>
                                        ))
                                ) : isLoading ? (
                                    <tr>
                                        <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            <Loader size={20} />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            NO ID Cards Available
                                        </td>
                                    </tr>
                                )}
                            </Table>                        </div>

                        <div className="lg:w-[35%] md:w-[35%] w-full flex-grow h-full flex flex-col gap-5">
                            <Table
                                title=""
                                subTitle={<span>Upcoming Events</span>}
                                tableHeader={["Event Name", "Start Date", "End Date"]}
                                hasNumber={false}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                hidePagination
                            >
                                {allEvents.length > 0 ? (
                                    allEvents
                                        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                                        .slice(0, 4)
                                        .map((data, index) => (
                                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    {dateFormat(data.startDate, 'dd-MM-yyyy')}
                                                </td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    {dateFormat(data.endDate, 'dd-MM-yyyy')}
                                                </td>
                                            </tr>
                                        ))
                                ) : isLoadingEvents ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-10 font-semibold text-gray-500">
                                            <Loader size={20} />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-10 font-semibold text-gray-500">
                                            No Data Available
                                        </td>
                                    </tr>
                                )}
                            </Table>                        </div>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Subscription subscriptions={subscriptions} />
                        </div>

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Table
                                title=""
                                subTitle={<span>Organisations Joined</span>}
                                tableHeader={NewTableHeaders}
                                hasNumber={false}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                hidePagination
                            >
                                {organisations.length > 0 ? (
                                    organisations
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .slice(0, 4)
                                        .map((data, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    {data.organization?.companyName || 'N/A'}
                                                </td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    {data.dateJoined ? dateFormat(data.dateJoined, 'dd-MM-yyyy') : '---'}
                                                </td>
                                                <td className="px-3 py-3 text-mobiTableText">
                                                    <Badge status={data.status} />
                                                </td>
                                            </tr>
                                        ))
                                ) : isLoading ? (
                                    <tr>
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            <Loader size={20} />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            No Organization Joined
                                        </td>
                                    </tr>
                                )}
                            </Table>                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}