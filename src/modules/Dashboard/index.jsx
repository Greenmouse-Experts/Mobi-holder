import React from "react";
import Sidebar from "./layouts/sideBar";
import SearchInput from "../../components/SearchInput";
import settings from "../../assets/settings.svg";
import notifications from "../../assets/notifications.svg"
import Greeting from "./layouts/Greetings";

export default function Dashboard() {
    return (
        <>
            <div className="w-full flex h-full p-4 animate__animated animate__fadeIn">
                <Sidebar />
                <div className="w-full lg:ml-[25%] flex flex-col gap-5 md:ml-[25%] h-full">
                    <div className="w-full lg:flex-row md:flex-row flex flex-col gap-5">
                        <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col gap-5">
                            <div className="w-full flex gap-10">
                                <div className="flex w-full flex-grow">
                                    <SearchInput appendIcon="search.svg" type="password" placeholder="Enter keyword to search" />
                                </div>

                                <div className="flex gap-5">
                                    <div className="lg:flex md:flex hidden p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <img src={settings} />
                                    </div>
                                    <div className="lg:flex md:flex flex p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <img src={notifications} />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex">
                                <Greeting />
                            </div>
                        </div>

                        <div className="flex lg:w-[30%] md:w-[30%] w-full flex-col">
                            <div className="w-full flex flex-col gap-6 p-2 rounded-md" style={{ border: '1px solid rgba(52, 59, 79, 1)' }}>
                                <div className="flex items-center justify-center border w-full border-mobiSearchDark bg-mobiSearchDark px-3 py-1 rounded-[7px]">
                                    <div className="flex flex-grow">
                                        <p className="text-sm font-semibold">My Profile</p>
                                    </div>
                                    <div className="flex">
                                        <img src="/userProfilexs.png" />
                                    </div>
                                </div>

                                <div className="w-full flex px-3 gap-3">
                                    <div className="flex">
                                        <img src="/userProfileLg.png" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-base font-semibold">Chukka Uzo</p>
                                        <p className="text-sm text-mobiRomanSilver">Individual Account</p>
                                        <div className="flex gap-2">
                                            <p className="text-mobiBlue">ID: 364888484</p>
                                            <div className="flex flex-col justify-center">
                                                <svg width="13" height="17" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" y="3.59106" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                                    <rect x="3.59082" y="0.5" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                                </svg>
                                            </div>
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