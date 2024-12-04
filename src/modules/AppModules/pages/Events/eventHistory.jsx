import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../../../../components/Badge";

export default function EventHistory() {
    const user = useSelector((state) => state.userData.data);
    const navigate = useNavigate();

    const TableHeaders = ["Event Name", "Organiser", "Location", "Event Date", "Status", "Action"];
    const TableData = [
        {
            name: 'Galaxy UI Event',
            email: 'Green Mouse',
            number: 'Landmark Center',
            date: '12-11-2024',
            status: 'concluded',
        },
        {
            name: 'Galaxy UI Event',
            email: 'Green Mouse',
            number: 'Landmark Center',
            date: '12-11-2024',
            status: 'concluded',
        },
        {
            name: 'Galaxy UI Event',
            email: 'Green Mouse',
            number: 'Landmark Center',
            date: '12-11-2024',
            status: 'concluded',
        },
        {
            name: 'Galaxy UI Event',
            email: 'Green Mouse',
            number: 'Landmark Center',
            date: '12-11-2024',
            status: 'concluded',
        },
    ];


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
                            tableHeader={TableHeaders}>
                            {TableData.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                    <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} color='active' /></td>
                                    <td className="px-6 py-3 cursor-pointer">
                                                <span className="flex w-full cursor-pointer">
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
        </>
    )
}