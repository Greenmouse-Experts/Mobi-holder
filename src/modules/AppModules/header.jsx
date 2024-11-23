import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import Greeting from "./Dashboard/layouts/Greetings";
import settings from "../../assets/settings.svg";
import notifications from "../../assets/notifications.svg"
import { useState, useContext } from "react";
import { Drawer } from "@material-tailwind/react";
import Sidebar from "./sideBar";
import { ThemeContext } from "../../context/ThemeContext";
import SuperAdminSideBar from "../SuperAdmin/superAdminSideBar";
import OrgGreeting from "./OrgDashboard/layouts/Greetings";
import AvatarInitials from "../../components/AvatarInitials";
import { dateFormat } from "../../helpers/dateHelper";

export default function Header({ greeting, profile, mobile, organisation, superAdmin, data }) {
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
            <div className="lg:w-[70%] md:w-[60%] w-full md:px-0 px-3 flex flex-col gap-5">
                <div className="w-full flex gap-8 justify-between">
                    <div className="flex md:w-3/5 w-3/4">
                        <SearchInput appendIcon="search.svg" type="password" placeholder="Enter keyword to search" />
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

                {greeting ?
                    <div className="w-full flex">
                        {organisation ? <OrgGreeting orgData={data} /> : <Greeting userData={data} />}
                    </div>
                    :
                    <></>
                }
            </div>

            <div className={`${mobile ? 'lg:flex md:flex hidden' : 'flex w-full md:px-0 px-3 flex-col'} lg:w-[30%] md:w-[40%]`}>
                <div className={`w-full flex flex-col gap-6 ${profile ? 'p-2 rounded-md bg-mobiSearchDark' : ''}`}>
                    <div className="flex items-center justify-center border w-full border-mobiSearchDark bg-mobiBlock px-3 py-1 rounded-[7px]">
                        <div className="flex flex-grow">
                            <p className="text-sm font-semibold">{superAdmin ? 'Admin Profile' : 'My Profile'}</p>
                        </div>
                        <div className="flex rounded-md">
                            {data.photo ?
                                <div className="flex w-[34px]">
                                    <img src={`${data.photo}`} className="w-full h-full rounded-md" />
                                </div>
                                :
                                <AvatarInitials name={!organisation ? `${data.firstName}${data.lastName}` : `${data.companyName}`} size="10" />
                            }
                        </div>
                    </div>

                    {profile ?
                        <>
                            <div className="w-full flex px-3 gap-3">
                                <div className="flex">
                                    {data.photo ?
                                        <div className="flex w-[93px] h-[93px] rounded-rounded-full">
                                            <img src={`${data.photo}`} className="w-full h-full rounded-md" />
                                        </div>
                                        :
                                        <AvatarInitials name={!organisation ? `${data.firstName}${data.lastName}` : `${data.companyName}`} size="[93px]" />
                                    }
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-base font-semibold">{organisation ? `${data.companyName}` : `${data.firstName} ${data.lastName}`}</p>
                                    <p className="text-sm text-mobiRomanSilver">{data.accountType} account</p>
                                    <div className="flex gap-2">
                                        <p className="text-mobiBlue">ID: {data.mobiHolderId }</p>
                                        <div className="flex flex-col justify-center">
                                            <svg width="13" height="17" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="3.59106" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                                <rect x="3.59082" y="0.5" width="12.9092" height="16.0001" rx="2.5" stroke="#939292" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 px-3 mt-1 mb-2">
                                <div className="flex flex-col  gap-1">
                                    <p className="text-mobiRomanSilver text-center lg:text-xs md:text-sm sm:text-sm text-xs">Type</p>
                                    <p className="text-xs font-[500] text-center">{data.accountType}</p>
                                </div>

                                <div className="w-[1px] mx-2 lg:h-full md:h-full min-h-[20px] border border-mobiRomanSilver" />

                                <div className="flex flex-col gap-1">
                                    <p className="text-mobiRomanSilver text-center lg:text-xs md:text-sm sm:text-sm text-xs">Date Joined</p>
                                    <p className="text-xs font-[500] text-center">{dateFormat(data.createdAt, "dd-MM-yyyy") }</p>
                                </div>

                                <div className="w-[1px] mx-2 lg:h-full md:h-full min-h-[20px] border border-mobiRomanSilver" />

                                <div className="flex flex-col gap-1">
                                    <p className="text-mobiRomanSilver text-center lg:text-xs md:text-xs sm:text-sm text-xs">Status</p>
                                    <p className="text-xs font-[500] text-center">{ data.isVerified ? 'Verified': 'Not Verified' }</p>
                                </div>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className="bg-mobiDarkCloud">
                {url !== '/app/dashboard' ?
                    <SuperAdminSideBar mobile />
                    :
                    <Sidebar mobile />
                }
            </Drawer>
        </div>
    )
}