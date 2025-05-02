import React, { useEffect } from "react";
import Header from "../header";
import { Link } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";

const IndividualPlan = () => {

    const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { mutate } = useApiMutation();

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);


    const fetchSubscriptionPlans = () => {
        mutate({
            url: `/api/admins/individual/subscription/plans`,
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
                <Header mobile superAdmin />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscriptions (Individual)</p>
                            <p className="text-base">Subscription Module for : <span className="text-mobiBlue">
                                Individual
                            </span></p>
                        </div>
                    </div>
                    <table className="table-auto border-collapse w-full border border-gray-700 text-sm">
                        <thead>
                            <tr className="border-b border-gray-700 text-left">
                                <th className="p-4 font-medium">Individuals</th>
                                {subscriptionPlans.slice().reverse().map((plan, index) => (
                                    <th key={index} className="p-4 font-medium border-l border-gray-700">
                                        {plan.name}
                                    </th>
                                ))}
                                <th className="p-4 font-medium border-l border-gray-700 text-purple-500 underline cursor-pointer">
                                    <Link to={'create'}> Add New Plan</Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="align-top border-b border-gray-700">
                                <td className="p-4 font-medium">Features</td>
                                {subscriptionPlans.slice().reverse().map((plan, index) => (
                                    <td className="p-4 border-l border-gray-700">
                                        <ul className="list-disc ml-4 space-y-2">
                                            <li>Duration: <b>{plan.duration} month(s)</b></li>
                                            <li>Number of Uploadable Events : <b>{plan.eventLimit}</b></li>
                                            <li>Access to Event Log : <b>{plan.eventLogsAccess ? 'Yes' : 'No'}</b></li>
                                            <li>Free ticket events : <b>{plan.freeTicketEvents ? 'Yes' : 'No'}</b></li>
                                            <li>Self verification for events</li>
                                            <li>Can only create 1 Semi-private or Private event/month</li>
                                        </ul>
                                    </td>
                                ))}
                                <td className="p-4 border-l border-gray-700"></td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="p-4 font-medium">Amount</td>
                                <td className="p-4 border-l border-gray-700">None</td>
                                <td className="p-4 border-l border-gray-700">₦2,000/Month</td>
                                <td className="p-4 border-l border-gray-700"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IndividualPlan;
