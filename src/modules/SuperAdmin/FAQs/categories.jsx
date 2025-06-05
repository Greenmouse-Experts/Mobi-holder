import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Header from "../header";
import DeleteModal from "../../../components/DeleteModal";
import ReusableModal from "../../../components/ReusableModal";
import useModal from "../../../hooks/modal";
import CreateCategory from "./modals/createCategory";
import { useEffect, useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import EditCategory from "./modals/editCategory";

export default function FAQCategories() {

    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const [faqs, setFaqs] = useState([]);

    const { mutate } = useApiMutation();


    useEffect(() => {
        getAllCategories();
    }, []);


    const getAllCategories = () => {
        mutate({
            url: `/api/admins/faq-categories?page=1&limit=100000`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setFaqs(response.data.data);
            },
            onError: () => {
                console.error("Failed to fetch categories");
            }
        });
    }



    const handleAddModal = () => {
        openModal({
            size: "sm",
            content: <CreateCategory closeModal={closeModal} redirect={getAllCategories} />
        })
    }


    const handleEditModal = (data) => {
        openModal({
            size: "sm",
            content: <EditCategory categoryData={data} closeModal={closeModal} redirect={getAllCategories} />
        })
    }



    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this Category?'} api={`/api/admins/faq-category?id=${id}`} redirect={getAllCategories} closeModal={closeModal} />
        })
    }


    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">FAQ Categories</p>
                        </div>
                        <div className="flex md:w-2/5 w-full justify-end">
                            <Button className="bg-mobiPink" onClick={() => handleAddModal()}>Add Category</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="p-3 border border-gray-300">S/N</th>
                                    <th className="p-3 border border-gray-300">Category</th>
                                    <th className="p-3 border border-gray-300">Account Type</th>
                                    <th className="p-3 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faqs.map((faq, index) => (
                                    <tr key={faq.id} className="border border-gray-200">
                                        <td className="p-3 border border-gray-300">{index + 1}</td>
                                        <td className="p-3 border border-gray-300">{faq.name}</td>
                                        <td className="p-3 border border-gray-300 capitalize">{faq.type}</td>
                                        <td className="p-3 border border-gray-300">
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <span className="cursor-pointer">☰</span>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => handleEditModal(faq)}>
                                                            Edit
                                                        </span>
                                                    </MenuItem>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => handleDeleteModal(faq.id)}>
                                                            Delete
                                                        </span>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Version */}
                        <div className="md:hidden flex flex-col gap-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        S/N: <span className="font-normal">{index + 1}</span>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        Question:
                                        <div className="font-normal mt-1 text-gray-800">{faq.name}</div>
                                    </div>
                                    <div className="text-right mt-2 text-xl">
                                        <Menu placement="left">
                                            <MenuHandler>
                                                <span className="cursor-pointer">☰</span>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleEditModal(faq)}>
                                                        Edit
                                                    </span>
                                                </MenuItem>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleDeleteModal(faq.id)}>
                                                        Delete
                                                    </span>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </div>
                            ))}
                        </div>
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


        </div>

    )
}