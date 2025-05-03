import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../header";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import Loader from "../../../../components/Loader";

export default function OrgCreatePlan() {
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();
    const { mutate } = useApiMutation();



    useEffect(() => {
        if (id) {
            setLoading(true);
            mutate({
                url: `/api/admins/organization/subscription/plan?id=${id}`,
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
                    setValue("duration", String(plan.duration));
                    setValue("maxStaffs", plan.maxStaffs);
                    setValue("eventLimit", plan.eventLimit);
                    setValue("hasEventLogs", String(plan.hasEventLogs));
                    setValue("defaultTemplate", String(plan.defaultTemplate));
                    setValue("customizedTemplateLimit", plan.customizedTemplateLimit);
                    setValue("freeEventsOnly", String(plan.freeEventsOnly));
                    setValue("organizationUserLimit", plan.organizationUserLimit);
                    setValue("verifiersPerEvent", plan.verifiersPerEvent);
                    setValue("accessSemiPrivateEvent", String(plan.accessSemiPrivateEvent));
                    setValue("accessPrivateEvent", String(plan.accessPrivateEvent));
                    setValue("subscriptionManagement", String(plan.subscriptionManagement));
                    setValue("recurringEvents", String(plan.recurringEvents));
                    setValue("canAppointVerifiers", String(plan.canAppointVerifiers));
                    setValue("emailSupport", plan.emailSupport.replace('Hrs', ''));
                    setValue("dedicated_support", String(plan.dedicated_support));

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

        convertedPayload.emailSupport = `${convertedPayload.emailSupport}Hrs`;

        mutate({
            url: `/api/admins/organization/subscription/plan/create`,
            method: "POST",
            headers: true,
            data: convertedPayload,
            onSuccess: (response) => {
                navigate(-1);
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        });
    }




    const editPlan = (data) => {
        setDisabled(true);
        const convertedPayload = convertTypes(data);

        convertedPayload.id = id;
        convertedPayload.emailSupport = `${convertedPayload.emailSupport}Hrs`;

        mutate({
            url: `/api/admins/organization/subscription/plan/update`,
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
                                        <Input name="name" register={register} value={subscriptionPlan?.name} errors={errors} rules={{ required: 'Plan Name is required' }}
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
                                            register={register}
                                            value={subscriptionPlan?.currency}
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
                                        <Input type="text" value={subscriptionPlan?.duration} name="duration" register={register}
                                            rules={{ required: 'Duration is required' }} errors={errors} placeholder="Enter Duration" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Maximum Number of Staffs
                                            </p>
                                            <Input type="text" name="maxStaffs" value={subscriptionPlan?.maxStaffs} register={register}
                                                rules={{ required: 'Maximum Number of Staffs is required' }} errors={errors} placeholder="Enter Maximum Number of Staffs" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Event Limit
                                            </p>
                                            <Input type="text" name="eventLimit"
                                                value={subscriptionPlan?.eventLimit}
                                                register={register}
                                                rules={{ required: 'Event Limit is required' }} errors={errors} placeholder="Enter Event Limit" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Events Log Access
                                            </p>
                                            <Input type="select" name="hasEventLogs"
                                                value={subscriptionPlan?.hasEventLogs}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Organisation can access event logs" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Can Set Default Template
                                            </p>
                                            <Input type="select" name="defaultTemplate"
                                                value={subscriptionPlan?.defaultTemplate}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Organisation can set default template" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Customised Template Limit
                                            </p>
                                            <Input type="text" name="customizedTemplateLimit"
                                                value={subscriptionPlan?.customizedTemplateLimit}
                                                register={register}
                                                rules={{ required: 'Customised Template Limit is required' }} errors={errors} placeholder="Enter Customised Limit" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Can Create Free Events Only
                                            </p>
                                            <Input type="select" name="freeEventsOnly"
                                                value={subscriptionPlan?.freeEventsOnly}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }} errors={errors} placeholder="Select Value" />
                                        </div>
                                    </div>


                                    {/* Organization User Limit */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Organization User Limit</p>
                                            <Input
                                                type="text"
                                                name="organizationUserLimit"
                                                value={subscriptionPlan?.organizationUserLimit}
                                                register={register}
                                                rules={{ required: 'Organization User Limit is required' }}
                                                errors={errors}
                                                placeholder="Enter user limit"
                                            />
                                        </div>
                                    </div>

                                    {/* Verifiers Per Event */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Verifiers Per Event</p>
                                            <Input
                                                type="text"
                                                name="verifiersPerEvent"
                                                value={subscriptionPlan?.verifiersPerEvent}
                                                register={register}
                                                rules={{ required: 'Verifiers per event is required' }}
                                                errors={errors}
                                                placeholder="Enter number"
                                            />
                                        </div>
                                    </div>

                                    {/* Access Semi-Private Events */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Access Semi-Private Events</p>
                                            <Input
                                                type="select"
                                                name="accessSemiPrivateEvent"
                                                value={subscriptionPlan?.accessSemiPrivateEvent}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
                                        </div>
                                    </div>

                                    {/* Access Private Events */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Access Private Events</p>
                                            <Input
                                                type="select"
                                                name="accessPrivateEvent"
                                                value={subscriptionPlan?.accessPrivateEvent}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
                                        </div>
                                    </div>

                                    {/* Subscription Management */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Subscription Management</p>
                                            <Input
                                                type="select"
                                                name="subscriptionManagement"
                                                value={subscriptionPlan?.subscriptionManagement}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
                                        </div>
                                    </div>

                                    {/* Recurring Events */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Recurring Events</p>
                                            <Input
                                                type="select"
                                                name="recurringEvents"
                                                value={subscriptionPlan?.recurringEvents}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
                                        </div>
                                    </div>

                                    {/* Can Appoint Verifiers */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Can Appoint Verifiers</p>
                                            <Input
                                                type="select"
                                                name="canAppointVerifiers"
                                                value={subscriptionPlan?.canAppointVerifiers}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Support */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Email Support Response Time (Hrs)</p>
                                            <Input
                                                type="number"
                                                name="emailSupport"
                                                value={subscriptionPlan?.emailSupport.replace('Hrs', '')}
                                                min={0}
                                                register={register}
                                                rules={{ required: 'Email support response time is required' }}
                                                errors={errors}
                                                placeholder="e.g. 72Hrs"
                                            />
                                        </div>
                                    </div>

                                    {/* Dedicated Support */}
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">Dedicated Support</p>
                                            <Input
                                                type="select"
                                                name="dedicated_support"
                                                value={subscriptionPlan?.dedicated_support}
                                                options={[
                                                    { label: 'True', value: true },
                                                    { label: 'False', value: false },
                                                ]}
                                                register={register}
                                                rules={{ required: 'This field is required' }}
                                                errors={errors}
                                                placeholder="Select Value"
                                            />
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