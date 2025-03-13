import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Table from "../../../components/Tables";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";




export default function Staffs() {
    const navigate = useNavigate();
    const { mutate } = useApiMutation();

    const TableHeaders = ["Name", "Staff ID", "Email", "Phone Number", "Department", "Designation", "Action"];
    const TableData = [
        {
            name: 'Chuka Uzor',
            id: 'Gren234',
            email: 'testmail@gmail.com',
            number: '0700000000',
            department: 'Admin',
            designation: 'Engineer',
        },
        {
            name: 'Chuka Uzor',
            id: 'Gren234',
            email: 'testmail@gmail.com',
            number: '0700000000',
            department: 'Admin',
            designation: 'Engineer',
        },
        {
            name: 'Chuka Uzor',
            id: 'Gren234',
            email: 'testmail@gmail.com',
            number: '0700000000',
            department: 'Admin',
            designation: 'Engineer',
        },
        {
            name: 'Chuka Uzor',
            id: 'Gren234',
            email: 'testmail@gmail.com',
            number: '0700000000',
            department: 'Admin',
            designation: 'Engineer',
        },
    ];





    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                    <Table title="" subTitle={<span>Staff List</span>} exportData
                        hasNumber
                        tableBtn={
                            <>
                                <button className="px-2 pt-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(21, 23, 30, 1)' }}>
                                    <span className="text-xs text-white">Newest First</span>
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00122 1V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                        <Button className="bg-mobiPink p-2 rounded-lg" onClick={() => navigate('create')}>
                                            Add New Staff
                                        </Button>
                            </>
                        }
                        tableHeader={TableHeaders}>
                        {TableData.map((data, index) => (
                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                <td className="px-3 py-5 text-mobiTableText whitespace-normal">{index + 1}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.name}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.id}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.email}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.number}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.department}</td>
                                <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.designation}</td>
                                <td className="px-3 py-3">
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
    )
}