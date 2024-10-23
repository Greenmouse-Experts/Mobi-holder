import circleRoller from "../../../assets/circle-roller.gif";
import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col w-full h-full relative">
                <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${circleRoller})` }}></div>
                <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}></div>
                <div className="w-full h-full flex flex-col gap-8 lg:px-44 md:px-20 px-6 md:py-10 relative">
                    <div className="w-full md:flex hidden justify-between gap-10">
                        <div className="flex flex-col space-y-2 text-white">
                            <h3 className="text-lg font-semibold my-4">COMPANY</h3>
                            <ul className="space-y-6">
                                <li><a href="#" className="text-white uppercase">Home</a></li>
                                <li><a href="#" className="text-white uppercase">Features</a></li>
                                <li><a href="#" className="text-white uppercase">Pricing</a></li>
                                <li><a href="#" className="text-white uppercase">FAQs</a></li>
                                <li><a href="#" className="text-white uppercase">Contact</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-2 text-white">
                            <h3 className="text-lg font-semibold my-4">SUPPORT</h3>
                            <ul className="space-y-6">
                                <li><a href="#" className="text-white uppercase">Terms & Conditions</a></li>
                                <li><a href="#" className="text-white uppercase">Privacy Policy</a></li>
                                <li><a href="#" className="text-white uppercase">Help Center</a></li>
                                <li><a href="#" className="text-white uppercase">Legal</a></li>
                                <li><a href="#" className="text-white uppercase">Download</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-2 text-white">
                            <h3 className="text-lg font-semibold my-4">CONTACT US</h3>
                            <ul className="space-y-6">
                                <li><a href="#" className="text-white uppercase">+234 812 345 6789</a></li>
                                <li><a href="#" className="text-white">help@mobiholder.com</a></li>
                                <li><a href="#" className="text-white">support@mobiholder.com</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-2 text-white">
                            <div className="flex gap-4">
                                <img src="/mobi-badge.png" />
                                <img src="/mobi-badge.png" />
                                <img src="/mobi-badge.png" />
                            </div>
                            <div className="flex flex-col gap-4 md:py-12 md:px-0 px-7">
                                <p className="text-lg text-white">Download the App</p>
                                <div className="flex gap-5">
                                    <img src={playStore} className="w-[120px]" />
                                    <img src={appleStore} className="w-[120px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[1px] border my-4" style={{ borderColor: 'rgba(57, 57, 57, 1)' }} />
                    <div className="w-full flex">
                        <div className="flex flex-col flex-grow gap-2">
                            <div className='flex gap-3 w-full'>
                                <Link to={'/'} className="w-full flex gap-3">
                                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                    <div className='flex flex-col justify-center'>
                                        <span className='text-xl mt-1 font-semibold text-white'>MobiHolder</span>
                                    </div>
                                </Link>
                            </div>
                            <p className="text-sm text-white">Copyright © 2024</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-full justify-end"><img src="/social_icons.png" className="w-[60px]" />
                                </div>
                            <p className="text-sm text-white">Manage Policy | Cookie Policy | Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}