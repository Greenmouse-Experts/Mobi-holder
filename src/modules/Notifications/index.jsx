import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import useApiMutation from "../../api/hooks/useApiMutation";
import Loader from "../../components/Loader";
import UserPhoto from "../../components/UserPhoto";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

export default function Notification({ organisation }) {
  const user = organisation
    ? useSelector((state) => state.orgData.orgData)
    : useSelector((state) => state.userData.data);
  const [activeTab, setActiveTab] = useState("All");
  const [allNotifications, setAllNotifications] = useState([]);
  const [originalNotifications, setOriginalNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useApiMutation();

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = () => {
    mutate({
      url: "/api/admins/get/notifications",
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        console.log(response);
        setAllNotifications(response.data.data);
        setOriginalNotifications(response.data.data);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const markRead = (id) => {
    mutate({
      url: `/api/users/notification/read?id=${id}`,
      method: "PATCH",
      headers: true,
      onSuccess: (response) => {
        const updatedNotifications = allNotifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, read: true };
          }
          return notification;
        });
        setAllNotifications(updatedNotifications);
      },
    });
  };

  const handleMarkAllReadClick = () => {
    mutate({
      url: `/api/users/notifications/mark-all-read`,
      method: "PATCH",
      headers: true,
      onSuccess: (response) => {
        const updatedNotifications = allNotifications.map((notification) => {
          return { ...notification, read: true };
        });
        setAllNotifications(updatedNotifications);
      },
    });
  };

  document.documentElement.style.position = null;

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"Notifications"} />
          <div className="w-full flex flex-col gap-8 my-2 px-3">
            <div className="w-full flex justify-center">
              <div className="bg-mobiDarkCloud md:my-3 lg:w-3/4 md:w-3/4 w-full rounded-lg">
                <div className="flex justify-between items-center px-6 py-5">
                  <div className="flex md:gap-14 gap-4">
                    <p
                      onClick={() => [
                        getAllNotifications(),
                        setActiveTab("All"),
                      ]}
                      className={`text-sm cursor-pointer ${
                        activeTab === "All"
                          ? "font-bold"
                          : "text-mobiRomanSilver"
                      }`}
                    >
                      All ({originalNotifications.length})
                    </p>
                    <p
                      onClick={() => [
                        setActiveTab("Unread"),
                        setAllNotifications(
                          allNotifications.filter(
                            (notification) => !notification.read
                          )
                        ),
                      ]}
                      className={`text-sm cursor-pointer ${
                        activeTab === "Unread"
                          ? "font-bold"
                          : "text-mobiRomanSilver"
                      }`}
                    >
                      Unread (
                      {
                        allNotifications.filter(
                          (notification) => !notification.read
                        ).length
                      }
                      )
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <p
                      className="text-sm underline cursor-pointer font-[500] text-mobiSkyBlue"
                      onClick={handleMarkAllReadClick}
                    >
                      Mark All as Read
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] border border-b-[0.8px] border-mobiNotification" />

                <ul className="space-y-2 flex flex-col md:p-6 p-3 gap-3">
                  {allNotifications.map((notification, index) => (
                    <li
                      key={index}
                      className={`flex items-center relative gap-2 py-3 px-3 rounded-md ${
                        notification.read
                          ? "border border-mobiNotification"
                          : "bg-mobiUnread"
                      }`}
                    >
                      <UserPhoto data={user} organisation={organisation} />
                      <div className="flex-1">
                        <p
                          className={`md:text-base text-sm ${
                            notification.read ? "" : "font-semibold"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-mobiSkyBlue">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Menu placement="left">
                          <MenuHandler>
                            <span className="flex w-full cursor-pointer">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
                                  stroke="#AEB9E1"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem className="flex flex-col gap-3">
                              <span
                                className="cursor-pointer"
                                onClick={() => markRead(notification.id)}
                              >
                                Mark as Read
                              </span>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                      {!notification.read ? (
                        <span className="w-[13px] h-[13px] rounded-full bg-mobiPink absolute top-[-2.5px] right-0" />
                      ) : (
                        <></>
                      )}
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
