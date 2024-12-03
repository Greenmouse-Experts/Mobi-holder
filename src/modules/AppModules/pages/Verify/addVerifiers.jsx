import { Button } from "@material-tailwind/react";
import Input from "../../../../components/Input";
import Header from "../../header";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function AddVerifier() {
    const user = useSelector((state) => state.userData.data);
    const { register, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Add Verifier</p>
                            <p className="text-base">Add Verifier for: <span className="text-mobiBlue">Google UI Event</span></p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-8 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            <form>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            User ID/Email Address
                                        </p>
                                        <Input type="text" name="firstName" register={register} placeholder="Enter User ID or email" />
                                    </div>
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Choose Event
                                        </p>
                                        <Input type="text" name="firstName" register={register} placeholder="Enter an event" />
                                    </div>
                                    <div className="flex">
                                        <Button type="submit" className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Add Verifier
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