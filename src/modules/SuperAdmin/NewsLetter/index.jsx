import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Header from "../header";
import { useEffect, useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";

export default function NewsletterSubscribers() {
    const [userInquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useApiMutation();


    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchNewsLetters()])
            .finally(() => setIsLoading(false));
    }, []);



    const fetchNewsLetters = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/admins/news-letters`,
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
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Newsletter Subscribers</p>
                            <p className="text-sm text-gray-600">
                                Total subscribers: <span className="font-semibold text-blue-600">{userInquiries.length}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="p-3 border border-gray-300">S/N</th>
                                    <th className="p-3 border border-gray-300">Email</th>
                                    <th className="p-3 border border-gray-300">Date</th>
                                    <th className="p-3 border border-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInquiries.length > 0 ? (
                                    userInquiries.map((userInquiry, index) => (
                                        <tr key={userInquiry.id} className="border border-gray-200 hover:bg-gray-50">
                                            <td className="p-3 border border-gray-300">{index + 1}</td>
                                            <td className="p-3 border border-gray-300">{userInquiry.email}</td>
                                            <td className="p-3 border border-gray-300">{dateFormat(userInquiry.createdAt, 'dd-MM-yyy')}</td>
                                            <td className="p-3 border border-gray-300">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    userInquiry.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {userInquiry.status.charAt(0).toUpperCase() + userInquiry.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">
                                            No newsletter subscribers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Mobile Version */}
                        <div className="md:hidden flex flex-col gap-4">
                            {userInquiries.length > 0 ? (
                                userInquiries.map((userInquiry, index) => (
                                    <div
                                        key={userInquiry.id}
                                        className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                                    >
                                        <div className="font-semibold text-sm text-gray-600 mb-1">
                                            S/N: <span className="font-normal">{index + 1}</span>
                                        </div>
                                        <div className="font-semibold text-sm text-gray-600 mt-2 mb-1">
                                            Email:
                                            <div className="font-normal mt-1 text-gray-800">{userInquiry.email}</div>
                                        </div>
                                        <div className="font-semibold text-sm text-gray-600 mt-2 mb-1">
                                            Date:
                                            <div className="font-normal mt-1 text-gray-800">{dateFormat(userInquiry.createdAt, 'dd-MM-yyy')}</div>
                                        </div>
                                        <div className="font-semibold text-sm text-gray-600 mt-2 mb-1">
                                            Status:
                                            <div className={`inline-block px-3 py-1 mt-1 text-xs font-medium rounded-full ${
                                                userInquiry.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {userInquiry.status.charAt(0).toUpperCase() + userInquiry.status.slice(1)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 text-gray-500">
                                    No newsletter subscribers found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
}