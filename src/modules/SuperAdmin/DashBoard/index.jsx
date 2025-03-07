import Table from "../../../components/Tables";
import DashboardStats from "../layouts/DashboardStats";
import UserAnalysis from "../layouts/UserAnalysis";
import Events from "../layouts/Events";
import Badge from "../../../components/Badge"
import Header from "../header";
import Greeting from "../greetings";
import { useEffect, useState } from "react";
import { useOrganizationApi } from "../../../api/hooks/useOrganizationApi";
import { useIndividualApi } from "../../../api/hooks/useIndividualsApi";
import { dateFormat } from "../../../helpers/dateHelper";
import Loader from "../../../components/Loader";

export default function Dashboard() {
    const [organisations, setOrganisations] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [userData, setUsersData] = useState([]);
    const [loadingOrganisations, setLoadingOrganisations] = useState(false);
    const [loadingIndividuals, setLoadingIndividuals] = useState(false);

    const { getOrganisationsAdmin } = useOrganizationApi();
    const { getIndividualsAdmin } = useIndividualApi();

    const getOrganisations = async () => {
        setLoadingOrganisations(true); // Start loading
        try {
            const data = await getOrganisationsAdmin("");
            setOrganisations(data.data);
            getUsers();
        } catch (error) {
            console.error("Error fetching organizations:", error);
            getUsers();
        } finally {
            setLoadingOrganisations(false); // Stop loading
        }
    };

    const getUsers = async () => {
        setLoadingIndividuals(true); // Start loading
        try {
            const data = await getIndividualsAdmin("");
            setIndividuals(data.data);
        } catch (error) {
            console.error("Error fetching individuals:", error);
        } finally {
            setLoadingIndividuals(false); // Stop loading
        }
    };


    useEffect(() => {
        getOrganisations();
    }, []);



    useEffect(() => {
        const mergedData = [...individuals, ...organisations];
        setUsersData(getNewestUsers(mergedData));
    }, [individuals, organisations]);



    const TableHeaders = ["Name", "User Type", "Date", "Action"];
    const NewTableHeaders = ["Event Name", "Type", "Date", "Action"];

    const NewTableData = [
        {
            organization: 'Green Mouse Tech',
            type: 'Open',
            date: '03-10-2024',
        },
        {
            organization: 'Afrima Lmt',
            type: 'Open',
            date: '03-10-2024',
        },
        {
            organization: 'Green Mouse Tech',
            type: 'Open',
            date: '03-10-2024',
        },
    ];



    const getNewestUsers = (users, count = 4) => {
        return users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (latest first)
            .slice(0, count); // Get the first 'count' users
    }




    const statsData = [
        {
            cronTop: false,
            cronTopIcon: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.119537 14.7127C0.119537 12.2108 2.14771 10.1826 4.64958 10.1826H9.72116C12.223 10.1826 14.2512 12.2108 14.2512 14.7127V14.7127C14.2512 15.5466 13.5751 16.2227 12.7412 16.2227H1.62955C0.795595 16.2227 0.119537 15.5466 0.119537 14.7127V14.7127Z" fill="#AEB9E1" />
                <path d="M7.18805 9.03192C9.41194 9.03192 11.2148 7.22911 11.2148 5.00522C11.2148 2.78133 9.41194 0.978516 7.18805 0.978516C4.96416 0.978516 3.16135 2.78133 3.16135 5.00522C3.16135 7.22911 4.96416 9.03192 7.18805 9.03192Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: individuals.length,
            label: "Total Users",
            iconColor: "bg-mobiOrange",
            icon: <svg width="20" height="27" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14C17.866 14 21 10.866 21 7C21 3.13401 17.866 0 14 0C10.134 0 7 3.13401 7 7C7 10.866 10.134 14 14 14Z" fill="#EF956B" />
                <path d="M28 27.125C28 31.4737 28 35 14 35C0 35 0 31.4737 0 27.125C0 22.7762 6.2685 19.25 14 19.25C21.7315 19.25 28 22.7762 28 27.125Z" fill="#EF956B" />
            </svg>,
        },
        {
            cronTop: true,
            cronTopIcon: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.119537 14.7127C0.119537 12.2108 2.14771 10.1826 4.64958 10.1826H9.72116C12.223 10.1826 14.2512 12.2108 14.2512 14.7127V14.7127C14.2512 15.5466 13.5751 16.2227 12.7412 16.2227H1.62955C0.795595 16.2227 0.119537 15.5466 0.119537 14.7127V14.7127Z" fill="#AEB9E1" />
                <path d="M7.18805 9.03192C9.41194 9.03192 11.2148 7.22911 11.2148 5.00522C11.2148 2.78133 9.41194 0.978516 7.18805 0.978516C4.96416 0.978516 3.16135 2.78133 3.16135 5.00522C3.16135 7.22911 4.96416 9.03192 7.18805 9.03192Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: <span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                28.4%
            </span>,
            value: 407,
            label: "Total Subscriptions",
            iconColor: "bg-mobiSubPurple",
            icon: <svg width="22" height="26" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 17.75V9.2C26 6.67976 26 5.41965 25.5095 4.45704C25.0781 3.61031 24.3897 2.9219 23.543 2.49047C22.5804 2 21.3202 2 18.8 2H9.2C6.67976 2 5.41965 2 4.45704 2.49047C3.61031 2.9219 2.9219 3.61031 2.49047 4.45704C2 5.41965 2 6.67976 2 9.2V24.8C2 27.3202 2 28.5804 2.49047 29.543C2.9219 30.3897 3.61031 31.0781 4.45704 31.5095C5.41965 32 6.67976 32 9.2 32H14M17 15.5H8M11 21.5H8M20 9.5H8M17.75 27.5L20.75 30.5L27.5 23.75" stroke="#EF6BE4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
        },
        {
            cronTop: false,
            cronTopIcon: <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5197 9.11149C16.5197 13.6218 12.8634 17.2782 8.35307 17.2782C3.84274 17.2782 0.186401 13.6218 0.186401 9.11149C0.186401 4.60117 3.84274 0.944824 8.35307 0.944824C12.8634 0.944824 16.5197 4.60117 16.5197 9.11149ZM8.3549 4.44481C8.79463 4.44481 9.15111 4.80129 9.15111 5.24102V8.31614H12.2218C12.6616 8.31614 13.018 8.67261 13.018 9.11234C13.018 9.55208 12.6616 9.90855 12.2218 9.90855H9.15111V12.9819C9.15111 13.4217 8.79463 13.7781 8.3549 13.7781C7.91516 13.7781 7.55869 13.4217 7.55869 12.9819V9.90855H4.48092C4.04118 9.90855 3.68471 9.55208 3.68471 9.11234C3.68471 8.67261 4.04118 8.31614 4.48092 8.31614H7.55869V5.24102C7.55869 4.80129 7.91516 4.44481 8.3549 4.44481Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: organisations.length,
            label: "Total Organisations",
            iconColor: "bg-mobiSkyCloud",
            icon: <svg width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0441 12.1579C22.638 12.1579 23.9316 13.5196 23.9316 15.1974V20.8421H23.925V21.2763C23.925 21.6218 23.7946 21.9531 23.5625 22.1974C23.3305 22.4417 23.0157 22.5789 22.6875 22.5789C22.3593 22.5789 22.0445 22.4417 21.8125 22.1974C21.5804 21.9531 21.45 21.6218 21.45 21.2763V17.3684H21.4566V15.1974C21.4566 15.0822 21.4131 14.9718 21.3358 14.8903C21.2584 14.8089 21.1535 14.7632 21.0441 14.7632H11.9658C11.8564 14.7632 11.7515 14.8089 11.6741 14.8903C11.5968 14.9718 11.5533 15.0822 11.5533 15.1974V20.8421H11.55V21.2763C11.55 21.6218 11.4196 21.9531 11.1875 22.1974C10.9555 22.4417 10.6407 22.5789 10.3125 22.5789C9.98429 22.5789 9.66953 22.4417 9.43746 22.1974C9.20538 21.9531 9.075 21.6218 9.075 21.2763V17.3684H9.0783V15.1974C9.0783 13.5196 10.3702 12.1579 11.9658 12.1579H21.0441ZM30.525 15.1974V21.2763C30.525 21.6218 30.6554 21.9531 30.8875 22.1974C31.1195 22.4417 31.4343 22.5789 31.7625 22.5789C32.0907 22.5789 32.4055 22.4417 32.6375 22.1974C32.8696 21.9531 33 21.6218 33 21.2763V15.1974C33 14.3912 32.6958 13.6181 32.1543 13.0481C31.6128 12.4781 30.8783 12.1579 30.1125 12.1579H24.5437C25.1097 12.8787 25.4793 13.7766 25.5634 14.7632H30.1125C30.2219 14.7632 30.3268 14.8089 30.4042 14.8903C30.4815 14.9718 30.525 15.0822 30.525 15.1974ZM0 21.2763C6.91641e-09 21.6218 0.130379 21.9531 0.362455 22.1974C0.594531 22.4417 0.909295 22.5789 1.2375 22.5789C1.56571 22.5789 1.88047 22.4417 2.11254 22.1974C2.34462 21.9531 2.475 21.6218 2.475 21.2763V15.1974C2.475 15.0822 2.51846 14.9718 2.59582 14.8903C2.67318 14.8089 2.7781 14.7632 2.8875 14.7632H7.44645C7.52852 13.8062 7.88403 12.8979 8.46615 12.1579H2.8875C2.12169 12.1579 1.38724 12.4781 0.845729 13.0481C0.304218 13.6181 0 14.3912 0 15.1974V21.2763ZM16.5 0C17.8128 0 19.0719 0.548965 20.0002 1.52613C20.9285 2.50329 21.45 3.82861 21.45 5.21053C21.45 6.59244 20.9285 7.91776 20.0002 8.89493C19.0719 9.87209 17.8128 10.4211 16.5 10.4211C15.1872 10.4211 13.9281 9.87209 12.9998 8.89493C12.0715 7.91776 11.55 6.59244 11.55 5.21053C11.55 3.82861 12.0715 2.50329 12.9998 1.52613C13.9281 0.548965 15.1872 0 16.5 0ZM16.5 2.60526C15.8436 2.60526 15.2141 2.87975 14.7499 3.36833C14.2858 3.85691 14.025 4.51957 14.025 5.21053C14.025 5.90148 14.2858 6.56414 14.7499 7.05273C15.2141 7.54131 15.8436 7.81579 16.5 7.81579C17.1564 7.81579 17.7859 7.54131 18.2501 7.05273C18.7142 6.56414 18.975 5.90148 18.975 5.21053C18.975 4.51957 18.7142 3.85691 18.2501 3.36833C17.7859 2.87975 17.1564 2.60526 16.5 2.60526ZM27.225 1.73684C28.319 1.73684 29.3682 2.19431 30.1418 3.00862C30.9154 3.82292 31.35 4.92735 31.35 6.07895C31.35 7.23055 30.9154 8.33498 30.1418 9.14928C29.3682 9.96358 28.319 10.4211 27.225 10.4211C26.131 10.4211 25.0818 9.96358 24.3082 9.14928C23.5346 8.33498 23.1 7.23055 23.1 6.07895C23.1 4.92735 23.5346 3.82292 24.3082 3.00862C25.0818 2.19431 26.131 1.73684 27.225 1.73684ZM27.225 4.3421C26.7874 4.3421 26.3677 4.52509 26.0583 4.85081C25.7488 5.17654 25.575 5.61831 25.575 6.07895C25.575 6.53959 25.7488 6.98136 26.0583 7.30708C26.3677 7.6328 26.7874 7.81579 27.225 7.81579C27.6626 7.81579 28.0823 7.6328 28.3917 7.30708C28.7012 6.98136 28.875 6.53959 28.875 6.07895C28.875 5.61831 28.7012 5.17654 28.3917 4.85081C28.0823 4.52509 27.6626 4.3421 27.225 4.3421ZM5.775 1.73684C6.86902 1.73684 7.91823 2.19431 8.69182 3.00862C9.4654 3.82292 9.9 4.92735 9.9 6.07895C9.9 7.23055 9.4654 8.33498 8.69182 9.14928C7.91823 9.96358 6.86902 10.4211 5.775 10.4211C4.68098 10.4211 3.63177 9.96358 2.85818 9.14928C2.0846 8.33498 1.65 7.23055 1.65 6.07895C1.65 4.92735 2.0846 3.82292 2.85818 3.00862C3.63177 2.19431 4.68098 1.73684 5.775 1.73684ZM5.775 4.3421C5.33739 4.3421 4.91771 4.52509 4.60827 4.85081C4.29884 5.17654 4.125 5.61831 4.125 6.07895C4.125 6.53959 4.29884 6.98136 4.60827 7.30708C4.91771 7.6328 5.33739 7.81579 5.775 7.81579C6.21261 7.81579 6.63229 7.6328 6.94173 7.30708C7.25116 6.98136 7.425 6.53959 7.425 6.07895C7.425 5.61831 7.25116 5.17654 6.94173 4.85081C6.63229 4.52509 6.21261 4.3421 5.775 4.3421ZM1.2375 24.3158C0.909295 24.3158 0.594531 24.453 0.362455 24.6973C0.130379 24.9416 0 25.2729 0 25.6184V26.4868C0 28.2142 0.651895 29.8709 1.81228 31.0923C2.97266 32.3138 4.54647 33 6.1875 33H26.8125C28.4535 33 30.0273 32.3138 31.1877 31.0923C32.3481 29.8709 33 28.2142 33 26.4868V25.6184C33 25.2729 32.8696 24.9416 32.6375 24.6973C32.4055 24.453 32.0907 24.3158 31.7625 24.3158H1.2375ZM6.1875 30.3947C5.27433 30.3947 4.3932 30.0404 3.71257 29.3996C3.03194 28.7587 2.59956 27.8763 2.4981 26.9211H30.5019C30.4004 27.8763 29.9681 28.7587 29.2874 29.3996C28.6068 30.0404 27.7257 30.3947 26.8125 30.3947H6.1875Z" fill="#6B9BEF" />
            </svg>,
        },
        {
            cronTop: true,
            cronTopIcon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57282 0.600003C8.79268 0.222526 9.33801 0.222525 9.55787 0.600002L11.8871 4.59912C11.9677 4.73739 12.1026 4.83544 12.259 4.86931L16.7822 5.84879C17.2091 5.94124 17.3777 6.45988 17.0866 6.78562L14.003 10.2367C13.8964 10.356 13.8448 10.5147 13.861 10.6739L14.3272 15.2783C14.3712 15.713 13.93 16.0335 13.5302 15.8573L9.29519 13.9911C9.14876 13.9266 8.98194 13.9266 8.83551 13.9911L4.60047 15.8573C4.20072 16.0335 3.75954 15.713 3.80354 15.2783L4.26974 10.6739C4.28586 10.5147 4.23431 10.356 4.12769 10.2367L1.0441 6.78562C0.753034 6.45988 0.921549 5.94124 1.34849 5.84879L5.87166 4.86931C6.02806 4.83544 6.16301 4.73739 6.24355 4.59912L8.57282 0.600003Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: <span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                28.4%
            </span>,
            value: 329,
            label: "Total Event",
            iconColor: "bg-mobiLightGreen",
            icon: <svg width="22" height="25" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6667 3.3H25V0H21.6667V3.3H8.33333V0H5V3.3H3.33333C1.5 3.3 0 4.785 0 6.6V29.7C0 31.515 1.5 33 3.33333 33H26.6667C28.5 33 30 31.515 30 29.7V6.6C30 4.785 28.5 3.3 26.6667 3.3ZM26.6667 29.7H3.33333V13.2H26.6667V29.7ZM3.33333 9.9V6.6H26.6667V9.9H3.33333ZM6.66667 16.5H23.3333V19.8H6.66667V16.5ZM6.66667 23.1H18.3333V26.4H6.66667V23.1Z" fill="#6BEFD7" />
            </svg>,
        }
    ];



    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <Greeting />
                    <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 my-2 md:px-0 px-3">
                        <DashboardStats cronTop={true} statsData={statsData} />
                    </div>
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                        <div className="lg:w-[65%] md:w-[65%] w-full flex flex-col gap-5">
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
                                {userData.length > 0 ?
                                    userData.map((data, index) => (
                                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                            <td className="px-3 py-5 text-mobiTableText">{index + 1}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{data.companyName ? `${data.companyName}` : `${data.firstName} ${data.lastName}`}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{data.accountType}</td>
                                            <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd MMM yyyy')}</td>
                                            <td className="px-3 py-3">
                                                <span className="flex w-full">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    loadingIndividuals ?
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

                        <div className="lg:w-[35%] md:w-[35%] w-full flex-grow h-full flex flex-col gap-5">
                            <UserAnalysis />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Events />
                        </div>

                        <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-5">
                            <Table subTitle={<span>Upcoming Events</span>} exportData
                                tableHeader={NewTableHeaders}>
                                {NewTableData.map((data, index) => (
                                    <tr key={index} className="py-5">
                                        <td className="px-3 py-5 text-mobiTableText">{data.organization}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.type} /></td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.date}</td>
                                        <td className="px-3 py-3">
                                            <span className="flex w-full justify-center">
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