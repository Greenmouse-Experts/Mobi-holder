import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";

export default function OrgUpcomingEvents() {
    const user = useSelector((state) => state.orgData.orgData);
    const navigate = useNavigate();
    const [allEvents, setAllEvents] = useState([]);

    const { mutate } = useApiMutation();

    const [isLoading, setIsLoading] = useState(true);

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



    useEffect(() => {
        getAllEvents();
    }, []);


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Upcoming Events</p>
                            <p className="text-base">All upcoming event; those created</p>
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <Table title="" filter subTitle={<span></span>} exportData
                            tableHeader={TableHeaders}>
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
                                                            <span className="cursor-pointer" onClick={() => navigate(`/org/view-invites/${data.eventId}`)}>
                                                                Invites
                                                            </span>
                                                        </MenuItem>

                                                        {data.userId === user.id &&
                                                            <>
                                                                <MenuItem className="flex flex-col gap-3">
                                                                    <span className="cursor-pointer" onClick={() => navigate(`/org/event-log/${data.eventId}`)}>
                                                                        Event Log
                                                                    </span>
                                                                </MenuItem>

                                                                <MenuItem className="flex flex-col gap-3">
                                                                    <span className="cursor-pointer" onClick={() => navigate('/org/add-event-verifier/2')}>
                                                                        Add Event Verifier
                                                                    </span>
                                                                </MenuItem>

                                                                <MenuItem className="flex flex-col gap-3">
                                                                    <span className="cursor-pointer" onClick={() => navigate(`/org/ticket-requests/${data.eventId}`)}>
                                                                        Ticket Requests
                                                                    </span>
                                                                </MenuItem>
                                                            </>}

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

                </div>
            </div>
        </>
    )
}