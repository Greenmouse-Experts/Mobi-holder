import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";


const ViewPlan = () => {
    const user = useSelector((state) => state.orgData.orgData);
    const [subscriptionPlan, setSubscriptionPlan] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [disabled, setDisabled] = React.useState(false);
    const [gatewayKeys, setGatewayKeys] = React.useState({});

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const { id, status } = useParams();


    useEffect(() => {
        fetchSubscriptionPlan();
        fetchGateway();
    }, []);


    const fetchSubscriptionPlan = () => {
        mutate({
            url: `/api/users/organization/subscription/plan?id=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptionPlan(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSubscriptionPlan({});
            }
        })
    }



    const fetchGateway = () => {
        mutate({
            url: `/api/users/fetch/subscription/payment/gateway`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setGatewayKeys(response.data.data);
            },
            onError: () => {
            }
        })
    }




    const onSuccess = (reference) => {
        setDisabled(true);
        mutate({
            url: `/api/users/organization/subscribe`,
            method: "POST",
            headers: true,
            data: { planId: id, refId: reference.reference, autoRenew: false },
            onSuccess: (response) => {
                setGatewayKeys(response.data.data);
                setDisabled(false);
                navigate(-1);
            },
            onError: () => {
                setDisabled(false);
            }
        })
    };

    const onClose = () => {
        console.log("Payment closed");
    };


    const paystackConfig = {
        reference: new Date().getTime().toString(),
        email: 'greenmousedev@gmail.com',
        amount: subscriptionPlan.amount > 0 ? subscriptionPlan.amount * 100 : 0,
        publicKey: `${gatewayKeys?.publicKey}`,
        currency: `${subscriptionPlan.currency}`,
    };

    const initializePayment = usePaystackPayment(paystackConfig);



    const handlePayment = () => {
        if (subscriptionPlan.amount > 0) {
            initializePayment({ onSuccess, onClose });
        }
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
                <Header mobile organisation data={user} />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscriptions (Organisation)</p>
                            <p className="text-base">Subscription Module for : <span className="text-mobiBlue">
                                Organisation
                            </span></p>
                        </div>
                            <div className="flex md:w-2/5 w-full justify-end">
                                {status !== 'active' ? (
                                    subscriptionPlan.name !== 'Free Plan' ? (
                                        <Button disabled={disabled} className="bg-mobiPink" onClick={() => handlePayment()}>Subscribe</Button>
                                    )
                                        :
                                        (<></>)
                                ) :
                                    (
                                        <Button className="bg-green-500">Active Plan</Button>
                                    )}
                            </div>
                    </div>
                    <div className="overflow-x-auto">


                        {/* Mobile view (vertical list) */}
                        <div className="md:hidden space-y-4 border border-gray-700 p-4 text-sm">
                            <div>
                                <p className="font-medium">Plan</p>
                                <p className="font-bold text-lg">{subscriptionPlan.name}</p>
                            </div>
                            <div>
                                <p className="font-medium">Duration</p>
                                <p><b>{subscriptionPlan.duration} month(s)</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Access Private Events</p>
                                <p><b>{subscriptionPlan.accessPrivateEvent ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Access Semi-Private Events</p>
                                <p><b>{subscriptionPlan.accessSemiPrivateEvent ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Free Events Only</p>
                                <p><b>{subscriptionPlan.freeEventsOnly ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Event Upload Limit</p>
                                <p><b>{subscriptionPlan.eventLimit}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Verifiers Per Event</p>
                                <p><b>{subscriptionPlan.verifiersPerEvent}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Max Staff Members</p>
                                <p><b>{subscriptionPlan.maxStaffs}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Organization User Limit</p>
                                <p><b>{subscriptionPlan.organizationUserLimit}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Customized Templates Allowed</p>
                                <p><b>{subscriptionPlan.customizedTemplateLimit}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Default Template</p>
                                <p><b>{subscriptionPlan.defaultTemplate ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Event Logs Access</p>
                                <p><b>{subscriptionPlan.hasEventLogs ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Subscription Management</p>
                                <p><b>{subscriptionPlan.subscriptionManagement ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Recurring Events</p>
                                <p><b>{subscriptionPlan.recurringEvents ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Can Appoint Verifiers</p>
                                <p><b>{subscriptionPlan.canAppointVerifiers ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Email Support Response Time</p>
                                <p><b>{subscriptionPlan.emailSupport}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Dedicated Support</p>
                                <p><b>{subscriptionPlan.dedicated_support ? 'Yes' : 'No'}</b></p>
                            </div>
                            <div>
                                <p className="font-medium">Amount</p>
                                <p>
                                    {subscriptionPlan.amount > 0 ? (
                                        <span>{subscriptionPlan.currency} {subscriptionPlan.amount}</span>
                                    ) : (
                                        <span>Free</span>
                                    )}
                                </p>
                            </div>
                        </div>



                        {/* Desktop view (table) */}
                        <table className="hidden md:table min-w-[700px] table-auto border-collapse w-full border border-gray-700 text-sm">
                            <thead>
                                <tr className="border-b border-gray-700 text-left">
                                    <th className="p-4 font-medium whitespace-nowrap">Plan</th>
                                    <th className="p-4 font-medium border-l border-gray-700 whitespace-nowrap">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="md:text-lg font-bold">{subscriptionPlan.name}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-top border-b border-gray-700">
                                    <td className="p-4 font-medium whitespace-nowrap">Features</td>
                                    <td className="p-4 border-l border-gray-700">
                                        <ul className="list-disc ml-4 space-y-2">
                                            <li>Duration: <b>{subscriptionPlan.duration} month(s)</b></li>
                                            <li>Access Private Events: <b>{subscriptionPlan.accessPrivateEvent ? 'Yes' : 'No'}</b></li>
                                            <li>Access Semi-Private Events: <b>{subscriptionPlan.accessSemiPrivateEvent ? 'Yes' : 'No'}</b></li>
                                            <li>Free Events Only: <b>{subscriptionPlan.freeEventsOnly ? 'Yes' : 'No'}</b></li>
                                            <li>Event Upload Limit: <b>{subscriptionPlan.eventLimit}</b></li>
                                            <li>Verifiers Per Event: <b>{subscriptionPlan.verifiersPerEvent}</b></li>
                                            <li>Max Staff Members: <b>{subscriptionPlan.maxStaffs}</b></li>
                                            <li>Organization User Limit: <b>{subscriptionPlan.organizationUserLimit}</b></li>
                                            <li>Customized Templates Allowed: <b>{subscriptionPlan.customizedTemplateLimit}</b></li>
                                            <li>Default Template: <b>{subscriptionPlan.defaultTemplate ? 'Yes' : 'No'}</b></li>
                                            <li>Event Logs Access: <b>{subscriptionPlan.hasEventLogs ? 'Yes' : 'No'}</b></li>
                                            <li>Subscription Management: <b>{subscriptionPlan.subscriptionManagement ? 'Yes' : 'No'}</b></li>
                                            <li>Recurring Events: <b>{subscriptionPlan.recurringEvents ? 'Yes' : 'No'}</b></li>
                                            <li>Can Appoint Verifiers: <b>{subscriptionPlan.canAppointVerifiers ? 'Yes' : 'No'}</b></li>
                                            <li>Email Support Response Time: <b>{subscriptionPlan.emailSupport}</b></li>
                                            <li>Dedicated Support: <b>{subscriptionPlan.dedicated_support ? 'Yes' : 'No'}</b></li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="p-4 font-medium whitespace-nowrap">Amount</td>
                                    <td className="p-4 border-l border-gray-700">
                                        {subscriptionPlan.amount > 0 ? (
                                            <span>{subscriptionPlan.currency} {subscriptionPlan.amount}</span>
                                        ) : (
                                            <span>Free</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPlan;
