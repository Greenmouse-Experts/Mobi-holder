import { Outlet } from "react-router-dom";

export default function SuperAdmin() {
    return (
        <>
            <div className="w-full flex h-full md:p-4 py-3 animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Outlet />
                </div>
            </div>
        </>
    )
}