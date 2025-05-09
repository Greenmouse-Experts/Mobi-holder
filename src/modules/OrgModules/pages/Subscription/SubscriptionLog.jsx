import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import Loader from "../../../../components/Loader";
import Badge from "../../../../components/Badge";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionLog() {
    const user = useSelector((state) => state.orgData.orgData);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const navigate = useNavigate();
    const { mutate } = useApiMutation();

    const getSubscriptions = () => {
        mutate({
            url: `/api/users/organization/subscriptions`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptions(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSubscriptions([]);
            }
        });
    };

    useEffect(() => {
        getSubscriptions();
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
                <Header mobile data={user} title='My Subscriptions' />
                <Table
                    title="Today"
                    subTitle="My Subscriptions"
                    filter
                    exportData
                    hasNumber={false}
                    tableHeader={["Plan", "Validity", "Amount", "Status", "Action"]}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    handleExportDataClick={() => console.log("Export clicked")}
                    sortFunc={(field, direction) => console.log(`Sort by ${field} ${direction}`)}
                >
                    {currentItems.map((subscription, index) => (
                        <tr key={subscription.id} className={index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}>
                            <td className="px-3 py-3 text-mobiTableText">{subscription.plan?.name || 'N/A'}</td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {subscription.plan?.duration || 'N/A'} month(s)
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                {subscription.plan?.currency || ''} {subscription.plan?.amount || 'N/A'}
                            </td>
                            <td className="px-3 py-3 text-mobiTableText">
                                <Badge
                                    status={subscription.status}
                                    color={subscription.status === "active" ? "#4CAF50" : "inactive"}
                                    textColor={subscription.status === "active" ? "#FFFFFF" : "#000000"}
                                />
                            </td>
                            <td className="px-6 py-3">
                                <Menu placement="left">
                                    <MenuHandler>
                                        <button className="flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
                                                    stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem onClick={() => navigate(`/org/subscription/plans/view/${subscription.plan?.id}/${subscription.status}`)}>
                                            View Plan
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </div>
    );
}