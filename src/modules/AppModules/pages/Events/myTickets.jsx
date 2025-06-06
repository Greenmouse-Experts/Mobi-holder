import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { setTicket } from "../../../../reducers/userSlice";
import { exportToExcel } from "../../../../helpers/exportToExcel";


export default function MyTickets() {
    const user = useSelector((state) => state.userData.data);
    const navigate = useNavigate();
    const [eventTickets, setEventTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();


    const { mutate } = useApiMutation();


    useEffect(() => {
        getEventTickets();
    }, []);


    const getEventTickets = () => {
        mutate({
            url: `/api/events/my/tickets`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEventTickets(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false)
            }
        });
    }


    const handleViewTicket = (data) => {
        dispatch(setTicket(data));
        navigate(`/app/event/view-ticket/${data.id}`);
    }



    const TableHeaders = ["Event Name", "Event Image", "Ticket Type", "Ticket Price", "Start Date", "End Date", "Action"];


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} title={'My Tickets'} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">My Tickets</p>
                            <p className="text-base">All event tickets bought and claimed</p>
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <Table title="Today" filter subTitle={<span>All Tickets</span>} exportData
                            tableHeader={TableHeaders}
                            sortFunc={(field, order) => {
                                const sortedEvents = [...eventTickets].sort((a, b) => {
                                    if (field === "date") {
                                        return order === "ASC"
                                            ? new Date(a.event.startDate) - new Date(b.event.startDate)
                                            : new Date(b.event.startDate) - new Date(a.event.startDate);
                                    } else if (field === "name") {
                                        return order === "ASC"
                                            ? a.event.name.localeCompare(b.event.name)
                                            : b.event.name.localeCompare(a.event.name);
                                    }
                                    return 0; // Default case if field is not recognized
                                });

                                setEventTickets(sortedEvents);
                            }}
                            handleExportDataClick={() => exportToExcel(
                                TableHeaders,
                                eventTickets.map(item => ([
                                    item.event.name,
                                    item.event.image,
                                    item.event.ticketType,
                                    item.ticket.price,
                                    dateFormat(item.event.startDate, 'dd-MM-yyyy'),
                                    dateFormat(item.event.endDate, 'dd-MM-yyyy'),
                                ])),
                                "All Tickets.xlsx"
                            )}                           
                        >
                            {eventTickets.length > 0 ?
                                eventTickets.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.event.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><img width={50} src={data.event.image} /></td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.event.ticketType}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.ticket.price}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.event.startDate, 'dd-MM-yyyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.event.endDate, 'dd-MM-yyyy')}</td>
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
                                                        <span className="cursor-pointer" onClick={() => handleViewTicket(data)}>
                                                            View Details
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

                </div>
            </div>
        </>
    )
}