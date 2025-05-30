import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Header from "../header";
import ReusableModal from "../../../components/ReusableModal";
import useModal from "../../../hooks/modal";
import { useEffect, useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";

export default function UserInquiries() {

    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const [userInquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useApiMutation();


    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchInquiries()])
            .finally(() => setIsLoading(false));
    }, []);



    const fetchInquiries = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/admins/contact-us?page=1&limit=50`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => {
                    setInquiries(response.data.data);
                    resolve();
                },
                onError: (err) => {
                    console.error("Failed to fetch FAQs");
                    reject(err);
                }
            });
        });
    };







    const closeInquiry = (id) => {
        mutate({
            url: `/api/admins/contact-us/status/update`,
            method: "PUT",
            headers: true,
            data: { id, status: "responded" },
            onSuccess: () => {
                fetchInquiries();;
            },
            onError: (err) => {
                console.error("Failed to fetch FAQs");
            }
        });
    };










    if (isLoading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            </>
        )
    }







    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">User Inquiries</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="p-3 border border-gray-300">S/N</th>
                                    <th className="p-3 border border-gray-300">User</th>
                                    <th className="p-3 border border-gray-300">Email</th>
                                    <th className="p-3 border border-gray-300">Subject</th>
                                    <th className="p-3 border border-gray-300">Message</th>
                                    <th className="p-3 border border-gray-300">Status</th>
                                    <th className="p-3 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInquiries.map((userInquiry, index) => (
                                    <tr key={userInquiry.id} className="border border-gray-200">
                                        <td className="p-3 border border-gray-300">{index + 1}</td>
                                        <td className="p-3 border border-gray-300">{userInquiry.name}</td>
                                        <td className="p-3 border border-gray-300">{userInquiry.email}</td>
                                        <td className="p-3 border border-gray-300">{userInquiry.subject}</td>
                                        <td className="p-3 border border-gray-300">{userInquiry.message}</td>
                                        <td className="p-3 border border-gray-300">
                                            <span
                                                className={`px-3 py-2 rounded-full text-xs font-medium
      ${userInquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
      ${userInquiry.status === 'responded' ? 'bg-green-100 text-green-800' : ''}
    `}
                                            >
                                                {userInquiry.status.charAt(0).toUpperCase() + userInquiry.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center">
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <span className="cursor-pointer">☰</span>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => closeInquiry(userInquiry.id)}>
                                                            Mark as Closed
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
                            {userInquiries.map((userInquiry, index) => (
                                <div
                                    key={userInquiry.id}
                                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        S/N: <span className="font-normal">{index + 1}</span>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                        User:
                                        <div className="font-normal mt-1 text-gray-800">{userInquiry.name}</div>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                        Email:
                                        <div className="font-normal mt-1 text-gray-800">{userInquiry.email}</div>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                        Subject:
                                        <div className="font-normal mt-1 text-gray-800">{userInquiry.subject}</div>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                        Message:
                                        <div className="font-normal mt-1 text-gray-800">{userInquiry.message}</div>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                        Status:
                                        <div className={`mt-1 px-3 py-2 rounded-full text-sm font-medium w-fit
  ${userInquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
  ${userInquiry.status === 'responded' ? 'bg-green-100 text-green-800' : ''}
`}>
                                            {userInquiry.status.charAt(0).toUpperCase() + userInquiry.status.slice(1)}
                                        </div>
                                    </div>
                                    <div className="text-right mt-2 text-xl">
                                        <Menu placement="left">
                                            <MenuHandler>
                                                <span className="cursor-pointer">☰</span>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleDeleteModal(userInquiry.id)}>
                                                        Mark as Closed
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