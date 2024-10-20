import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";

export default function Login() {
    return (
        <>
            <div className="w-full flex h-screen animate__animated animate__fadeIn">
                <AuthSideBar />
                <div className="w-full flex justify-center px-6 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
                    <div className="lg:w-3/5 md:w-3/5 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex gap-3'>
                            <Link to={'/signup'} className="w-full flex gap-3">
                                <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                <div className='flex flex-col justify-center'>
                                    <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                                </div>
                            </Link>
                        </div>

                        <div className="bS-borderRay shadow-xl py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Login to your account</p>

                            <div className="mb-1 flex flex-col gap-8 mt-5">
                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Email
                                    </p>
                                    <Input icon="email.svg" type="email" placeholder="Enter your email address" />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Password
                                    </p>
                                    <Input icon="padlock.svg" appendIcon="eyeClosed.svg" type="password" placeholder="Password" />
                                </div>

                                <div className="flex justify-end">
                                    <Link to={'/forgot-password'} className="lg:text-base md:text-base text-[12px] text-mobiBlue">Forgot Password ?</Link>
                                </div>

                                <div className="flex">
                                    <Button className="bg-mobiPink w-full p-5 rounded-full"><Link className="w-full" to={'/app/dashboard'}>Login</Link></Button>
                                </div>
                            </div>
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