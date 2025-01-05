import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import settings from "../../assets/settings.svg";
import notifications from "../../assets/notifications.svg"
import { useState, useContext } from "react";
import { Drawer } from "@material-tailwind/react";
import { ThemeContext } from "../../context/ThemeContext";
import AvatarInitials from "../../components/AvatarInitials";
import SuperAdminSidebar from "./superAdminSideBar";
import Greeting from "./greetings";

export default function Header({ mobile }) {
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        document.documentElement.style.position = 'fixed'; setOpen(true)
    };
    const closeDrawer = () => {
        document.documentElement.style.position = null;
        setOpen(false);
    }

    const { theme } = useContext(ThemeContext);

    const url = window.location.pathname;

    return (
        <div className="w-full lg:flex-row md:flex-row flex flex-col gap-3">
            <div className="lg:w-[68%] md:w-[60%] w-full md:px-0 px-3 flex flex-col gap-5">
                <div className="w-full flex gap-8 justify-between">
                    <div className="flex md:w-3/5 w-3/4">
                        <SearchInput appendIcon="search.svg" type="text" placeholder="Enter keyword to search" />
                    </div>

                    <div className="flex gap-3">
                        <div className="lg:flex md:flex hidden md:p-2 px-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                            <img src={settings} />
                        </div>
                        <div className="lg:flex md:flex hidden md:p-2 px-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                            <Link to={'/app/notification'} className="w-full">
                                <img src={notifications} />
                            </Link>
                        </div>
                        <div className="lg:hidden md:hidden flex p-2 bg-mobiSearchDark rounded-md flex-col justify-center">
                            <button
                                className="text-black focus:outline-none"
                                aria-label="Open Menu"
                                id="mobile-menu-button"
                                onClick={openDrawer}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={theme === 'light' ? '#000000' : '#FFFFFF'} className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${mobile ? 'lg:flex md:flex hidden' : 'flex w-full md:px-0 px-3 flex-col'} lg:w-[32%] md:w-[40%]`}>
                <div className={`w-full flex flex-col gap-6`}>
                    <div className="flex items-center justify-center border w-full border-mobiSearchDark bg-mobiBlock px-3 py-1 rounded-[7px]">
                        <div className="flex flex-grow">
                            <p className="text-sm font-semibold">Admin Profile</p>
                        </div>
                        <div className="flex rounded-md">
                            <AvatarInitials name={'Admin Profile'} size="8" />
                        </div>
                    </div>
                </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className="bg-mobiDarkCloud">
                <SuperAdminSidebar mobile />
            </Drawer>
        </div>
    )
}