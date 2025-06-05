import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Loader from "../../../../components/Loader";
import useModal from "../../../../hooks/modal";
import ReusableModal from "../../../../components/ReusableModal";
import DeleteModal from "../../../../components/DeleteModal";

export default function Support() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            phoneNumber: ''
        }
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setValue,
        formState: { errors: errors2 },
    } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [supportData, setSupportData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const { mutate } = useApiMutation();

    useEffect(() => {
        getSupport();
    }, []);



    const getSupport = () => {
        setIsLoading(true)
        mutate({
            url: `/api/admins/support-contacts`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSupportData(response.data.data)
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });
    }



    const setSupport = (data) => {
        setIsDisabled(true)
        mutate({
            url: "/api/admins/support-contact/create",
            method: "POST",
            data: data,
            headers: true,
            onSuccess: (response) => {
                getSupport();
                reset();
                setIsDisabled(false);
            },
            onError: () => {
                setIsDisabled(false);
            }
        });
    }




    const updateSupport = (data) => {
        mutate({
            url: "/api/admins/support-contact/update",
            method: "PUT",
            data: {
                id: data.id,
                email: data.emailAddress,
                phoneNumber: data.phone
            },
            headers: true,
            onSuccess: (response) => {
                getSupport();
                closeModal();
                reset2({ email: '', phoneNumber: '' });
            },
            onError: () => {
                closeModal();
            }
        });
    }





    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this Data?'} api={`/api/admins/support-contact/delete?id=${id}`} redirect={getSupport} closeModal={closeModal} />
        })
    }



const handleEditModal = (data) => {
    setValue('id', data.id);
    setValue('emailAddress', data.email);
    setValue('phone', data.phoneNumber);

    openModal({
        size: "md",
        content: (
            <form onSubmit={handleSubmit2(updateSupport)}>
                <input type="hidden" {...register2('id')} />

                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">Email Address</p>
                            <Input
                                name="emailAddress"
                                rules={{ required: 'Email is required' }}
                                errors={errors2}
                                register={register2}
                                type="email"
                                placeholder=""
                            />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">Phone Number</p>
                            <Input
                                name="phone"
                                rules={{ required: 'Phone Number is required' }}
                                errors={errors2}
                                register={register2}
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <Button type="submit" className="bg-mobiPink md:w-auto w-full py-3 px-7 rounded-full">
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        ),
    });
};





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
            <form onSubmit={handleSubmit(setSupport)}>
                <h2 className="md:text-lg text-base font-semibold">Set Support Contact for Users</h2>

                <div className="overflow-x-auto p-4 my-3">
                    <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="p-3 border border-gray-300">S/N</th>
                                <th className="p-3 border border-gray-300">Support Email</th>
                                <th className="p-3 border border-gray-300">Support Phone Number</th>
                                <th className="p-3 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supportData.map((data, index) => (
                                <tr key={data.id} className="border border-gray-200">
                                    <td className="p-3 border border-gray-300">{index + 1}</td>
                                    <td className="p-3 border border-gray-300">{data.email}</td>
                                    <td className="p-3 border border-gray-300">{data.phoneNumber}</td>
                                    <td className="p-3 border border-gray-300">
                                        <Menu placement="left">
                                            <MenuHandler>
                                                <span className="cursor-pointer">☰</span>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleEditModal(data)}>
                                                        Edit
                                                    </span>
                                                </MenuItem>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleDeleteModal(data.id)}>
                                                        Delete
                                                    </span>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>






                    {/* Mobile Version */}
                    <div className="md:hidden flex flex-col gap-4">
                        {supportData.map((data, index) => (
                            <div
                                key={data.id}
                                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                            >
                                <div className="font-semibold text-sm text-gray-600 mb-1">
                                    S/N: <span className="font-normal">{index + 1}</span>
                                </div>
                                <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                    Bank:
                                    <div className="font-normal mt-1 text-gray-800">{data.email}</div>
                                </div>
                                <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                    Account Number:
                                    <div className="font-normal mt-1 text-gray-800">{data.phoneNumber}</div>
                                </div>
                                <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                    Actions:
                                    <div className="font-normal mt-1 text-gray-800">
                                        <Menu placement="left">
                                            <MenuHandler>
                                                <span className="cursor-pointer">☰</span>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleEditModal(data)}>
                                                        Edit
                                                    </span>
                                                </MenuItem>
                                                <MenuItem className="flex flex-col gap-3">
                                                    <span className="cursor-pointer" onClick={() => handleDeleteModal(data.id)}>
                                                        Delete
                                                    </span>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>


                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Email Address
                            </p>
                            <Input name="email"
                                rules={{ required: 'Email is required' }} errors={errors} register={register}
                                type="email" placeholder="Email Address" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Phone Number
                            </p>
                            <Input name="phoneNumber"
                                rules={{ required: 'Phone Number is Required' }} errors={errors} register={register}
                                type="text" placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="flex">
                        <Button type="submit" disabled={isDisabled} className="bg-mobiPink md:w-auto w-full py-3 px-7 rounded-full">
                            {isDisabled ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </div>

            </form>


            <ReusableModal
                isOpen={isOpen}
                size={modalOptions.size}
                title={modalOptions.title}
                content={modalOptions.content}
                closeModal={closeModal}
            />

        </>
    )
}