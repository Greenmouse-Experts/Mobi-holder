import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import DropZone from "../../../../components/DropZone";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { dateInput } from "../../../../helpers/dateHelper";

export default function ViewPersonalCard() {
    const user = useSelector((state) => state.userData.data);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [backFiles, setBackFiles] = useState([]);
    const [idCard, setIDCard] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const { mutate } = useApiMutation();




    useEffect(() => {
        getPersonalCard(id);
    }, []);



    
    const getPersonalCard = (id) => {
        mutate({
            url: `/api/idcards/personal/card?id=${id}`,
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




    const handleDrop = (data) => {
        setFiles([data]);
    }


    const handleDropBack = (data) => {
        setBackFiles([data]);
    }



    const createCard = (data) => {
        setLoading(true);
        const payload = { ...data, id: id, scanIDCard: { frontIdCard: files[0], backIdCard: backFiles[0] } }
        mutate({
            url: "/api/idcards/personal/cards",
            method: "PUT",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                navigate(-1);
                setLoading(false);
                setFiles([]);
                setBackFiles([]);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }





    console.log(idCard)





    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Update Card</p>
                            <p className="text-base">Update your existing card</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            {
                                isLoading ?
                                    <Loader />
                                    :

                            <form onSubmit={handleSubmit(createCard)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Issuing Organisation
                                        </p>
                                        <Input type="text" value={idCard.issuingOrganization} name="issuingOrganization"
                                            register={register}
                                            rules={{ required: 'Organization is required' }} errors={errors} placeholder="Enter Organisation Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role
                                        </p>
                                        <Input type="text" value={idCard.designation} name="designation" register={register}
                                            rules={{ required: 'Role in Organisation is required' }} errors={errors} placeholder="Role in Organisation" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card Number
                                        </p>
                                        <Input type="text" value={idCard.cardNumber} name="cardNumber"
                                            register={register}
                                            rules={{ required: 'Card Number is required' }} errors={errors} placeholder="Enter Card Number" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Issued Date
                                            </p>
                                            <Input type="date" value={dateInput(idCard.issuedDate)} name="issuedDate"
                                                register={register}
                                                rules={{ required: 'Expiry Date is required' }} errors={errors} placeholder="Enter expiry date" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Expiry Date
                                            </p>
                                            <Input type="date" value={dateInput(idCard.expiryDate)} name="expiryDate"
                                                register={register}
                                                rules={{ required: 'Expiry Date is required' }} errors={errors} placeholder="Enter expiry date" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="w-full md:w-1/2 flex flex-col gap-2">
                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Scan ID Card Front
                                                </p>
                                                <DropZone text="Upload the front of the ID Card" onUpload={handleDrop} />
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
                                                <DropZone text="Upload the back of the ID Card" onUpload={handleDropBack} />
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

                                    <div className="flex">
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            {loading ? 'Updating...' : 'Update ID Card'}
                                        </Button>
                                    </div>
                                </div>
                            </form>

                                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}