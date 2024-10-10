import React from "react";
import womanWithCard from "../assets/woman-with-card.png";
import idCard from "../assets/id-card.png";
import checkMark from "../assets/checkMark.png";

export default function AuthSideBar() {
    return (
        <div className="w-2/5 h-full lg:flex md:flex hidden bg-mobiDarkCloud flex-col flex-grow">
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

                <div className="absolute top-[45%] left-4 bg-white border shadow-lg flex items-center space-x-2 px-4 py-2 rounded-lg">
                    <img src={checkMark} alt="Checkmark" className="w-4 h-4" />
                    <span className="text-black text-xs font-medium">ID Created successfully</span>
                </div>

                <div className="absolute top-[23%] right-10 w-[71px] h-[71px] bg-white rounded-full shadow-lg p-1 flex items-center justify-center">
                    <img src={idCard} alt="ID card" className="w-[36px] object-contain rounded-md" />
                </div>
            </div>

        </div>)
}