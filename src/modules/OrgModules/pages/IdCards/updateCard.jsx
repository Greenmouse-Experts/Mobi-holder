import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import DropdownMenu from "../../../../components/DropdownMenu";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import StaffCard from "../../../../components/StaffCard";
import StaffCardPortrait from "../../../../components/StaffCardPortrait";
import { dateFormat, dateInput } from "../../../../helpers/dateHelper";
import { Button } from "@material-tailwind/react";

export default function UpdateCard() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [cardData, setCardData] = useState({});
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    const { mutate } = useApiMutation();


    const getCardData = () => {
        mutate({
            url: `/api/idcards/view/card?cardId=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setCardData(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }


    const getOrganisationTemplates = () => {
        mutate({
            url: `api/idcards/templates`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const templates = response.data.data
                .filter((item) => item.is_default)
                    .map((item) => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })
                setTemplates(templates);
            },
            onError: () => {
            }
        });
    }


    useEffect(() => {
        getCardData();
        getOrganisationTemplates();
    }, []);



    const updateCard = (data) => {
        const payload = { ...data, cardId: id };
        setLoading(true);
        mutate({
            url: "/api/idcards/organization/update/member/card",
            method: "PUT",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                navigate(-1);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }




    if (isLoading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            </>
        )
    }


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">View ID Card</p>
                            <p className="text-base">Preview ID Card for : <span className="text-mobiBlue">
                                {cardData.individual?.firstName} {cardData.individual?.lastName}
                            </span></p>
                            <div className="flex my-2">
                                <DropdownMenu buttonLabel={cardData.createdBy === cardData.organization?.id ? 'Created By Me' : `Created By ${cardData.individual.firstName} ${cardData.individual.lastName}`} disabled color="#A324F2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiPink border rounded-md border-mobiPink">
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(updateCard)}>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    {cardData.template?.layout === "horizontal" || cardData.template?.layout === "Landscape" ?
                                        <StaffCard data={cardData} background={cardData.template.backgroundColor} textColor={cardData.template.textColor} /> : <StaffCardPortrait />}

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role
                                        </p>
                                        <Input type="text" name="designation" rules={{ required: 'Role in Organisation is required' }} errors={errors} value={cardData.designation} register={register} placeholder="Enter role in organisation" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Expiry Date
                                            </p>
                                            <Input type="date" name="expiryDate"
                                                rules={{ required: 'Expiry Date is required' }} errors={errors}
                                                value={dateInput(cardData.expiryDate)} register={register} placeholder="Enter card expiry date" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card Template
                                        </p>
                                        <Input type="select" name="templateId"
                                            register={register}
                                            value={cardData.template.id}
                                            rules={{ required: 'Card Template is required' }} errors={errors} options={templates} placeholder="Select Template" />
                                    </div>

                                    <div className="w-full flex my-5">
                                        <Button type="submit" disabled={loading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Update ID Card
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