import { useEffect, useState } from "react";
import Header from "../header";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import Table from "../../../components/Tables";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function IDCards() {
    const [allIDCards, setAllIDCards] = useState([]);
    const [paginationData, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useApiMutation();
    const navigate = useNavigate();


    const RequetsHeaders = ["Card Holder", "Account Type", "Card Number", "Date Issued", "Expiry Date", "Actions"];


    const getAllIDCards = (page) => {
        setIsLoading(true);
        setAllIDCards([]);

        mutate({
            url: `/api/admins/idcards?page=${page}&limit=20`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setAllIDCards(response.data.data);
                setPagination(response.data.pagination);
                setIsLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            onError: () => {
                setIsLoading(false);
            }
        })
    }






    useEffect(() => {
        getAllIDCards(1);
    }, []);




















    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-5 my-2">
                        <Table width="lg:w-[1000px]" title={''} filter subTitle={<span>ID Cards</span>} exportData
                            tableHeader={RequetsHeaders}
                            currentPage={paginationData.page}
                            totalPages={paginationData.totalPages}
                            onPageChange={(page) => getAllIDCards(page)}
                        >
                            {allIDCards.length > 0 ? allIDCards.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.member.companyName ? data.member.companyName : `${data.member.firstName} ${data.member.lastName}`}
                                    </td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.member.accountType}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.cardNumber}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{dateFormat(data.dateIssued, 'dd-MM-yyy')}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{dateFormat(data.expiryDate, 'dd-MM-yyy')}</td>
                                    <td className="px-3 py-3">
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
                                                    <span className="cursor-pointer" onClick={() => navigate(`view/${data.id}`)}>
                                                        View Details
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
                </div>
            </div>
        </>
    )
}