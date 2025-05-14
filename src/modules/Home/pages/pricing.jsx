import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import plansImg from "../../../assets/plans.png";
import useApiMutation from "../../../api/hooks/useApiMutation";

const PricingPlans = () => {
    const [tab, setTab] = useState("individual");
    const [selectedPlan, setSelectedPlan] = useState("Enterprise");
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [loading, setLoading] = useState(true);


    const { mutate } = useApiMutation();

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);


  /*  const fetchSubscriptionPlans = () => {
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
*/


    const individualPlans = [
        {
            name: "Basic",
            price: "Free",
            description: "Best for personal use.",
            features: [
                "Access to Memberships",
                "Access to Events",
                "Access to Verifications",
                "Add 10 IDs",
                "Communication tools",
                "Reporting and analytics"
            ],
        },
        {
            name: "Enterprise",
            price: "N20,000",
            duration: "/ per month",
            description: "For small teams & companies.",
            features: [
                "Access to Memberships",
                "Access to Events",
                "Access to Verifications",
                "Add 10 IDs",
                "Communication tools",
                "Reporting and analytics"
            ],
        },
    ];

    const organisationPlans = [
        {
            name: "Business",
            price: "N60,000",
            duration: "/ per month",
            description: "Best for big distribution.",
            features: [
                "Access to Memberships",
                "Access to Events",
                "Access to Verifications",
                "Add 10 IDs",
                "Communication tools",
                "Reporting and analytics"
            ],
        },
    ];

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const plansToShow = tab === "individual" ? individualPlans : organisationPlans;

    return (
        <div className="flex flex-col w-full h-full animate__animated animate__fadeIn">
            <div className="w-full h-full relative">
                <div className="absolute bg-cover bg-center md:top-[0px] top-[20px] w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)` }}></div>
                <div className="absolute w-full md:top-[0px] top-[20px] h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                <Header />
                <div className="w-full lg:mt-10 md:mt-10 mt-[40px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                    <p className="md:text-5xl text-3xl text-white font-bold mb-5 md:leading-[90px]">Pricing</p>
                </div>
            </div>

            <div className="w-full h-full relative">
                <div className="w-full h-full flex md:flex-row justify-center flex-col gap-8 md:py-10 py-5 md:px-32 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                    <div className="min-h-screen bg-[rgba(13,14,29,1)] relative md:rounded-2xl w-full text-white flex flex-col items-center md:py-20 py-5">

                        <span className="md:text-5xl text-2xl md:w-[40%] px-10 md:px-0 pb-3 mb-7 text-center font-bold gradient-text-r md:leading-[70px]">
                            Choose a plan that best suits you
                        </span>

                        {/* Tabs */}
                        <div className="flex justify-center gap-4 my-6">
                            <button
                                onClick={() => setTab("individual")}
                                className={`px-4 py-2 rounded-full font-semibold ${tab === "individual" ? "bg-white text-black" : "bg-transparent border border-white text-white"
                                    }`}
                            >
                                Individual Plan
                            </button>
                            <button
                                onClick={() => setTab("organisation")}
                                className={`px-4 py-2 rounded-full font-semibold ${tab === "organisation" ? "bg-white text-black" : "bg-transparent border border-white text-white"
                                    }`}
                            >
                                Organisation Plan
                            </button>
                        </div>

                        <div className="flex flex-col md:mt-10 px-5 w-full md:justify-between md:items-center md:px-20 md:flex-row gap-10">
                            {plansToShow.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`p-6 rounded-lg flex flex-col shadow-md w-full max-w-md bg-custom-gradient backdrop-blur-40 ${selectedPlan === plan.name ? 'border border-custom' : ''}`}
                                >
                                    <div className="mt-3">
                                        {selectedPlan === plan.name ? (
                                            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="url(#paint0_linear_6185_7034)" />
                                                <path d="M30.001 20C30.001 25.5228 25.5238 30 20.001 30C14.4781 30 10.001 25.5228 10.001 20C10.001 14.4772 14.4781 10 20.001 10C25.5238 10 30.001 14.4772 30.001 20ZM14.501 20C14.501 23.0376 16.9634 25.5 20.001 25.5C23.0385 25.5 25.501 23.0376 25.501 20C25.501 16.9624 23.0385 14.5 20.001 14.5C16.9634 14.5 14.501 16.9624 14.501 20Z" fill="black" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_6185_7034" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#2BFFFF" />
                                                        <stop offset="1" stopColor="#2BFFFF" stopOpacity="0.41" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <img src={plansImg} width={24} />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold mt-5 mb-2">{plan.name}</h3>
                                    <p className="text-sm mb-4">{plan.description}</p>
                                    <div className="text-3xl font-[500] my-6">{plan.price} <span className="text-xs">{plan.duration}</span></div>
                                    <button
                                        onClick={() => handleSelectPlan(plan.name)}
                                        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                        className={`w-full py-2 font-semibold rounded-full shadow-md ${selectedPlan === plan.name ? "bg-[rgba(255,43,255,1)] box-pinky text-white" : "bg-btn-gradient"}`}
                                    >
                                        Get Started
                                    </button>
                                    <div className="w-full mt-10 border h-[1px]" style={{ borderColor: 'rgba(255, 255, 255, 0.24)' }} />
                                    <ul className="mt-10 space-y-6">
                                        <span className="text-white font-semibold text-base">What you will get</span>
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex gap-2 items-center">
                                                <span className="w-4 h-4 rounded-full">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.7131 3.29875C15.3598 5.94542 15.3131 10.2654 12.5798 12.8587C10.0531 15.2521 5.95315 15.2521 3.41981 12.8587C0.679812 10.2654 0.633137 5.94542 3.28647 3.29875C5.88647 0.692083 10.1131 0.692083 12.7131 3.29875Z" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                <span className="flex flex-col justify-center pt-1">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PricingPlans;
