import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function PasswordReset() {
    return (
        <>
            <div className="w-full flex h-screen animate__animated animate__fadeIn">
                <div className="w-1/3 h-full lg:flex md:flex hidden flex-grow"></div>
                <div className="w-full flex justify-center px-6 bS-leftOverlay">
                    <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex gap-3'>
                            <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                            <div className='flex flex-col justify-center'>
                                <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                            </div>
                        </div>

                        <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Reset your password</p>

                            <div className="mb-1 flex flex-col gap-8 mt-5">
                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Email
                                    </p>
                                    <Input icon="email.svg" type="email" placeholder="Enter your email to get a reset password link " />
                                </div>

                                <div className="flex">
                                    <Button className="bg-mobiPink w-full p-5 rounded-full">Send password reset link</Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>Remember your password ?
                                <Link className='text-mobiBlue font-semibold mx-1' to={'/login'}>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}