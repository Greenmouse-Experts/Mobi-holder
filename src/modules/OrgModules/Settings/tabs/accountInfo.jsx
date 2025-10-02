import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { dateFormat } from "../../../../helpers/dateHelper";
import MultipleSelect from "../../../../components/MultipleSelect";
import { useState } from "react";
import { setOrg } from "../../../../reducers/organisationSlice";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import SimpleInput from "../../../../components/shared/SimpleInput";

export default function AccountInfo() {
  const user = useSelector((state) => state.orgData.orgData);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobiholderId: user.mobiHolderId,
      dateJoined: dateFormat(user.createdAt, "dd-MM-yyyy"),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorAccess, setErrorAccess] = useState(false);
  const dispatch = useDispatch();
  const { mutate } = useApiMutation();
  const [payload, setPayload] = useState(user);

  const changeInfo = () => {
    setIsLoading(true);
    mutate({
      url: "/api/users/profile/update/organization",
      method: "PUT",
      data: payload,
      headers: true,
      onSuccess: (response) => {
        dispatch(setOrg(response.data.data));
        setIsLoading(false);
      },
    });
  };

  const handleAccessType = (data) => {
    const { natureOfOrganization, ...rest } = user;
    setPayload(() => ({
      ...rest,
      companyAddress:
        typeof user.companyAddress === "string"
          ? JSON.parse(user.companyAddress)
          : user.companyAddress,
      natureOfOrganization: data,
    }));
  };

  return (
    <div className="mb-1 flex flex-col gap-5 mt-5">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col w-full gap-6">
          <p className="-mb-3 text-mobiFormGray">MobiHolder ID</p>
          <SimpleInput {...register("mobiholderId")} />
          {/* <Input
            type="text"
            register={register}
            name="mobiholderId"
            disabled
            placeholder="MobiHolder ID"
          />*/}
        </div>
      </div>

      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
        <div className="flex flex-col w-full gap-6">
          <p className="-mb-3 text-mobiFormGray">Access Type</p>
          <MultipleSelect
            accessType={handleAccessType}
            selectedData={user.natureOfOrganization}
          />
          {errorAccess && (
            <p className="-mt-3" style={{ color: "red" }}>
              Select Organisation Access Type
            </p>
          )}
        </div>
        <div className="flex flex-col w-full gap-6">
          <p className="-mb-3 text-mobiFormGray">Date Joined</p>
          <SimpleInput {...register("dateJoined")} />
        </div>
      </div>
      <div className="flex">
        <Button
          onClick={() => changeInfo()}
          disabled={isLoading}
          className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
}
