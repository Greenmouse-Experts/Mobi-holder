import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Header from "../../header";
import Input from "../../../../components/Input";


export default function ViewTemplate() {
    const { register, formState: { errors } } = useForm();
    const [templateDetails, setTemplateDetails] = useState({});
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const { mutate } = useApiMutation();


    const getTemplate = (id) => {
        mutate({
            url: `/api/admins/template?templateId=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setTemplateDetails(response.data.data);
                setFiles([response.data.data.logo]);
                setIsLoading(false)
            },
            onError: (error) => {
                setIsLoading(false);
            }
        });
    }



    useEffect(() => {
        getTemplate(id)
    }, []);






    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }








    return <>
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superadmin />
                <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">View Template</p>
                        <p className="text-base"></p>
                    </div>
                </div>

                <div className="w-full flex flex-grow">
                    <div className="shadow-xl py-2 px-5 md:px-8 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                        <div className="mb-1 flex flex-col gap-10 mt-5">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Name of Template
                                </p>
                                <Input type="text" name="name" value={templateDetails.name} register={register}
                                    disabled placeholder="Enter the category name" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Template Layout
                                </p>
                                <div className="flex md:flex-row flex-col gap-3">
                                    {templateDetails.layout === 'horizontal' &&
                                        <div className="md:w-1/3 sm:w-1/2 w-full p-3 rounded-md cursor-pointer bGmobiGrayDark"
                                            onClick={() => setLayout('horizontal')}
                                        >
                                            <img src="/card-frame-landscape.png" />
                                        </div>
                                    }
                                    {templateDetails.layout === 'vertical' &&
                                        <div className="md:w-1/3 sm:w-1/2 w-full p-3 rounded-md cursor-pointer bGmobiGrayDark"
                                        >
                                            <img src="/card-frame-portrait.png" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-6 text-mobiFormGray">
                                    Background Colour
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <div className={`flex p-5 w-1/12 h-[60px] border rounded-lg`} style={{ backgroundColor: templateDetails.backgroundColor }}>

                                </div>
                                <div className="flex gap-5 px-4">
                                </div>
                            </div>


                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-6 text-mobiFormGray">
                                    Text Colour
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <div className={`flex p-5 w-1/12 h-[60px] border rounded-lg`} style={{ backgroundColor: templateDetails.textColor }}>

                                </div>
                                <div className="flex gap-5 px-4">
                                </div>
                            </div>


                            <div className="w-full flex flex-col gap-2">
                                <div className="flex flex-col md:w-1/2 w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Company Logo
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

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
}