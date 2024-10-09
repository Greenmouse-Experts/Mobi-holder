import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";

export default function IndividualSignUp() {
    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-1/3 h-full lg:flex md:flex hidden flex-grow"></div>
                <div className="w-full flex justify-center px-6 py-7 bS-leftOverlay">
                    <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col h-full gap-4 justify-center">
                        <div className='flex gap-3'>
                            <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                            <div className='flex flex-col justify-center'>
                                <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                            </div>
                        </div>

                        <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Sign Up as Individual</p>

                            <div className="mb-1 flex flex-col gap-6 mt-5">
                                <div className="w-full flex gap-6">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            First name
                                        </p>
                                        <Input icon="human.svg" type="text" placeholder="Enter your first name" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Last name
                                        </p>
                                        <Input icon="human.svg" type="text" placeholder="Enter your last name" />
                                    </div>
                                </div>

                                <div className="w-full flex gap-6">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Email
                                        </p>
                                        <Input icon="email.svg" type="email" placeholder="Enter your email" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input icon="phone.svg" type="tel" placeholder="Enter your phone number" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Username
                                    </p>
                                    <Input icon="human.svg" type="text" placeholder="Enter your preferred username" />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Password
                                    </p>
                                    <Input icon="padlock.svg" appendIcon="eyeClosed.svg" type="password" placeholder="Password" />
                                </div>

                                <div className="flex justify-start">
                                    <div className="flex gap-2">
                                        <span className="flex">
                                            <Checkbox />
                                        </span>
                                        <span className="flex flex-col justify-center">I agree to the Terms & Conditions and Privacy Policy</span>
                                    </div>
                                </div>

                                <div className="flex">
                                    <Button className="bg-mobiPink w-full">Sign Up</Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>Already have an account ?
                                <Link className='text-mobiBlue font-semibold mx-1' to={'/login'}>Login</Link>
                            </p>                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}