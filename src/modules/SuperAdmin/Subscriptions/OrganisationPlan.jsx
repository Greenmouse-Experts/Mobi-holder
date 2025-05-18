import React, { useEffect, useState } from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { Button } from "@material-tailwind/react";
import DeleteModal from "../../../components/DeleteModal";
import useModal from "../../../hooks/modal";
import ReusableModal from "../../../components/ReusableModal";

const OrganisationPlan = () => {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    const fetchSubscriptionPlans = () => {
        mutate({
            url: `/api/admins/organization/subscription/plans`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscriptionPlans(response.data.data || []);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSubscriptionPlans([]);
            },
        });
    };



    const handleDeleteModal = (planId) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this Plan?'} api={`/api/admins/organization/subscription/plan/delete?id=${planId}`}
                closeModal={closeModal} redirect={fetchSubscriptionPlans} />
        })
    }



    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const displayField = (label, value) => (
        <div className="flex justify-between items-start py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">{label}:</span>
            <span className="text-gray-800 text-right">{String(value)}</span>
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-5 h-full animate__animated animate__fadeIn">
            <Header mobile superAdmin />
            <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                <div className="w-full flex justify-between items-center gap-8 px-3">
                    <div>
                        <p className="text-2xl font-semibold">Subscriptions (Organisation)</p>
                        <p className="text-base">
                            Subscription Module for: <span className="text-mobiBlue">Organisation</span>
                        </p>
                    </div>
                    <Button className="bg-mobiPink" onClick={() => navigate("create")}>
                        Add New Plan
                    </Button>
                </div>

                {subscriptionPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {subscriptionPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between"
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-semibold text-mobiBlue mb-2">
                                        {plan.name}
                                    </h3>

                                    {displayField("Duration", `${plan.duration} months`)}
                                    {displayField("Private Events", plan.accessPrivateEvent ? "Yes" : "No")}
                                    {displayField("Semi-Private Events", plan.accessSemiPrivateEvent ? "Yes" : "No")}
                                    {displayField("Free Events Only", plan.freeEventsOnly ? "Yes" : "No")}
                                    {displayField("Event Upload Limit", plan.eventLimit)}
                                    {displayField("Verifiers/Event", plan.verifiersPerEvent)}
                                    {displayField("Max Staff", plan.maxStaffs)}
                                    {displayField("Org. User Limit", plan.organizationUserLimit)}
                                    {displayField("Customized Templates", plan.customizedTemplateLimit)}
                                    {displayField("Default Template", plan.defaultTemplate ? "Yes" : "No")}
                                    {displayField("Event Logs", plan.hasEventLogs ? "Yes" : "No")}
                                    {displayField("Subscription Mgmt", plan.subscriptionManagement ? "Yes" : "No")}
                                    {displayField("Recurring Events", plan.recurringEvents ? "Yes" : "No")}
                                    {displayField("Appoint Verifiers", plan.canAppointVerifiers ? "Yes" : "No")}
                                    {displayField("Email Support", plan.emailSupport)}
                                    {displayField("Dedicated Support", plan.dedicated_support ? "Yes" : "No")}
                                    {displayField("Amount", plan.amount > 0 ? `${plan.currency} ${plan.amount}` : "Free")}
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        className="text-mobiBlue border-mobiBlue"
                                        onClick={() => navigate(`edit/${plan.id}`)}
                                    >
                                        Edit Plan
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        className="text-red-500 border-red-500"
                                        onClick={() => handleDeleteModal(plan.id)}
                                    >
                                        Delete Plan
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


            <ReusableModal
                isOpen={isOpen}
                size={modalOptions.size}
                title={modalOptions.title}
                content={modalOptions.content}
                closeModal={closeModal}
            />

        </div>
    );
};

export default OrganisationPlan;
