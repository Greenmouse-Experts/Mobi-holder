import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./superAdminSideBar";

export default function SuperAdmin() {
    return (
        <>
            <div className="w-full flex h-full md:p-4 py-3 animate__animated animate__fadeIn">
                <SuperAdminSidebar />

                <div className="w-full lg:ml-[25%] flex flex-col overflow-hidden gap-5 md:ml-[25%] h-full">
                    <Outlet />
                </div>
            </div>        </>
    )
}