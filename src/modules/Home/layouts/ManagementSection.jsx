import { useState } from "react";
import IDCardManagement from "./components/IDCardManagement";
import EventManagement from "./components/EventManagement";
import AccessControl from "./components/AccessControl";
import Subscription from "./components/Subscription";

export default function ManagementSection() {
    const [activeTab, setActiveTab] = useState('IDCard');

    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full h-full flex flex-col pt-10 lg:px-24 xl:px-52 md:px-20" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                    <div className="w-full flex">
                        <div className="md:flex hidden w-1/3 relative">
                            <div className="absolute left-[10rem] -top-[1rem]">
                                <img src="/roller-ball-animated.gif" style={{ width: '800px' }} />
                            </div>
                        </div>
                        <div className="flex md:w-2/3 w-full relative">
                            <div className="absolute h-[100px]" style={{
                                backgroundImage: `url('/Mobi_transparent.png')`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                            }}>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full justify-center flex z-50 py-10">
                        <div className="md:w-11/12 w-full h-full flex flex-col gap-12 py-5 md:px-12 sm:px-6 px-2 rounded-2xl" style={{ backgroundColor: 'rgba(6, 14, 22, 1)' }}>
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full flex justify-center">
                                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                </div>
                                <div className="w-full flex justify-center" id="useCases">
                                    <span className="sm:w-1/2 w-full text-4xl text-center font-bold text-white">
                                        Access to Top Notch Managerial Control
                                    </span>
                                </div>
                                <div className="w-full flex justify-center">
                                    <span className="sm:w-1/2 w-full text-center text-white">
                                        Do more with Mobiholder, manage your Events, IDs, subscriptions and memberships with one app.
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex flex-col xl:px-10 gap-12">
                                <div className="w-full bg-white py-2 px-4 flex flex-col sm:flex-row justify-between items-center rounded-3xl md:rounded-full space-y-2 sm:space-y-0 sm:space-x-2">
                                    <div onClick={() => setActiveTab('IDCard')} className={`${activeTab === 'IDCard' ? 'bg-mobiDarkBlue text-white' : 'bg-gray-200 text-mobiDarkBlue'} py-2 sm:py-5 px-5 cursor-pointer rounded-full w-full sm:w-auto text-center`}>
                                        <span className="uppercase text-xs sm:text-base xl:text-lg font-medium">
                                            ID CARD MANAGEMENT
                                        </span>
                                    </div>
                                    <div onClick={() => setActiveTab('Event')} className={`${activeTab === 'Event' ? 'bg-mobiDarkBlue text-white' : 'bg-gray-200 text-mobiDarkBlue'} py-2 sm:py-5 px-6 cursor-pointer rounded-full w-full sm:w-auto text-center`}>
                                        <span className="uppercase text-xs sm:text-base font-medium">
                                            Event Management
                                        </span>
                                    </div>
                                    <div onClick={() => setActiveTab('MemberShip')} className={`${activeTab === 'MemberShip' ? 'bg-mobiDarkBlue text-white' : 'bg-gray-200 text-mobiDarkBlue'} py-2 sm:py-5 cursor-pointer px-6 rounded-full w-full sm:w-auto text-center`}>
                                        <span className="uppercase text-xs sm:text-base font-medium">
                                            Memberships & Subscriptions
                                        </span>
                                    </div>
                                    <div onClick={() => setActiveTab('Access')} className={`${activeTab === 'Access' ? 'bg-mobiDarkBlue text-white' : 'bg-gray-200 text-mobiDarkBlue'} py-2 sm:py-5 px-6 cursor-pointer rounded-full w-full sm:w-auto text-center`}>
                                        <span className="uppercase text-xs sm:text-base font-medium">
                                            Access Control
                                        </span>
                                    </div>
                                </div>

                                {activeTab === 'IDCard' &&
                                    <IDCardManagement />
                                }

                                {activeTab === 'Event' &&
                                    <EventManagement />
                                }

                                {activeTab === 'Access' &&
                                    <AccessControl />
                                }

                                {activeTab === 'MemberShip' &&
                                    <Subscription />
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}