import { useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";

export default function BankDetails() {
    const { register } = useForm();

    const user = useSelector((state) => state.userData.data);

    return (
        <div className="mb-1 flex flex-col gap-5 mt-5">
            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                        Bank Name
                    </p>
                    <Input type="text" register={register} name="mobiholderId" disabled placeholder="Bank Name" />
                </div>

                <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                        Account Number
                    </p>
                    <Input type="text" register={register} name="mobiholderId" disabled placeholder="Account Number" />
                </div>
            </div>

            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                        Bank Account Name (Full Name)
                    </p>
                    <Input type="text" register={register} name="mobiholderId" disabled placeholder="Account Name" />
                </div>
            </div>
        </div>
    )
}