import { Outlet } from "react-router-dom";
import OrgSidebar from "./sideBar";

export default function OrgModules() {

    return (
        <div className="w-full flex h-full md:p-4 py-3 animate__animated animate__fadeIn">
                <OrgSidebar />

            <div className="w-full lg:ml-[25%] overflow-hidden flex flex-col gap-5 md:ml-[25%] h-full">
                <Outlet />
            </div>
            </div>
    )
}