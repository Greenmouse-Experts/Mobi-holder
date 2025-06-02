import React, { useState } from "react";
import Input from "../../../components/Input";
import { Button, Checkbox } from "@material-tailwind/react";
import RangeSlider from "../../../components/RangeSlider";
import DropdownMenu from "../../../components/DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import AuthSideBar from "../../../components/AuthSideBar";
import Theme from "../../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { setOrg, setSignUpData } from "../../../reducers/organisationSlice";
import { toast } from "react-toastify";
import useApiMutation from "../../../api/hooks/useApiMutation";

export default function OrgAdminSetUp({ moveBack }) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const orgData = useSelector((state) => state.orgData.signUpData);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const createOrgAccount = (data) => {
        const payload = { ...orgData, ...data };
        setIsLoading(true);
        mutate({
            url: "/api/users/auth/register/organization",
            method: "POST",
            data: payload,
            navigateTo: "/verify-email",
            onSuccess: (response) => {
                dispatch(setSignUpData(null));
                dispatch(setOrg(response.data.data));
                localStorage.setItem('email', JSON.stringify(payload.email));
                navigate('/verify-email');
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });

    }

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <AuthSideBar />
                <div className="w-full flex justify-center px-6 mt-8 py-7 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
                    <div className="lg:w-3/5 md:w-3/5 w-full flex flex-col h-full gap-4 justify-center">
                        <div className="w-full flex justify-between items-center">
                            <div className='flex gap-3 flex-grow'>
                                <Link to={'/signup'} className="w-full flex gap-3">
                                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                    <div className='flex flex-col justify-center'>
                                        <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex">
                                <DropdownMenu buttonLabel="Organisation" color="#A324F2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiPink border rounded-md border-mobiPink">
                                    <Link to={'/signup/individual'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Individual
                                    </Link>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Sign Up as Organisation</p>

                            <div className="py-4 px-3 bg-mobiDarkRoamn flex w-full gap-6">
                                <div className="flex flex-col gap-2 w-auto">
                                    <p className="bs-mobiCeramaic text-base uppercase">Step 2</p>
                                    <p className="bs-mobiCeramaic text-sm">Add Contact Info</p>
                                </div>
                                <div className="lg:flex md:flex hidden flex-grow flex-col justify-center">
                                    <RangeSlider value={100} />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(createOrgAccount)} autoComplete="off">
                                <div className="mb-1 flex flex-col gap-6 mt-5">
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                First name
                                            </p>
                                            <Input icon="human.svg" name="firstName" register={register}
                                                rules={{ required: 'First Name is required' }} errors={errors} type="text" placeholder="Enter your first name" />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Last name
                                            </p>
                                            <Input icon="human.svg" type="text" name="lastName" register={register}
                                                rules={{ required: 'Last Name is required' }} errors={errors} placeholder="Enter your last name" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Email
                                        </p>
                                        <Input icon="email.svg" type="email" name="email" register={register}
                                            rules={{ required: 'Email is required' }} errors={errors} placeholder="Enter your email" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input icon="phone.svg" type="tel" name="phoneNumber" register={register}
                                            rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter company phone number" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Password
                                        </p>
                                        <Input icon="padlock.svg" name="password" register={register}
                                            rules={{ required: 'Password is required' }} errors={errors} type="password" placeholder="Password" />
                                    </div>

                                    <div className="flex justify-start">
                                        <div className="flex gap-1">
                                            <span className="flex">
                                                Note, this person would be your organisation Super Admin
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full gap-4">
                                        {/* Previous Button on the Left */}
                                        <Button onClick={() => moveBack()} className="bg-transparent border border-gray-300 px-6 py-3 rounded-full text-gray-500">
                                            Previous
                                        </Button>

                                        {/* Sign Up Button on the Right */}
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink px-6 py-3 rounded-full text-white ml-auto">
                                            Sign Up As Organisation
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/** Dark Theme */}
                <div className="absolute flex w-full">
                    <div className='flex w-full relative justify-end'>
                        <div className='max-w-[11rem] top-[2%] p-3 w-full flex'>
                            <Theme />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}