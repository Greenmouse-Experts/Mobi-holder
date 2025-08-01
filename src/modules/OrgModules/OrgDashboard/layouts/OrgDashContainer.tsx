import { PropsWithChildren } from "react";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";

export function OrgDashContaienr(props: PropsWithChildren) {
  const user = useSelector((state) => state.orgData.orgData);
  return (
    <>
      <Header mobile organisation data={user} title={"Membership"} />
      {props.children}
    </>
  );
}
