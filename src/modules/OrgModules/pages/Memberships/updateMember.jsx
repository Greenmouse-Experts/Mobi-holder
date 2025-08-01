import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfileApi } from "../../../../api/hooks/useProfileApi";
import { useOrganizationApi } from "../../../../api/hooks/useOrganizationApi";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { FileText, Briefcase, Mail, Calendar, CheckCircle } from "lucide-react"; // Import Lucide React icons

export default function UpdateMember() {
  const user = useSelector((state) => state.orgData.orgData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  const { getUser } = useProfileApi();
  const { getOrganisationsMember } = useOrganizationApi();

  const { mutate } = useApiMutation();

  const fetchData = async () => {
    try {
      // Fetch data in parallel
      const [membersResponse, userResponse] = await Promise.all([
        getOrganisationsMember(""),
        getUser(id),
      ]);

      // Find matching member
      const memberData = membersResponse.find(
        (m) => m.individual?.id === userResponse.id,
      );

      // Merge data if member exists, otherwise use standalone user data
      const mergedData = memberData ? memberData : userResponse;

      setProfile(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state appropriately
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading || !profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  console.log(profile);

  const updateMember = (data) => {
    const payload = {
      memberId: profile.memberId,
      membershipId: profile.id,
      status: profile.status,
      designation: data.designation,
    };
    mutate({
      url: "/api/memberships-subscriptions/organization/update/membership/status",
      method: "PUT",
      data: payload,
      headers: true,
      onSuccess: (response) => {
        // reload(); // These functions are not defined in the provided code
        // closeModal(); // These functions are not defined in the provided code
        console.log("Update successful:", response);
      },
      onError: (error) => {
        // closeModal(); // These functions are not defined in the provided code
        console.error("Update failed:", error);
      },
    });
  };

  const userDetails = [
    {
      icon: <FileText size={14} color="#A1A1A1" />, // Replaced SVG with Lucide FileText
      name: `MobiHolder ID : ${profile.individual.mobiHolderId}`,
    },
    {
      icon: <FileText size={14} color="#A1A1A1" />, // Replaced SVG with Lucide FileText
      name: `Staff ID: ${profile.memberId}`,
    },
    {
      icon: <Briefcase size={14} color="#A1A1A1" />, // Replaced SVG with Lucide Briefcase (semantic for Role)
      name: `Role: ${profile.designation}`,
    },
    {
      icon: <Mail size={14} color="#A1A1A1" />, // Replaced SVG with Lucide Mail (semantic for Email)
      name: `Email: ${profile.individual.email}`,
    },
    {
      icon: <Calendar size={14} color="#A1A1A1" />, // Replaced SVG with Lucide Calendar
      name: `Date Joined: ${dateFormat(profile.dateJoined, "dd-MM-yyy")}`,
    },
    {
      icon: <CheckCircle size={16} color="#A1A1A1" />, // Replaced SVG with Lucide CheckCircle
      name: (
        <span>
          Status :{" "}
          <span className="text-[rgba(76,217,100,1)] capitalize">
            {profile.status}
          </span>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header
            mobile
            organisation
            data={user}
            title={"View Member Details"}
          />
          <div className="w-full md:w-3/4 lg:w-3/5 flex justify-between items-center gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                View Member Details
              </p>
              <p className="text-base">
                Member details for :{" "}
                <span className="text-mobiBlue">
                  {profile.individual.firstName} {profile.individual.lastName}
                </span>
              </p>
            </div>
            <div className="flex md:w-1/2 w-full justify-end"></div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-5 px-5 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <div className="w-full flex flex-col gap-8 justify-center py-10 items-center">
                <p>Member Info</p>
                <div className="md:w-3/5 w-full flex flex-col justify-center items-center mt-5 px-5 py-8 border-[0.5px] border-gray-900 rounded-lg gap-6">
                  <div className="w-[200px] h-[200px] flex rounded-full">
                    <img
                      src={profile.individual.photo}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="font-semibold text-xl">
                    {profile.individual.firstName} {profile.individual.lastName}
                  </p>

                  <div className="flex w-full flex-col gap-5 mt-3">
                    {userDetails.map((details, index) => (
                      <div className="w-full flex gap-3" key={index}>
                        <div className="p-2 rounded-lg bGmobiGrayDark flex items-center">
                          <span className="bs-mobiCeramaic">
                            {details.icon}
                          </span>
                        </div>
                        <span className="bs-mobiCeramic flex flex-col items-center mt-1">
                          {details.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* <div className="w-full flex flex-col gap-4 mt-3">
                                        <form onSubmit={handleSubmit(updateMember)}>
                                            <div className="mb-1 flex flex-col gap-8 mt-5">
                                                <div className="flex flex-col w-full gap-6">
                                                    <p className="-mb-3 text-mobiFormGray">
                                                        Role
                                                    </p>
                                                    <Input type="text" name="designation" rules={{ required: 'Role in Organisation is required' }} errors={errors} value={profile.designation} register={register} placeholder="Enter role in organisation" />
                                                </div>
                                                <div className="flex flex-col w-full gap-6">
                                                    <Button type="submit" className="normal-case bg-mobiPink rounded-full">
                                                        <span className="text-sm px-6">Update Info</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
