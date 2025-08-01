import { useParams } from "react-router-dom";
import { OrgDashContaienr } from "../../OrgDashboard/layouts/OrgDashContainer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { newApi } from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import {
  DesignationsInput,
  SimpleDesignationSelect,
} from "../../../../components/designations/DesignationsInput";
import { useState } from "react";
import { toast } from "react-toastify";

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

const LoadingComponent = () => {
  return (
    <OrgDashContaienr>
      <div className="w-full mx-auto p-6 bg-mobiDarkCloud bg-mobiDarkCloud rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded md:col-span-2"></div>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
      </div>
    </OrgDashContaienr>
  );
};

const ErrorComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <OrgDashContaienr>
      <div className="w-full mx-auto p-6 bg-mobiDarkCloud rounded-lg shadow-md">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Member Data
          </h2>
          <p className="text-gray-600 mb-6">
            There was an error loading the member information. Please try again.
          </p>
          <button
            onClick={refetch}
            className="px-6 py-2 text-sm font-medium text-white bg-mobiPink border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry
          </button>
        </div>
      </div>
    </OrgDashContaienr>
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
      label: e,
      value: e,
    };
  });
  const updateStatus = useMutation({
    mutationFn: async (data) => {
      let resp = await newApi.put(
        "/api/memberships-subscriptions/organization/update/membership/status",
        data,
      );
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (e) => {
      toast.error(e.response.data.message);
    },
  });
  const [designation, setDesignation] = useState(memberData?.designation);
  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let data = {};
    for (let keys of form) {
      data[keys[0]] = keys[1];
    }

    if (!data.hasOwnProperty("designation")) {
      data["designation"] = memberData?.designation;
    }
    console.log(data);
    updateStatus.mutate(data);
  };

  if (query.isFetching) return <LoadingComponent />;
  if (query.isError) return <ErrorComponent refetch={query.refetch} />;

  return (
    <OrgDashContaienr>
      <div className="w-full mx-auto p-6 bg-mobiDarkCloud rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-mobiTableText">
          Edit Member
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member ID
              </label>
              <SimpeInput
                name="memberId"
                readOnly
                value={memberData?.memberId || "1234567ABCDEF"}
                // disabled={true}
                style={{}}
                placeholder="Member ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Name
              </label>
              <SimpeInput
                name="name"
                value={
                  memberData?.individual
                    ? `${memberData.individual.firstName} ${memberData.individual.lastName}`
                    : "John Doe"
                }
                disabled={true}
                icon={null}
                style={{}}
                placeholder="Member Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership ID
              </label>
              <SimpeInput
                type="text"
                name="membershipId"
                value={memberData?.id}
                placeholder="Membership ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Email
              </label>
              <SimpeInput
                name="organizationEmail"
                value={memberData?.organizationEmail || "assgain@gmail.com"}
                icon={null}
                style={{}}
                placeholder="Organization Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                defaultValue={memberData?.status}
                className="w-full p-4 bg-gray-100 text-black rounded-md"
              >
                {input_options.map((e) => {
                  return <option value={e.value}>{e.label}</option>;
                })}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <SimpleDesignationSelect
                props={{
                  name: "designation",
                }}
                org
                initialValue={memberData?.designation}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              disabled={updateStatus.isPending}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-mobiPink border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {updateStatus.isPending ? "updating" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </OrgDashContaienr>
  );
}

const SimpeInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="p-4 w-full bg-gray-100 text-black  rounded-md "
      type="text"
      {...props}
    />
  );
};
