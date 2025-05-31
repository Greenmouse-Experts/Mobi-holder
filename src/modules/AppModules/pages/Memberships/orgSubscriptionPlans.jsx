import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import SafeHTML from "../../../../helpers/safeHTML";
import { usePaystackPayment } from "react-paystack";

const OrgSubscriptionPlans = () => {
    const user = useSelector((state) => state.userData.data);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [organization, setOrganization] = useState({});
    const [paymentGateway, setGateway] = useState({});
    let planDetails = null;
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const { mutate } = useApiMutation();
    const navigate = useNavigate();



    useEffect(() => {
        setLoading(true);
        Promise.all([fetchSubscriptionPlans(), fetchOrganization(), fetchOrgPaymentGateway()])
            .finally(() => setLoading(false));
    }, []);




    const fetchSubscriptionPlans = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/memberships-subscriptions/organization/subscription/plans?organizationId=${id}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => {
                    setSubscriptionPlans(response.data.data);
                    resolve();
                },
                onError: (err) => {
                    setSubscriptionPlans([]);
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





    const fetchOrgPaymentGateway = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/memberships-subscriptions/organization/payment-gateway?organizationId=${id}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => {
                    setGateway(response.data.data);
                    resolve();
                },
                onError: (err) => {
                    reject(err);
                }
            });
        });
    };





    const onSuccess = (reference) => {
        mutate({
            url: `/api/memberships-subscriptions/subscribe`,
            method: "POST",
            data: {
                planId: planDetails?.id,
                refId: reference.reference,
                organizationId: id,
            },
            headers: true,
            onSuccess: (response) => {
                navigate(-1);
            },
            onError: (err) => {
            }
        });

    }




    const onClose = () => {
        console.log("Payment closed");
    };





    const handlePayment = (plan) => {
        planDetails = plan;
        const paystackConfig = {
            reference: new Date().getTime().toString(),
            email: 'greenmousedev@gmail.com',
            amount: Number(plan?.price) > 0 ? Number(plan.price) * 100 : 0,
            publicKey: `${paymentGateway?.publicKey}`,
            currency: `NGN`,
            subaccount: `${paymentGateway?.subaccountCode}`
        };

        const initializePayment = usePaystackPayment(paystackConfig);

        initializePayment({ onSuccess, onClose });
    }









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
                <Header mobile data={user} title={'Membership Subscription'} />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                                Membership Subscription
                            </p>
                            <p className="text-base">Subscription Module for: <span className="text-mobiBlue">{organization.companyName}</span></p>
                        </div>
                    </div>

                    {subscriptionPlans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className="border border-gray-200 rounded-xl p-4 h-full shadow-md flex flex-col"
                                >
                                    {/* Scrollable content area */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-semibold text-mobiBlue mb-2">
                                            {plan.name}
                                        </h3>

                                        <SafeHTML htmlContent={plan.description} />

                                        <h3 className="text-sm font-semibold my-4">
                                            NGN {plan.price}
                                        </h3>
                                    </div>

                                    {/* Fixed button area at bottom */}
                                    <div className="mt-1 pt-4">
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            className="text-mobiBlue border-mobiBlue w-full"
                                            onClick={() => handlePayment(plan)}
                                        >
                                            Subscribe
                                        </Button>
                                    </div>
                                </div>
                            ))}
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

export default OrgSubscriptionPlans;