import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { CustomDatePicker } from "../../../../components/CustomDatePicker";

export default function InviteMember() {
  const user = useSelector((state) => state.orgData.orgData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Only validate when user leaves the field
    reValidateMode: "onChange", // Re-validate on change after first validation
  });
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useApiMutation();

  const inviteMember = (data) => {
    setIsLoading(true);
    mutate({
      url: "/api/memberships-subscriptions/send/membership/request",
      method: "POST",
      data: data,
      headers: true,
      onSuccess: (response) => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile organisation data={user} title={"Invite New Member"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Invite New Member
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <form onSubmit={handleSubmit(inviteMember)}>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Member MobiHolder ID or Email
                    </p>
                    <Input
                      type="text"
                      name="individualInfo"
                      register={register}
                      rules={{ required: "Role is required" }}
                      errors={errors}
                      placeholder="Enter member mobiholder ID"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Member/Staff ID</p>
                    <Input
                      type="text"
                      name="memberId"
                      register={register}
                      rules={{ required: "Staff ID is required" }}
                      errors={errors}
                      placeholder="Enter member/staff ID"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-6 z-20">
                    <p className="-mb-3 text-mobiFormGray">
                      Membership Start Date
                    </p>
                    <Input
                      type="date"
                      name="dateFrom"
                      className="relative "
                      register={register}
                      rules={{ required: "Membership start date is required" }}
                      errors={errors}
                      placeholder="Select membership start date"
                    />
                    {/* <CustomDatePicker /> */}
                  </div>
                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Role (Designation)
                    </p>
                    <Input
                      type="text"
                      name="designation"
                      register={register}
                      rules={{ required: "Role is required" }}
                      errors={errors}
                      placeholder="Enter member/staff ID"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Organisation Email (optional)
                    </p>
                    <Input
                      type="text"
                      name="organizationEmail"
                      value={user?.companyEmail}
                      register={register}
                      placeholder="Email"
                    />
                  </div>

                  <div className="flex">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full"
                    >
                      {isLoading ? "Inviting Member" : "Invite New Member"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
