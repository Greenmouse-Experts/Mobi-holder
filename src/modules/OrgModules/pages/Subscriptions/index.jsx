import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import Table from "../../../../components/Tables";
import Badge from "../../../../components/Badge";
import organisation from "../../../../assets/organisation.svg";
import calendar from "../../../../assets/calendar.svg";
import { Link } from "react-router-dom";
import Subscription from "./components/Subscription";
import MembersAnalysis from "../../OrgDashboard/layouts/MembersAnalysis";
import SubscriptionAnalysis from "../../OrgDashboard/layouts/SubscriptionAnalysis";

export default function OrgSubscriptions() {
    const user = useSelector((state) => state.userData.data);

    const TableHeaders = ["Individual", "Email", "Staff ID", "Subscription Plan", "Status", "Action"];
    const TableData = [
        {
            name: 'Green Mouse',
            email: 'testmail@gmail.com',
            number: 'ASD293038',
            date: 'Gold Plan',
            status: 'active'
        },
        {
            name: 'Green Mouse',
            email: 'testmail@gmail.com',
            number: 'ASD293038',
            date: 'Gold Plan',
            status: 'active'
        },
        {
            name: 'Green Mouse',
            email: 'testmail@gmail.com',
            number: 'ASD293038',
            date: 'Gold Plan',
            status: 'active'
        },
        {
            name: 'Green Mouse',
            email: 'testmail@gmail.com',
            number: 'ASD293038',
            date: 'Gold Plan',
            status: 'active'
        },
    ];


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscriptions</p>
                        </div>
                    </div>

                    <div className="w-full md:flex-row flex flex-col md:px-0 px-3 gap-5">
                        <StatCard
                            number={12}
                            label="Total Subscribers"
                            iconColor="bg-mobiOrange"
                            IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                            colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                        />
                        <StatCard
                            number={21}
                            label="Active Subscribers"
                            iconColor="bg-mobiSkyCloud"
                            IconComponent={<img src={organisation} alt="ID Cards" style={{ width: '22px' }} />}
                            colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                        />
                        <StatCard
                            number={4}
                            label="Subscription Plans"
                            iconColor="bg-mobiLightGreen"
                            IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
                            colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
                        />
                        <Link to={'/org/add-subscription'} className="bg-mobiDarkCloud rounded-md shadow-md py-2 px-4 md:w-3/5 w-full flex items-center justify-between">
                            <div className="flex flex-col items-center w-full gap-3">
                                <span className={`flex gap-1 text-sm`}>
                                    Add Subscription Plan
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
                        <Table title="Today" filter subTitle={<span>All Subscribers</span>} exportData
                            tableHeader={TableHeaders}>
                            {TableData.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                    <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                    <td className="px-6 py-3">
                                        <span className="flex w-full">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>


                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <div className="lg:w-[63%] md:w-[63%] w-full flex flex-col gap-5">
                            <Subscription />
                        </div>
                        <div className="lg:w-[37%] md:w-[37%] w-full flex-grow h-full flex flex-col gap-5">
                            <SubscriptionAnalysis />
                        </div>
                    </div>
                    

                </div>
            </div>
        </>
    )
}