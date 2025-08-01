import { PropsWithChildren } from "react";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";

interface Container extends PropsWithChildren {
  title: string;
}
export function IndDashContainer(props: Container) {
  const user = useSelector((state) => state.userData.data);

  return (
    <>
      <Header mobile data={user} title={props.title || "Dash"} />
      {props.children}
    </>
  );
}
