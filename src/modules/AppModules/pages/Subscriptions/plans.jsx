import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const IndividualPlans = () => {
    const user = useSelector((state) => state.userData.data);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    const fetchSubscriptionPlans = () => {
        setLoading(true);
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
        });
    };

    const featureRows = [
        { label: "Duration", render: (plan) => `${plan.duration} month(s)` },
        { label: "Uploadable Events", render: (plan) => plan.eventLimit },
        { label: "Event Log Access", render: (plan) => (plan.eventLogsAccess ? "Yes" : "No") },
        { label: "Free Ticket Events", render: (plan) => (plan.freeTicketEvents ? "Yes" : "No") },
        { label: "Paid Ticket Events", render: (plan) => (plan.paidTicketEvents ? "Yes" : "No") },
        { label: "Self Scanned IDs", render: (plan) => plan.selfScannedIds },
        { label: "Self Verification", render: (plan) => (plan.selfVerification ? "Yes" : "No") },
        { label: "Verifiers per Event", render: (plan) => plan.verifiersPerEvent },
        { label: "Amount", render: (plan) => (plan.amount > 0 ? `${plan.currency} ${plan.amount}` : "Free") },
    ];

    const renderFeature = (label, value) => (
        <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="montserrat">{label}:</span>
            <span className="montserrat text-right font-semibold">{value}</span>
        </div>
    );

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
                <Header mobile data={user} title={'Subscriptions (Individual)'} />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">Subscriptions (Individual)</p>
                            <p className="text-base">Subscription Module for: <span className="text-mobiBlue">Individual</span></p>
                        </div>
                    </div>

                    {subscriptionPlans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className="border border-gray-200 rounded-xl p-4 h-full shadow-sm flex flex-col"
                                >
                                    {/* Scrollable content area */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-semibold text-mobiBlue mb-2">
                                            {plan.name}
                                        </h3>

                                        {featureRows.map((feature, i) => (
                                            <React.Fragment key={i}>
                                                {renderFeature(feature.label, feature.render(plan))}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {/* Fixed button area at bottom */}
                                    <div className="mt-4 pt-4">
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            className="text-mobiBlue border-mobiBlue w-full"
                                            onClick={() => navigate(`view/${plan.id}`)}
                                        >
                                            View Plan
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

export default IndividualPlans;