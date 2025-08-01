import { useQuery } from "@tanstack/react-query";
import Input from "../Input";
import { newApi } from "../../api/hooks/useApiMutation";

interface Designation {
  name: string;
  [key: string]: any;
}

export function DesignationsInput(props: {
  organizationId: string;
  onChange: () => any;
}) {
  const organizations_data = useQuery({
    queryKey: [props.organizationId, "designations"],
    queryFn: async () => {
      let resp = await newApi.get(
        `/api/memberships-subscriptions/organization/designations?organizationId=${props.organizationId}`,
      );
      return resp.data;
    },
  });
  if (organizations_data.isFetching)
    return <div className="p-5 rounded-xl bg-gray-100 ">Loading</div>;
  if (organizations_data.isError)
    return (
      <div
        className="p-5 rounded-xl bg-gray-100 cursor:pointer"
        onClick={organizations_data.refetch}
      >
        Error click to reload
      </div>
    );
  const mapped_data: any[] = organizations_data.data?.data?.map(
    (e: Designation) => {
      let new_data = { ...e, label: e.name, value: e.name };
      return new_data;
    },
  );
  mapped_data.push({
    label: "Member",
    value: "Member",
  });
  return (
    <Input
      onChange={props.onChange}
      type="select"
      options={mapped_data || []}
      icon={null}
      placeholder="Role"
      name=""
    />
  );
}
