import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Privacy from "./components/privacy";
import { useState } from "react";
import Terms from "./components/terms";
import { useLocation } from "react-router-dom";


export default function Legal() {
    const location = useLocation();
    const [active, setActive] = useState(location.hash ? location.hash : '#Privacy');

    return (
        <>
            <div className="flex flex-col w-full h-full animate__animated animate__fadeIn">
                <div className="w-full h-full relative">
                    <div className="absolute bg-cover bg-center md:top-[0px] top-[20px] w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)` }}></div>
                    <div className="absolute w-full md:top-[0px] top-[20px] h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                    <Header />
                    <div className="w-full lg:mt-10 md:mt-10 mt-[40px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                        <p className="md:text-5xl text-3xl text-white font-bold mb-5 md:leading-[90px]">Legal</p>
                    </div>
                </div>

                <div className="w-full h-full relative">
                    <div className="w-full h-full flex flex-col text-black gap-8 md:py-14 md:px-32 px-2 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>

                        <span className="text-base font-semibold md:flex hidden">ON THIS PAGE</span>

                        <div className="min-h-screen flex flex-col w-full md:flex-row p-4 md:p-0">
                            {/* Sidebar */}
                            <aside className="md:w-1/4 w-full h-full md:sticky top-20">
                                <div className="w-full flex flex-col items-center md:items-start gap-1 p-4">
                                    {/* Privacy Policy Tab */}
                                    <div
                                        className={`w-full md:w-auto py-2 px-4 my-2 h-12 flex justify-center items-center ${active === '#Privacy'
                                            ? 'border-b-4 md:border-l-4 md:border-b-0 border-lBlue'
                                                : ''
                                            }`}
                                        onClick={() => setActive('#Privacy')}
                                    >
                                        <span
                                            className={`${active === 'Privacy' ? 'text-mobiBlue font-semibold' : 'text-gray-600'
                                                } text-base font-medium cursor-pointer`}
                                        >
                                            Privacy Policy
                                        </span>
                                    </div>

                                    {/* Terms & Conditions Tab */}
                                    <div
                                        className={`w-full md:w-auto py-2 px-4 my-2 h-12 flex justify-center items-center cursor-pointer ${active === '#Terms'
                                                ? 'border-b-4 md:border-b-0 md:border-l-4 border-lBlue'
                                                : ''
                                            }`}
                                        onClick={() => setActive('#Terms')}
                                    >
                                        <span
                                            className={`${active === 'Terms' ? 'text-mobiBlue font-semibold' : 'text-gray-600'
                                                } text-base font-medium cursor-pointer`}
                                        >
                                            Terms & Conditions
                                        </span>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="md:w-3/4 w-full px-6 md:ml-6 md:mt-0 mt-10">
                                {active === '#Privacy' &&
                                    <Privacy />
                                }
                                {active === '#Terms' &&
                                    <Terms />
                                }
                            </main>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
};