import settings from "../../../assets/settings.svg";
import notifications from "../../../assets/notifications.svg"
import SearchInput from "../../../components/SearchInput";
import { useState } from "react";
import notificationImg from "../../../assets/notificationImg.svg";
import { Link } from "react-router-dom";

const notificationsData = [
    {
        icon: notificationImg,
        title: 'Your ID Card request has been approved',
        time: '5 min ago',
        read: false,
    },
    {
        icon: notificationImg,
        title: 'Reminder for Google Event',
        time: '5 min ago',
        read: false,
    },
    {
        icon: notificationImg,
        title: 'You became a verifier for GreenMouse Tech',
        time: '5 min ago',
        read: true,
    },
    {
        icon: notificationImg,
        title: 'Today is Apple Config',
        time: '5 min ago',
        read: true,
    },
    // ... other notifications
];

export default function Notification() {

    const [isMarkAllReadVisible, setIsMarkAllReadVisible] = useState(false);

    const handleMarkAllReadClick = () => {
        setIsMarkAllReadVisible(!isMarkAllReadVisible);
    };


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <div className="w-full lg:flex-row md:flex-row flex flex-col gap-5">
                        <div className="w-full flex flex-col gap-5">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex w-1/2">
                                    <SearchInput appendIcon="search.svg" type="password" placeholder="Enter keyword to search" />
                                </div>

                                <div className="flex gap-5">
                                    <div className="lg:flex md:flex hidden p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <img src={settings} />
                                    </div>
                                    <div className="lg:flex md:flex flex p-3 bg-mobiSearchDark rounded-md flex-col justify-center">
                                        <Link to={'/app/notification'} className="w-full">
                                            <img src={notifications} />
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-center gap-24 border border-mobiSearchDark bg-mobiSearchDark px-3 py-1 rounded-[7px]">
                                        <div className="flex flex-grow">
                                            <p className="text-sm font-semibold">My Profile</p>
                                        </div>
                                        <div className="flex">
                                            <img src="/userProfilexs.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-8 my-5">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">Notifications</p>

                        <div className="w-full flex justify-center">
                            <div className="bg-mobiDarkCloud my-3 lg:w-3/4 md:w-3/4 w-full rounded-lg">
                                <div className="flex justify-between items-center p-6">
                                    <p className="text-sm font-[500]">All (18)</p>
                                    <div className="flex space-x-2">
                                        <p className="text-sm underline text-mobiSkyBlue" onClick={handleMarkAllReadClick}>
                                            {isMarkAllReadVisible ? 'Hide Mark All Read' : 'Mark All as Read'}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px]" style={{ borderBottom: '0.8px solid rgba(188, 189, 189, 1)' }} />

                                <ul className="space-y-2 flex flex-col p-6 gap-3">
                                    {notificationsData.map((notification, index) => (
                                        <li key={index} className={`flex items-center relative gap-2 py-3 px-3 shadow-lg rounded-md ${notification.read ? '' : 'bg-mobiUnread'}`} style={{ borderColor: 'rgba(36, 36, 37, 1)' }}>
                                            <img src={notification.icon} alt={notification.title} className="w-8 h-8 rounded-full mr-2" />
                                            <div className="flex-1">
                                                <p className="text-base font-semibold">{notification.title}</p>
                                                <p className="text-mobiSkyBlue">{notification.time}</p>
                                            </div>
                                            <button className="text-white px-2 py-1 rounded-md">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            {!notification.read ?
                                                <span className="w-[13px] h-[13px] rounded-full bg-mobiPink absolute top-[-2.5px] right-0" />
                                                :
                                                <></>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
