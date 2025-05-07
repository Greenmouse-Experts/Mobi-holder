import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";
import Input from "../../components/Input";
import {setUser} from "../../reducers/userSlice";
import { toast } from "react-toastify";

export default function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const admin = useMutation({
        mutationFn: (userData) => apiClient.post('/api/admins/login', userData),
        onSuccess: (data) => {
            dispatch(setUser(data.data.data));
            localStorage.setItem("userToken", data.data.token);
            toast.success(data.data.message);
            navigate('/superadmin/dashboard');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const loginAccount = (data) => {
        admin.mutate(data)
    };

    return (
        <>
            <div className="w-full flex h-screen animate__animated animate__fadeIn">
                <div className="w-full flex justify-center px-6 bS-leftOverlay relative shadow-lg">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)` }}></div>
                    <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}></div>
                    <div className="lg:w-2/5 md:w-2/5 z-50 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex w-full justify-center gap-3'>
                            <Link to={'/'} className="w-full justify-center flex gap-3">
                                <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                <div className='flex flex-col justify-center'>
                                    <span className='text-xl mt-1 text-white font-semibold'>MobiHolder</span>
                                </div>
                            </Link>
                        </div>

                        <div className="shadow-xl bg-black py-7 px-7 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-white text-lg font-semibold">Welcome back, Admin</p>

                            <form onSubmit={handleSubmit(loginAccount)}>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Email
                                        </p>
                                        <Input icon="email.svg" type="email" style={{ backgroundColor: 'rgba(82, 81, 81, 1)' }} name="email" register={register}
                                            rules={{ required: 'Email is required' }} errors={errors} placeholder="Enter your email address" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Password
                                        </p>
                                        <Input icon="padlock.svg" type="password" name="password" style={{ backgroundColor: 'rgba(82, 81, 81, 1)' }} register={register}
                                            rules={{ required: 'Password is required' }} errors={errors} placeholder="Password" />
                                    </div>

                                    <div className="flex justify-end">
                                        <Link to={'/forgot-password'} className="lg:text-base md:text-base text-[12px] text-mobiBlue">Forgot Password ?</Link>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" className="bg-mobiPink w-full p-5 rounded-full">Login</Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    {/** Dark Theme
                    <div className="absolute flex w-full">
                        <div className='flex w-full relative justify-end'>
                            <div className='max-w-[11rem] top-[2%] p-3 w-full flex'>
                                <Theme />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}