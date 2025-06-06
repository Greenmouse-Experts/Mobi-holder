import React, { useState } from 'react';
import Header from '../header';
import DropdownMenu from '../../../components/DropdownMenu';
import AccountInfo from './tabs/accountInfo';
import Security from './tabs/security';
import PaymentGateway from './tabs/paymentGateway';
import Support from './tabs/support';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('Account Info');

    const tabs = [
        {
            slug: 'Account Info',
            name: 'Account Info'
        },
        {
            slug: 'Security',
            name: 'Security'
        },
        {
            slug: 'Payment Gateway',
            name: 'Payment Gateway'
        },
        {
             slug: 'Support',
             name: 'Support'
         }
    ];

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superadmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex justify-between items-center">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Settings</p>
                            <div className="flex md:hidden">
                                <DropdownMenu buttonLabel={activeTab} color="#242EF2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiBlue border rounded-md border-mobiBlue">
                                    {tabs.map((tab, index) => (
                                        <div key={index} onClick={() => setActiveTab(tab.slug)} className={`flex items-center text-black py-2 cursor-pointer px-4 h-[40px] rounded-lg transition`}>
                                            <span>{tab.name}</span>
                                        </div>
                                    ))}
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="w-full flex gap-10 items-start">
                            <div className="bg-mobiDarkCloud w-[23%] rounded-md lg:flex md:flex hidden flex-col gap-3 px-2 py-5">
                                <nav className="px-1 space-y-4">
                                    {tabs.map((tab, index) => (
                                        <div key={index} onClick={() => setActiveTab(tab.slug)} className={`flex items-center py-2 cursor-pointer px-4 h-[40px] rounded-lg ${activeTab === tab.slug ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                                            <span className={`${activeTab === tab.slug ? 'text-mobiPink font-[500]' : ''}`}>{tab.name}</span>
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="w-full flex flex-grow">
                                <div className="shadow-xl py-7 px-5 md:w-[77%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-3">
                                    {activeTab === 'Account Info' && <AccountInfo />}
                                    {activeTab === 'Security' && <Security />}
                                    {activeTab === 'Payment Gateway' && <PaymentGateway />}
                                    {activeTab === 'Support' && <Support />}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}