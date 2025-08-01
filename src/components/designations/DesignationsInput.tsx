import { useQuery } from "@tanstack/react-query";
import Input from "../Input";
import { newApi } from "../../api/hooks/useApiMutation";

interface Designation {
  name: string;
  [key: string]: any;
}

export function DesignationsInput(props: {
  organizationId?: string;
  defaultValue?: string;
  onChange: () => any;
  org?: boolean;
}) {
  const organizations_data = useQuery({
    queryKey: [props.organizationId, "designations"],
    queryFn: async () => {
      if (props.org) {
        let resp = await newApi.get(
          `/api/memberships-subscriptions/designations`,
        );
        return resp.data;
      }
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
  const mapped_data: any[] =
    organizations_data.data?.data?.map((e: Designation) => {
      let new_data = { ...e, label: e.name, value: e.name };
      return new_data;
    }) || [];
  mapped_data.push({
    label: "Member",
    value: "Member",
  });
  return (
    <Input
      onChange={props.onChange || undefined}
      type="select"
      options={mapped_data || []}
      icon={null}
      placeholder="Role"
      name=""
    />
  );
}

export function SimpleDesignationSelect(props: {
  organizationId?: string;
  defaultValue?: string;
  onChange: () => any;
  initialValue?: string;
  org?: boolean;
  props: React.InputHTMLAttributes<HTMLSelectElement>;
}) {
  const organizations_data = useQuery({
    queryKey: [props.organizationId, "designations"],
    queryFn: async () => {
      if (props.org) {
        let resp = await newApi.get(
          `/api/memberships-subscriptions/designations`,
        );
        return resp.data;
      }
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
  const mapped_data: any[] =
    organizations_data.data?.data?.map((e: Designation) => {
      let new_data = { ...e, label: e.name, value: e.name };
      return new_data;
    }) || [];
  mapped_data.push({
    label: "Member",
    value: "Member",
  });
  if (props.initialValue?.trim()) {
    mapped_data.push({
      label: props.initialValue,
      value: props.initialValue,
    });
  }
  return (
    <select
      {...props.props}
      className="p-4 bg-gray-100 text-black w-full rounded-md"
    >
      {mapped_data.map((callbackfn) => {
        return <option value={callbackfn.value}>{callbackfn.label}</option>;
      })}
    </select>
  );
}
