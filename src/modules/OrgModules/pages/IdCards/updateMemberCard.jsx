import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";

export default function UpdateMemberCard() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register } = useForm();

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">ID Card Preview</p>
                            <p className="text-base">Preview ID Card for : <span className="text-mobiBlue">Frank Uzo</span></p>
                            <div className="flex my-2">
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    <img src="/id-card.png" className="md:w-3/5 w-full" />
                                    <div className="flex flex-col w-full mt-10 gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role
                                        </p>
                                        <Input type="text" name="firstName" register={register} placeholder="Green Mouse" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Issue Date
                                        </p>
                                        <Input type="date" name="lastName" register={register} placeholder="Sales Rep" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card Category
                                        </p>
                                        <Input name="phoneNumber" register={register}
                                            type="text" placeholder="Select ID Category" />
                                    </div>

                                    <div className="flex">
                                        <Button className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            Update Card Info
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}