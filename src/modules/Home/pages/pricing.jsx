import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import plansImg from "../../../assets/plans.png";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
    const user = useSelector((state) => state.userData.data);
    const org = useSelector((state) => state.orgData.orgData);

    const [tab, setTab] = useState(user ? "individual" : org ? "organization" : "individual");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const { mutate } = useApiMutation();


    useEffect(() => {
        fetchSubscriptionPlans(tab);
    }, [tab]);


    const fetchSubscriptionPlans = (type) => {
        setLoading(true);
        mutate({
            url: type === "individual"
                ? `/api/admins/public/individual/subscription/plans`
                : `/api/admins/public/organization/subscription/plans`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (res) => {
                const plans = res.data.data;
                setSubscriptionPlans(plans);
                setSelectedPlan(plans.length > 0 ? plans[0].name : null);
                setLoading(false);
            },
            onError: () => {
                setSubscriptionPlans([]);
                setSelectedPlan(null);
                setLoading(false);
            }
        });
    };


    const getPlanFeatures = (plan, tab) => {
        const pluralize = (count, singular, plural = singular + "s") =>
            `${count} ${count === 1 ? singular : plural}`;

        const features = [];

        if (tab === "individual") {
            if (plan.organizationIssuedCards) features.push("Organization Issued Cards");
            if (plan.selfScannedIds > 0) features.push(`${pluralize(plan.selfScannedIds, "Self ID")} per month`);
            if (plan.membershipViaInvitation) features.push("Membership via Invitation");
            if (plan.membershipRequestInitiate) features.push("Can Initiate Membership Requests");
            if (plan.freeTicketEvents) features.push("Free Ticket Events");
            if (plan.paidTicketEvents) features.push("Paid Ticket Events");
            if (plan.eventLogsAccess) features.push("Event Logs Access");
            if (plan.selfVerification) features.push("Self Verification");
            if (plan.verifiersPerEvent > 0) features.push(`${pluralize(plan.verifiersPerEvent, "Verifier")} per event`);
            if (plan.eventLimit > 0) features.push(`${pluralize(plan.eventLimit, "Event")} Limit`);
        } else if (tab === "organization") {
            if (plan.maxStaffs) features.push(`${pluralize(Number(plan.maxStaffs), "Staff")}`);
            if (plan.organizationUserLimit) features.push(`${pluralize(Number(plan.organizationUserLimit), "Organisation User")}`);
            if (plan.eventLimit) features.push(`${pluralize(Number(plan.eventLimit), "Event")} Limit`);
            if (plan.verifiersPerEvent) features.push(`${pluralize(Number(plan.verifiersPerEvent), "Verifier")} per event`);
            if (plan.recurringEvents) features.push("Can create Recurring Events");
            if (plan.freeEventsOnly) features.push("Can create Free Events Only");
            if (plan.accessPrivateEvent) features.push("Private Event Access");
            if (plan.accessSemiPrivateEvent) features.push("Semi-Private Event Access");
            if (plan.subscriptionManagement) features.push("Subscription Management");
            if (plan.canAppointVerifiers) features.push("Can Appoint Verifiers");
            if (plan.hasEventLogs) features.push("Event Logs Access");
            if (plan.customizedTemplateLimit && plan.customizedTemplateLimit !== "0") features.push(`${pluralize(Number(plan.customizedTemplateLimit), "Custom Template")}`);
            if (plan.defaultTemplate) features.push("Can set a default Template");
            if (plan.emailSupport) features.push(`Email Support: ${plan.emailSupport}`);
            if (plan.dedicated_support) features.push("Dedicated Support Avaliable");
        }

        return features;
    };

    const handleTabChange = (newTab) => {
        if (newTab !== tab) {
            setTab(newTab);
        }
    };

    return (
        <div className="flex flex-col w-full h-full animate__animated animate__fadeIn">
            <div className="w-full h-full relative">
                <div
                    className="absolute bg-cover bg-center md:top-[0px] top-[20px] w-full h-full"
                    style={{
                        backgroundImage:
                            "url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)"
                    }}
                />
                <div className="absolute w-full md:top-[0px] top-[20px] h-full bg-black bg-opacity-40" />
                <Header />
                <div className="w-full lg:mt-10 md:mt-10 mt-[40px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                    <p className="md:text-5xl text-3xl text-white font-bold mb-5 md:leading-[90px]">Pricing</p>
                </div>
            </div>

            <div className="w-full h-full relative bg-[rgba(249,247,243,1)] py-5 md:py-10">
                <div className="min-h-screen bg-[rgba(13,14,29,1)] text-white md:rounded-2xl w-full flex flex-col items-center py-5 md:py-20">
                    <h2 className="text-2xl md:text-5xl text-center font-bold gradient-text-r md:w-[40%] px-10 md:px-0 mb-7">
                        Choose a plan that best suits you
                    </h2>

                    <div className="flex justify-center gap-4 my-6">
                        <button
                            onClick={() => handleTabChange("individual")}
                            disabled={org ? true : false}
                            className={`px-4 py-2 rounded-full font-semibold ${tab === "individual"
                                    ? "bg-white text-black"
                                    : "bg-transparent border border-white text-white"
                                }`}
                        >
                            Individual Plan
                        </button>
                        <button
                            onClick={() => handleTabChange("organization")}
                            disabled={user ? true : false}
                            className={`px-4 py-2 rounded-full font-semibold ${tab === "organization"
                                    ? "bg-white text-black"
                                    : "bg-transparent border border-white text-white"
                                }`}
                        >
                            Organization Plan
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-white">Loading plans...</p>
                        </div>
                    ) : subscriptionPlans.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-white">No plans available</p>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row md:justify-center md:items-start px-5 md:px-20 gap-10">
                            {subscriptionPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`p-6 rounded-lg flex flex-col shadow-md w-full max-w-md bg-custom-gradient backdrop-blur-40 ${selectedPlan === plan.name ? "border border-custom" : ""
                                        }`}
                                >
                                    <div className="mt-3">
                                        {selectedPlan === plan.name ? (
                                            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                                                <rect width="40" height="40" rx="20" fill="url(#grad)" />
                                                <path
                                                    d="M30 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm-15.5 0c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5-5.5 2.5-5.5 5.5z"
                                                    fill="black"
                                                />
                                                <defs>
                                                    <linearGradient id="grad" x1="20" y1="0" x2="20" y2="40">
                                                        <stop stopColor="#2BFFFF" />
                                                        <stop offset="1" stopColor="#2BFFFF" stopOpacity="0.41" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <img src={plansImg} width={24} alt="Plan" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-semibold mt-5 mb-2">{plan.name}</h3>
                                    <div className="text-xl font-medium my-6">
                                        {plan.currency} {plan.amount.toLocaleString()}
                                        <span className="text-xs"> / {plan.duration} month{plan.duration > 1 ? "s" : ""}</span>
                                    </div>

                                    <button
                                        onClick={() => user ? navigate(`/app/subscription/plans/view/${plan.id}`) : org ? navigate(`/org/subscription/plans/view/${plan.id}`) : navigate('/login')}
                                        className={`w-full py-2 font-semibold rounded-full shadow-md ${selectedPlan === plan.name
                                                ? "bg-[rgba(255,43,255,1)] text-white"
                                                : "bg-btn-gradient"
                                            }`}
                                        style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                                    >
                                        {plan.amount === 0 ? "Get Free Plan" : "Get Started"}
                                    </button>

                                    <div className="w-full mt-10 border-t border-white/20" />

                                    <ul className="mt-6 space-y-3">
                                        <span className="font-semibold">Features</span>
                                        {getPlanFeatures(plan, tab).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12.7131 3.29875C15.3598 5.94542 15.3131 10.2654 12.5798 12.8587C10.0531 15.2521 5.95315 15.2521 3.41981 12.8587C0.679812 10.2654 0.633137 5.94542 3.28647 3.29875C5.88647 0.692083 10.1131 0.692083 12.7131 3.29875Z"
                                                        stroke="white"
                                                        strokeOpacity="0.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328"
                                                        stroke="white"
                                                        strokeOpacity="0.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PricingPlans;
