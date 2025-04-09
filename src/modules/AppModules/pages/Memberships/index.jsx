import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";
import cards from "../../../../assets/cards.svg";
import organisation from "../../../../assets/organisation.svg";
import calendar from "../../../../assets/calendar.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { dateFormat } from "../../../../helpers/dateHelper";
import Loader from "../../../../components/Loader";
import useModal from "../../../../hooks/modal";
import ReusableModal from "../../../../components/ReusableModal";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import UserPhoto from "../../../../components/UserPhoto";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import OrganisationInfo from "./modal/orgInfo";
import { exportToExcel } from "../../../../helpers/exportToExcel";






const UserDetails = ({ closeModal, userInfo, type, reload }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();

    const updateMember = (data) => {
        setIsLoading(true)
        delete data.firstname;
        delete data.memberId;
        delete data.organizationEmail;

        data.status = type === 'Accept' ? 'active' : 'declined';
        data.membershipId = userInfo.id;
        mutate({
            url: "/api/memberships-subscriptions/individual/update/membership/status",
            method: "PUT",
            data: data,
            headers: true,
            onSuccess: (response) => {
                setIsLoading(false);
                handleCloseModal();
                reload();
            },
            onError: () => {
                setIsLoading(false);
                handleCloseModal();
            }
        });
    };


    const handleCloseModal = () => {
        if (closeModal) {
            closeModal(); // Call closeModal function
        } else {
            console.error("closeModal is not defined");
        }
    }

    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <UserPhoto data={userInfo.organization} size="110px" avatarSize={20} />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <p className="font-semibold text-lg">{userInfo.organization.companyName}</p>
                        <p>{userInfo.organization.companyEmail}</p>
                        <p>MobiHolder Id: {userInfo.organization.mobiHolderId}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(updateMember)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Member/Staff ID
                            </p>
                            <Input type="text" disabled name="memberId" register={register} value={userInfo.memberId}
                                placeholder="Member ID" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Organisation Email
                            </p>
                            <Input type="text" name="organizationEmail" disabled value={userInfo.organization.companyEmail} register={register}
                                placeholder="Enter organisation email" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Role (Designation)
                            </p>
                            <Input type="text" disabled name="firstname" register={register}
                                value={userInfo.designation} />
                        </div>

                        {/*  <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Membership ID
                            </p>
                            <Input type="text" name="membershipId" disabled pl />
                        </div> */}
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className={`${type === 'Accept' ? 'bg-mobiPink' : 'bg-transparent border border-[rgba(247,77,27,1)] text-[rgba(247,77,27,1)]'}
                         md:w-1/2 w-full p-3 rounded-full`}
                            >
                                {type} Member
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}






export default function Membership() {
    const user = useSelector((state) => state.userData.data);
    const [organisations, setOrganisations] = useState([]);
    const [pendingOrganisations, setPendingOrganisations] = useState([]);
    const [pendingInitiated, setPendingInitiated] = useState([]);
    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const [stampTime, setTimeStaamp] = useState(new Date().getTime());

    const [isLoading, setIsLoading] = useState(true);

    const TableHeaders = ["Organisation", "Role", "Staff ID", "Email", "Status", "Action"];
    const RequetsHeaders1 = ["Organisation", "Role", "Request ID", "Requested On", "Action"];
    const RequetsHeaders2 = ["Organisation", "Request ID", "Role", "Request On", "Status", "Action"];

    const { mutate } = useApiMutation();

    const getOrganisations = (params) => {
        mutate({
            url: `/api/memberships-subscriptions/individual/membership${params}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                if (params === "") {
                    setOrganisations(response.data.data)
                }
                else if (params === "?filter=pendingFromOrganization") {
                    setPendingOrganisations(response.data.data)
                }
                else if (params === "?filter=pendingFromIndividual") {
                    setPendingInitiated(response.data.data);
                }
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }

    useEffect(() => {
        getOrganisations("");
        getOrganisations("?filter=pendingFromOrganization");
        getOrganisations("?filter=pendingFromIndividual");
    }, [stampTime])


    const handleDeclineMember = (data) => {
        openModal({
            size: "sm",
            content: <UserDetails closeModal={closeModal} userInfo={data} type='Decline' reload={handleReload} />
        })
    }

    const handleAcceptMember = (data) => {
        openModal({
            size: "sm",
            content: <UserDetails closeModal={closeModal} userInfo={data} type='Accept' reload={handleReload} />
        })
    }


    const handleViewOrg = (data) => {
        openModal({
            size: "sm",
            content: <OrganisationInfo closeModal={closeModal} orgInfo={data} />
        })
    }


    const handleReload = () => {
        setTimeStaamp(new Date().getTime())
    }

    return (
        <>   <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} />
                <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Membership</p>
                    </div>
                </div>

                <div className="w-full md:flex-row flex flex-col md:px-0 px-3 gap-5">
                    <StatCard
                        number={organisations.length}
                        label="Organisations Joined"
                        iconColor="bg-mobiOrange"
                        IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                        colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={[...pendingOrganisations, ...pendingInitiated].length}
                        label="Pending Requests"
                        iconColor="bg-mobiSkyCloud"
                        IconComponent={<img src={organisation} alt="ID Cards" style={{ width: '22px' }} />}
                        colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <StatCard
                        number={0}
                        label="Subscriptions"
                        iconColor="bg-mobiLightGreen"
                        IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
                        colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
                    />
                    <Link to={'/app/join-organisation'} className="bg-mobiDarkCloud rounded-md shadow-md py-2 px-4 md:w-[70%] w-full flex items-center justify-between">
                        <div className="flex flex-col items-center w-full gap-3">
                            <span className={`flex gap-1`}>
                                Join New Organisation
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
                    <Table title="Today" filter subTitle={<span>All Organisations</span>} exportData
                        tableHeader={TableHeaders}
                        sortFunc={(field, order) => {
                            const sortedOrganisations = [...organisations].sort((a, b) => {
                                if (field === "date") {
                                    return order === "ASC"
                                        ? new Date(a.createdAt) - new Date(b.createdAt)
                                        : new Date(b.createdAt) - new Date(a.createdAt);
                                } else if (field === "name") {
                                    return order === "ASC"
                                        ? a.organization.companyName.localeCompare(b.organization.companyName)
                                        : b.organization.companyName.localeCompare(a.organization.companyName);
                                }
                                return 0; // Default case if field is not recognized
                            });

                            setOrganisations(sortedOrganisations);
                        }}
                        handleExportDataClick={() => exportToExcel(
                            TableHeaders,
                            organisations.map(item => ([
                                item.organization.companyName,
                                item.designation,
                                item.id,
                                item.organization.companyEmail,
                                item.status,
                            ])),
                            "Organisations.xlsx"
                        )}
                    >
                        {organisations.length > 0 ?
                            organisations
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.id}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.organization.companyEmail}</td>
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
                                                        <span className="cursor-pointer" onClick={() => handleViewOrg(data.organization)}>
                                                            View Organisation
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


                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Pending Requests (Received)</span>} exportData
                        tableHeader={RequetsHeaders1}
                        sortFunc={(field, order) => {
                            const sortedPending = [...pendingOrganisations].sort((a, b) => {
                                if (field === "date") {
                                    return order === "ASC"
                                        ? new Date(a.createdAt) - new Date(b.createdAt)
                                        : new Date(b.createdAt) - new Date(a.createdAt);
                                } else if (field === "name") {
                                    return order === "ASC"
                                        ? a.organization.companyName.localeCompare(b.organization.companyName)
                                        : b.organization.companyName.localeCompare(a.organization.companyName);
                                }
                                return 0; // Default case if field is not recognized
                            });

                            setPendingOrganisations(sortedPending);
                        }}
                        handleExportDataClick={() => exportToExcel(
                            RequetsHeaders1,
                            pendingOrganisations.map(item => ([
                                item.organization.companyName,
                                item.designation,
                                item.id,
                                item.createdAt,
                            ])),
                            "Pending Organisations.xlsx"
                        )}
                    >
                        {pendingOrganisations.length > 0 ?
                            pendingOrganisations.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.id}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, "dd-MM-YYY")}</td>
                                    <td className="px-3 py-3 text-mobiTableText">
                                        <span className="flex gap-2">
                                            <span className="flex py-2 px-3 rounded-full cursor-pointer border border-[rgba(247,77,27,1)]"
                                                onClick={() => handleDeclineMember(data)}>
                                                <p className="text-[rgba(247,77,27,1)] text-xs font-[500]">Decline</p>
                                            </span>
                                            <span className="flex py-2 px-3 rounded-full cursor-pointer bg-mobiPink"
                                                onClick={() => handleAcceptMember(data)}>
                                                <p className="text-white text-xs font-[500]">Accept</p>
                                            </span>
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


                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                    <Table title="Today" filter subTitle={<span>Pending Requests (Initiated) </span>} exportData
                        tableHeader={RequetsHeaders2}
                        sortFunc={(field, order) => {
                            const sortedInitiated = [...pendingInitiated].sort((a, b) => {
                                if (field === "date") {
                                    return order === "ASC"
                                        ? new Date(a.createdAt) - new Date(b.createdAt)
                                        : new Date(b.createdAt) - new Date(a.createdAt);
                                } else if (field === "name") {
                                    return order === "ASC"
                                        ? a.organization.companyName.localeCompare(b.organization.companyName)
                                        : b.organization.companyName.localeCompare(a.organization.companyName);
                                }
                                return 0; // Default case if field is not recognized
                            });

                            setPendingInitiated(sortedInitiated);
                        }}
                        handleExportDataClick={() => exportToExcel(
                            RequetsHeaders1,
                            pendingInitiated.map(item => ([
                                item.organization.companyName,
                                item.id,
                                item.designation,
                                dateFormat(data.createdAt, 'dd-MM-yyyy'),
                                'Pending'
                            ])),
                            "Pending Initiated Organisations.xlsx"
                        )}
                    >
                        {pendingInitiated.length > 0 ?
                            pendingInitiated.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-3 text-mobiTableText">{data.organization.companyName}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.id}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd-MM-yyyy')}</td>
                                    <td className="px-3 py-3 text-mobiTableText"><Badge status={'pending'} /></td>
                                    <td className="px-6 py-3">
                                        <span className="flex w-full">
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

            <ReusableModal
                isOpen={isOpen}
                size={modalOptions.size}
                title={modalOptions.title}
                content={modalOptions.content}
                closeModal={closeModal}
            />

        </>
    )
}