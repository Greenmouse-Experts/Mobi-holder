import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";
import cards from "../../../../assets/cards.svg";
import calendar from "../../../../assets/calendar.svg";
import organisation from "../../../../assets/organisation.svg";
import { Link, useNavigate } from "react-router-dom";
import { useVerifiersApi } from "../../../../api/hooks/useVerifiersApi";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import { exportToExcel } from "../../../../helpers/exportToExcel";

export default function OrgVerificationDashboard() {
    const user = useSelector((state) => state.orgData.orgData);
    const [allEvents, setAllEvents] = useState([]);
    const [allVerifiers, setAllVerifiers] = useState([]);
    const [requests, setAllRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingVerifiers, setIsLoadingVerifiers] = useState(true);

    const { mutate } = useApiMutation();

    const { getInitiatedOrgRequests } = useVerifiersApi();

    const navigate = useNavigate();

    const RequetsHeaders1 = ["Individual", "Email", "Event", "Event Image", "Status", "Action"];

    const TableHeaders = ["Event Name", "Event Image", "Created by", "Ticket Type", "Start Date", "End Date", "Action"];


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
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    const getAllVerifiers = () => {
        mutate({
            url: `/api/verifications/verifiers`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const filteredData = response.data.data.filter((data) => data.eventOwnerId === user.id);
                setAllVerifiers(filteredData);
                setIsLoadingVerifiers(false);
            },
            onError: () => {
                setIsLoadingVerifiers(false);
            }
        });
    };



    useEffect(() => {
        const fetchData = async () => {
            getAllEvents();
            getAllVerifiers();

            try {
                const data = await getInitiatedOrgRequests();
                const filteredRequests = data.filter((data) => data.issuedBy === user.id);
                setAllRequests(filteredRequests);
            } catch (error) {
                console.error("Error fetching received requests:", error);
            }
        };

        fetchData();
    }, []);




    return (
        <>   <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile organisation data={user} />
                <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Verify</p>
                    </div>
                </div>

                <div className="w-full md:flex-row flex flex-col md:px-0 px-3 gap-5">
                    <StatCard
                        number={allEvents.length}
                        label="Upcoming Events"
                        iconColor="bg-mobiLightGreen"
                        IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
                        colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={allVerifiers.length}
                        label="Total Verifiers"
                        iconColor="bg-mobiOrange"
                        IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                        colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={requests.length}
                        label="Verification Requests"
                        iconColor="bg-mobiSkyCloud"
                        IconComponent={<img src={organisation} alt="ID Cards" style={{ width: '22px' }} />}
                        colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <Link to={'/org/add-verifiers'} className="bg-mobiDarkCloud rounded-md shadow-md py-2 px-4 md:w-[70%] w-full flex items-center justify-between">
                        <div className="flex flex-col items-center w-full gap-3">
                            <span className={`flex gap-1`}>
                                Add Verifiers
                            </span>
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="27" cy="27" r="27" fill="#2A2D4B" />
                                <path d="M23.8033 37V16H28.1805V37H23.8033ZM15 28.5814V24.4031H37V28.5814H15Z" fill="#242EF2" />
                                <path d="M23.8033 37V16H28.1805V37H23.8033ZM15 28.5814V24.4031H37V28.5814H15Z" fill="#242EF2" />
                            </svg>
                        </div>
                    </Link>
                </div>







                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Upcoming Events</span>} exportData
                        tableHeader={TableHeaders}
                        sortFunc={(field, order) => {
                            const sortedEvents = [...allEvents].sort((a, b) => {
                                if (field === "date") {
                                    return order === "asc" ? new Date(a.startDate) - new Date(b.startDate) : new Date(b.startDate) - new Date(a.startDate);
                                }
                                else if (field === "name") {
                                    const aName = `${a.name}`;
                                    const bName = `${b.name}`;

                                    return order === "ASC"
                                        ? aName.localeCompare(bName)
                                        : bName.localeCompare(aName);
                                }
                                return 0;
                            });
                            setAllEvents(sortedEvents);
                        }}
                        >
                        {allEvents.length > 0 ?
                            allEvents
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                        <td className="px-3 py-3 text-center text-mobiTableText"><img width={50} src={data.image} /></td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.userId === user.id ? 'Me' : '---'}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.ticketType}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.startDate, 'dd-MM-yyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.endDate, 'dd-MM-yyy')}</td>
                                        <td className="px-6 py-3 cursor-pointer">
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <span className="flex w-full cursor-pointer">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/view-verifiers/${data.id}`)}>
                                                            View Verifiers
                                                        </span>
                                                    </MenuItem>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/view-event/${data.id}`)}>
                                                            View Event
                                                        </span>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
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
                                        No Data Available
                                    </td>
                                </tr>
                        }
                    </Table>
                </div>




                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>All Your Verifiers</span>} exportData
                        tableHeader={RequetsHeaders1}
                        sortFunc={(field, order) => {
                            const sortedVerifiers = [...allVerifiers].sort((a, b) => {
                                if (field === "date") {
                                    return order === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
                                }
                                else if (field === "name") {
                                    const aName = `${a.event.name}`;
                                    const bName = `${b.event.name}`;

                                    return order === "ASC"
                                        ? aName.localeCompare(bName)
                                        : bName.localeCompare(aName);
                                }
                                return 0;
                            });
                            setAllVerifiers(sortedVerifiers);
                        }}
                            handleExportDataClick={() => exportToExcel(
                                RequetsHeaders1,
                                allVerifiers.map(item => ([
                                    `${item.user.companyName ? item.user.companyName : `${item.user.firstName} ${item.user.lastName}`}`,
                                    item.user.email,
                                    item.event.name,
                                    item.event.image,
                                    item.status
                                ])),
                                "All Verifiers.xlsx"
                            )}
                        >
                        {allVerifiers.length > 0 ?
                            allVerifiers
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.companyName ? data.user.companyName : `${data.user.firstName} ${data.user.lastName}`}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.email}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.event.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            {<img width={50} src={data.event.image} />}
                                        </td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                        <td className="px-6 py-3 cursor-pointer">
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <span className="flex w-full cursor-pointer">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/view-event/${data.event.id}`)}>
                                                            View Event
                                                        </span>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            :
                            isLoadingVerifiers ?
                                <tr>
                                    <td colSpan={RequetsHeaders1.length} className="text-center py-10 font-semibold text-gray-500">
                                        <Loader size={20} />
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td colSpan={RequetsHeaders1.length} className="text-center py-10 font-semibold text-gray-500">
                                        No Data Available
                                    </td>
                                </tr>
                        }

                    </Table>
                </div>

            </div>
        </div>
        </>
    )
}