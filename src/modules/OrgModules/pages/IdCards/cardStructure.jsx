import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { useState } from "react";
import DropZone from "../../../../components/DropZone";
import { Button } from "@material-tailwind/react";

const RoundedCards = ({ bgColor }) => {
    return (
        <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}></div>
    )
}

export default function CardStructure() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, formState: { errors } } = useForm();
    const [selectedBgColor, setBgColor] = useState('rgba(216, 201, 254, 1)');
    const [selectedTextColor, setTextColor] = useState('rgba(216, 201, 254, 1)');

    const colorsArray = [
        {
            color1: 'rgba(0, 0, 0, 1)',
            color2: 'rgba(255, 171, 1, 1)'
        },
        {
            color1: 'rgba(177, 140, 254, 1)',
            color2: 'rgba(255, 140, 130, 1)'
        },
        {
            color1: 'rgba(238, 113, 158, 1)',
            color2: 'rgba(255, 64, 21, 1)'
        },
        {
            color1: 'rgba(255, 64, 21, 1)',
            color2: 'rgba(254, 98, 80, 1)'
        },
        {
            color1: 'rgba(216, 201, 254, 1)',
            color2: 'rgba(255, 255, 255,  1)'
        }
    ]

    return <>
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile organisation data={user} />
                <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Create ID Card Category</p>
                        <p className="text-base">Create an ID card structure for a category of your members</p>
                    </div>
                </div>

                <div className="w-full flex flex-grow">
                    <div className="shadow-xl py-2 px-5 md:px-8 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                        <form>
                            <div className="mb-1 flex flex-col gap-10 mt-5">
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Name of Category
                                    </p>
                                    <Input type="text" name="firstName" register={register} placeholder="Enter the category name" />
                                </div>

                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Choose ID Card Layout
                                    </p>
                                    <div className="flex md:flex-row flex-col gap-3">
                                        <div className="md:w-1/3 sm:w-1/2 w-full p-3">
                                            <img src="/card-frame-landscape.png" />
                                        </div>
                                        <div className="md:w-1/3 sm:w-1/2 w-full p-3">
                                            <img src="/card-frame-portrait.png" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-6 text-mobiFormGray">
                                        Background Colour
                                    </p>
                                </div>
                                <div className="flex gap-6">
                                    <div className={`flex p-5 w-1/12 h-[60px] rounded-lg`} style={{ backgroundColor: selectedBgColor }}>

                                    </div>
                                    <div className="flex gap-5 px-4">
                                        {colorsArray.map((color, index) => (
                                            <div className="flex flex-col gap-2" key={index}>
                                                <RoundedCards bgColor={color.color1} />
                                                <RoundedCards bgColor={color.color2} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-6 text-mobiFormGray">
                                        Text Colour
                                    </p>
                                </div>
                                <div className="flex gap-6">
                                    <div className={`flex p-5 w-1/12 h-[60px] rounded-lg`} style={{ backgroundColor: selectedTextColor }}>

                                    </div>
                                    <div className="flex gap-5 px-4">
                                        {colorsArray.map((color, index) => (
                                            <div className="flex flex-col gap-2" key={index}>
                                                <RoundedCards bgColor={color.color1} />
                                                <RoundedCards bgColor={color.color2} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                
                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex flex-col md:w-1/2 w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Logo
                                        </p>
                                        <DropZone text="Upload Company Logo" />
                                    </div>
                                </div>

                                <div className="flex">
                                    <Button className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                        Create ID Card Category
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </>
}