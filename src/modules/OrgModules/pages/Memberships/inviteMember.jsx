import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { newApi } from "../../../../api/hooks/useApiMutation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SimpleDesignationSelect } from "../../../../components/designations/DesignationsInput";
import { useNavigate } from "react-router-dom";

export default function InviteMember() {
  const user = useSelector((state) => state.orgData.orgData);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Only validate when user leaves the field
    reValidateMode: "onChange",
    // Re-validate on change after first validation
  });
  const [startDate, setStartDate] = useState("");
  const nav = useNavigate();
  const request = useMutation({
    mutationFn: async (inviteData) => {
      // 'inviteData' will be the argument passed to mutate
      let resp = await newApi.post(
        "/api/memberships-subscriptions/send/membership/request",
        inviteData, // Use the 'inviteData' received from the mutate call
      );
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Member invitation sent successfully!");
      // Reset form state
      reset();
      setStartDate("");
      // setTimeout(() => window.location.reload(), 500);
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      nav("/org/memberships");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to send invitation.",
      );
    },
  });

  const inviteMember = async (data) => {
    if (!startDate.trim()) return toast.error("Please select a start date");
    let newData = { ...data, dateJoined: startDate }; // Prepare the data payload including startDate
    request.mutate(newData); // Pass the complete 'newData' to the mutation
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
                      value={startDate}
                      // rules={{ required: "Membership start date is required" }}
                      // errors={errors}
                      onChange={setStartDate}
                      placeholder="Select membership start date"
                    />
                    {/* <CustomDatePicker /> */}
                  </div>
                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Role (Designation)
                    </p>
                    {/* <SimpleDesignationSelect org />*/}
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
                      disabled={request.isPending}
                      className="bg-mobiPink  w-full p-3 rounded-full"
                    >
                      {request.isPending
                        ? "Inviting Member"
                        : "Invite New Member"}
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
