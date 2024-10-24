import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import SuperAdminSidebar from "./superAdminSideBar";

export default function AppModules() {
    const url = window.location.pathname;

    return (
        <div className="w-full flex h-full md:p-4 py-3 animate__animated animate__fadeIn">
            {url !== '/app/dashboard' ?
                <SuperAdminSidebar />
                :
                <Sidebar />
            }

            <div className="w-full lg:ml-[25%] flex flex-col gap-5 md:ml-[25%] h-full">
                <Outlet />
            </div>
            </div>
    )
}