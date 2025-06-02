import React, { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userSlice";
import useApiMutation from "../../api/hooks/useApiMutation";
import { setOrg } from "../../reducers/organisationSlice";

export default function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const loginAccount = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/users/auth/login",
            method: "POST",
            data: data,
            onSuccess: (response) => {
                reset({ email: '', password: '' });
                if (response.data.data.accountType === 'Organization') {
                    dispatch(setOrg(response.data.data));
                    localStorage.setItem("userToken", response.data.token);
                    navigate('/org/dashboard');
                }
                else {
                    dispatch(setUser(response.data.data));
                    localStorage.setItem("userToken", response.data.token)
                    navigate('/app/dashboard')
                }
            },
            onError: (error) => {
                if (error.response.data.message === 'Your email is not verified. A verification email has been sent to your email address.') {
                    localStorage.setItem('email', JSON.stringify(data.email));
                    // dispatch(setUser({email: data.email}));
                    navigate('/verify-email')
                }
                setIsLoading(false);
            }
        });
    };

    return (
        <>
            <div className="w-full flex h-screen animate__animated animate__fadeIn">
                <AuthSideBar />
                <div className="w-full flex justify-center px-6 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
                    <div className="lg:w-3/5 md:w-3/5 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex gap-3'>
                            <Link to={'/'} className="w-full flex gap-3">
                                <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                <div className='flex flex-col justify-center'>
                                    <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                                </div>
                            </Link>
                        </div>

                        <div className="bS-borderRay shadow-xl py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Login to your account</p>

                            <form onSubmit={handleSubmit(loginAccount)}>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Email
                                        </p>
                                        <Input icon="email.svg" type="email" name="email" register={register}
                                            rules={{ required: 'Email is required' }} errors={errors} placeholder="Enter your email address" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Password
                                        </p>
                                        <Input icon="padlock.svg" type="password" name="password" register={register}
                                            rules={{ required: 'Password is required' }} errors={errors} placeholder="Password" />
                                    </div>

                                    <div className="flex justify-end">
                                        <Link to={'/forgot-password'} className="lg:text-base md:text-base text-[12px] text-mobiBlue">Forgot Password ?</Link>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink w-full p-5 rounded-full">
                                            {isLoading ? 'Submitting...' : 'Login'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>Are you a new user ?
                                <Link className='text-mobiPink font-semibold mx-1' to={'/signup'}>Create An Account</Link>
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