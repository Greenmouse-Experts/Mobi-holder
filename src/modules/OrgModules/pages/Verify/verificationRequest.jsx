import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";
import cards from "../../../../assets/cards.svg";
import organisation from "../../../../assets/organisation.svg";

export default function OrgVerificationRequest() {
    const user = useSelector((state) => state.orgData.orgData);

    const RequetsHeaders = ["Individual", "Email", "Event", "Request On", "Response", "Action"];
    const RequetsHeaders1 = ["Individual", "Email", "Event", "Request On", "Status", "Action"];

    const NewTableData = [
        {
            name: 'Chukka Uzo',
            email: 'testmail@gmail.com',
            event: 'Google UI Event',
            number: '12-11-2024',
            status: 'active'
        }, {
            name: 'Chukka Uzo',
            email: 'testmail@gmail.com',
            event: 'Google UI Event',
            number: '12-11-2024',
            status: 'active'
        },
        {
            name: 'Chukka Uzo',
            email: 'testmail@gmail.com',
            event: 'Google UI Event',
            number: '12-11-2024',
            status: 'active'
        },
    ];
    return (
        <>   <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} />
                <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Verification Request</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 md:flex-row flex flex-col md:px-0 px-3 gap-5">
                    <StatCard
                        number={12}
                        label="Received Requests"
                        iconColor="bg-mobiOrange"
                        IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                        colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={21}
                        label="Initiated Requests"
                        iconColor="bg-mobiSkyCloud"
                        IconComponent={<img src={organisation} alt="ID Cards" style={{ width: '22px' }} />}
                        colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                </div>


                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Received Requests</span>} exportData
                        tableHeader={RequetsHeaders}>
                        {NewTableData.map((data, index) => (
                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.event}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
                                <td className="px-3 py-3 text-mobiTableText">
                                    <span className="flex gap-2">
                                        <span className="flex py-2 px-3 rounded-full border border-[rgba(247,77,27,1)]">
                                            <p className="text-[rgba(247,77,27,1)] text-xs font-[500]">Decline</p>
                                        </span>
                                        <span className="flex py-2 px-3 rounded-full bg-mobiPink">
                                            <p className="text-white text-xs font-[500]">Accept</p>
                                        </span>
                                    </span>
                                </td>
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
                    <Table title="Today" filter subTitle={<span>Initiated Requests</span>} exportData
                        tableHeader={RequetsHeaders1}>
                        {NewTableData.map((data, index) => (
                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.event}</td>
                                <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
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
            </div>
        </div>
        </>
    )
}