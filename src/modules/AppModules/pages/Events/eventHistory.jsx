import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../../../../components/Badge";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { dateFormat } from "../../../../helpers/dateHelper";
import { daysInYear } from "date-fns/constants";
import Loader from "../../../../components/Loader";
import { exportToExcel } from "../../../../helpers/exportToExcel";

export default function EventHistory() {
    const user = useSelector((state) => state.userData.data);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const { mutate } = useApiMutation();

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getEvents();
    }, []);


    const getEvents = () => {
        mutate({
            url: `/api/events/events`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEvents(getPastEvents(response.data.data));
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }


    const getPastEvents = (events) => {
        const now = new Date(); // Get current date and time
        return events.filter(event => new Date(event.endDate) < now);
    };


    const TableHeaders = ["Event Name", "Location", "Event Date", "Status", "Action"];


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Event History</p>
                            <p className="text-base">Log of all past attended events </p>
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <Table title="Today" filter subTitle={<span>Event History</span>} exportData
                            tableHeader={TableHeaders}
                            sortFunc={(field, order) => {
                                const sortedEvents = [...events].sort((a, b) => {
                                    if (field === "date") {
                                        return order === "ASC"
                                            ? new Date(a.startDate) - new Date(b.startDate)
                                            : new Date(b.startDate) - new Date(a.startDate);
                                    } else if (field === "name") {
                                        return order === "ASC"
                                            ? a.name.localeCompare(b.name)
                                            : b.name.localeCompare(a.name);
                                    }
                                    return 0; // Default case if field is not recognized
                                });

                                setEvents(sortedEvents);
                            }}
                            handleExportDataClick={() => exportToExcel(
                                TableHeaders,
                                events.map(item => ([
                                    item.name,
                                    `${JSON.parse(item.venue).name} ${JSON.parse(item.venue).address}`,
                                    `${dateFormat(item.startDate, "dd MMM yyyy")} - ${dateFormat(item.endDate, "dd MMM yyyy")}`,
                                    'Concluded',
                                ])),
                                "Event History.xlsx"
                            )}                           
                            >
                            {events.length > 0 ?
                                events
                                    .map((data, index) => (
                                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                            <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{JSON.parse(data.venue).name} {JSON.parse(data.venue).address}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.startDate, "dd MMM yyyy")} - {dateFormat(data.endDate, "dd MMM yyyy")}</td>
                                            <td className="px-3 py-3 text-mobiTableText"><Badge status={'Concluded'} color='inactive' /></td>
                                            <td className="px-6 py-3 cursor-pointer">
                                                <span className="flex w-full cursor-pointer">
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