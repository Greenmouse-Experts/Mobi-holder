import { useSelector } from "react-redux";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";
import cards from "../../../../assets/cards.svg";
import organisation from "../../../../assets/organisation.svg";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import useModal from "../../../../hooks/modal";
import { useOrganizationApi } from "../../../../api/hooks/useOrganizationApi";
import AlertModal from "../../../../components/AlertModal";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../../../helpers/exportToExcel";

export default function OrgVerificationRequest() {
    const user = useSelector((state) => state.orgData.orgData);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [initiatedRequests, setInitiatedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const { mutate } = useApiMutation();
    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const { getOrganisationsData } = useOrganizationApi();


    useEffect(() => {
        getReceivedVerificationRequest('received');
        getInitiatedVerificationRequest('initiated');
    }, []);


    const getReceivedVerificationRequest = async (params) => {
        const data = await getOrganisationsData();
        mutate({
            url: `/api/verifications/organization/verification/requests?requestType=${params}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const filteredRequests = response.data.data.filter((data) => data.eventOwnerId === user.id);
                setReceivedRequests(filteredRequests);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };



    const getInitiatedVerificationRequest = async (params) => {
        const data = await getOrganisationsData();
        mutate({
            url: `/api/verifications/organization/verification/requests?requestType=${params}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const filteredRequests = response.data.data.filter((data) => data.issuedBy === user.id);
                setInitiatedRequests(getEventOwners(filteredRequests, data));
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };



    const getEventOwners = (eventRequests, users) => {
        return eventRequests.map(event => {
            const eventOwner = users.find(user => user.id === event.eventOwnerId);
            return {
                ...event,
                eventOwner: eventOwner ? eventOwner : null, // Attach owner details if found
            };
        });
    };



    const handleDecline = (id) => {
        openModal({
            size: "sm",
            content: <AlertModal closeModal={closeModal} title={'Decline Verification Request'}
                text='Are you sure you want to decline this verification request?'
                api='/api/verifications/verification/requests/update/status'
                body={{ requestId: id, status: 'decline' }}
                method="PATCH"
                redirect={getReceivedVerificationRequest('received')} />
        });
    }







    const handleAccept = (id) => {
        openModal({
            size: "sm",
            content: <AlertModal closeModal={closeModal} title={'Accept Verification Request'}
                text='Are you sure you want to accept this verification request?'
                api='/api/verifications/verification/requests/update/status'
                body={{ requestId: id, status: 'active' }}
                method="PATCH"
                redirect={getReceivedVerificationRequest('received')} />
        });
    }






    const RequetsHeaders = ["Individual", "Email", "Request On", "Response", "Action"];
    const RequetsHeaders1 = ["Individual", "Email", "Request On", "Status", "Action"];


    console.log(receivedRequests)



    return (
        <>   <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile organisation data={user} title={'Verification Request'} />
                <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">Verification Request</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 md:flex-row flex flex-col md:px-0 px-3 gap-5">
                    <StatCard
                        number={receivedRequests.length}
                        label="Received Requests"
                        iconColor="bg-mobiOrange"
                        IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                        colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={initiatedRequests.length}
                        label="Initiated Requests"
                        iconColor="bg-mobiSkyCloud"
                        IconComponent={<img src={organisation} alt="ID Cards" style={{ width: '22px' }} />}
                        colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                </div>


                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Received Requests</span>} exportData
                        tableHeader={RequetsHeaders}
                        sortFunc={(field, order) => {
                            const sortedRequests = [...receivedRequests].sort((a, b) => {
                                if (field === "date") {
                                    return order === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
                                }
                                else if (field === "name") {
                                    const aName = a.user.companyName 
                                        ? a.user.companyName 
                                        : `${a.user.firstName} ${a.user.lastName}`;
                                    const bName = b.user.companyName 
                                        ? b.user.companyName 
                                        : `${b.user.firstName} ${b.user.lastName}`;

                                    return order === "ASC"
                                        ? aName.localeCompare(bName)
                                        : bName.localeCompare(aName);
                                }
                                return 0;
                            });
                            setReceivedRequests(sortedRequests);
                        }
                        }
                            handleExportDataClick={() => exportToExcel(
                                RequetsHeaders,
                                receivedRequests.map(item => ([
                                    `${item.user.companyName ? item.user.companyName : `${item.user.firstName} ${item.user.lastName}`}`,
                                    item.user.email,
                                    `${dateFormat(item.createdAt, 'dd-MM-yyy')}`,
                                    item.status
                                ])),
                                "Recieved Requests.xlsx"
                            )}
                        >
                        {receivedRequests.length > 0 ?
                            receivedRequests
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.companyName ? data.user.companyName : `${data.user.firstName} ${data.user.lastName}`}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.email}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd-MM-yyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            {data.status === 'active' ?
                                                <Badge status={data.status} />
                                                :
                                                <span className="flex gap-2">
                                                    <span onClick={() => handleDecline(data.id)} className="flex py-2 px-3 cursor-pointer rounded-full border border-[rgba(247,77,27,1)]">
                                                        <p className="text-[rgba(247,77,27,1)] text-xs font-[500]">Decline</p>
                                                    </span>
                                                    <span onClick={() => handleAccept(data.id)} className="flex py-2 px-3 cursor-pointer rounded-full bg-mobiPink">
                                                        <p className="text-white text-xs font-[500]">Accept</p>
                                                    </span>
                                                </span>
                                            }
                                        </td>
                                        <td className="px-6 py-3">
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
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/view-event/${data.eventId}`)}>
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
                                    <td colSpan={RequetsHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                        <Loader size={20} />
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td colSpan={RequetsHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                        No Data Available
                                    </td>
                                </tr>
                        }
                    </Table>
                </div>


                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Initiated Requests</span>} exportData
                        tableHeader={RequetsHeaders1}
                        sortFunc={(field, order) => {
                            const sortedRequests = [...initiatedRequests].sort((a, b) => {
                                if (field === "date") {
                                    return order === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
                                }
                                else if (field === "name") {
                                    const aName = a.user.companyName 
                                        ? a.user.companyName 
                                        : `${a.user.firstName} ${a.user.lastName}`;
                                    const bName = b.user.companyName 
                                        ? b.user.companyName 
                                        : `${b.user.firstName} ${b.user.lastName}`;

                                    return order === "ASC"
                                        ? aName.localeCompare(bName)
                                        : bName.localeCompare(aName);
                                }
                                return 0;
                            });
                            setInitiatedRequests(sortedRequests);
                        }}
                        handleExportDataClick={() => exportToExcel(
                            RequetsHeaders1,
                            initiatedRequests.map(item => ([
                                `${item.user.companyName ? item.user.companyName : `${item.user.firstName} ${item.user.lastName}`}`,
                                item.user.email,
                                `${dateFormat(item.createdAt, 'dd-MM-yyy')}`,
                                item.status
                            ])),
                            "Initiated Requests.xlsx"
                        )}
                        >
                        {initiatedRequests.length > 0 ?
                            initiatedRequests
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.companyName ? data.user.companyName : `${data.user.firstName} ${data.user.lastName}`}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.user.email}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd-MM-yyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                        <td className="px-6 py-3">
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
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/view-event/${data.eventId}`)}>
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