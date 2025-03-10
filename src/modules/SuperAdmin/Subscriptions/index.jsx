import StatCard from "../../../components/StatsCard";
import Table from "../../../components/Tables";
import plusSign from "../../../assets/plus-sign.svg";
import eye from "../../../assets/eye.svg";
import usersSmall from "../../../assets/users-small.svg";
import Header from "../header";

export default function Subscriptions() {
    const TableHeaders = ["Organisation Name", "Subscription Plans", "Active Subscribers", "InActive Subscribers", "Total Members", "Action"];
    const TableData = [
        {
            name: 'Afri Mask',
            email: '3 plans',
            number: '24',
            members: '24',
            date: '201',
        },
        {
            name: 'Afri Mask',
            email: '3 plans',
            number: '24',
            members: '24',
            date: '201',
        },
        {
            name: 'Afri Mask',
            email: '3 plans',
            number: '24',
            members: '24',
            date: '201',
        },
        {
            name: 'Afri Mask',
            email: '3 plans',
            number: '24',
            members: '24',
            date: '201',
        },
        {
            name: 'Afri Mask',
            email: '3 plans',
            number: '24',
            members: '24',
            date: '201',
        },
    ];

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-5 my-2">
                        <div className="flex w-full lg:flex-row md:flex-row flex-col lg:w-4/5 w-full gap-4">
                            <StatCard
                                cronTop
                                cronTopIcon={<img src={eye} />}
                                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                                    28.4%
                                </span>}
                                number={3023}
                                label="Total Organisations"
                            />
                            <StatCard
                                cronTop
                                cronTopIcon={<img src={usersSmall} />}
                                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                                    28.4%
                                </span>}
                                number={407}
                                label="Total Active Subscribers"
                            />
                            <StatCard
                                cronTop
                                cronTopIcon={<img src={plusSign} />}
                                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                                    28.4%
                                </span>}
                                number={19}
                                label="Total Inactive Subscribers"
                            />
                        </div>
                        <Table title="" subTitle={<span>New Users</span>} exportData
                            hasNumber
                            tableBtn={
                                <button className="px-2 pt-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(21, 23, 30, 1)' }}>
                                    <span className="text-xs text-white">Newest First</span>
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00122 1V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            }
                            tableHeader={TableHeaders}>
                            {TableData.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-5 text-mobiTableText">{index + 1}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.members}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                    <td className="px-3 py-3">
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
                </div>
            </div>
        </>
    )
}