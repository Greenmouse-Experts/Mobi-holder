import React, { useEffect, useState } from "react";
import DashboardStats from "./layouts/DashboardStats";
import Table from "../../../components/Tables";
import Badge from "../../../components/Badge";
import MembersAnalysis from "./layouts/MembersAnalysis";
import SubscriptionAnalysis from "./layouts/SubscriptionAnalysis";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";


const TableHeaders = ["Individuals", "Role", "Date", "Status"];

const NewTableHeaders = ["Event Name", "Ticket Type", "Start Date", "End Date"];


export default function OrgDashboard() {
    document.documentElement.style.position = null;
    const user = useSelector((state) => state.orgData.orgData);
    const [allMembers, setAllMembers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const { mutate } = useApiMutation();
    const [stampTime, setTimeStaamp] = useState(new Date().getTime());


    const getOrganisationsMember = (params) => {
        mutate({
            url: `/api/memberships-subscriptions/organization/membership${params}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                if (params === '') {
                    setAllMembers(sortByMostRecentUpdate(response.data.data))
                }
                setIsLoading(false)
            },
            onError: () => {
            }
        });
    }


    const sortByMostRecentUpdate = (combinedData) => {
        return combinedData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    };



    const getSubscribers = () => {
        mutate({
            url: `/api/memberships-subscriptions/get/subscribers`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscribers(response.data.data)
                setIsLoading(false)
            },
            onError: () => {
            }
        });
    }



    const getSubscriptionPlans = () => {
        mutate({
            url: `/api/memberships-subscriptions/subscription/plans`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setPlans(response.data.data)
                setIsLoading(false)
            },
            onError: () => {
            }
        });
    }




    const getMyEvents = () => {
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


                setEvents(futureEvents);
                setIsLoadingEvents(false);
            },
            onError: () => {
                setIsLoadingEvents(false);
            }
        });
    }





    useEffect(() => {
        getOrganisationsMember('');
        getSubscribers();
        getSubscriptionPlans();
        getMyEvents();
    }, [stampTime]);


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header greeting profile organisation data={user} title={'Dashboard'} />
                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2 md:px-0 px-3">
                        <DashboardStats members={allMembers} subscriptionData={subscribers.length} eventsData={events} />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[63%] md:w-[63%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={<span>New Members</span>} filter exportData
                                hidePagination
                                tableBtn={<button className="bg-mobiPink text-white px-2 py-1 rounded-md">Add New User</button>}
                                tableHeader={TableHeaders}>
                                {allMembers.length > 0 ?
                                    allMembers.slice(0, 4).map((data, index) => (
                                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                            <td className="px-3 py-3 text-mobiTableText">{data.individual.firstName} {data.individual.lastName}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd-MM-yyy')}</td>
                                            <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
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
                                                No Data Available
                                            </td>
                                        </tr>
                                }
                            </Table>
                        </div>

                        <div className="lg:w-[37%] md:w-[37%] w-full flex-grow h-full flex flex-col gap-5">
                            <MembersAnalysis members={allMembers} />
                        </div>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">

                        <div className="lg:w-[35%] md:w-[35%] w-full flex flex-col gap-5">
                            <SubscriptionAnalysis subscribers={subscribers} plans={plans} />
                        </div>

                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
                            <Table title="Today" subTitle={<span>Upcoming Events</span>} filter exportData hidePagination
                                tableHeader={NewTableHeaders}>
                                {events.length > 0 ?
                                    events
                                        .map((data, index) => (
                                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{data.ticketType}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.startDate, 'dd-MM-yyy')}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.endDate, 'dd-MM-yyy')}</td>
                                            </tr>
                                        ))
                                    :
                                    isLoadingEvents ?
                                        <tr>
                                            <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                <Loader size={20} />
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={TableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                No Data Available
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