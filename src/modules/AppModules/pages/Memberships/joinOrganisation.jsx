import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import { Button } from "@material-tailwind/react";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import AvatarInitials from "../../../../components/AvatarInitials";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, MapPin } from "lucide-react"; // Import Lucide icons
import { toast } from "react-toastify";
import { DesignationsInput } from "../../../../components/designations/DesignationsInput";

export default function JoinOrganisation() {
  const user = useSelector((state) => state.userData.data);
  const paramsData = useSelector((state) => state.userData.paramsData);
  const [isLoading, setIsLoading] = useState(false);
  const [iniData, setIniDate] = useState("");
  const [role, setRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = useApiMutation();

  const navigate = useNavigate();

  const joinOrganisation = (data) => {
    console.log(role, "role");
    if (!iniData.trim()) return toast.error("date joined required");
    if (!role.trim()) return toast.error("role is required");
    const payload = {
      organizationId: paramsData.id,
      ...data,
      // Format the date if necessary, or send as-is (YYYY-MM-DD for input type="date")
      joinDate: iniData,
      designation: role,
    };
    setIsLoading(true);
    mutate({
      url: "/api/memberships-subscriptions/join/organization",
      method: "POST",
      data: payload,
      headers: true,
      onSuccess: () => {
        setIsLoading(false);
        navigate("/app/membership");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const address = paramsData.companyAddress;

  const eventDetails = [
    {
      icon: <Building size={16} color="#A3A2A2" />, // Replaced SVG with Lucide Building icon
      name: `Name : ${paramsData.companyName}`,
    },
    {
      icon: <MapPin size={16} color="#A1A1A1" />, // Replaced SVG with Lucide MapPin icon
      name: `${address.street}, ${address.state}, ${address.country}`,
    },
  ];

  return (
    <>
      <div className="w-full flex h-auto  animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full overflow-visible">
          <Header mobile data={user} title={"Join Organisation"} />
          <div className="w-full flex justify-between items-center gap-8 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Join Organisation
              </p>
              <p className="text-base">
                Join new organisation:{" "}
                <span className="text-mobiBlue">{paramsData.companyName}</span>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8 overflow-visible">
            <div className="shadow-xl py-5 px-5 md:w-[30%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-6">
              <div className="w-full flex justify-center">
                {paramsData.photo ? (
                  <img
                    src={paramsData.photo}
                    className="w-3/4 h-full rounded-full"
                  />
                ) : (
                  <AvatarInitials
                    name={`${paramsData.companyName}`}
                    size="44"
                  />
                )}
              </div>
              <div className="w-full flex flex-col mt-3 gap-2">
                <div className="w-full flex justify-center">
                  <div className="md:w-2/5">
                    <Badge
                      status={`Type: ${paramsData.natureOfOrganization}`}
                      color="active"
                    />
                  </div>
                </div>
                <div className="w-full my-2 text-mobiRomanSilver">
                  <span className="text-sm">{paramsData.aboutCompany}</span>
                </div>
                <div className="flex w-full flex-col gap-5 mt-3">
                  {eventDetails.map((details, index) => (
                    <div key={index} className="w-full flex gap-3">
                      <div className="p-2 rounded-lg bGmobiGrayDark flex items-center">
                        <span className="bs-mobiCeramaic">{details.icon}</span>
                      </div>
                      <span className="bs-mobiCeramic flex flex-col items-center mt-1">
                        {details.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="shadow-xl py-5 px-8 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10 ">
              <form onSubmit={handleSubmit(joinOrganisation)} className="">
                <div className="h-auto flex flex-col gap-5 mt-5 ">
                  <div className="w-full flex flex-col gap-6 overflow-visible">
                    <div className="flex flex-col relative w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray font-semibold">
                        Date Joined (Required)
                      </p>
                      <div className="relative overflow-visible">
                        <Input
                          type="date"
                          name="dateJoined"
                          value={iniData}
                          onChange={setIniDate}
                          errors={errors}
                          placeholder="Select Date"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray font-semibold">
                        Role
                      </p>
                      {/* <Input
                        type="text"
                        name="designation"
                        register={register}
                        rules={{ required: "Role is required" }}
                        errors={errors}
                        placeholder="Role"
                      /> */}

                      <DesignationsInput
                        name="designation"
                        organizationId={paramsData.id}
                        onChange={setRole}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray font-semibold">
                        Organisation Email (Optional)
                      </p>
                      <Input
                        type="text"
                        name="organizationEmail"
                        value={paramsData?.companyEmail}
                        register={register}
                        placeholder="Organisation Email"
                      />
                    </div>
                    {/* New Date Picker Input */}
                  </div>
                </div>

                <div className="w-full flex my-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-mobiPink w-2/5 p-3 mt-7 rounded-full"
                  >
                    {isLoading
                      ? "Joining Organisation..."
                      : "Join Organisation"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
