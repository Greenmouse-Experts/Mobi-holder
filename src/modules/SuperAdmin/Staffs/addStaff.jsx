import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Input from "../../../components/Input";

export default function AddStaff() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const navigate = useNavigate();


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Add New Staff</p>
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
                                            rules={{ required: 'Staff Name is required' }} errors={errors} placeholder="Enter Staff Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Staff Email
                                        </p>
                                        <Input type="text" name="email" register={register}
                                            rules={{ required: 'Staff Email is required' }} errors={errors} placeholder="Email" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input type="text" name="phoneNumber"
                                            register={register}
                                            rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter Phone Number" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Staff Designation
                                            </p>
                                            <Input type="text" name="designation"
                                                register={register}
                                                rules={{ required: 'Designation is required' }} errors={errors} placeholder="Enter Designation" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                BirthDate
                                            </p>
                                            <Input type="date" name="birthdate" disableFutureDates
                                                register={register}
                                                rules={{ required: 'BirthDate is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Employment Date
                                            </p>
                                            <Input type="date" name="employmentDate" disableFutureDates
                                                register={register}
                                                rules={{ required: 'BirthDate is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>


                                    <div className="flex">
                                        <Button type="submit" className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Add New Staff
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