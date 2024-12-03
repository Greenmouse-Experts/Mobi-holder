import { useSelector } from "react-redux";
import Header from "../../header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import DropdownMenu from "../../../../components/DropdownMenu";

export default function ViewCard() {
    const user = useSelector((state) => state.userData.data);
    const { register } = useForm();

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">View ID Card</p>
                            <p className="text-base">Preview ID Card for : <span className="text-mobiBlue">GreenMouse</span></p>
                            <div className="flex my-2">
                                <DropdownMenu buttonLabel="Created by Organisation" disabled color="#A324F2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiPink border rounded-md border-mobiPink">
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form>
                                <div className="mb-1 flex flex-col gap-8 mt-5">
                                    <img src="/id-card.png" className="md:w-3/4 w-full" />
                                    <div className="flex flex-col w-full mt-10 gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Organisation
                                        </p>
                                        <Input type="text" name="firstName" register={register} disabled placeholder="Green Mouse" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Role
                                        </p>
                                        <Input type="text" name="lastName" register={register} disabled placeholder="Sales Rep" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                           ID Card Number
                                        </p>
                                        <Input name="phoneNumber" disabled register={register}
                                            type="text" placeholder="Enter the Card Number" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Issue Date
                                        </p>
                                        <Input type="date" disabled name="email" register={register} placeholder="Email" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Expiry Date
                                            </p>
                                            <Input type="date" disabled name="dateOfBirth" register={register} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Status
                                        </p>
                                        <Input name="phoneNumber" disabled value={'Active'} register={register}
                                            type="text" placeholder="Active" />
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