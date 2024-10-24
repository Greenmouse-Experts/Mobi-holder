import { Button, Drawer } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import Theme from "../../../components/Theme"

export default function Header() {
    const navs = [
        {
            url: '/',
            text: 'Home'
        },
        {
            url: '/',
            text: 'Features'
        },
        {
            url: '/',
            text: 'Pricing'
        },
        {
            url: '/',
            text: 'FAQs'
        }
    ];

    const isMobile = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /android|iPad|iPhone|iPod|windows phone|Mobi/i.test(userAgent);
    };

    useEffect(() => {
        // Only add the scroll listener if not on mobile
        if (!isMobile()) {
            const handleScroll = () => {
                const scrolledY = window.scrollY;
                const header = document.querySelector("[data-header]");

                if (scrolledY >= 20) {
                    header.style.position = 'fixed';
                    header.style.top = 0;
                } else {
                    header.style.position = null;
                    header.style.top = null;
                }
            };

            // Add the scroll event listener
            window.addEventListener('scroll', handleScroll);

            // Cleanup: remove the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []); // Run this effect

    
    const { theme } = useContext(ThemeContext);

    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        document.documentElement.style.position = 'fixed'; setOpen(true)
    };
    const closeDrawer = () => {
        document.documentElement.style.position = null;
        setOpen(false);
    }

    return (
        <>
            <div className="w-full flex py-6 lg:px-44 md:px-20 px-6 md:relative justify-between backdrop-blur-[53.8px] z-[9999]" data-header
                style={{ background: 'linear-gradient(to right, rgba(1, 12, 16, 0.42), rgba(1, 21, 26, 0.4))' }}>
                <div className='flex gap-3 w-full'>
                    <Link to={'/'} className="w-full flex gap-3">
                        <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                        <div className='flex flex-col justify-center'>
                            <span className='text-xl mt-1 font-semibold text-white'>MobiHolder</span>
                        </div>
                    </Link>
                </div>

                <div className="md:flex hidden w-full text-white">
                    <div className="flex w-full gap-4">
                        {navs.map((nav, index) => (
                            <div className="w-full  h-full flex flex-col justify-center" key={index}>
                                <Link to={nav.url} className="w-full flex">
                                    <span className="font-[500] text-base">{nav.text}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:flex hidden h-full w-full">
                    <div className="flex w-full gap-2 justify-end">
                        <Button className="bg-transparent rounded-full border border-white text-white">
                            <Link className="w-full h-full flex" to={'/login'}>
                                <span className="font-semibold capitalize">Login</span>
                            </Link>
                        </Button>
                        <Button className="bg-mobiDarkBlue rounded-full text-white">
                            <span className="font-semibold normal-case">Sign up</span>
                        </Button>
                    </div>
                </div>

                <div className="lg:hidden md:hidden flex p-2 bg-mobiSearchDark rounded-md flex-col justify-center">
                    <button
                        className="text-black focus:outline-none"
                        aria-label="Open Menu"
                        id="mobile-menu-button"
                        onClick={openDrawer}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={theme === 'light' ? '#000000' : '#FFFFFF'} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/** MOBILE NAV DROPDOWN */}
            <Drawer open={open} onClose={closeDrawer} className="bg-mobiDarkCloud">
                <>
                    <div className="py-6 px-4 flex gap-6 flex-col border-bottom">
                        <div className='flex px-3 gap-3'>
                            <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                            <div className='flex flex-col justify-center'>
                                <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                            </div>
                        </div>
                        <div className='w-full h-[1px] border-mobiSilverDivider border-bottom border'></div>
                        <div className="flex w-full flex-col gap-7">
                            {navs.map((nav, index) => (
                                <div className="w-full  h-full flex flex-col justify-center" key={index}>
                                    <Link to={nav.url} className="w-full flex">
                                        <span className="font-[500] text-base">{nav.text}</span>
                                    </Link>
                                </div>
                            ))}
                            <Button className="bg-transparent rounded-full border border-gray-600">
                                <Link className="w-full h-full flex justify-center" to={'/login'}>
                                    <span className="font-semibold capitalize">Login</span>
                                </Link>
                            </Button>
                            <Button className="bg-mobiDarkBlue rounded-full text-white">
                                <Link className="w-full h-full flex justify-center" to={'/login'}>
                                    <span className="font-semibold normal-case">Sign up</span>
                                </Link>
                            </Button>
                        </div>

                        {/* Dark Mode Toggle */}
                        <div className="mt-4 flex justify-center space-x-2 p-4">
                            <Theme />
                        </div>
                    </div>
                </>
            </Drawer>
        </>
    )
}