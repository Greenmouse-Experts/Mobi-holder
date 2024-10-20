import { Link } from "react-router-dom";
import Header from "../header";
import { useState } from "react";
import Input from "../../../components/Input";
import { Button } from "@material-tailwind/react";

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        {
            slug: 'profile',
            name: 'Profile Info'
        },
        {
            slug: 'account',
            name: 'Account Info'
        },
        {
            slug: 'security',
            name: 'Security'
        },
        {
            slug: 'additional-settings',
            name: 'Additional Settings'
        }
    ]
    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header />
                    <div className="w-full flex flex-col gap-8 my-5">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Settings</p>

                        <div className="w-full flex gap-10">
                            <div className="bg-mobiDarkCloud w-[23%] rounded-md flex flex-col gap-3 px-2 py-5">
                                <nav className="px-1 space-y-4">
                                    {tabs.map((tab, index) => (
                                        <div key={index} className={`flex items-center py-2 px-4 h-[40px] rounded-lg ${activeTab === tab.slug ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                                            <span className={`${activeTab === tab.slug ? 'text-mobiPink font-[500]' : ''}`}>{tab.name}</span>
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="w-full flex">
                                <div className="shadow-xl py-7 px-5 w-3/4 border border-mobiBorderFray card-body flex rounded-xl flex-col gap-3">

                                    <div className="mb-1 flex flex-col gap-8 mt-5">
                                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    First Name
                                                </p>
                                                <Input type="text" placeholder="First Name" />
                                            </div>

                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Last Name
                                                </p>
                                                <Input type="text" placeholder="Last Name" />
                                            </div>
                                        </div>

                                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Phone Number
                                                </p>
                                                <Input type="text" placeholder="Phone Number" />
                                            </div>

                                            <div className="flex flex-col w-full gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Email
                                                </p>
                                                <Input type="text" placeholder="Email" />
                                            </div>
                                        </div>

                                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                            <div className="flex flex-col gap-6">
                                                <p className="-mb-3 text-mobiFormGray">
                                                    Date of Birth
                                                </p>
                                                <Input type="text" placeholder="Enter your date of birth" />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <Button className="bg-mobiPink w-1/4 p-3 rounded-md">Update Info</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}