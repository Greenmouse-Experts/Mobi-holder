import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const IndividualPlans = () => {
    const user = useSelector((state) => state.userData.data);
    const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();


    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);


    const fetchSubscriptionPlans = () => {
        mutate({
            url: `/api/users/individual/subscription/plans`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptionPlans(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSubscriptionPlans([]);
            }
        })
    }



    if (loading) {
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
                <Header mobile data={user} />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscriptions (Individual)</p>
                            <p className="text-base">Subscription Module for : <span className="text-mobiBlue">
                                Individual
                            </span></p>
                        </div>
                    </div>
                    {subscriptionPlans.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-[2200px] table-auto border-collapse border border-gray-700 text-sm">
                            <thead>
                                    <tr className="border-b border-gray-700 text-left">
                                        <th className="p-4 font-medium whitespace-nowrap">Individuals</th>
                                        {subscriptionPlans.slice().reverse().map((plan, index) => (
                                            <th key={index} className="p-4 font-medium border-l border-gray-700 whitespace-nowrap">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span>{plan.name}</span>
                                                    <button
                                                        onClick={() => navigate(`view/${plan.id}`)}
                                                        className="flex items-center gap-1 text-mobiBlue hover:text-mobiPink"
                                                    >
                                                        <FaEye className="text-sm" />
                                                        <span className="text-sm">View</span>
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="align-top border-b border-gray-700">
                                        <td className="p-4 font-medium whitespace-nowrap">Features</td>
                                        {subscriptionPlans.slice().reverse().map((plan, index) => (
                                            <td key={index} className="p-4 border-l border-gray-700">
                                                <ul className="list-disc ml-4 space-y-2">
                                                    <li>Duration: <b>{plan.duration} month(s)</b></li>
                                                    <li>Number of Uploadable Events: <b>{plan.eventLimit}</b></li>
                                                    <li>Access to Event Log: <b>{plan.eventLogsAccess ? 'Yes' : 'No'}</b></li>
                                                    <li>Free ticket events: <b>{plan.freeTicketEvents ? 'Yes' : 'No'}</b></li>
                                                    <li>Paid ticket events: <b>{plan.paidTicketEvents ? 'Yes' : 'No'}</b></li>
                                                    <li>Number of Self Scanned IDs: <b>{plan.selfScannedIds}</b></li>
                                                    {plan.selfVerification && <li>Self verification for events</li>}
                                                    <li>Verifiers Per Event: <b>{plan.verifiersPerEvent}</b></li>
                                                </ul>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <td className="p-4 font-medium whitespace-nowrap">Amount</td>
                                        {subscriptionPlans.slice().reverse().map((plan, index) => (
                                            <td key={index} className="p-4 border-l border-gray-700">
                                                {plan.amount > 0 ? (
                                                    <span>{plan.currency} {plan.amount}</span>
                                                ) : (
                                                    <span>Free</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            No subscription plans available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndividualPlans;
