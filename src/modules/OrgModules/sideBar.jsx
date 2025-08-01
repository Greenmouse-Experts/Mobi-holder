import React, { Children, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Theme from "../../components/Theme";
import useModal from "../../hooks/modal";
import LogOutModal from "../../components/LogOutModal";
import ReusableModal from "../../components/ReusableModal";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  Ticket,
  Scan,
  BellRing,
  CreditCard,
  User2,
} from "lucide-react";

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
      icon: <LayoutDashboard size={20} className="mr-3" />,
      children: [],
      openChildren: false,
    },
    {
      path: "/org/membership",
      slug: "membership",
      name: "Membership",
      icon: <Users size={20} className="mr-3" />,
      children: [],
      openChildren: false,
    },
    {
      path: "/org/designations",
      slug: "designations",
      name: "Designations",
      icon: <User2 size={20} className="mr-3" />,
      children: [],
      openChildren: false,
    },
    {
      path: "/org/subscriptions",
      slug: "subscription",
      name: "Subscription",
      icon: <ReceiptText size={20} className="mr-3" />,
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
      icon: <CreditCard size={20} className="mr-3" />,
      children: [],
      openChildren: false,
    },

    {
      path: "",
      slug: "events",
      name: "Event",
      icon: <Ticket size={20} className="mr-3" />,
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
      icon: <Scan size={20} className="mr-3" />,
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
      icon: <BellRing size={20} className="mr-3" />,
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
                {navData.children.map((children, childIndex) => (
                  <ul
                    className="space-y-3"
                    style={{ listStyle: "disc" }}
                    key={childIndex}
                  >
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
