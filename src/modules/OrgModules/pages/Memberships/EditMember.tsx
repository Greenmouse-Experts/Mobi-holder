import { useParams } from "react-router-dom";
import { OrgDashContainer } from "../../OrgDashboard/layouts/OrgDashContainer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { newApi } from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import {
  DesignationsInput,
  SimpleDesignationSelect,
} from "../../../../components/designations/DesignationsInput";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  UserIcon,
  MailIcon,
  TagIcon,
  BriefcaseIcon,
  RefreshCwIcon,
} from "lucide-react";

export interface API_RESPONSE {
  code: number;
  data: any;
  message: string;
}
interface EDIT_RESPONSE extends API_RESPONSE {
  data: USER_DATA[];
}
interface USER_DATA {
  id: number;
  individualId: string;
  organizationId: string;
  memberId: string;
  organizationEmail: string;
  designation: string;
  status: string;
  requestedBy: string;
  dateJoined: string;
  leftReason: null | string;
  leftAt: null | string;
  createdAt: string;
  updatedAt: string;
  individual: {
    isVerified: boolean;
    id: string;
    mobiHolderId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerifiedAt: string;
    username: string;
    phoneNumber: string;
    dateOfBirth: null | string;
    companyName: null | string;
    companyAddress: null | string;
    companyEmail: null | string;
    aboutCompany: null | string;
    natureOfOrganization: null | string;
    isSuperAdmin: boolean;
    accountType: string;
    acceptedTnC: boolean;
    photo: string;
    wallet: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const LoadingComponent = () => {
  return (
    <OrgDashContainer>
      <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded md:col-span-2"></div>
          </div>
          <div className="flex justify-end space-x-4 pt-8">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
      </div>
    </OrgDashContainer>
  );
};

export const ErrorComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <OrgDashContainer>
      <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Member Data
          </h2>
          <p className="text-gray-600 mb-6">
            There was an error loading the member information. Please try again.
          </p>
          <button
            onClick={refetch}
            className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-mobiPink border border-transparent rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mobiPink transition duration-150 ease-in-out"
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    </OrgDashContainer>
  );
};

export default function EditMember() {
  const { id } = useParams();
  const query = useQuery<EDIT_RESPONSE>({
    queryKey: [id, "membership"],
    queryFn: async () => {
      let resp = await newApi.get(
        `/api/memberships-subscriptions/organization/membership?search=${id}`,
      );
      return resp.data;
    },
  });

  const memberData = query.data?.data?.[0];
  const input_options = ["active", "inactive", "declined"].map((e) => {
    return {
      label: e.charAt(0).toUpperCase() + e.slice(1), // Capitalize first letter
      value: e,
    };
  });
  const updateStatus = useMutation({
    mutationFn: async (data: any) => {
      await newApi.put(
        "/api/memberships-subscriptions/update/membership/designation",
        {
          individualId: memberData?.individual.id,
          organizationId: memberData?.organizationId,
          designation: data.designation,
        },
      );
      let resp = await newApi.put(
        "/api/memberships-subscriptions/organization/update/membership/status",
        data,
      );
      return resp.data;
    },
    onSuccess: () => {
      console.log("success");
      toast.success("Membership details updated successfully.");
      query.refetch();
    },
    onError: (e: any) => {
      toast.error(
        e.response?.data?.message || "Failed to update membership details.",
      );
    },
  });
  const [designation, setDesignation] = useState(memberData?.designation);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form = new FormData(e.currentTarget);
    let data: Record<string, any> = {};
    for (let keys of form) {
      data[keys[0]] = keys[1];
    }
    // return console.log(memberData);
    if (!data.hasOwnProperty("designation")) {
      data["designation"] = memberData?.designation;
    }
    console.log(data);
    updateStatus.mutate(data);
  };

  if (query.isFetching) return <LoadingComponent />;
  if (query.isError) return <ErrorComponent refetch={query.refetch} />;

  return (
    <OrgDashContainer>
      <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
          Edit Member Details
        </h2>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Member ID"
              name="memberId"
              readOnly
              value={memberData?.memberId || "N/A"}
              placeholder="Member ID"
              icon={TagIcon}
            />
            <InputField
              label="Member Name"
              name="name"
              value={
                memberData?.individual
                  ? `${memberData.individual.firstName} ${memberData.individual.lastName}`
                  : "N/A"
              }
              disabled={true}
              placeholder="Member Name"
              icon={UserIcon}
            />
            <InputField
              label="Membership ID"
              type="text"
              name="membershipId"
              value={memberData?.id}
              placeholder="Membership ID"
              icon={TagIcon}
              readOnly
            />
            <InputField
              label="Organization Email"
              name="organizationEmail"
              value={memberData?.individual.email || "N/A"}
              placeholder="Organization Email"
              icon={MailIcon}
              readOnly
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  defaultValue={memberData?.status}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-mobiPink focus:border-mobiPink appearance-none transition duration-150 ease-in-out"
                >
                  {input_options.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <SimpleDesignationSelect
                props={{
                  name: "designation",
                  className:
                    "w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-mobiPink focus:border-mobiPink transition duration-150 ease-in-out",
                }}
                org
                initialValue={memberData?.designation}
                onChange={() => {}} // Added dummy onChange to satisfy prop requirement
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              disabled={updateStatus.isPending}
              type="submit"
              className={`inline-flex items-center px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-md transition duration-150 ease-in-out ${
                updateStatus.isPending
                  ? "bg-mobiPink/70 cursor-not-allowed"
                  : "bg-mobiPink hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mobiPink"
              }`}
            >
              {updateStatus.isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </OrgDashContainer>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ElementType;
}

const InputField = ({ label, icon: Icon, ...props }: InputFieldProps) => {
  const isReadOnly = props.readOnly || props.disabled;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          className={`w-full px-4 py-3 border rounded-lg text-gray-800 transition duration-150 ease-in-out ${
            Icon ? "pl-10" : ""
          } ${
            isReadOnly
              ? "bg-gray-100 border-gray-200 cursor-default"
              : "bg-white border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
          }`}
          type="text"
          {...props}
        />
      </div>
    </div>
  );
};
