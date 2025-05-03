import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../header";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import Loader from "../../../../components/Loader";

export default function CreatePlan() {
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { mutate } = useApiMutation();

    useEffect(() => {
        if (id) {
            setLoading(true);
            mutate({
                url: `/api/admins/individual/subscription/plan?id=${id}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (data) => {
                    const plan = data.data.data;
                    setSubscriptionPlan(plan);
                    setLoading(false);

                    // Populate form values
                    setValue("name", plan.name);
                    setValue("amount", plan.amount);
                    setValue("currency", plan.currency);
                    setValue("duration", plan.duration);
                    setValue("organizationIssuedCards", String(plan.organizationIssuedCards));
                    setValue("selfScannedIds", plan.selfScannedIds);
                    setValue("membershipViaInvitation", String(plan.membershipViaInvitation));
                    setValue("membershipRequestInitiate", String(plan.membershipRequestInitiate));
                    setValue("eventLogsAccess", String(plan.eventLogsAccess));
                    setValue("selfVerification", String(plan.selfVerification));
                    setValue("verifiersPerEvent", plan.verifiersPerEvent);
                    setValue("eventLimit", plan.eventLimit);

                    // Determine ticketEvents value
                    if (plan.freeTicketEvents && plan.paidTicketEvents) {
                        setValue("ticketEvents", "free_and_paid");
                    } else if (plan.freeTicketEvents) {
                        setValue("ticketEvents", "free");
                    } else if (plan.paidTicketEvents) {
                        setValue("ticketEvents", "paid");
                    }
                },
                onError: (error) => {
                    console.error("Error fetching subscription plan:", error);
                    setLoading(false);
                }
            });
        }
    }, [id, mutate, setValue]);


    const convertTypes = (obj) => {
        const result = {};
        for (const key in obj) {
            const value = obj[key];
            if (value === "true") {
                result[key] = true;
            } else if (value === "false") {
                result[key] = false;
            } else if (typeof value === "string" && !isNaN(value) && value.trim() !== "") {
                result[key] = Number(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    };

    
    const createPlan = (data) => {
        setDisabled(true);
        const convertedPayload = convertTypes(data);

        if (convertedPayload.ticketEvents === 'free_and_paid') {
            convertedPayload.freeTicketEvents = true;
            convertedPayload.paidTicketEvents = true;
        } else if (convertedPayload.ticketEvents === 'free') {
            convertedPayload.freeTicketEvents = true;
            convertedPayload.paidTicketEvents = false;
        } else if (convertedPayload.ticketEvents === 'paid') {
            convertedPayload.freeTicketEvents = false;
            convertedPayload.paidTicketEvents = true;
        }

        delete convertedPayload.ticketEvents;

        mutate({
            url: `/api/admins/individual/subscription/plan/create`,
            method: "POST",
            headers: true,
            data: convertedPayload,
            onSuccess: () => {
                navigate(-1);
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        });
    };





    const editPlan = (data) => {
        setDisabled(true);
        const convertedPayload = convertTypes(data);

        if (convertedPayload.ticketEvents === 'free_and_paid') {
            convertedPayload.freeTicketEvents = true;
            convertedPayload.paidTicketEvents = true;
        } else if (convertedPayload.ticketEvents === 'free') {
            convertedPayload.freeTicketEvents = true;
            convertedPayload.paidTicketEvents = false;
        } else if (convertedPayload.ticketEvents === 'paid') {
            convertedPayload.freeTicketEvents = false;
            convertedPayload.paidTicketEvents = true;
        }

        delete convertedPayload.ticketEvents;
        convertedPayload.id = id;

        mutate({
            url: `/api/admins/individual/subscription/plan/update`,
            method: "PUT",
            headers: true,
            data: convertedPayload,
            onSuccess: () => {
                navigate(-1);
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        });
    };





    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }



    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">{id ? 'Edit' : 'Add'} Subscription Plan</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(id ? editPlan : createPlan)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Plan Name
                                        </p>
                                        <Input name="name" value={subscriptionPlan?.name} register={register} errors={errors} rules={{ required: 'Plan Name is required' }}
                                            type="text" placeholder="Plan Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Amount
                                        </p>
                                        <Input type="text" name="amount" value={subscriptionPlan?.amount} register={register}
                                            rules={{ required: 'Amount is required' }} errors={errors} placeholder="Enter Amount" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Currency
                                        </p>
                                        <Input type="select" name="currency"
                                            value={subscriptionPlan?.currency}
                                            register={register}
                                            options={[
                                                { label: 'USD', value: 'USD' },
                                                { label: 'NGN', value: 'NGN' },
                                            ]}
                                            rules={{ required: 'Currency is required' }} errors={errors} placeholder="Select Currency" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Duration (Months)
                                        </p>
                                        <Input type="text" name="duration" value={subscriptionPlan?.duration} register={register}
                                            rules={{ required: 'Duration is required' }} errors={errors} placeholder="Enter Duration" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Receive Organization Issued Cards
                                            </p>
                                            <Input type="select" name="organizationIssuedCards"
                                                value={subscriptionPlan?.organizationIssuedCards}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Individual can receive organization issued cards" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Number of self scanned IDs
                                            </p>
                                            <Input type="number" min="0" name="selfScannedIds"
                                                value={subscriptionPlan?.selfScannedIds}
                                                register={register}
                                                rules={{ required: 'Number of self scanned IDs is required' }} errors={errors} placeholder="Enter Number of self scanned IDs" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Can Recieve Membership Invitation
                                            </p>
                                            <Input type="select" name="membershipViaInvitation"
                                                value={subscriptionPlan?.membershipViaInvitation}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Individual can receive membership invitation" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Can Initiate Membership Request
                                            </p>
                                            <Input type="select" name="membershipRequestInitiate"
                                                value={subscriptionPlan?.membershipRequestInitiate}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Individual can initiate membership" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Ticket Events
                                            </p>
                                            <Input type="select" name="ticketEvents"
                                                options={[
                                                    { label: 'Free', value: 'free' },
                                                    { label: 'Paid', value: 'paid' },
                                                    { label: 'Free and Paid', value: 'free_and_paid' },
                                                ]}
                                                register={register}
                                                rules={{ required: 'Ticket Events is required' }} errors={errors} placeholder="Select Ticket Events" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Events Log Access
                                            </p>
                                            <Input type="select" name="eventLogsAccess"
                                                value={subscriptionPlan?.eventLogsAccess}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Individual can access event logs" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Self Verification
                                            </p>
                                            <Input type="select" name="selfVerification"
                                                value={subscriptionPlan?.selfVerification}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'Self verification is required' }} errors={errors} placeholder="Self verification" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Verifiers per Event
                                            </p>
                                            <Input type="number" min="0" value={subscriptionPlan?.verifiersPerEvent} name="verifiersPerEvent"
                                                register={register}
                                                rules={{ required: 'Verifiers per Event is required' }} errors={errors} placeholder="Enter Number of Verifiers" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Number of Events
                                            </p>
                                            <Input type="number" min="0" value={subscriptionPlan?.eventLimit} name="eventLimit"
                                                register={register}
                                                rules={{ required: 'Number of Events is required' }} errors={errors} placeholder="Enter Number of Events" />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={disabled} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            {id ? 'Edit' : 'Create'} Plan
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}