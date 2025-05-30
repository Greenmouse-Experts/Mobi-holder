import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Badge from "../../../components/Badge";
import Table from "../../../components/Tables";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIndividualApi } from "../../../api/hooks/useIndividualsApi";
import Loader from "../../../components/Loader";
import useModal from "../../../hooks/modal";
import ReusableModal from "../../../components/ReusableModal";
import SuspendModal from "./modal/SuspendModal";

export default function AllUsers() {
    const navigate = useNavigate();
    const [individuals, setIndividuals] = useState([]);
    const [allIndividuals, setAllIndividuals] = useState([]);

    const [search, setSearch] = useState('');

    const [paginationData, setPagination] = useState({});
    const [loadingIndividuals, setLoadingIndividuals] = useState(false);

    const { getIndividualsAdmin } = useIndividualApi();

    const { openModal, isOpen, modalOptions, closeModal } = useModal();



    const getUsers = async (params) => {
        setLoadingIndividuals(true); // Start loading
        setIndividuals([]);
        try {
            const data = await getIndividualsAdmin(`?page=${params}&limit=20`);
            setIndividuals(data.data);
            setPagination(data.pagination)
        } catch (error) {
            console.error("Error fetching individuals:", error);
        } finally {
            setLoadingIndividuals(false); // Stop loading
        }
    };



    const getAllUsers = async () => {
        try {
            const data = await getIndividualsAdmin(`?page=1&limit=2000000000000`);
            setAllIndividuals(data.data);
        } catch (error) {
            console.error("Error fetching individuals:", error);
        } finally {
        }
    };





    useEffect(() => {
        getUsers(1);
        getAllUsers();
    }, []);




    const handleSuspend = (id, status) => {
        openModal({
            size: "sm",
            content: <SuspendModal id={id} status={status} closeModal={closeModal} reload={() => getUsers(paginationData.page)} />
        })
    }



    const TableHeaders = ["Name", "Mobiholder ID", "Email", "Phone Number", "Username", "Status", "Action"];


    const filteredIndividuals = (search === '' ? individuals : allIndividuals)?.filter((data) => {
        const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
        return (
            fullName.includes(search.toLowerCase()) ||
            data.mobiHolderId?.toLowerCase().includes(search.toLowerCase()) ||
            data.email?.toLowerCase().includes(search.toLowerCase()) ||
            data.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
            data.username?.toLowerCase().includes(search.toLowerCase())
        );
    });


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-5 my-2">
                        <Table title="" subTitle={<span>Individuals List</span>} exportData
                            hasNumber
                            currentPage={paginationData.page}
                            totalPages={paginationData.totalPages}
                            onPageChange={(page) => getUsers(page)}
                            search={search}
                            onSearchChange={setSearch}
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
                            {filteredIndividuals.length > 0 ?
                                filteredIndividuals.map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{index + 1}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{data.firstName} {data.lastName}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{data.mobiHolderId}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{data.email}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{data.phoneNumber}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal">{data.username}</td>
                                        <td className="px-3 py-5 text-mobiTableText break-words whitespace-normal"><Badge status={data.status} /></td>
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
                                                        <span className="cursor-pointer" onClick={() => navigate(`/superadmin/view-individual/${data.id}`)}>
                                                            View
                                                        </span>
                                                    </MenuItem>
                                                    {data.status === 'active' ?
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer" onClick={() => handleSuspend(data.id, 'suspend')}>
                                                                Suspend
                                                            </span>
                                                        </MenuItem>
                                                        :
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer" onClick={() => handleSuspend(data.id, 'unsuspend')}>
                                                                UnSuspend
                                                            </span>
                                                        </MenuItem>
                                                    }
                                                </MenuList>
                                            </Menu>
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