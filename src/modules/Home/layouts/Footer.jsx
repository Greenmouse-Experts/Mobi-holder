import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col w-full h-full relative">
                <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029459/mobiHolder/mobiHolder_home/circle-roller_jqv5di.gif)` }}></div>
                <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}></div>
                <div className="w-full h-full flex flex-col gap-8 md:pt-20 lg:px-44 md:px-20 px-6 py-6 relative">
                    <div className="w-full flex flex-col md:flex-row md:py-6 gap-10 md:gap-20">
                        {/* Left Section */}
                        <div className="flex flex-col space-y-4 md:w-1/3 w-full items-center md:items-start">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3">
                                <img src="/mobiHolder.svg" alt="Logo" className="w-8 h-8" />
                                <div>
                                    <span className="text-xl font-semibold text-white">MobiHolder</span>
                                </div>
                            </Link>

                            {/* Description */}
                            <p className="text-sm text-white text-center md:text-left leading-6">
                                More than just being a digital version of your wallet, MobiHolder is poised to bridge the identification gap in Africa.
                            </p>

                            {/* Download Section */}
                            <div className="flex flex-col items-center md:items-start gap-4">
                                <p className="text-lg text-white">Download the App</p>
                                <div className="flex gap-4">
                                    <img src={playStore} alt="Play Store" className="w-[100px]" />
                                    <img src={appleStore} alt="Apple Store" className="w-[100px]" />
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
                            {/* Company Links */}
                            <div className="space-y-4 text-white">
                                <h3 className="text-lg font-semibold">COMPANY</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="uppercase">Home</a></li>
                                    <li><Link to='#useCases' className="uppercase">Use Cases</Link></li>
                                    <li><a href="#" className="uppercase">Pricing</a></li>
                                    <li><a href="#" className="uppercase">FAQs</a></li>
                                    <li><a href="#" className="uppercase">Contact</a></li>
                                </ul>
                            </div>

                            {/* Support Links */}
                            <div className="space-y-4 text-white">
                                <h3 className="text-lg font-semibold">SUPPORT</h3>
                                <ul className="space-y-4">
                                    <li><Link to='/legal' className="uppercase">Terms & Conditions</Link></li>
                                    <li><Link to='/legal' className="uppercase">Privacy Policy</Link></li>
                                    <li><a href="#" className="uppercase">Help Center</a></li>
                                    <li><Link to='/legal' className="uppercase">Legal</Link></li>
                                </ul>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-4 text-white">
                                <h3 className="text-lg font-semibold">SOCIALS</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="uppercase">Twitter</a></li>
                                    <li><a href="#" className="uppercase">Instagram</a></li>
                                    <li><a href="#" className="uppercase">Facebook</a></li>
                                    <li><a href="#" className="uppercase">LinkedIn</a></li>
                                    <li><a href="#" className="uppercase">TikTok</a></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4 text-white">
                                <h3 className="text-lg font-semibold">CONTACT US</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="uppercase">+234 812 345 6789</a></li>
                                    <li><a href="#" className="break-all">help@mobiholder.com</a></li>
                                    <li><a href="#" className="break-all">support@mobiholder.com</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex md:flex-row justify-center mt-10 md:mt-0 gap-2 md:mb-0">
                        <p className="text-sm text-white">© 2024, Mobiholder. All rights reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}