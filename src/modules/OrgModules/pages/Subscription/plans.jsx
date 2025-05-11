import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const OrganisationPlans = () => {
    const user = useSelector((state) => state.orgData.orgData);
    const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();


    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);


    const fetchSubscriptionPlans = () => {
        mutate({
            url: `/api/users/organization/subscription/plans`,
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
                <Header mobile organisation data={user} title={'Subscriptions (Organization)'} />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">Subscriptions (Organization)</p>
                            <p className="text-base">Subscription Module for : <span className="text-mobiBlue">
                                Organization
                            </span></p>
                        </div>
                    </div>
                    {subscriptionPlans.length > 0 ? (
                        <>
                            {/* Mobile view: vertical cards */}
                            <div className="md:hidden space-y-6">
                                {subscriptionPlans
                                    .slice()
                                    .reverse()
                                    .map((plan, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-700 rounded-md p-4 space-y-3 text-sm"
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold text-lg">{plan.name}</p>
                                                <button
                                                    onClick={() => navigate(`view/${plan.id}`)}
                                                    className="flex items-center gap-1 text-mobiBlue hover:text-mobiPink"
                                                >
                                                    <FaEye className="text-sm" />
                                                    <span className="text-sm">View</span>
                                                </button>
                                            </div>
                                            <ul className="list-disc ml-5 space-y-1">
                                                <li>Duration: <b>{plan.duration} month(s)</b></li>
                                                <li>Access Private Events: <b>{plan.accessPrivateEvent ? 'Yes' : 'No'}</b></li>
                                                <li>Access Semi-Private Events: <b>{plan.accessSemiPrivateEvent ? 'Yes' : 'No'}</b></li>
                                                <li>Free Events Only: <b>{plan.freeEventsOnly ? 'Yes' : 'No'}</b></li>
                                                <li>Event Upload Limit: <b>{plan.eventLimit}</b></li>
                                                <li>Verifiers Per Event: <b>{plan.verifiersPerEvent}</b></li>
                                                <li>Max Staff Members: <b>{plan.maxStaffs}</b></li>
                                                <li>Organization User Limit: <b>{plan.organizationUserLimit}</b></li>
                                                <li>Customized Templates Allowed: <b>{plan.customizedTemplateLimit}</b></li>
                                                <li>Default Template: <b>{plan.defaultTemplate ? 'Yes' : 'No'}</b></li>
                                                <li>Event Logs Access: <b>{plan.hasEventLogs ? 'Yes' : 'No'}</b></li>
                                                <li>Subscription Management: <b>{plan.subscriptionManagement ? 'Yes' : 'No'}</b></li>
                                                <li>Recurring Events: <b>{plan.recurringEvents ? 'Yes' : 'No'}</b></li>
                                                <li>Can Appoint Verifiers: <b>{plan.canAppointVerifiers ? 'Yes' : 'No'}</b></li>
                                                <li>Email Support Response Time: <b>{plan.emailSupport}</b></li>
                                                <li>Dedicated Support: <b>{plan.dedicated_support ? 'Yes' : 'No'}</b></li>
                                                <li>Amount: <b>{plan.amount > 0 ? `${plan.currency} ${plan.amount}` : 'Free'}</b></li>
                                            </ul>
                                        </div>
                                    ))}
                            </div>

                            {/* Desktop/tablet view: horizontal table */}
                            <div className="hidden md:block w-full overflow-x-auto">
                                <table className="min-w-[2200px] table-auto border-collapse border border-gray-700 text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-700 text-left">
                                            <th className="p-4 font-medium whitespace-nowrap">Organization</th>
                                            {subscriptionPlans
                                                .slice()
                                                .reverse()
                                                .map((plan, index) => (
                                                    <th
                                                        key={index}
                                                        className="p-4 font-medium border-l border-gray-700 whitespace-nowrap"
                                                    >
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
                                            {subscriptionPlans
                                                .slice()
                                                .reverse()
                                                .map((plan, index) => (
                                                    <td key={index} className="p-4 border-l border-gray-700 align-top">
                                                        <ul className="list-disc ml-4 space-y-6">
                                                            <li>Duration: <b>{plan.duration} month(s)</b></li>
                                                            <li>Access Private Events: <b>{plan.accessPrivateEvent ? 'Yes' : 'No'}</b></li>
                                                            <li>Access Semi-Private Events: <b>{plan.accessSemiPrivateEvent ? 'Yes' : 'No'}</b></li>
                                                            <li>Free Events Only: <b>{plan.freeEventsOnly ? 'Yes' : 'No'}</b></li>
                                                            <li>Event Upload Limit: <b>{plan.eventLimit}</b></li>
                                                            <li>Verifiers Per Event: <b>{plan.verifiersPerEvent}</b></li>
                                                            <li>Max Staff Members: <b>{plan.maxStaffs}</b></li>
                                                            <li>Organization User Limit: <b>{plan.organizationUserLimit}</b></li>
                                                            <li>Customized Templates Allowed: <b>{plan.customizedTemplateLimit}</b></li>
                                                            <li>Default Template: <b>{plan.defaultTemplate ? 'Yes' : 'No'}</b></li>
                                                            <li>Event Logs Access: <b>{plan.hasEventLogs ? 'Yes' : 'No'}</b></li>
                                                            <li>Subscription Management: <b>{plan.subscriptionManagement ? 'Yes' : 'No'}</b></li>
                                                            <li>Recurring Events: <b>{plan.recurringEvents ? 'Yes' : 'No'}</b></li>
                                                            <li>Can Appoint Verifiers: <b>{plan.canAppointVerifiers ? 'Yes' : 'No'}</b></li>
                                                            <li>Email Support Response Time: <b>{plan.emailSupport}</b></li>
                                                            <li>Dedicated Support: <b>{plan.dedicated_support ? 'Yes' : 'No'}</b></li>
                                                        </ul>
                                                    </td>
                                                ))}
                                        </tr>
                                        <tr className="border-b border-gray-700">
                                            <td className="p-4 font-medium whitespace-nowrap">Amount</td>
                                            {subscriptionPlans
                                                .slice()
                                                .reverse()
                                                .map((plan, index) => (
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
                        </>
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

export default OrganisationPlans;
