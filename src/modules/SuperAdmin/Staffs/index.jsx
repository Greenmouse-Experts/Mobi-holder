import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Table from "../../../components/Tables";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import useModal from "../../../hooks/modal";
import DeleteModal from "../../../components/DeleteModal";
import ReusableModal from "../../../components/ReusableModal";




export default function Staffs() {
    const [allStaffs, setAllStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { mutate } = useApiMutation();
    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const TableHeaders = ["Name", "Staff ID", "Email", "Phone Number", "Department", "Designation", "Status", "Action"];



    useEffect(() => {
        getStaffs();
    }, []);



    const getStaffs = () => {
        mutate({
            url: `/api/admins/staffs`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setAllStaffs(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
                setAllStaffs([]);
            }
        })
    }



    const handleReload = () => {
        getStaffs();
    }



    const handleDelete = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal api={`/api/admins/staff/delete?id=${id}`} title={'Do you wish to delete this staff?'} closeModal={closeModal} redirect={handleReload} />
        })

    }


    const handleStatus = (id, status) => {
        mutate({
            url: `/api/admins/staff/status`,
            method: "PATCH",
            headers: true,
            data: { id },
            onSuccess: (response) => {
                getStaffs();
            },
            onError: () => {
            }
        })
    }




    const resendCredentials = (id) => {
        mutate({
            url: `/api/admins/staff/resend-login`,
            method: "POST",
            headers: true,
            data: { id },
            onSuccess: (response) => {
                getStaffs();
            },
            onError: () => {
            }
        })
    }




    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                    <Table title="" subTitle={<span>Staff List</span>} exportData
                        hasNumber
                        tableBtn={
                            <>
                                <Button onClick={() => navigate('roles')} className="px-2 pt-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(21, 23, 30, 1)' }}>
                                    <span className="text-xs text-white">View Roles</span>
                                </Button>
                                <Button className="bg-mobiPink p-2 rounded-lg" onClick={() => navigate('create')}>
                                    Add New Staff
                                </Button>
                            </>
                        }
                        tableHeader={TableHeaders}>
                        {allStaffs.length > 0 ? allStaffs.map((data, index) => (
                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                <td className="px-3 py-5 text-mobiTableText whitespace-normal">{index + 1}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.admin.name}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.staffId}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.email}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.phoneNumber}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.department}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.designation}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal capitalize">
                                    <span className={`${data.admin.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                        {data.admin.status}
                                    </span>
                                </td>
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
                                                <span className="cursor-pointer" onClick={() => navigate(`update/${data.id}`)}>
                                                    Update
                                                </span>
                                            </MenuItem>
                                            <MenuItem className="flex flex-col gap-3">
                                                <span className="cursor-pointer" onClick={() => resendCredentials(data.id)}>
                                                    Re-send Credentials
                                                </span>
                                            </MenuItem>
                                            <MenuItem className="flex flex-col gap-3">
                                                <span className="cursor-pointer" onClick={() => handleStatus(data.id, data.admin.status)}>
                                                    {data.admin.status === 'active' ? 'Deactivate' : 'Activate'}
                                                </span>
                                            </MenuItem>
                                            <MenuItem className="flex flex-col gap-3">
                                                <span className="cursor-pointer text-red-500" onClick={() => handleDelete(data.id)}>
                                                    Delete
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
                                </tr>}
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
    )
}