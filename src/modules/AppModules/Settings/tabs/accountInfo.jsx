import { useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { dateFormat } from "../../../../helpers/dateHelper";

export default function AccountInfo() {
    const { register } = useForm();

    const user = useSelector((state) => state.userData.data);

    return (
        <div className="mb-1 flex flex-col gap-5 mt-5">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                        MobiHolder ID
                    </p>
                    <Input type="text" value={user.mobiHolderId} register={register} name="mobiholderId" disabled placeholder="MobiHolder ID" />
                </div>
            </div>

            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                        Date Joined
                    </p>
                    <Input disabled name="dateJoined" value={dateFormat(user.createdAt, "dd-MM-yyyy")} register={register} type="text" placeholder="Email" />
                </div>
            </div>
        </div>
    )
}