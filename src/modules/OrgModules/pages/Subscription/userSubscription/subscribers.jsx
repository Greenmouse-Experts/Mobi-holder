import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../../api/hooks/useApiMutation";
import Header from "../../../../../components/Header";
import Table from "../../../../../components/Tables";
import Loader from "../../../../../components/Loader";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { dateFormat } from "../../../../../helpers/dateHelper";


export default function MySubscribers() {
    const user = useSelector((state) => state.orgData.orgData);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);



    const { mutate } = useApiMutation();







    const getSubscribers = () => {
        mutate({
            url: `/api/memberships-subscriptions/get/subscribers`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptions(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    };








    useEffect(() => {
        getSubscribers();
    }, []);






    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subscriptions.slice(indexOfFirstItem, indexOfLastItem);




    const handlePageChange = (page) => {
        setCurrentPage(page);
    };







    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }






    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} title='Subscription' />
                <Table
                    title="My Subscribers"
                    subTitle=""
                    filter
                    exportData
                    hasNumber={false}
                    tableHeader={["Name", "Plan", "Validity", "Amount", "Start Date", "End Date"]}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    handleExportDataClick={() => console.log("Export clicked")}
                    sortFunc={(field, direction) => console.log(`Sort by ${field} ${direction}`)}
                >
                    {currentItems.map((subscription, index) => (
                        <tr key={subscription.id} className={index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}>
                            <td className="px-3 py-3 text-mobiTableText">{`${subscription?.individual.firstName} ${subscription?.individual.lastName}` || 'N/A'}</td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {subscription?.plan.name || 'N/A'}
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {subscription?.plan.validity || 'N/A'} month(s)
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {subscription?.plan.price || 'N/A'}
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {dateFormat(subscription?.startDate, 'dd-MM-yyy') || 'N/A'}
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {dateFormat(subscription?.endDate, 'dd-MM-yyy') || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>


        </div>
    );
}