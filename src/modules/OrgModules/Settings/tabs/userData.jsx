import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setOrg } from "../../../../reducers/organisationSlice";
import { Button } from "@material-tailwind/react";
import useApiMutation, { newApi } from "../../../../api/hooks/useApiMutation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMemo } from "react";
import SimpleInput from "../../../../components/shared/SimpleInput";

export default function UserData() {
  const user = useSelector((state) => state.orgData.orgData);
  const form_ = useForm({
    defaultValues: {
      name: user.firstName,
    },
  });
  return <UserForm user={user} />;
}

const UserForm = (props) => {
  const user = useMemo(() => {
    return props.user;
  }, [props.user]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
  });

  const dispatch = useDispatch();
  const { mutate } = useApiMutation();
  useEffect(() => {
    console.log(user, "userData");
  }, [user]);

  const update_profile = useMutation({
    mutationFn: async (data) => {
      let resp = await newApi.put("/api/users/profile/update/organization", {
        ...data,
      });
      return resp.data;
    },
    onSuccess: () => {
      dispatch(setOrg(response.data.data));
    },
  });
  const changeProfile = (data) => {
    const { companyAddress, phoneNumber, ...rest } = user;
    const payloadData = {
      ...rest,
      companyAddress:
        typeof companyAddress === "string"
          ? JSON.parse(companyAddress)
          : companyAddress,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
    const resp = update_profile.mutate(payloadData);
  };

  // return <>{JSON.stringify(user)}</>;
  return (
    <form onSubmit={handleSubmit(changeProfile)}>
      <div className="mb-1 flex flex-col gap-5">
        <div className="w-full flex lg:flex-row md:flex-row flex-col mt-6 gap-6">
          <div className="flex flex-col w-full gap-6">
            <SimpleInput {...register("firstName")} label="First Name" />
          </div>

          <div className="flex flex-col w-full gap-6">
            <SimpleInput {...register("lastName")} label="Last Name" />
          </div>
        </div>

        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
          <div className="flex flex-col w-full gap-6">
            <SimpleInput {...register("phoneNumber")} label="Phone Number" />
          </div>

          <div className="flex flex-col w-full gap-6">
            <SimpleInput {...register("email")} label="Email" />
          </div>
        </div>
        <div className="flex">
          <Button
            type="submit"
            disabled={update_profile.isPending}
            className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full"
          >
            {update_profile.isPending ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
};
