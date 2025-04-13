import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Badge from "../../../components/Badge";
import Table from "../../../components/Tables";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/modal";
import ReusableModal from "../../../components/ReusableModal";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";









const EventCategoryForm = ({ closeModal, reload }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();


    const createCategory = (data) => {
        mutate({
            url: "/api/admins/event/category/create",
            method: "PUT",
            headers: true,
            data: data,
            onSuccess: (response) => {
                closeModal();
                reload();
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Create Event Category</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createCategory)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name of Category
                            </p>
                            <Input type="text" name="name" errors={errors} register={register}
                                placeholder="Enter name of category" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Create Category
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}















export default function Events() {
    const navigate = useNavigate();
    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const { mutate } = useApiMutation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationData, setPagination] = useState({});


    const TableHeaders = ["Event ID", "Event Name", "Organisers", "Event Category", "Date Created", "Ticket Type", "Access Type", "Action"];



    const handleReload = () => { }


    const handleCreateCategory = (data) => {
        openModal({
            size: "sm",
            content: <EventCategoryForm closeModal={closeModal} reload={handleReload} />
        })
    }



    const getEventsData = (page) => {
        setLoading(true);
        setEvents([]);
        mutate({
            url: `/api/admins/events?page=${page}&limit=20`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEvents(response.data.data);
                setPagination(response.data.pagination);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            onError: () => {
                setLoading(false);
            }
        });
    }



    useEffect(() => {
        getEventsData(1);
    }, []);



    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                    <Table title="" subTitle={<span>Created Events</span>} exportData
                        hasNumber
                        currentPage={paginationData.page}
                        totalPages={paginationData.totalPages}
                        onPageChange={(page) => getEventsData(page)}
                        tableBtn={
                            <>
                                <button className="px-2 pt-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(21, 23, 30, 1)' }}>
                                    <span className="text-xs text-white">Newest First</span>
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00122 1V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <Menu placement="bottom">
                                    <MenuHandler>
                                        <Button className="bg-mobiPink p-2 rounded-lg">
                                            Event Category
                                        </Button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem className="flex flex-col gap-3">
                                            <span className="cursor-pointer" onClick={() => handleCreateCategory()}>
                                                Create Categories
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        }
                        tableHeader={TableHeaders}>
                        {events.length > 0 ?
                            events
                                .map((data, index) => (
                                    <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                        <td className="px-3 py-3 text-mobiTableText">{index + 1}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.id}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText">
                                            {data.companyName ? data.companyName : `${data.user.firstName} ${data.user.lastName}`}
                                        </td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.category.name}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.createdAt, 'dd-MM-yyy')}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.ticketType}</td>
                                        <td className="px-3 py-3 text-mobiTableText">{data.accessType}</td>
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
                                                        <span className="cursor-pointer" onClick={() => navigate(`/superadmin/events/view/${data.id}`)}>
                                                            View Event
                                                        </span>
                                                    </MenuItem>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/superadmin/events/event-attendees/${data.id}/${data.eventId}`)}>
                                                            View Event Attendees
                                                        </span>
                                                    </MenuItem>
                                                    {/*data.ticketType === 'Paid' &&
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer" onClick={() => navigate(`/superadmin/events/event-payments/${data.eventId}`)}>
                                                                Event Payments
                                                            </span>
                                                        </MenuItem>
                                                    */}
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => navigate(`/superadmin/events/verifiers/${data.id}/${data.eventId}`)}>
                                                            View Event Verifiers
                                                        </span>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            :
                            loading ?
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
    )
}