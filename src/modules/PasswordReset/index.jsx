import React, { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PasswordReset() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [resetBlock, setResetBlock] = useState(false);
    const [emailData, setEmailData] = useState('');

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (userData) => apiClient.post('/api/users/auth/password/forgot', userData),
        onSuccess: (data) => {
            toast.success(data.data.message);
            setResetBlock(true);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });


    const resetPassword = useMutation({
        mutationFn: (userData) => apiClient.post('/api/users/auth/password/reset', userData),
        onSuccess: (data) => {
            toast.success(data.data.message);
            navigate("/login")
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });


    const getOTP = (data) => {
        setEmailData(data.email);
        mutation.mutate(data);
    };

    const passwordReset = (newData) => {
        const newPayload = { ...newData, email: emailData };
        resetPassword.mutate(newPayload);
    }

    return (
        <>
            <div className="w-full flex h-screen animate__animated animate__fadeIn">
                <AuthSideBar />
                <div className="w-full flex justify-center px-6 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
                    <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex gap-3'>
                            <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                            <div className='flex flex-col justify-center'>
                                <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                            </div>
                        </div>

                        <div className="bS-borderRay shadow-lg py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Reset your password</p>

                            <form onSubmit={!resetBlock ? handleSubmit(getOTP) : handleSubmit(passwordReset)}>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    {!resetBlock &&
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Email
                                            </p>
                                            <Input icon="email.svg" type="email" name="email" disabled={resetBlock} register={register}
                                                rules={{ required: 'Email is required' }} errors={errors} placeholder="Enter your email to get a reset password link " />
                                        </div>
                                    }

                                    {resetBlock &&
                                        <>
                                            <div className="flex flex-col gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    OTP
                                                </p>
                                                <Input icon="padlock.svg" type="text" name="otpCode" register={register}
                                                    rules={{ required: 'OTP is required' }} errors={errors} placeholder="Enter otp sent to your registered email" />
                                            </div>

                                            <div className="flex flex-col gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    New Password
                                                </p>
                                                <Input icon="padlock.svg" type="password" name="newPassword" register={register}
                                                    rules={{ required: 'New Password is required' }} errors={errors} placeholder="Set New Password" />
                                            </div>

                                            <div className="flex flex-col gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Confirm Password
                                                </p>
                                                <Input icon="padlock.svg" type="password" name="confirmPassword" register={register}
                                                    rules={{ required: 'Confirm Password is required' }} errors={errors} placeholder="Confirm Password" />
                                            </div>
                                        </>
                                    }

                                    <div className="flex">
                                        <Button type="submit" disabled={resetPassword.isLoading} className="bg-mobiPink w-full p-5 rounded-full">
                                            {resetPassword.isLoading ? 'Submitting...' : resetBlock ? 'Reset Password' : 'Send password reset link'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>Remember your password ?
                                <Link className='text-mobiBlue font-semibold mx-1' to={'/login'}>Login</Link>
                            </p>
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
            </div>
        </>
    )
}