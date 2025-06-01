import { useSelector } from "react-redux"
import Header from "../../../../components/Header"
import Table from "../../../../components/Tables";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import Badge from "../../../../components/Badge";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import useModal from "../../../../hooks/modal";
import ReusableModal from "../../../../components/ReusableModal";
import SubscriptionPlanDetails from "./modal/subscriptionPlanDetails";

const OrgSubscriptionLog = () => {
    const user = useSelector((state) => state.userData.data);
    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const [isLoading, setLoading] = useState(true);
    const [subscriptionHistory, setSubscriptionHistory] = useState([]);
    const [organization, setOrganization] = useState({});

    const { id } = useParams();

    const { mutate } = useApiMutation();



    useEffect(() => {
        setLoading(true);
        Promise.all([fetchSubscriptionHistory(), fetchOrganization()])
            .finally(() => setLoading(false));
    }, []);





    const fetchSubscriptionHistory = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/memberships-subscriptions/individual/subscriptions?organizationId=${id}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => {
                    setSubscriptionHistory(response.data.data);
                    resolve();
                },
                onError: (err) => {
                    setSubscriptionHistory([]);
                    reject(err);
                }
            });
        });
    };







    const fetchOrganization = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/users/${id}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => {
                    setOrganization(response.data.data);
                    resolve();
                },
                onError: (err) => {
                    reject(err);
                }
            });
        });
    };




    const handleViewPlan = (data) => {
        openModal({
            size: "sm",
            content: <SubscriptionPlanDetails closeModal={closeModal} plan={data} />
        })
    }




    const TableHeaders = ["Plan", "Amount", "Validity", "Start Date", "End Date", "Status", "Action"];





    return (
        <>

            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} title={'Membership Subscription'} />
                    <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                        <div className="w-full flex justify-between items-center gap-8 my-2 px-3">
                            <div className="w-full flex flex-col gap-2">
                                <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                                    Membership Subscription
                                </p>
                                <p className="text-base">My Subscription Log with: <span className="text-mobiBlue">{organization.companyName}</span></p>
                            </div>
                        </div>


                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5">
                            <Table title="My Subscriptions" filter exportData
                                tableHeader={TableHeaders}
                            >
                                {subscriptionHistory.length > 0 ?
                                    subscriptionHistory
                                        .map((data, index) => (
                                            <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                <td className="px-3 py-3 text-mobiTableText">{data.plan.name}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{data.plan.price}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{data.plan.validity} month(s)</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.startDate, 'dd-MM-yyy')}</td>
                                                <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.endDate, 'dd-MM-yyy')}</td>
                                                <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                                <td className="px-6 py-3">
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
                                                                <span className="cursor-pointer" onClick={() => handleViewPlan(data?.plan)}>
                                                                    View Details
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
                                        </tr>
                                }
                            </Table>
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

        </>
    )
};

export default OrgSubscriptionLog;