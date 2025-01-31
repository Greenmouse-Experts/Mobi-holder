import React from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";
import { toast } from "react-toastify";

export default function VerifyEmail() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (userData) => apiClient.post('/api/users/auth/verify/email', userData),
        onSuccess: (data) => {
            toast.success(data.data.message);
            localStorage.removeItem('email');
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const verifyAccount = (data) => {
        const payload = {
            email: JSON.parse(localStorage.getItem('email')),
            ...data
        };
        mutation.mutate(payload);
    };

    const resend = useMutation({
        mutationFn: (userData) => apiClient.post('/api/users/auth/resend/verification/email', userData),
        onSuccess: (data) => {
            toast.success(data.data.message);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const verifyLink = () => {
        const payload = {
            email: JSON.parse(localStorage.getItem('email')),
        }
        resend.mutate(payload);
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
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Verify your email</p>

                            <form onSubmit={handleSubmit(verifyAccount)}>
                                <div className="mb-1 flex flex-col gap-8 mt-5">

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            OTP
                                        </p>
                                        <Input icon="padlock.svg" type="text" name="otpCode" register={register}
                                            rules={{ required: 'OTP is required' }} errors={errors} placeholder="Enter otp sent to your registered email " />
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={mutation.isLoading} className="bg-mobiPink w-full p-5 rounded-full">
                                            {mutation.isLoading ? 'Loading...' : 'Verify'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>
                                <Button onClick={verifyLink} className="bg-transparent w-full text-mobiBlue font-semibold p-5 rounded-full">Resend OTP</Button>
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