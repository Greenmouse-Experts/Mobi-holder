import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { dateInput } from "../../../../helpers/dateHelper";
import Header from "../../header";

export default function ViewPersonalCard() {
    const { register, setValue, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [backFiles, setBackFiles] = useState([]);
    const [idCard, setIDCard] = useState({});

    const { id } = useParams();

    const { mutate } = useApiMutation();




    useEffect(() => {
        getPersonalCard(id);
    }, []);



    
    const getPersonalCard = (id) => {
        mutate({
            url: `/api/admins/personal/idcard?cardId=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setIDCard(response.data.data);
                const images = JSON.parse(response.data.data.scanIDCard);
                setFiles([images.frontIdCard]);
                setBackFiles([images.backIdCard]);
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }








    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Preview Card</p>
                            <p className="text-base">View Card details</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            {
                                isLoading ?
                                    <Loader />
                                    :

                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card Holder
                                        </p>
                                        <Input type="text" disabled register={register} name={'cardHolder'} value={`${idCard.individual.firstName} ${idCard.individual.lastName}`} />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Issuing Organisation
                                        </p>
                                        <Input type="text" disabled value={idCard.issuingOrganization} name="issuingOrganization"
                                            register={register} placeholder="Enter Organisation Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role
                                        </p>
                                        <Input type="text" value={idCard.designation} name="designation" register={register}
                                            disabled placeholder="Role in Organisation" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card Number
                                        </p>
                                        <Input type="text" value={idCard.cardNumber} name="cardNumber"
                                            register={register}
                                            disabled placeholder="Enter Card Number" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Issued Date
                                            </p>
                                            <Input type="date" value={dateInput(idCard.issuedDate)} name="issuedDate"
                                                register={register}
                                                disabled placeholder="Enter expiry date" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Expiry Date
                                            </p>
                                            <Input type="date" value={idCard.expiryDate ? dateInput(idCard.expiryDate) : ''} name="expiryDate"
                                                register={register}
                                                disabled placeholder="Enter expiry date" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="w-full md:w-1/2 flex flex-col gap-2">
                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Scan ID Card Front
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                {files.map((fileObj, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={fileObj}
                                                            alt="preview"
                                                            className="w-full h-24 object-cover rounded"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:w-1/2 w-full flex flex-col gap-2">
                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Scan ID Card Back
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                {backFiles.map((fileObj, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={fileObj}
                                                            alt="preview"
                                                            className="w-full h-24 object-cover rounded"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}