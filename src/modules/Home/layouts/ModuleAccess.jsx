import { Button } from "@material-tailwind/react";
import stringBlock from "../../../assets/string-block.gif";
import iPhone from "../../../assets/iPhone16_markup.png";
import authGroup from "../../../assets/auth-group.png";
import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";

export default function ModuleAccess() {
    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full h-full flex flex-col gap-8 md:py-10 md:px-10 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                    <div className="w-full flex py-8 justify-center">
                        <div className="lg:w-1/3 md:w-2/5 w-full flex justify-center">
                            <span className="md:text-4xl text-2xl tracking-wide md:leading-[55px] leading-[50px] font-bold w-full text-center">
                                <span style={{ backgroundColor: 'rgba(205, 205, 251, 1)' }}>Verification</span> Module for
                                Access <span style={{ backgroundColor: 'rgba(205, 205, 251, 1)' }}>Control</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <img src="/access_wave.png" />
                    </div>
                    <div className="absolute md:flex hidden right-48 top-16">
                        <img src="/anigma-cell.gif" className="w-[100px]" />
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="lg:w-3/5 md:w-2/5 w-full flex justify-center">
                            <p className="text-base text-center">
                                Easily manage event access with our built-in verification module.
                                Assign personnel, control entry, and monitor access in real time to ensure secure and efficient event management.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="lg:w-2/5 md:w-2/5 w-full flex justify-center mb-8">
                            <Button className="w-1/2 rounded-full p-5 bg-mobiBlue">Learn More</Button>
                        </div>
                    </div>
                    <div className="absolute md:flex hidden bottom-10 left-20">
                        <img src="/golden-roller-ball.gif" className="w-[100px]" />
                    </div>
                </div>

                <div className="w-full h-full relative flex-col">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${stringBlock})` }}></div>
                    <div className="md:w-[63%] w-full flex flex-col relative md:py-28 mt-10 lg:px-44 md:px-20 px-6 gap-5 z-50">
                        <span className="md:text-5xl text-4xl font-bold leading-[60px] gradient-text">Ready to unlock your Management potential?</span>
                        <span className="text-base leading-[30px] text-white">
                            Take control of your team, tasks,
                            and performance with streamlined management tools.
                            Boost productivity, enhance collaboration, and watch your business thrive!
                        </span>
                        <div className="w-full flex">
                            <div className="lg:w-2/5 md:w-2/5 w-full flex mb-8">
                                <Button className="rounded-full w-auto bg-mobiDarkBlue">
                                    <span className="normal-case flex gap-1">Get Started
                                        <span className="flex flex-col justify-center pt-[1.5px]">
                                            <svg width="25" height="7" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.0073 4.25L19.4255 0.0647949L19.5919 8.72345L27.0073 4.25ZM1.00706 5.49986L20.273 5.12957L20.2442 3.62985L0.978233 4.00014L1.00706 5.49986Z" fill="white" />
                                            </svg>
                                        </span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 md:px-32 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="flex md:w-2/5">
                            <img src={iPhone} style={{ width: '400px' }} />
                            <img src={authGroup} className="absolute z-50 bottom-20 left-16 w-[460px]" />
                        </div>
                        <div className="flex md:w-1/2 flex-col gap-4 md:py-12">
                            <p className="md:text-5xl text-2xl font-bold">Download the App</p>
                            <p className="text-sm leading-[35px]">
                                Experience seamless access to all our features right at your fingertips!
                                Download the mobile app now and enjoy convenience, real-time updates, and a user-friendly interface wherever you go.
                            </p>
                            <div className="flex gap-5">
                                <img src={playStore} />
                                <img src={appleStore} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-10" style={{ backgroundColor: 'rgba(2, 13, 17, 1)' }}>
                    <div className="w-full flex md:flex-row flex-col">
                    </div>
                </div>

            </div>
        </>
    )
}