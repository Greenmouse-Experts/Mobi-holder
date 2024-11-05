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
                <div className="w-full h-full flex flex-col gap-8 md:pt-20 lg:px-44 md:px-20 px-6 py-6 relative">
                    <div className="w-full flex md:py-6 md:flex-row flex-col md:gap-20 gap-10">
                        <div className="flex md:w-[30%] w-full flex-col space-y-2">
                            <div className='flex gap-3 md:justify-start justify-center w-full'>
                                <Link to={'/'} className="w-full flex md:justify-start justify-center gap-3">
                                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                    <div className='flex flex-col md:justify-start justify-center'>
                                        <span className='text-xl mt-1 font-semibold text-white'>MobiHolder</span>
                                    </div>
                                </Link>
                            </div>
                            <p className="text-sm text-white leading-[40px]">
                                More than just being a digital version of your wallet, MobiHolder is poised to bridge the identification gap in Africa
                            </p>
                            <div className="flex flex-col gap-4 md:py-6 md:px-0">
                                <p className="text-lg text-white">Download the App</p>
                                <div className="flex gap-5">
                                    <img src={playStore} className="w-[120px]" />
                                    <img src={appleStore} className="w-[120px]" />
                                </div>
                            </div>
                        </div>

                        <div className="md:w-[70%] w-full flex flex-wrap md:gap-5 gap-16">
                            <div className="flex flex-col md:w-1/4 xl:w-[24%] space-y-2 text-white">
                                <h3 className="md:text-lg text-base font-semibold my-4">COMPANY</h3>
                                <ul className="space-y-6">
                                    <li><a href="#" className="text-white uppercase">Home</a></li>
                                    <li><a href="#" className="text-white uppercase">Features</a></li>
                                    <li><a href="#" className="text-white uppercase">Pricing</a></li>
                                    <li><a href="#" className="text-white uppercase">FAQs</a></li>
                                    <li><a href="#" className="text-white uppercase">Contact</a></li>
                                </ul>
                            </div>

                            <div className="flex flex-col space-y-2 md:w-1/4 xl:w-[24%] text-white">
                                <h3 className="md:text-lg text-base font-semibold my-4">SUPPORT</h3>
                                <ul className="space-y-6">
                                    <li><a href="#" className="text-white uppercase">Terms & Conditions</a></li>
                                    <li><a href="#" className="text-white uppercase">Privacy Policy</a></li>
                                    <li><a href="#" className="text-white uppercase">Help Center</a></li>
                                    <li><a href="#" className="text-white uppercase">Legal</a></li>
                                    <li><a href="#" className="text-white uppercase">Download</a></li>
                                </ul>
                            </div>

                            <div className="flex flex-col space-y-2 md:w-1/4 xl:w-[24%] w-1/4 text-white">
                                <h3 className="md:text-lg text-base font-semibold my-4">SOCIALS</h3>
                                <ul className="space-y-6">
                                    <li><a href="#" className="text-white uppercase">Twitter</a></li>
                                    <li><a href="#" className="text-white uppercase">Instagram</a></li>
                                    <li><a href="#" className="text-white uppercase">Facebook</a></li>
                                    <li><a href="#" className="text-white uppercase">LinkedIn</a></li>
                                    <li><a href="#" className="text-white uppercase">TikTok</a></li>
                                </ul>
                            </div>

                            <div className="flex flex-col space-y-2 md:w-1/4 w-1/2 xl:w-[24%] text-white">
                                <h3 className="md:text-lg text-base font-semibold my-4">CONTACT US</h3>
                                <ul className="space-y-6">
                                    <li><a href="#" className="text-white uppercase">+234 812 345 6789</a></li>
                                    <li><a href="#" className="text-white">help@mobiholder.com</a></li>
                                    <li><a href="#" className="text-white">support@mobiholder.com</a></li>
                                </ul>
                            </div>
                        </div>

                        {/*<div className="flex flex-col space-y-2 text-white">
                            <div className="md:flex hidden gap-4">
                                <img src="/mobi-badge.png" />
                                <img src="/mobi-badge.png" />
                                <img src="/mobi-badge.png" />
                            </div>
                            <div className="flex flex-col gap-4 md:py-12 md:px-0">
                                <p className="text-lg text-white">Download the App</p>
                                <div className="flex gap-5">
                                    <img src={playStore} className="w-[120px]" />
                                    <img src={appleStore} className="w-[120px]" />
                                </div>
                            </div>
                        </div>*/}
                    </div>

                    <div className="w-full flex md:flex-row justify-center mt-10 md:mt-0 gap-2 md:mb-0">
                        <p className="text-sm text-white">© 2024, Mobiholder. All rights reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}