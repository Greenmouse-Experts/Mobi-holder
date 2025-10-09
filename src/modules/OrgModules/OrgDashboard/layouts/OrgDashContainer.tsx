import { PropsWithChildren } from "react";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";

export function OrgDashContainer(props: {
  children: React.ReactNode;
  title?: string;
}) {
  //@ts-ignore
  const user = useSelector((state) => state.orgData.orgData);
  return (
    <>
      {/* @ts-ignore */}
      <Header
        mobile
        organisation
        data={user}
        title={props?.title || "Membership"}
      />
      {props.children}
    </>
  );
}
