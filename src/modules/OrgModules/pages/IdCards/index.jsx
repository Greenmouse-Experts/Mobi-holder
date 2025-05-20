import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import Table from "../../../../components/Tables";
import Badge from "../../../../components/Badge";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import { exportToExcel } from "../../../../helpers/exportToExcel";
import useModal from "../../../../hooks/modal";
import RevokeCardModal from "./modal/revokeCard";
import ReusableModal from "../../../../components/ReusableModal";

export default function OrgIDCardsPage() {
    const user = useSelector((state) => state.orgData.orgData);
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allMembers, setAllMembers] = useState([]);
    const [memberCards, setMemberCards] = useState([]);
    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const TableHeaders = ["Name", "Staff ID", "Role", "Expiry Date", "Status", "Action"];
    const NewTableHeaders = ["Template Name", "Layout", "Background Color", "Text Color", "Status", "Action"];



    const getTemplates = () => {
        mutate({
            url: "/api/idcards/templates",
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setTemplates(response.data.data)
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }


    const setDefaultTemplate = (id) => {
        mutate({
            url: `/api/idcards/template/default?templateId=${id}`,
            method: "GET",
            headers: true,
            onSuccess: (response) => {
                getTemplates();
            },
            onError: (error) => {
                setIsLoading(false);
            }
        });
    }



    const getOrganisationsMember = () => {
        mutate({
            url: `/api/memberships-subscriptions/organization/membership`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setAllMembers(response.data.data)
                setIsLoading(false)
            },
            onError: () => {
            }
        });
    }



    const getMemberCards = () => {
        mutate({
            url: `/api/idcards/organization/fetch/member/cards`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setMemberCards(response.data.data)
                setIsLoading(false)
            },
            onError: () => {
            }
        });
    }



    useEffect(() => {
        getTemplates();
        getOrganisationsMember();
        getMemberCards();
    }, []);




    const handleRevokeCard = (data) => {
        console.log(data)
        openModal({
            size: "sm",
            content: <RevokeCardModal closeModal={closeModal} cardInfo={data} reload={getMemberCards} />
        })
    }







    const handleActivateCard = (data) => {
        const payload = {
            cardId: data.cardNumber,
            status: 'active'
        };
        mutate({
            url: "/api/idcards/organization/change/card/status",
            method: "POST",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                getMemberCards();
            },
            onError: () => {
            }
        });

    }






    const renderCardStatus = (id) => {
        const card = memberCards.find(card => card.individual.id === id);
        if (card) {
            return <Badge status={card.status} />
        }
        return <Button className="bg-mobiPink w-full px-1 rounded-full text-xs" onClick={() => navigate(`/org/cards/createUser/${id}`)} >
            <span className="text-xs normal-case">Create ID</span>
        </Button>
    }


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} title={'ID Card Management'} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">ID Card Management</p>
                            <p className="text-base">Create, mange and do more with our ID card module</p>
                        </div>
                    </div>

                    <div className="w-full md:px-0 px-3 md:flex-row flex flex-col gap-5">
                        <StatCard
                            cronTop
                            number={allMembers.length}
                            label="Total Members"
                            iconColor="bg-mobiLightGreen"
                            IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px', color: 'rgba(107, 239, 215, 1)' }} />}
                            colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
                        />
                        <StatCard
                            cronTop
                            number={memberCards.length}
                            label="Total ID Cards"
                            iconColor="bg-mobiOrange"
                            IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px' }} />}
                            colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
                        />
                        <StatCard
                            number={templates.length}
                            label="ID Card Category"
                            iconColor="bg-mobiSkyCloud"
                            IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px' }} />}
                            colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
                        />

                        <Link to={'/org/cards/structure'} className="bg-mobiDarkCloud cursor-pointer rounded-md shadow-md py-2 px-4 md:w-1/2 flex items-center justify-between">
                            <div className="flex flex-col items-center w-full gap-3">
                                <span className={`flex gap-1`}>
                                    Create ID Card
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
                        <Table title="Today" filter subTitle={<span>Manage ID Templates</span>} exportData
                            tableHeader={NewTableHeaders}
                            sortFunc={(field, order) => {
                                const sortedTemplates = [...templates].sort((a, b) => {
                                    if (field === "date") {
                                        return order === "ASC"
                                            ? new Date(a.createdAt) - new Date(b.createdAt)
                                            : new Date(b.createdAt) - new Date(a.createdAt);
                                    } else if (field === "name") {
                                        const aName = `${a.name}`;
                                        const bName = `${b.name}`;

                                        return order === "ASC"
                                            ? aName.localeCompare(bName)
                                            : bName.localeCompare(aName);
                                    }
                                    return 0; // Default case if field is not recognized
                                });

                                setTemplates(sortedTemplates);
                            }}
                            handleExportDataClick={() => exportToExcel(
                                NewTableHeaders,
                                templates.map(item => ([
                                    item.name,
                                    item.layout,
                                    item.backgroundColor,
                                    item.textColor,
                                    `${item.is_default ? 'Default' : '---'}`
                                ])),
                                "ID Templates.xlsx"
                            )}
                        >
                            {templates.length > 0 ?
                                templates.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.layout}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            <span className="w-20 h-4 py-2 px-10" style={{ backgroundColor: `${data.backgroundColor}` }} />
                                        </td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            <span className="w-20 h-4 py-2 px-10" style={{ backgroundColor: `${data.textColor}` }} />
                                        </td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.is_default ? 'Default' : '---'}</td>
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
                                                        <span className="cursor-pointer" onClick={() => setDefaultTemplate(data.id)}>
                                                            Set As Default
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
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            <Loader size={20} />
                                        </td>
                                    </tr>
                                    :
                                    <tr>
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            No Data Available
                                        </td>
                                    </tr>
                            }
                        </Table>
                    </div>




                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <Table title="Today" filter subTitle={<span>Manage ID Cards</span>} exportData
                            tableHeader={TableHeaders}
                            sortFunc={(field, order) => {
                                const sortedMembers = [...memberCards].sort((a, b) => {
                                    if (field === "date") {
                                        return order === "ASC"
                                            ? new Date(a.expiryDate) - new Date(b.expiryDate)
                                            : new Date(b.expiryDate) - new Date(a.expiryDate);
                                    } else if (field === "name") {
                                        const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                                        const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                                        return order === "ASC"
                                            ? aName.localeCompare(bName)
                                            : bName.localeCompare(aName);
                                    }
                                    return 0; // Default case if field is not recognized
                                });

                                setMemberCards(sortedMembers);
                            }}
                            handleExportDataClick={() => exportToExcel(
                                TableHeaders,
                                memberCards.map(item => ([
                                    `${item.individual.firstName} ${item.individual.lastName}`,
                                    '---',
                                    item.designation,
                                    `${dateFormat(item.expiryDate, 'dd-MM-yyyy')}`,
                                    `${item.status}`
                                ])),
                                "ID Cards.xlsx"
                            )}>
                            {memberCards.length > 0 ?
                                memberCards.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.individual.firstName} {data.individual.lastName}</td>
                                        <td className="px-3 py-3 text-mobiTableText">---</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.expiryDate, 'dd-MM-yyyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            <Badge status={data.status} color={data.status === 'revoked' ? 'inactive' : ''} />
                                        </td>
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
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/card/viewCard/${data.id}`)}>
                                                            View Card
                                                        </span>
                                                    </MenuItem>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/org/card/updateCard/${data.id}`)}>
                                                            Update Card
                                                        </span>
                                                    </MenuItem>
                                                    {data.status !== 'revoked' &&
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer" onClick={() => handleRevokeCard(data)}>
                                                                Revoke ID Card
                                                            </span>
                                                        </MenuItem>
                                                    }
                                                    {data.status === 'revoked' &&
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer" onClick={() => handleActivateCard(data)}>
                                                                Activate ID Card
                                                            </span>
                                                        </MenuItem>
                                                    }
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                                :
                                isLoading ?
                                    <tr>
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            <Loader size={20} />
                                        </td>
                                    </tr>
                                    :
                                    <tr>
                                        <td colSpan={NewTableHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                            No Data Available
                                        </td>
                                    </tr>
                            }
                        </Table>
                    </div>



                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
                        <Table title="Today" filter subTitle={<span>All Members</span>} exportData
                            tableHeader={TableHeaders}
                            sortFunc={(field, order) => {
                                const sortedMembers = [...allMembers].sort((a, b) => {
                                    if (field === "date") {
                                        return order === "ASC"
                                            ? new Date(a.dateJoined) - new Date(b.dateJoined)
                                            : new Date(b.dateJoined) - new Date(a.dateJoined);
                                    } else if (field === "name") {
                                        const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                                        const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                                        return order === "ASC"
                                            ? aName.localeCompare(bName)
                                            : bName.localeCompare(aName);
                                    }
                                    return 0; // Default case if field is not recognized
                                });

                                setAllMembers(sortedMembers);
                            }}
                            handleExportDataClick={() => exportToExcel(
                                TableHeaders,
                                allMembers.map(item => ([
                                    `${item.individual.firstName} ${item.individual.lastName}`,
                                    item.memberId,
                                    item.designation,
                                    `${item.dateJoined ? dateFormat(item.dateJoined, 'dd-MM-yyyy') : '---'}`,
                                    `${item.status}`
                                ])),
                                "Members ID Cards.xlsx"
                            )}>

                            {allMembers.length > 0 ?
                                allMembers.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{data.individual.firstName} {data.individual.lastName}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.memberId}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.designation}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.dateJoined ? dateFormat(data.dateJoined, "dd-MM-yyyy") : '---'}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            {renderCardStatus(data.individual.id)}
                                        </td>
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


                <ReusableModal
                    isOpen={isOpen}
                    size={modalOptions.size}
                    title={modalOptions.title}
                    content={modalOptions.content}
                    closeModal={closeModal}
                />
            </div>
        </>
    )
}