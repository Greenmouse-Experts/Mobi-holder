import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import useApiMutation from "../../../api/hooks/useApiMutation";

export default function UpdateStaff() {
    const [roles, setRoles] = useState([]);
    const [staffDetail, setStaffDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();

    const navigate = useNavigate();
    const { mutate } = useApiMutation();


    useEffect(() => {
        getRoles();
        getStaff();
    }, [])



    const getRoles = () => {
        mutate({
            url: `/api/admins/roles`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setRoles(response.data.data.map((data) => {
                    return {
                        value: data.id,
                        label: data.name
                    }
                }));
                getStaff();
            },
            onError: () => {
                getStaff();
            }
        })
    }






    const getStaff = () => {
        mutate({
            url: `/api/admins/staffs`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setStaffDetail(response.data.data.find(x => x.id === id))
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        })
    }







    const createStaff = (data) => {
        setDisabled(true);
        mutate({
            url: `/api/admins/staff/update`,
            method: "PUT",
            headers: true,
            data: { ...data, id: id },
            onSuccess: (response) => {
                navigate(-1);
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        })
    }




    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }








    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Update Staff</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(createStaff)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Staff Full Name
                                        </p>
                                        <Input type="text" name="fullname"
                                            register={register}
                                            value={staffDetail.admin.name}
                                            rules={{ required: 'Staff Name is required' }} errors={errors} placeholder="Enter Staff Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Staff Email
                                        </p>
                                        <Input type="text" name="email" value={staffDetail.email} register={register}
                                            rules={{ required: 'Staff Email is required' }} errors={errors} placeholder="Email" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input type="text" name="phoneNumber" value={staffDetail.phoneNumber}
                                            register={register}
                                            rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter Phone Number" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Staff Designation
                                            </p>
                                            <Input type="text" name="designation" value={staffDetail.designation}
                                                register={register}
                                                rules={{ required: 'Designation is required' }} errors={errors} placeholder="Enter Designation" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Department
                                            </p>
                                            <Input type="text" name="department"
                                                value={staffDetail.department}
                                                register={register}
                                                rules={{ required: 'Department is required' }} errors={errors} placeholder="Enter Department" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                BirthDate
                                            </p>
                                            <Input type="date" name="birthdate" value={staffDetail.birthdate} disableFutureDates
                                                register={register}
                                                rules={{ required: 'BirthDate is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Employment Date
                                            </p>
                                            <Input type="date" name="employmentDate" value={staffDetail.employmentDate} disableFutureDates
                                                register={register}
                                                rules={{ required: 'Employment Date is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Assign a Role
                                            </p>
                                            <Input name="roleId" register={register} value={staffDetail.admin.role.id} errors={errors} rules={{ required: 'Role is required' }}
                                                type="select" options={roles} placeholder="Assign a Role" />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={disabled} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Update Staff
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