import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
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
import DeleteModal from "../../../components/DeleteModal";









const EventCategoryForm = ({ closeModal, reload, categoryData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();


    const createCategory = (data) => {
        const payload = {
            event_category_id: categoryData?.id,
            ...data
        };
        mutate({
            url: categoryData ? "/api/admins/event/category/update" : "/api/admins/event/category/create",
            method: "PUT",
            headers: true,
            data: categoryData ? payload : data,
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
                        <h2 className="font-[500]">{categoryData ? 'Edit' : 'Create'} Event Category</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createCategory)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name of Category
                            </p>
                            <Input type="text" value={categoryData?.name} name="name" errors={errors} register={register}
                                placeholder="Enter name of category" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                {categoryData ? 'Edit' : 'Create'} Category
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


















export default function EventsCategories() {
    const navigate = useNavigate();
    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const { mutate } = useApiMutation();
    const [eventCategories, setEventCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const TableHeaders = ["Category", "Date Created", "Action"];



    const getCategories = () => {
        mutate({
            url: `/api/admins/event/categories`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEventCategories(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }



    const handleReload = () => {
        getCategories();
    }



    const handleCreateCategory = () => {
        openModal({
            size: "sm",
            content: <EventCategoryForm closeModal={closeModal} reload={handleReload} />
        })
    }


    const handleEditCategory = (data) => {
        openModal({
            size: "sm",
            content: <EventCategoryForm categoryData={data} closeModal={closeModal} reload={handleReload} />
        })
    }


    const handleDeleteCategory = (data) => {
        openModal({
            size: "sm",
            content: <DeleteModal api={`/api/admins/event/category/delete?event_category_id=${data.id}`} title={'Do you wish to delete this category?'} closeModal={closeModal} redirect={handleReload} />
        })
    }


    useEffect(() => {
        getCategories()
    }, []);


    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                    <Table title="" subTitle={<span>Event Categories</span>}
                        hasNumber
                        tableBtn={
                            <>
                                <Button className="bg-mobiPink p-2 rounded-lg" onClick={() => handleCreateCategory()}>
                                    <span className="cursor-pointer w-full">
                                        Create Categories
                                    </span>
                                </Button>
                            </>
                        }
                        tableHeader={TableHeaders}>
                        {eventCategories.length > 0 ?
                            eventCategories.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{index + 1}</td>
                                    <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.name}</td>
                                    <td className="px-3 py-3 text-mobiTableText whitespace-normal">{dateFormat(data.createdAt, 'dd-MM-yyyy')}</td>
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
                                                    <span className="cursor-pointer" onClick={() => handleEditCategory(data)}>
                                                        Edit
                                                    </span>
                                                </MenuItem>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleDeleteCategory(data)}>
                                                        Delete
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
                                        NO CATEGORIES AVAILABLE
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