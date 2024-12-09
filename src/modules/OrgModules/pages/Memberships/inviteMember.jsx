import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../../../components/Input";
import DropZone from "../../../../components/DropZone";
import { Button } from "@material-tailwind/react";

export default function InviteMember() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Invite New Member</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Member MobiHolder ID or Email
                                        </p>
                                        <Input type="text" name="firstName" register={register} placeholder="Enter member mobiholder ID" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                           Member/Staff ID
                                        </p>
                                        <Input type="text" name="lastName" register={register} placeholder="Enter member/staff ID" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role (Designation)
                                        </p>
                                        <Input type="text" name="lastName" register={register} placeholder="Enter member/staff ID" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                           Organisation Email
                                        </p>
                                        <Input type="text" name="email" register={register} placeholder="Email" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Category
                                            </p>
                                            <Input type="text" name="lastName" register={register} placeholder="Enter member/staff ID" />
                                        </div>
                                    </div>     

                                    <div className="flex">
                                        <Button type="submit" className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Invite New Member
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