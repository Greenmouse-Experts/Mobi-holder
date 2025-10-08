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
interface paramsData {
  isVerified: boolean;
  id: string;
  mobiHolderId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  companyName: string;
  companyAddress: {
    state: string;
    street: string;
    country: string;
  };
  companyEmail: string;
  aboutCompany: string | null;
  natureOfOrganization: string;
  isSuperAdmin: boolean;
  accountType: string;
  acceptedTnC: boolean;
  photo: string;
  wallet: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export default function JoinOrganisation() {
  //@ts-ignore
  const user = useSelector((state) => state.userData.data);
  //@ts-ignore
  const paramsData: paramsData = useSelector(
    //@ts-ignore

    (state) => state.userData.paramsData,
  );
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
    //@ts-ignore
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
  console.log(paramsData);

  return (
    <>
      <div className="w-full flex h-auto animate__animated animate__fadeIn bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        <div className="w-full flex flex-col gap-6 h-full overflow-visible max-w-7xl mx-auto">
          <Header mobile data={user} title={"Join Organisation"} />
          <div className="w-full flex justify-between items-center gap-8 my-2 px-0">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 dark:text-white md:hidden">
                Join Organisation
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Join new organisation:{" "}
                <span className="text-mobiBlue font-semibold">
                  {paramsData.companyName}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow md:flex-row flex-col justify-between items-start gap-8 overflow-visible">
            {/* Organization Info Card */}
            <div className="shadow-2xl py-6 px-6 md:w-[30%] w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-6 transition duration-300 hover:shadow-3xl">
              <div className="w-full flex justify-center pt-2">
                {paramsData.photo ? (
                  <img
                    src={paramsData.photo}
                    alt={paramsData.companyName}
                    className="w-32 h-32 object-cover rounded-full ring-4 ring-mobiPink/50 shadow-lg"
                  />
                ) : (
                  <AvatarInitials
                    name={`${paramsData.companyName}`}
                    size="56" // Increased size for better visual
                  />
                )}
              </div>
              <div className="w-full flex flex-col mt-3 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="w-full flex justify-center">
                  <div className="w-full text-center">
                    <Badge
                      status={`Type: ${paramsData.natureOfOrganization}`}
                      color="active"
                    />
                  </div>
                </div>
                <div className="w-full text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <p className="font-bold text-base mb-1 text-gray-800 dark:text-white">
                    About Company:
                  </p>
                  <span className="text-sm italic">
                    {paramsData.aboutCompany || "N/A"}
                  </span>
                </div>
                <div className="flex w-full flex-col gap-4 mt-2">
                  {eventDetails.map((details, index) => (
                    <div
                      key={index}
                      className="w-full flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="p-2 rounded-full bg-mobiBorderFray/20 flex items-center flex-shrink-0 mt-0.5">
                        <span className="text-mobiBlue">{details.icon}</span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {details.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Join Form Card */}
            <div className="shadow-2xl py-8 px-8 md:w-[70%] w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-8 transition duration-300 hover:shadow-3xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-3 border-gray-100 dark:border-gray-700">
                Membership Details
              </h2>
              <form
                onSubmit={handleSubmit(joinOrganisation)}
                className="space-y-8"
              >
                <div className="w-full flex flex-col gap-6">
                  {/* Date Joined */}
                  <div className="flex flex-col relative w-full gap-2">
                    <label
                      htmlFor="dateJoined"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Date Joined (Required)
                    </label>
                    <div
                      className="relative "
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <Input
                        type="date"
                        name="dateJoined"
                        value={iniData}
                        onChange={setIniDate}
                        errors={errors}
                        placeholder="Select Date"
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-mobiPink focus:border-mobiPink dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Role/Designation */}
                  <div className="flex flex-col w-full gap-2">
                    <label
                      htmlFor="designation"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Role / Designation (Required)
                    </label>
                    <DesignationsInput
                      name="designation"
                      organizationId={paramsData.id}
                      onChange={setRole}
                    />
                  </div>

                  {/* Organisation Email */}
                  <div className="flex flex-col w-full gap-2">
                    <label
                      htmlFor="organizationEmail"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Organisation Email (Optional)
                    </label>
                    <Input
                      type="text"
                      name="organizationEmail"
                      value={paramsData?.companyEmail}
                      register={register}
                      placeholder="Organisation Email"
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-mobiPink focus:border-mobiPink dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-start pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-mobiPink hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-2/5"
                  >
                    {isLoading ? "Joining Organisation..." : "Confirm Join"}
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
