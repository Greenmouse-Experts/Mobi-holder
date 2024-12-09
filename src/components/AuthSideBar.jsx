import React, { useEffect, useState } from "react";
import womanWithCard from "../assets/woman-with-card.png";
import idCard from "../assets/id-card.png";
import checkMark from "../assets/checkMark.png";
import teamGroup from "../assets/team-group.png";
import subscription from "../assets/subscription-4.png";
import handShake from "../assets/hand_shake.png";
import party from "../assets/party.png";
import calendarTimer from "../assets/calendar-timer.png";
import event from "../assets/event-4.png";
import microscope from "../assets/microscope.png";
import qrCodeScan from "../assets/qr-code-scan.png";
import passwordAccess from "../assets/password-access.png";


const Slider1 = () => {
    return (
        <>
            <div className="relative flex w-full justify-center items-center h-screen flex-col">
                <img
                    src={womanWithCard}
                    alt="Woman holding card"
                    className="w-[284px] h-auto rounded-lg object-cover"
                />

                <div className="flex w-full justify-center mt-20">
                    <div className="flex w-full flex-col gap-5">
                        <div className="flex px-14 flex-col gap-4">
                            <p className="text-2xl text-center font-semibold">
                                ID Card Management made easy
                            </p>
                        </div>
                        <div className="flex w-full px-3">
                            <p className="text-base">
                                Effortlessly create, store, and manage digital ID cards for employees, visitors, and more—all in one secure app
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[45%] left-8 bg-white border shadow-lg flex items-center space-x-2 px-4 py-2 rounded-lg">
                    <img src={checkMark} alt="Checkmark" className="w-4 h-4" />
                    <span className="text-black text-xs font-medium">ID Created successfully</span>
                </div>

                <div className="absolute top-[23%] md:right-10 lg:right-16 w-[71px] h-[71px] bg-white rounded-full shadow-lg p-1 flex items-center justify-center">
                    <img src={idCard} alt="ID card" className="w-[36px] object-contain rounded-md" />
                </div>
            </div>
        </>
    )
}






const Slider2 = () => {
    return (
        <>
            <div className="relative flex w-full justify-center items-center h-screen flex-col">
                <img
                    src={teamGroup}
                    alt="Woman holding card"
                    className="w-[350px] h-[350px] rounded-lg object-cover"
                />

                <div className="flex w-full justify-center mt-20">
                    <div className="flex w-full flex-col gap-5">
                        <div className="flex px-14 flex-col gap-4">
                            <p className="text-2xl text-center font-semibold">
                                Enjoy Memberships & Subscriptions
                            </p>
                        </div>
                        <div className="flex w-full justify-center px-3">
                            <p className="text-base text-center">
                                Become a member of organizations and also get to subscribe to organizations for exclusive contents
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[15%] left-8 bg-white border shadow-lg w-[71px] h-[71px] flex items-center space-x-2 px-4 rounded-full">
                    <img src={subscription} alt="ID card" className="w-[36px] object-contain rounded-md" />
                </div>

                <div className="absolute top-[45%] md:right-1 w-[200px] lg:right-2 bg-white rounded-lg shadow-lg px-4 py-2 flex flex-col items-center justify-center">
                    <img src={handShake} alt="Checkmark" className="w-4 h-4" />
                    <span className="text-black text-xs font-medium">
                        Congratulations, you are now a member
                    </span>
                </div>
            </div>
        </>
    )
}




const Slider3 = () => {
    return (
        <>
            <div className="relative flex w-full justify-center items-center h-screen flex-col">
                <img
                    src={party}
                    alt="Woman holding card"
                    className="w-[350px] h-[350px] rounded-lg object-cover"
                />

                <div className="flex w-full justify-center mt-20">
                    <div className="flex w-full flex-col gap-5">
                        <div className="flex px-14 flex-col gap-4">
                            <p className="text-2xl text-center font-semibold">
                                Event management at your fingertips
                            </p>
                        </div>
                        <div className="flex w-full px-3">
                            <p className="text-base">
                                Plan, organize, and manage events effortlessly in one app. From creating schedules to tracking attendees
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[45%] left-8 bg-white border shadow-lg flex items-center space-x-2 px-4 py-2 rounded-lg">
                    <img src={event} alt="Checkmark" className="w-4 h-4" />
                    <span className="text-black text-xs font-medium">
                        Your event has been created
                    </span>
                </div>

                <div className="absolute top-[23%] md:right-10 lg:right-10 w-[71px] h-[71px] bg-white rounded-full shadow-lg p-1 flex items-center justify-center">
                    <img src={calendarTimer} alt="ID card" className="w-[36px] object-contain rounded-md" />
                </div>
            </div>
        </>
    )
}







const Slider4 = () => {
    return (
        <>
            <div className="relative flex w-full justify-center items-center h-screen flex-col">
                <img
                    src={microscope}
                    alt="Woman holding card"
                    className="w-[350px] h-[350px] rounded-lg object-cover"
                />

                <div className="flex w-full justify-center mt-20">
                    <div className="flex w-full flex-col gap-5">
                        <div className="flex px-14 flex-col gap-4">
                            <p className="text-2xl text-center font-semibold">
                                Verification module for access control
                            </p>
                        </div>
                        <div className="flex w-full justify-center px-3">
                            <p className="text-base text-center">
                                Manage access control, and assign people to handle event access with our embedded verification module
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[15%] left-8 bg-white border shadow-lg w-[71px] h-[71px] flex items-center space-x-2 px-4 rounded-full">
                    <img src={qrCodeScan} alt="ID card" className="w-[36px] object-contain rounded-md" />
                </div>

                <div className="absolute top-[45%] md:right-6 w-auto lg:right-6 bg-white rounded-lg shadow-lg px-4 py-2 flex flex-col items-center justify-center">
                    <img src={passwordAccess} alt="Checkmark" className="w-4 h-4 -mt-3" />
                    <span className="text-black text-xs font-medium mt-4">
                        Access Granted
                    </span>
                </div>
            </div>
        </>
    )
}





export default function AuthSideBar() {
    const slides = [
        {
            content: <Slider1 />
        },
        {
            content: <Slider2 />
        },
        {
            content: <Slider3 />
        },
        {
            content: <Slider4 />
        }
    ];


    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically switch slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);


    return (
        <div className="lg:w-[33%] md:hidden h-full lg:flex md:flex sm:hidden hidden bg-mobiDarkSide flex-col column-reverse fixed flex-grow">
            <div className="flex justify-center mx-8 my-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-full mx-1 rounded-full ${currentSlide === index
                            ? "bg-[rgba(36,46,242,1)]"
                            : "bg-[rgba(36,46,242,0.3)]"
                            }`}
                    />
                ))}
            </div>
            <div className="overflow-hidden rounded-lg">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${currentSlide === index
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                            }`}
                    >
                        {slide.content}
                    </div>
                ))
                }
            </div>
            <div className="w-full absolute bottom-0 flex p-2 justify-center">
                <p className="text-sm" style={{ color: 'rgba(63, 67, 83, 1)' }}>Copyright © 2024 Mobiholder. All Rights Reserved</p>
            </div>
        </div>)
}