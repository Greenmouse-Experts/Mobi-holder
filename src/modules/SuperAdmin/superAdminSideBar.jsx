import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Theme from "../../components/Theme";
import LogOutModal from "../../components/LogOutModal";
import useModal from "../../hooks/modal";
import ReusableModal from "../../components/ReusableModal";
import { History } from "lucide-react";

export default function SuperAdminSidebar({ mobile }) {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);
  const navigate = useNavigate();
  const { openModal, isOpen, modalOptions, closeModal } = useModal();

  const navArray = [
    {
      path: "/superadmin/dashboard",
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
      path: "",
      slug: "userManagement",
      name: "User Management",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50855 19.577L7.50852 19.577C6.96322 19.6566 6.55146 20.1334 6.55146 20.7072V20.7076C6.55075 20.9577 6.63252 21.2009 6.7841 21.3998C7.07156 21.7741 7.36665 22.1424 7.66919 22.5046L7.8748 22.7508H7.55406H6.00786H5.935L5.88996 22.6935C5.79237 22.5694 5.69426 22.443 5.59507 22.3144C5.23889 21.8524 5.05146 21.283 5.05146 20.7078C5.05146 19.4124 5.98691 18.2839 7.29177 18.0934C11.5405 17.4725 14.4973 17.5287 18.719 18.113C20.0111 18.2915 20.9514 19.4034 20.9515 20.6915C20.9515 20.6915 20.9515 20.6916 20.9515 20.6916H20.8015C20.8019 21.2547 20.6078 21.8008 20.2519 22.2372L7.50855 19.577ZM7.50855 19.577C11.5996 18.9793 14.413 19.0305 18.5129 19.5981L7.50855 19.577ZM14.3217 13.1876C13.9031 13.361 13.4545 13.4502 13.0015 13.4502C12.0865 13.4502 11.2089 13.0867 10.5619 12.4397C9.91495 11.7927 9.55147 10.9152 9.55147 10.0002C9.55147 9.0852 9.91495 8.20768 10.5619 7.56068C11.2089 6.91368 12.0865 6.5502 13.0015 6.5502C13.4545 6.5502 13.9031 6.63943 14.3217 6.81281C14.7403 6.98619 15.1206 7.24031 15.441 7.56068C15.7613 7.88104 16.0155 8.26136 16.1888 8.67994C16.3622 9.09851 16.4515 9.54713 16.4515 10.0002C16.4515 10.4533 16.3622 10.9019 16.1888 11.3205C16.0155 11.739 15.7613 12.1194 15.441 12.4397C15.1206 12.7601 14.7403 13.0142 14.3217 13.1876ZM13.0015 14.9502C14.3143 14.9502 15.5733 14.4287 16.5016 13.5004C17.4299 12.5721 17.9515 11.313 17.9515 10.0002C17.9515 8.68737 17.4299 7.42832 16.5016 6.50002C15.5733 5.57171 14.3143 5.0502 13.0015 5.0502C11.6886 5.0502 10.4296 5.57171 9.50129 6.50002C8.57298 7.42832 8.05146 8.68737 8.05146 10.0002C8.05146 11.313 8.57298 12.5721 9.50129 13.5004C10.4296 14.4287 11.6886 14.9502 13.0015 14.9502Z"
              fill="#7F7F7F"
              stroke="#7F7F7F"
              strokeWidth="0.3"
            />
            <path
              d="M23.65 13C23.65 18.8818 18.8818 23.65 13 23.65C7.11824 23.65 2.35 18.8818 2.35 13C2.35 7.11824 7.11824 2.35 13 2.35C18.8818 2.35 23.65 7.11824 23.65 13ZM13 25.15C19.7104 25.15 25.15 19.7104 25.15 13C25.15 6.28956 19.7104 0.85 13 0.85C6.28956 0.85 0.85 6.28956 0.85 13C0.85 19.7104 6.28956 25.15 13 25.15Z"
              fill={`${activeNav === "userManagement" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              stroke={`${activeNav === "userManagement" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="0.3"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/superadmin/staffs",
          name: "Staffs",
          children: [],
          openChildren: false,
        },
        {
          path: "/superadmin/individuals",
          name: "Individuals",
        },
        {
          path: "/superadmin/organisation",
          name: "Organisations",
        },
      ],
      openChildren: false,
    },
    {
      path: "/superadmin/membership",
      slug: "membership&sub",
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
              stroke={`${activeNav === "membership&sub" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
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
      children: [
        {
          path: "/superadmin/id-cards",
          name: "All ID Cards",
        },
        {
          path: "/superadmin/personal-idCards",
          name: "Individual's ID Cards",
        },
        {
          path: "/superadmin/idCardsTemplate",
          name: "All Card Templates",
        },
      ],
      openChildren: false,
    },
    {
      path: "",
      slug: "eventsVerification",
      name: "Events & Verification Logs",
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
              stroke={`${activeNav === "eventsVerification" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/superadmin/events/categories",
          name: "Event Categories",
        },
        {
          path: "/superadmin/events",
          name: "View Events",
        },
        {
          path: "/superadmin/verifiers",
          name: "View Verifiers",
        },
      ],
      openChildren: false,
    },
    {
      path: "",
      slug: "subscriptionMgt",
      name: "Subscription Management",
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
              stroke={`${activeNav === "subscriptionMgt" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/superadmin/subscription-individual/plans",
          name: "Individual Subscription Plans",
        },
        {
          path: "/superadmin/subscription-organisation/plans",
          name: "Organisation Subscription Plans",
        },
        {
          path: "/superadmin/subscription-log/individual",
          name: "Individual Subscription Log",
        },
        {
          path: "/superadmin/subscription-log/organisation",
          name: "Organisation Subscription Log",
        },
      ],
      openChildren: false,
    },
    {
      path: "/superadmin/activityLog",
      slug: "Transactions",
      name: "Transactions",
      icon: <History size={20} className="mr-2" />,
      children: [],
    },
    {
      path: "/superadmin/activityLog",
      slug: "activityLog",
      name: "Activity Log",
      icon: (
        <i className="mr-3 -mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
    {
      path: "",
      slug: "faqs",
      name: "FAQs",
      icon: (
        <i className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 13H4L0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H16C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13ZM21 7V21L17 17H6C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V15H19V6H20C20.2652 6 20.5196 6.10536 20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7ZM6.19 2C5.32 2 4.62 2.2 4.08 2.59C3.56 3 3.3 3.57 3.31 4.36L3.32 4.39H5.25C5.26 4.09 5.35 3.86 5.53 3.7C5.71517 3.54644 5.9495 3.46479 6.19 3.47C6.5 3.47 6.76 3.57 6.94 3.75C7.12 3.94 7.2 4.2 7.2 4.5C7.2 4.82 7.13 5.09 6.97 5.32C6.83 5.55 6.62 5.75 6.36 5.91C5.85 6.25 5.5 6.55 5.31 6.82C5.11 7.08 5 7.5 5 8H7C7 7.69 7.04 7.44 7.13 7.26C7.22 7.08 7.39 6.9 7.64 6.74C8.09 6.5 8.46 6.21 8.75 5.81C9.04 5.41 9.19 5 9.19 4.5C9.19 3.74 8.92 3.13 8.38 2.68C7.85 2.23 7.12 2 6.19 2ZM5 9V11H7V9H5ZM11 11H13V9H11V11ZM11 2V8H13V2H11Z"
              fill={`${activeNav === "faqs" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
            />
          </svg>
        </i>
      ),
      children: [
        {
          path: "/superadmin/faqs/categories",
          name: "FAQ Categories",
        },
        {
          path: "/superadmin/faqs",
          name: "View FAQs",
        },
      ],
      openChildren: false,
    },
    {
      path: "/superadmin/blog",
      slug: "blog",
      name: "BLOGS",
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
              d="M4 4H20V20H4V4Z"
              stroke={`${activeNav === "blog" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8H16M8 12H16M8 16H12"
              stroke={`${activeNav === "blog" ? "rgba(163, 36, 242, 1)" : "#7F7F7F"}`}
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
      path: "/superadmin/user-inquiries",
      slug: "userInquiries",
      name: "User Inquiries",
      icon: (
        <i className="mr-3 -mt-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50855 19.577L7.50852 19.577C6.96322 19.6566 6.55146 20.1334 6.55146 20.7072V20.7076C6.55075 20.9577 6.63252 21.2009 6.7841 21.3998C7.07156 21.7741 7.36665 22.1424 7.66919 22.5046L7.8748 22.7508H7.55406H6.00786H5.935L5.88996 22.6935C5.79237 22.5694 5.69426 22.443 5.59507 22.3144C5.23889 21.8524 5.05146 21.283 5.05146 20.7078C5.05146 19.4124 5.98691 18.2839 7.29177 18.0934C11.5405 17.4725 14.4973 17.5287 18.719 18.113C20.0111 18.2915 20.9514 19.4034 20.9515 20.6915C20.9515 20.6915 20.9515 20.6916 20.9515 20.6916H20.8015C20.8019 21.2547 20.6078 21.8008 20.2519 22.2372L7.50855 19.577ZM7.50855 19.577C11.5996 18.9793 14.413 19.0305 18.5129 19.5981L7.50855 19.577ZM14.3217 13.1876C13.9031 13.361 13.4545 13.4502 13.0015 13.4502C12.0865 13.4502 11.2089 13.0867 10.5619 12.4397C9.91495 11.7927 9.55147 10.9152 9.55147 10.0002C9.55147 9.0852 9.91495 8.20768 10.5619 7.56068C11.2089 6.91368 12.0865 6.5502 13.0015 6.5502C13.4545 6.5502 13.9031 6.63943 14.3217 6.81281C14.7403 6.98619 15.1206 7.24031 15.441 7.56068C15.7613 7.88104 16.0155 8.26136 16.1888 8.67994C16.3622 9.09851 16.4515 9.54713 16.4515 10.0002C16.4515 10.4533 16.3622 10.9019 16.1888 11.3205C16.0155 11.739 15.7613 12.1194 15.441 12.4397C15.1206 12.7601 14.7403 13.0142 14.3217 13.1876ZM13.0015 14.9502C14.3143 14.9502 15.5733 14.4287 16.5016 13.5004C17.4299 12.5721 17.9515 11.313 17.9515 10.0002C17.9515 8.68737 17.4299 7.42832 16.5016 6.50002C15.5733 5.57171 14.3143 5.0502 13.0015 5.0502C11.6886 5.0502 10.4296 5.57171 9.50129 6.50002C8.57298 7.42832 8.05146 8.68737 8.05146 10.0002C8.05146 11.313 8.57298 12.5721 9.50129 13.5004C10.4296 14.4287 11.6886 14.9502 13.0015 14.9502Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.3"
            />
            <path
              d="M23.65 13C23.65 18.8818 18.8818 23.65 13 23.65C7.11824 23.65 2.35 18.8818 2.35 13C2.35 7.11824 7.11824 2.35 13 2.35C18.8818 2.35 23.65 7.11824 23.65 13ZM13 25.15C19.7104 25.15 25.15 19.7104 25.15 13C25.15 6.28956 19.7104 0.85 13 0.85C6.28956 0.85 0.85 6.28956 0.85 13C0.85 19.7104 6.28956 25.15 13 25.15Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
    {
      path: "/superadmin/newsletter",
      slug: "newsletter",
      name: "Newsletter Subscribers",
      icon: (
        <i className="mr-3 -mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="20"
            height="20"
            viewBox="0 0 26 26"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.75 1.692L13.06 13.5a2.25 2.25 0 01-2.12 0L3.75 8.685A2.25 2.25 0 013 6.993V6.75"
            />
          </svg>
        </i>
      ),
      children: [],
      openChildren: false,
    },
    {
      path: "/superadmin/notification",
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
      content: <LogOutModal closeModal={closeModal} admin={true} />,
    });
  };

  return (
    <div
      className={`h-full rounded-md flex-col ${mobile ? "w-full lg:hidden md:hidden flex overflow-auto" : "md:w-[22%] lg:flex md:hidden hidden custom-scrollbar overflow-auto h-[750px] fixed"} bg-mobiDarkCloud transition-all mb-10`}
    >
      {/* Logo */}
      <div className="py-6 px-4 flex gap-6 flex-col space-x-2 border-bottom">
        <div className="flex px-3 gap-3">
          <img
            src="/mobiHolder.svg"
            alt="Logo"
            className="w-[32px] h-[32px] object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl mt-1 font-semibold">MobiHolder</span>
          </div>
        </div>
        <div className="w-full h-[1px] border-mobiSilverDivider border-bottom border"></div>
      </div>

      {/* Navigation Items */}
      <nav className="px-4 space-y-4">
        {navigation.map((navData, index) => (
          <div className="w-full flex flex-col gap-4" key={`nav-m${index}`}>
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
          to={"/superadmin/settings"}
          className={`flex items-center py-2 px-4 h-[57px] rounded-lg transition`}
        >
          <i className={`fas fa-cog mr-3`}></i>
          <span>Settings</span>
        </Link>
        <a
          onClick={() => handleLogOut()}
          className={`flex cursor-pointer items-center py-2 px-4 h-[57px] rounded-lg text-red-500 hover:bg-mobiBlueFade transition`}
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
