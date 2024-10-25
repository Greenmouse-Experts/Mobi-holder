import React from "react";
import Input from "../../../components/Input";
import { Button, Checkbox } from "@material-tailwind/react";
import RangeSlider from "../../../components/RangeSlider";
import DropdownMenu from "../../../components/DropdownMenu";
import { Link } from "react-router-dom";
import AuthSideBar from "../../../components/AuthSideBar";
import Theme from "../../../components/Theme";

export default function OrgInfoSetUp({ moveNext }) {
    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <AuthSideBar />
                <div className="w-full flex justify-center mt-8 px-6 py-7 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
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
                                    <p className="bs-mobiCeramaic text-base uppercase">Step 1</p>
                                    <p className="bs-mobiCeramaic text-sm">Organization Info</p>
                                </div>
                                <div className="lg:flex md:flex hidden flex-grow flex-col justify-center">
                                    <RangeSlider value={50} />
                                </div>
                            </div>

                            <div className="mb-1 flex flex-col gap-6 mt-5">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Name
                                        </p>
                                        <Input icon="company.svg" type="text" placeholder="Enter your company name" />
                                    </div>


                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input icon="phone.svg" type="tel" placeholder="Enter your phone number" />
                                    </div>

                                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Country
                                        </p>
                                        <Input icon="human.svg" type="text" placeholder="Choose your country" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            State
                                        </p>
                                        <Input icon="human.svg" type="text" placeholder="Choose your state" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Address
                                    </p>
                                    <Input icon="address.svg" type="text" placeholder="Enter your address" />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Email
                                    </p>
                                    <Input icon="email.svg" type="email" placeholder="Enter your email" />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Password
                                    </p>
                                    <Input icon="padlock.svg" type="password" placeholder="Password" />
                                </div>

                                <div className="flex justify-start">
                                    <div className="flex gap-1">
                                        <span className="flex">
                                            <Checkbox />
                                        </span>
                                        <span className="flex flex-col justify-center">I agree to the Terms & Conditions and Privacy Policy</span>
                                    </div>
                                </div>

                                <div className="flex">
                                    <Button className="bg-mobiPink w-full p-5 rounded-full" onClick={() => moveNext(true)}>Proceed</Button>
                                </div>
                            </div>
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