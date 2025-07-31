import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Theme from "../../components/Theme";
import useModal from "../../hooks/modal";
import LogOutModal from "../../components/LogOutModal";
import ReusableModal from "../../components/ReusableModal";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function OrgSidebar({ mobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, isOpen, modalOptions, closeModal } = useModal();
  const user = useSelector((state) => state.orgData.orgData);

  const [activeNav, setActiveNav] = useState(location.pathname);

  const navArray = [
    {
      path: "/org/dashboard",
      slug: "dashboard",
      name: "Dashboard",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
              stroke={`${activeNav === "dashboard" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
    {
      path: "/org/membership",
      slug: "membership",
      name: "Membership",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
              stroke={`${activeNav === "membership" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
    {
      path: "/org/subscriptions",
      slug: "subscription",
      name: "Subscription",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
              stroke={`${activeNav === "subscription" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/org/subscription/plans",
          name: "Subscription Plans",
        },
        {
          path: "/org/subscription/log",
          name: "My Subscription Log",
        },
        {
          path: "/org/subscription/my-plans",
          name: "My Subscription Plans",
        },
        {
          path: "/org/subscription/subscribers",
          name: "My Subscribers",
        },
      ],
      openChildren: false,
    },
    {
      path: "/org/id-cards",
      slug: "idcard",
      name: "ID Cards",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.7 13.5L20.7005 11.5L18.7 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3019 3 18.1885 4.77814 19.7545 7.42909M12 7V12L15 14"
              stroke={`${activeNav === "idcard" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },

    {
      path: "",
      slug: "events",
      name: "Event",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
              stroke={`${activeNav === "events" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/org/events",
          name: "Events Dashboard",
        },
        {
          path: "/org/upcoming-events",
          name: "Upcoming Event",
        },
        {
          path: "/org/event-gallery",
          name: "Event Gallery",
        },
        {
          path: "/org/event-history",
          name: "Event History",
        },
        {
          path: "/org/my-tickets",
          name: "My Tickets",
        },
        /* {
                    path: "/org/event-invites",
                    name: "Event Invites"
                }, */
      ],
      openChildren: false,
    },

    {
      path: "",
      slug: "verify",
      name: "Verify",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
              stroke="#7F7F7F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/org/verify",
          name: "Verification Dashboard",
        },
        {
          path: "/org/verification-request",
          name: "Verification Request",
        },
        {
          path: "/org/scan-event",
          name: "Scan Event",
        },
      ],
      openChildren: false,
    },

    {
      path: "/org/wallet",
      slug: "wallet",
      name: "Wallet",
      icon: <FaWallet className="mr-3" />,
      children: [],
      openChildren: false,
    },

    {
      path: "/org/notification",
      slug: "notification",
      name: "Notification",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
              stroke={`${activeNav === "notification" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
  ];

  const [navigation, setNavigation] = useState(navArray);

  const handleNavigation = (navData) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => {
        if (item.slug === navData.slug) {
          // Toggle `openChildren` for the clicked item
          return { ...item, openChildren: !item.openChildren };
        }
        // Close other items if required (optional)
        return { ...item, openChildren: false };
      }),
    );
    setActiveNav(navData.slug);

    // If no children, navigate directly
    if (navData.children.length === 0) {
      setActiveNav(navData.slug);
      navigate(`${navData.path}`);
    }
  };

  const handleLogOut = () => {
    openModal({
      size: "sm",
      content: <LogOutModal closeModal={closeModal} />,
    });
  };

  return (
    <div
      className={`h-full rounded-md flex-col ${mobile ? "w-full lg:hidden md:hidden flex overflow-y-auto" : "md:w-[22%] lg:flex md:hidden hidden custom-scrollbar overflow-auto h-[750px] fixed"} bg-mobiDarkCloud transition-all mb-10`}
    >
      {/* Logo */}
      <div className="py-6 px-4 flex gap-6 flex-col space-x-2 border-bottom">
        <Link to={"/"} className="flex px-3 gap-3">
          <img
            src="/mobiHolder.svg"
            alt="Logo"
            className="w-[32px] h-[32px] object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl mt-1 font-semibold">MobiHolder</span>
          </div>
        </Link>
        <div className="w-full flex flex-col gap-1">
          <p className="text-base font-semibold">{user?.companyName}</p>
          <p className="text-sm text-mobiRomanSilver">Organization account</p>
        </div>
        <div className="w-full h-[1px] border-mobiSilverDivider border-bottom border"></div>
      </div>

      {/* Navigation Items */}
      <nav className="px-4 space-y-4">
        {navigation.map((navData, index) => (
          <div className="w-full flex flex-col gap-4" key={`org-si${index}`}>
            <div
              onClick={() => handleNavigation(navData)}
              className={`flex cursor-pointer items-center py-2 px-4 h-[57px] rounded-lg ${navData.slug === activeNav ? "bg-mobiBlueFade" : "hover:bg-mobiBlueFade text-mobiRomanSilver"} transition`}
            >
              {navData.icon}
              <span
                className={`${navData.slug === activeNav ? "text-mobiPink" : ""}`}
              >
                {navData.name}
              </span>
            </div>
            {navData.openChildren && navData.children.length > 0 && (
              <div className="w-full flex flex-col gap-2 px-4 -mt-2 mx-8">
                {navData.children.map((children, index) => (
                  <ul className="space-y-3" style={{ listStyle: "disc" }}>
                    <li
                      className="py-2 flex gap-3 cursor-pointer"
                      onClick={() => navigate(children.path)}
                    >
                      <span className="w-2 h-1 p-1 mt-1 rounded-full bg-mobiRomanSilver"></span>
                      <span className="flex flex-col justify-center text-mobiRomanSilver">
                        {children.name}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="w-full h-[1px] px-4 border-mobiSilverDivider border-bottom border"></div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-6">
        <Link
          to={"/org/settings"}
          onClick={() => setActiveNav("/org/settings")}
          className={`flex items-center py-2 px-4 h-[57px] rounded-lg ${activeNav === "/org/settings" ? "bg-mobiBlueFade" : "hover:bg-mobiBlueFade"} transition`}
        >
          <i
            className={`fas fa-cog mr-3 ${activeNav === "/org/settings" ? "text-mobiPink" : ""}`}
          ></i>
          <span
            className={`${activeNav === "/org/settings" ? "text-mobiPink" : ""}`}
          >
            Settings
          </span>
        </Link>
        <a
          onClick={() => handleLogOut()}
          className={`flex items-center py-2 px-4 h-[57px] cursor-pointer rounded-lg text-red-500 hover:bg-mobiBlueFade transition`}
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          Logout
        </a>

        {/* Image/Advertisement */}
        <div className="mt-1 bg-cover bg-center p-4 rounded-lg md:flex hidden">
          <img src="/mobi-image.png" />
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-4 flex justify-center space-x-2 p-4">
          <Theme />
        </div>
      </div>

      <ReusableModal
        isOpen={isOpen}
        size={modalOptions.size}
        title={modalOptions.title}
        content={modalOptions.content}
        closeModal={closeModal}
      />
    </div>
  );
}
