import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

export default function AppModules() {
    return (
        <div className="w-full flex h-full p-4 animate__animated animate__fadeIn">
            <Sidebar />

            <div className="w-full lg:ml-[25%] flex flex-col gap-5 md:ml-[25%] h-full">
                <Outlet />
            </div>
            </div>
    )
}