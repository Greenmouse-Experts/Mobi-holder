import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";

export default function SubscriptionHistory() {
    const user = useSelector((state) => state.orgData.orgData);

    const eventDetails = [
        {
            icon: <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.8 7.15V8.45H12.2V7.15H1.8ZM4.4 13V9.75H0.5V0H13.5V9.75H9.6V13L7 11.7L4.4 13ZM1.8 5.2H12.2V1.3H1.8V5.2Z" fill="#A1A1A1" />
            </svg>
            ,
            name: 'MobiHolder ID : 1023DE5F'
        },
        {
            icon: <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.8 7.15V8.45H12.2V7.15H1.8ZM4.4 13V9.75H0.5V0H13.5V9.75H9.6V13L7 11.7L4.4 13ZM1.8 5.2H12.2V1.3H1.8V5.2Z" fill="#A1A1A1" />
            </svg>,
            name: 'Staff ID: 208UY930'
        },
        {
            icon: <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.11111 7.8C3.90648 7.8 3.73483 7.7376 3.59617 7.6128C3.45798 7.48843 3.38889 7.33417 3.38889 7.15C3.38889 6.96583 3.45798 6.81135 3.59617 6.68655C3.73483 6.56218 3.90648 6.5 4.11111 6.5C4.31574 6.5 4.48739 6.56218 4.62606 6.68655C4.76424 6.81135 4.83333 6.96583 4.83333 7.15C4.83333 7.33417 4.76424 7.48843 4.62606 7.6128C4.48739 7.7376 4.31574 7.8 4.11111 7.8ZM7 7.8C6.79537 7.8 6.62396 7.7376 6.48578 7.6128C6.34711 7.48843 6.27778 7.33417 6.27778 7.15C6.27778 6.96583 6.34711 6.81135 6.48578 6.68655C6.62396 6.56218 6.79537 6.5 7 6.5C7.20463 6.5 7.37628 6.56218 7.51494 6.68655C7.65313 6.81135 7.72222 6.96583 7.72222 7.15C7.72222 7.33417 7.65313 7.48843 7.51494 7.6128C7.37628 7.7376 7.20463 7.8 7 7.8ZM9.88889 7.8C9.68426 7.8 9.51285 7.7376 9.37467 7.6128C9.236 7.48843 9.16667 7.33417 9.16667 7.15C9.16667 6.96583 9.236 6.81135 9.37467 6.68655C9.51285 6.56218 9.68426 6.5 9.88889 6.5C10.0935 6.5 10.2649 6.56218 10.4031 6.68655C10.5418 6.81135 10.6111 6.96583 10.6111 7.15C10.6111 7.33417 10.5418 7.48843 10.4031 7.6128C10.2649 7.7376 10.0935 7.8 9.88889 7.8ZM1.94444 13C1.54722 13 1.20706 12.8728 0.923944 12.6184C0.641315 12.3636 0.5 12.0575 0.5 11.7V2.6C0.5 2.2425 0.641315 1.93657 0.923944 1.6822C1.20706 1.4274 1.54722 1.3 1.94444 1.3H2.66667V0H4.11111V1.3H9.88889V0H11.3333V1.3H12.0556C12.4528 1.3 12.7929 1.4274 13.0761 1.6822C13.3587 1.93657 13.5 2.2425 13.5 2.6V11.7C13.5 12.0575 13.3587 12.3636 13.0761 12.6184C12.7929 12.8728 12.4528 13 12.0556 13H1.94444ZM1.94444 11.7H12.0556V5.2H1.94444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: 'Role: Product Manager'
        },
        {
            icon: <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.11111 7.8C3.90648 7.8 3.73483 7.7376 3.59617 7.6128C3.45798 7.48843 3.38889 7.33417 3.38889 7.15C3.38889 6.96583 3.45798 6.81135 3.59617 6.68655C3.73483 6.56218 3.90648 6.5 4.11111 6.5C4.31574 6.5 4.48739 6.56218 4.62606 6.68655C4.76424 6.81135 4.83333 6.96583 4.83333 7.15C4.83333 7.33417 4.76424 7.48843 4.62606 7.6128C4.48739 7.7376 4.31574 7.8 4.11111 7.8ZM7 7.8C6.79537 7.8 6.62396 7.7376 6.48578 7.6128C6.34711 7.48843 6.27778 7.33417 6.27778 7.15C6.27778 6.96583 6.34711 6.81135 6.48578 6.68655C6.62396 6.56218 6.79537 6.5 7 6.5C7.20463 6.5 7.37628 6.56218 7.51494 6.68655C7.65313 6.81135 7.72222 6.96583 7.72222 7.15C7.72222 7.33417 7.65313 7.48843 7.51494 7.6128C7.37628 7.7376 7.20463 7.8 7 7.8ZM9.88889 7.8C9.68426 7.8 9.51285 7.7376 9.37467 7.6128C9.236 7.48843 9.16667 7.33417 9.16667 7.15C9.16667 6.96583 9.236 6.81135 9.37467 6.68655C9.51285 6.56218 9.68426 6.5 9.88889 6.5C10.0935 6.5 10.2649 6.56218 10.4031 6.68655C10.5418 6.81135 10.6111 6.96583 10.6111 7.15C10.6111 7.33417 10.5418 7.48843 10.4031 7.6128C10.2649 7.7376 10.0935 7.8 9.88889 7.8ZM1.94444 13C1.54722 13 1.20706 12.8728 0.923944 12.6184C0.641315 12.3636 0.5 12.0575 0.5 11.7V2.6C0.5 2.2425 0.641315 1.93657 0.923944 1.6822C1.20706 1.4274 1.54722 1.3 1.94444 1.3H2.66667V0H4.11111V1.3H9.88889V0H11.3333V1.3H12.0556C12.4528 1.3 12.7929 1.4274 13.0761 1.6822C13.3587 1.93657 13.5 2.2425 13.5 2.6V11.7C13.5 12.0575 13.3587 12.3636 13.0761 12.6184C12.7929 12.8728 12.4528 13 12.0556 13H1.94444ZM1.94444 11.7H12.0556V5.2H1.94444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: 'Email: testmail@gmail.com'
        },
        {
            icon: <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.11111 7.8C3.90648 7.8 3.73483 7.7376 3.59617 7.6128C3.45798 7.48843 3.38889 7.33417 3.38889 7.15C3.38889 6.96583 3.45798 6.81135 3.59617 6.68655C3.73483 6.56218 3.90648 6.5 4.11111 6.5C4.31574 6.5 4.48739 6.56218 4.62606 6.68655C4.76424 6.81135 4.83333 6.96583 4.83333 7.15C4.83333 7.33417 4.76424 7.48843 4.62606 7.6128C4.48739 7.7376 4.31574 7.8 4.11111 7.8ZM7 7.8C6.79537 7.8 6.62396 7.7376 6.48578 7.6128C6.34711 7.48843 6.27778 7.33417 6.27778 7.15C6.27778 6.96583 6.34711 6.81135 6.48578 6.68655C6.62396 6.56218 6.79537 6.5 7 6.5C7.20463 6.5 7.37628 6.56218 7.51494 6.68655C7.65313 6.81135 7.72222 6.96583 7.72222 7.15C7.72222 7.33417 7.65313 7.48843 7.51494 7.6128C7.37628 7.7376 7.20463 7.8 7 7.8ZM9.88889 7.8C9.68426 7.8 9.51285 7.7376 9.37467 7.6128C9.236 7.48843 9.16667 7.33417 9.16667 7.15C9.16667 6.96583 9.236 6.81135 9.37467 6.68655C9.51285 6.56218 9.68426 6.5 9.88889 6.5C10.0935 6.5 10.2649 6.56218 10.4031 6.68655C10.5418 6.81135 10.6111 6.96583 10.6111 7.15C10.6111 7.33417 10.5418 7.48843 10.4031 7.6128C10.2649 7.7376 10.0935 7.8 9.88889 7.8ZM1.94444 13C1.54722 13 1.20706 12.8728 0.923944 12.6184C0.641315 12.3636 0.5 12.0575 0.5 11.7V2.6C0.5 2.2425 0.641315 1.93657 0.923944 1.6822C1.20706 1.4274 1.54722 1.3 1.94444 1.3H2.66667V0H4.11111V1.3H9.88889V0H11.3333V1.3H12.0556C12.4528 1.3 12.7929 1.4274 13.0761 1.6822C13.3587 1.93657 13.5 2.2425 13.5 2.6V11.7C13.5 12.0575 13.3587 12.3636 13.0761 12.6184C12.7929 12.8728 12.4528 13 12.0556 13H1.94444ZM1.94444 11.7H12.0556V5.2H1.94444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: 'Date Joined: 07-11-2024'
        },
        {
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.536 8.657L10.364 5.827C10.457 5.73416 10.5673 5.66053 10.6888 5.61034C10.8102 5.56014 10.9403 5.53435 11.0717 5.53444C11.2031 5.53454 11.3332 5.56051 11.4545 5.61088C11.5759 5.66125 11.6862 5.73502 11.779 5.828C11.8718 5.92098 11.9455 6.03133 11.9957 6.15276C12.0459 6.27419 12.0716 6.40431 12.0716 6.53571C12.0715 6.6671 12.0455 6.79719 11.9951 6.91855C11.9448 7.03991 11.871 7.15016 11.778 7.243L8.243 10.778C8.15019 10.871 8.03996 10.9449 7.91859 10.9953C7.79723 11.0457 7.66712 11.0717 7.53571 11.0718C7.40429 11.0719 7.27415 11.0461 7.15271 10.9958C7.03128 10.9456 6.92094 10.8719 6.828 10.779L4.708 8.659C4.61243 8.56682 4.53617 8.45653 4.48368 8.33456C4.43118 8.2126 4.4035 8.0814 4.40226 7.94862C4.40101 7.81584 4.42622 7.68415 4.47641 7.56122C4.52661 7.43829 4.60078 7.32658 4.69461 7.23262C4.78843 7.13867 4.90003 7.06433 5.02289 7.01397C5.14575 6.9636 5.27741 6.9382 5.41019 6.93926C5.54297 6.94032 5.67421 6.96781 5.79625 7.02013C5.91829 7.07246 6.02869 7.14856 6.121 7.244L7.536 8.657ZM8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14Z" fill="#A1A1A1" />
            </svg>,
            name: <span>Status : <span className="text-[rgba(76,217,100,1)]">Active</span></span>
        },

    ];


    const NewTableHeaders = ["Plan Name", "Validity", "Expiry Date", "Status", "Action"];
    const NewTableData = [
        {
            name: 'Gold Plan',
            email: '6 Month',
            number: '12-12-2024',
            status: 'active'
        },
        {
            name: 'Gold Plan',
            email: '6 Month',
            number: '12-12-2024',
            status: 'active'
        },
    ];

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscription History</p>
                            <p className="text-base">Subscription history for: <span className="text-mobiBlue">Chukka Uzo</span></p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-5 md:w-[30%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-6">
                            <div className="w-full flex justify-center">
                                <div className="w-[200px] h-[200px] flex rounded-full">
                                    <img src="/chukka.png" className="w-full h-full object-cover rounded-full" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col mt-3 gap-2">
                                <div className="w-full text-center text-lg font-semibold">
                                    Chukka Uzo
                                </div>
                                <div className="flex w-full flex-col gap-5 mt-3">
                                    {eventDetails.map((details, index) => (
                                        <div className="w-full flex gap-3">
                                            <div className="p-2 rounded-lg bGmobiGrayDark flex items-center">
                                                <span className="bs-mobiCeramaic">
                                                    {details.icon}
                                                </span>
                                            </div>
                                            <span className="bs-mobiCeramic flex flex-col items-center mt-1">{details.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="shadow-xl py-5 px-8 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            <Table title="Today" filter subTitle={<span>User Subscription History</span>} exportData
                                tableHeader={NewTableHeaders}>
                                {NewTableData.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.email}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.number}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
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

            </div>


        </>
    )
}