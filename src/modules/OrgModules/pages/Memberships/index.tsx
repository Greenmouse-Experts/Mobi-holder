import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";
import { Link, useNavigate } from "react-router-dom";
import MembersAnalysis from "../../OrgDashboard/layouts/MembersAnalysis";
import useModal from "../../../../hooks/modal";
import ReusableModal from "../../../../components/ReusableModal";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { dateFormat } from "../../../../helpers/dateHelper";
import Loader from "../../../../components/Loader";
import UserPhoto from "../../../../components/UserPhoto";
import UpdateMembershipStatusModal from "./updateModal";
import { exportToExcel } from "../../../../helpers/exportToExcel";
import { formatDate } from "../../../AppModules/pages/Blogs";

const UserDetails = ({ closeModal, userInfo, type, reload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [blackList, setBlackList] = useState(false);

  const { mutate } = useApiMutation();

  const updateMember = (data) => {
    setIsLoading(true);
    delete data.firstname;
    data.status =
      type === "Accept" ? "active" : blackList ? "inactive" : "declined";
    data.membershipId = userInfo.id;
    console.log(data);
    mutate({
      url: "/api/memberships-subscriptions/organization/update/membership/status",
      method: "PUT",
      data: data,
      headers: true,
      onSuccess: (response) => {
        setIsLoading(false);
        handleCloseModal();
        reload();
      },
      onError: () => {
        setIsLoading(false);
        handleCloseModal();
      },
    });
  };

  const handleBlackList = () => {
    setBlackList(true);
  };

  const handleCloseModal = () => {
    if (closeModal) {
      closeModal(); // Call closeModal function
    } else {
      console.error("closeModal is not defined");
    }
  };

  // return <></>;
  return (
    <>
      <div className="w-full flex max-h-[95vh] overflow-auto flex-col px-3 py-6 gap-3 -mt-3">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start">
            <UserPhoto data={userInfo.individual} size="110px" />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <p className="font-semibold text-lg">
              {userInfo.individual.firstName} {userInfo.individual.lastName}
            </p>
            <p>{userInfo.individual.email}</p>
            <p>MobiHolder Id: {userInfo.individual.mobiHolderId}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(updateMember)}>
          <div className="flex flex-col gap-4 mt-7">
            {type === "Accept" && (
              <div className="flex flex-col w-full gap-6">
                <p className="-mb-3 text-mobiFormGray">Member/Staff ID</p>
                <Input
                  type="text"
                  name="memberId"
                  register={register}
                  placeholder="Member ID"
                  rules={{ required: "Membership ID is required" }}
                  errors={errors}
                />
              </div>
            )}
            {type === "Accept" && (
              <div className="flex flex-col w-full gap-6">
                <p className="-mb-3 text-mobiFormGray">Organisation Email</p>
                <Input
                  type="text"
                  name="organizationEmail"
                  value={userInfo?.organizationEmail}
                  register={register}
                  placeholder="Enter organisation email"
                  rules={{ required: "Organization Email is required" }}
                  errors={errors}
                />
              </div>
            )}
            {type === "Accept" && (
              <div className="flex flex-col w-full gap-6">
                <p className="-mb-3 text-mobiFormGray">Role (Designation)</p>
                <Input
                  type="text"
                  disabled
                  name="firstname"
                  register={register}
                  placeholder={userInfo.designation}
                />
              </div>
            )}
            {type !== "Accept" && (
              <div className="flex flex-col w-full gap-6">
                <p className="-mb-3 text-mobiFormGray">Reason for declining</p>
                <Input
                  type="text"
                  name="firstname"
                  register={register}
                  placeholder={"Reason for declining"}
                />
              </div>
            )}
            <div className="w-full flex md:flex-row flex-col justify-center gap-5 mt-5">
              <Button
                type="submit"
                disabled={isLoading}
                className={`${type === "Accept" ? "bg-mobiPink" : "bg-transparent border border-[rgba(247,77,27,1)] text-[rgba(247,77,27,1)]"}
                         md:w-1/2 w-full p-3 rounded-full`}
              >
                {type} Member
              </Button>
              {type !== "Accept" && (
                <Button
                  type="submit"
                  onClick={() => handleBlackList()}
                  className={
                    "bg-transparent border md:w-1/2 montserrat w-full p-3 rounded-full"
                  }
                >
                  Blacklist Member
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default function OrgMembership() {
  const user = useSelector((state) => state.orgData.orgData);
  const { openModal, isOpen, modalOptions, closeModal } = useModal();
  const [allMembers, setAllMembers] = useState([]);
  const [blackListedMembers, setBlackListedMembers] = useState([]);
  const [initiatedMembers, setInitiatedMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate } = useApiMutation();
  const [stampTime, setTimeStaamp] = useState(new Date().getTime());

  const TableHeaders = [
    "Individual",
    "Role",
    "Staff ID",
    "Email",
    "date joined",
    "Status",
    "Action",
  ];
  const RequetsHeaders1 = [
    "Individual",
    "Email",
    "Invited On",
    "Status",
    // "Action",
  ];
  const RequetsHeaders2 = ["Individual", "Email", "Requested On", "Action"];

  const handleDeclineMember = (data) => {
    openModal({
      size: "sm",
      content: (
        <UserDetails
          closeModal={closeModal}
          userInfo={data}
          type="Decline"
          reload={handleReload}
        />
      ),
    });
  };

  const handleAcceptMember = (data) => {
    openModal({
      size: "sm",
      content: (
        <UserDetails
          closeModal={closeModal}
          userInfo={data}
          type="Accept"
          reload={handleReload}
        />
      ),
    });
  };

  const handleUpdateMember = (data) => {
    openModal({
      size: "sm",
      content: (
        <UpdateMembershipStatusModal
          closeModal={closeModal}
          userInfo={data}
          reload={handleReload}
        />
      ),
    });
  };

  const navigate = useNavigate();

  const handleReload = () => {
    setTimeStaamp(new Date().getTime());
  };

  const getOrganisationsMember = (params) => {
    mutate({
      url: `/api/memberships-subscriptions/organization/membership${params}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        if (params === "") {
          setAllMembers(response.data.data);
          setBlackListedMembers(
            response.data.data.filter((item) => item.status === "inactive"),
          );
        } else if (params === "?filter=pendingFromOrganization") {
          setInitiatedMembers(response.data.data);
        } else if (params === "?filter=pendingFromIndividual") {
          setPendingMembers(response.data.data);
        }
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getOrganisationsMember("");
    getOrganisationsMember("?filter=pendingFromOrganization");
    getOrganisationsMember("?filter=pendingFromIndividual");
  }, [stampTime]);
  useEffect(() => {
    console.info(allMembers[0]);
  }, [allMembers]);
  return (
    <>
      {" "}
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile organisation data={user} title={"Membership"} />
          <p className="px-3 text-base">
            Manage your members and subscriptions, all in one place
          </p>
          <div className="w-full flex flex-col gap-2">
            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
              Membership
            </p>
          </div>
          <div className="w-full md:flex-row flex flex-col md:px-0 px-3 gap-5">
            <StatCard
              number={allMembers.length}
              label="Total Members"
              iconColor="bg-[rgba(75,104,70,1)]"
              IconComponent={
                <svg
                  width="30"
                  height="21"
                  viewBox="0 0 43 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7861 17.125C19.1601 17.125 20.9111 15.3739 20.9111 13C20.9111 10.6261 19.1601 8.875 16.7861 8.875C14.4122 8.875 12.6611 10.6261 12.6611 13C12.6611 15.3739 14.4101 17.125 16.7861 17.125Z"
                    fill="#79EF6B"
                  />
                  <path
                    d="M38 0.625H5C2.72506 0.625 0.875 2.35956 0.875 4.49219V29.7578C0.875 31.8904 2.72506 33.625 5 33.625H38C40.2749 33.625 42.125 31.8904 42.125 29.7578V4.49219C42.125 2.35956 40.2749 0.625 38 0.625ZM38 29.5L5 29.4773V4.75L38 4.77269V29.5Z"
                    fill="#79EF6B"
                  />
                  <path
                    d="M25.627 10.9375H33.877V15.0625H25.627V10.9375ZM27.6895 19.1875H33.877V23.3125H27.6895V19.1875ZM24.4513 24.418C24.4513 21.5841 20.9946 18.6719 16.7891 18.6719C12.5837 18.6719 9.12695 21.5841 9.12695 24.418V25.375H24.4513V24.418Z"
                    fill="#79EF6B"
                  />
                </svg>
              }
              colorGradient={["rgba(129, 239, 107, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <StatCard
              number={
                allMembers.filter((item) => item.status === "active").length
              }
              label="Active Members"
              iconColor="bg-[rgba(104,78,70,1)]"
              IconComponent={
                <svg
                  width="30"
                  height="21"
                  viewBox="0 0 43 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7861 17.125C19.1601 17.125 20.9111 15.3739 20.9111 13C20.9111 10.6261 19.1601 8.875 16.7861 8.875C14.4122 8.875 12.6611 10.6261 12.6611 13C12.6611 15.3739 14.4101 17.125 16.7861 17.125Z"
                    fill="#EF956B"
                  />
                  <path
                    d="M38 0.625H5C2.72506 0.625 0.875 2.35956 0.875 4.49219V29.7578C0.875 31.8904 2.72506 33.625 5 33.625H38C40.2749 33.625 42.125 31.8904 42.125 29.7578V4.49219C42.125 2.35956 40.2749 0.625 38 0.625ZM38 29.5L5 29.4773V4.75L38 4.77269V29.5Z"
                    fill="#EF956B"
                  />
                  <path
                    d="M25.627 10.9375H33.877V15.0625H25.627V10.9375ZM27.6895 19.1875H33.877V23.3125H27.6895V19.1875ZM24.4513 24.418C24.4513 21.5841 20.9946 18.6719 16.7891 18.6719C12.5837 18.6719 9.12695 21.5841 9.12695 24.418V25.375H24.4513V24.418Z"
                    fill="#EF956B"
                  />
                </svg>
              }
              colorGradient={["rgba(239, 149, 107, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <StatCard
              number={0}
              label="Deactivated Members"
              iconColor="bg-mobiSkyCloud"
              IconComponent={
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0441 12.1579C22.638 12.1579 23.9316 13.5196 23.9316 15.1974V20.8421H23.925V21.2763C23.925 21.6218 23.7946 21.9531 23.5625 22.1974C23.3305 22.4417 23.0157 22.5789 22.6875 22.5789C22.3593 22.5789 22.0445 22.4417 21.8125 22.1974C21.5804 21.9531 21.45 21.6218 21.45 21.2763V17.3684H21.4566V15.1974C21.4566 15.0822 21.4131 14.9718 21.3358 14.8903C21.2584 14.8089 21.1535 14.7632 21.0441 14.7632H11.9658C11.8564 14.7632 11.7515 14.8089 11.6741 14.8903C11.5968 14.9718 11.5533 15.0822 11.5533 15.1974V20.8421H11.55V21.2763C11.55 21.6218 11.4196 21.9531 11.1875 22.1974C10.9555 22.4417 10.6407 22.5789 10.3125 22.5789C9.98429 22.5789 9.66953 22.4417 9.43746 22.1974C9.20538 21.9531 9.075 21.6218 9.075 21.2763V17.3684H9.0783V15.1974C9.0783 13.5196 10.3702 12.1579 11.9658 12.1579H21.0441ZM30.525 15.1974V21.2763C30.525 21.6218 30.6554 21.9531 30.8875 22.1974C31.1195 22.4417 31.4343 22.5789 31.7625 22.5789C32.0907 22.5789 32.4055 22.4417 32.6375 22.1974C32.8696 21.9531 33 21.6218 33 21.2763V15.1974C33 14.3912 32.6958 13.6181 32.1543 13.0481C31.6128 12.4781 30.8783 12.1579 30.1125 12.1579H24.5437C25.1097 12.8787 25.4793 13.7766 25.5634 14.7632H30.1125C30.2219 14.7632 30.3268 14.8089 30.4042 14.8903C30.4815 14.9718 30.525 15.0822 30.525 15.1974ZM0 21.2763C6.91641e-09 21.6218 0.130379 21.9531 0.362455 22.1974C0.594531 22.4417 0.909295 22.5789 1.2375 22.5789C1.56571 22.5789 1.88047 22.4417 2.11254 22.1974C2.34462 21.9531 2.475 21.6218 2.475 21.2763V15.1974C2.475 15.0822 2.51846 14.9718 2.59582 14.8903C2.67318 14.8089 2.7781 14.7632 2.8875 14.7632H7.44645C7.52852 13.8062 7.88403 12.8979 8.46615 12.1579H2.8875C2.12169 12.1579 1.38724 12.4781 0.845729 13.0481C0.304218 13.6181 0 14.3912 0 15.1974V21.2763ZM16.5 0C17.8128 0 19.0719 0.548965 20.0002 1.52613C20.9285 2.50329 21.45 3.82861 21.45 5.21053C21.45 6.59244 20.9285 7.91776 20.0002 8.89493C19.0719 9.87209 17.8128 10.4211 16.5 10.4211C15.1872 10.4211 13.9281 9.87209 12.9998 8.89493C12.0715 7.91776 11.55 6.59244 11.55 5.21053C11.55 3.82861 12.0715 2.50329 12.9998 1.52613C13.9281 0.548965 15.1872 0 16.5 0ZM16.5 2.60526C15.8436 2.60526 15.2141 2.87975 14.7499 3.36833C14.2858 3.85691 14.025 4.51957 14.025 5.21053C14.025 5.90148 14.2858 6.56414 14.7499 7.05273C15.2141 7.54131 15.8436 7.81579 16.5 7.81579C17.1564 7.81579 17.7859 7.54131 18.2501 7.05273C18.7142 6.56414 18.975 5.90148 18.975 5.21053C18.975 4.51957 18.7142 3.85691 18.2501 3.36833C17.7859 2.87975 17.1564 2.60526 16.5 2.60526ZM27.225 1.73684C28.319 1.73684 29.3682 2.19431 30.1418 3.00862C30.9154 3.82292 31.35 4.92735 31.35 6.07895C31.35 7.23055 30.9154 8.33498 30.1418 9.14928C29.3682 9.96358 28.319 10.4211 27.225 10.4211C26.131 10.4211 25.0818 9.96358 24.3082 9.14928C23.5346 8.33498 23.1 7.23055 23.1 6.07895C23.1 4.92735 23.5346 3.82292 24.3082 3.00862C25.0818 2.19431 26.131 1.73684 27.225 1.73684ZM27.225 4.3421C26.7874 4.3421 26.3677 4.52509 26.0583 4.85081C25.7488 5.17654 25.575 5.61831 25.575 6.07895C25.575 6.53959 25.7488 6.98136 26.0583 7.30708C26.3677 7.6328 26.7874 7.81579 27.225 7.81579C27.6626 7.81579 28.0823 7.6328 28.3917 7.30708C28.7012 6.98136 28.875 6.53959 28.875 6.07895C28.875 5.61831 28.7012 5.17654 28.3917 4.85081C28.0823 4.52509 27.6626 4.3421 27.225 4.3421ZM5.775 1.73684C6.86902 1.73684 7.91823 2.19431 8.69182 3.00862C9.4654 3.82292 9.9 4.92735 9.9 6.07895C9.9 7.23055 9.4654 8.33498 8.69182 9.14928C7.91823 9.96358 6.86902 10.4211 5.775 10.4211C4.68098 10.4211 3.63177 9.96358 2.85818 9.14928C2.0846 8.33498 1.65 7.23055 1.65 6.07895C1.65 4.92735 2.0846 3.82292 2.85818 3.00862C3.63177 2.19431 4.68098 1.73684 5.775 1.73684ZM5.775 4.3421C5.33739 4.3421 4.91771 4.52509 4.60827 4.85081C4.29884 5.17654 4.125 5.61831 4.125 6.07895C4.125 6.53959 4.29884 6.98136 4.60827 7.30708C4.91771 7.6328 5.33739 7.81579 5.775 7.81579C6.21261 7.81579 6.63229 7.6328 6.94173 7.30708C7.25116 6.98136 7.425 6.53959 7.425 6.07895C7.425 5.61831 7.25116 5.17654 6.94173 4.85081C6.63229 4.52509 6.21261 4.3421 5.775 4.3421ZM1.2375 24.3158C0.909295 24.3158 0.594531 24.453 0.362455 24.6973C0.130379 24.9416 0 25.2729 0 25.6184V26.4868C0 28.2142 0.651895 29.8709 1.81228 31.0923C2.97266 32.3138 4.54647 33 6.1875 33H26.8125C28.4535 33 30.0273 32.3138 31.1877 31.0923C32.3481 29.8709 33 28.2142 33 26.4868V25.6184C33 25.2729 32.8696 24.9416 32.6375 24.6973C32.4055 24.453 32.0907 24.3158 31.7625 24.3158H1.2375ZM6.1875 30.3947C5.27433 30.3947 4.3932 30.0404 3.71257 29.3996C3.03194 28.7587 2.59956 27.8763 2.4981 26.9211H30.5019C30.4004 27.8763 29.9681 28.7587 29.2874 29.3996C28.6068 30.0404 27.7257 30.3947 26.8125 30.3947H6.1875Z"
                    fill="#6B9BEF"
                  />
                </svg>
              }
              colorGradient={["rgba(107, 155, 239, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <Link
              to={"/org/membership/add"}
              className="bg-mobiDarkCloud rounded-md shadow-md py-2 px-4 md:w-[70%] w-full flex items-center justify-between"
            >
              <div className="flex flex-col items-center w-full gap-3">
                <span className={`flex gap-1`}>Invite Member</span>
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="27" cy="27" r="27" fill="#2A2D4B" />
                  <path
                    d="M23.8033 37V16H28.1805V37H23.8033ZM15 28.5814V24.4031H37V28.5814H15Z"
                    fill="#242EF2"
                  />
                  <path
                    d="M23.8033 37V16H28.1805V37H23.8033ZM15 28.5814V24.4031H37V28.5814H15Z"
                    fill="#242EF2"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="All Members"
              filter
              // subTitle={<span>All Members</span>}
              exportData
              tableHeader={TableHeaders}
              sortFunc={(field, order) => {
                const sortedMembers = [
                  ...allMembers.filter((item) => item.status === "active"),
                ].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.createdAt) - new Date(b.createdAt)
                      : new Date(b.createdAt) - new Date(a.createdAt);
                  } else if (field === "name") {
                    const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                    const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                    return order === "ASC"
                      ? aName.localeCompare(bName)
                      : bName.localeCompare(aName);
                  }
                  return 0; // Default case if field is not recognized
                });

                setAllMembers(sortedMembers);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  TableHeaders,
                  allMembers.map((item) => [
                    `${item.individual.firstName} ${item.individual.lastName}`,
                    item.designation,
                    item.memberId ? item.memberId : "---",
                    item.individual.email,
                    item.dateJoined,
                    item.status,
                  ]),
                  "All Members.xlsx",
                )
              }
            >
              {allMembers.filter((item) => item.status === "active").length >
              0 ? (
                allMembers
                  .filter((item) => item.status === "active")
                  .map((data, index) => (
                    <tr
                      key={index}
                      className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                    >
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.firstName} {data.individual.lastName}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.designation}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.memberId ? data.memberId : "---"}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.email}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {formatDate(data?.dateJoined)}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        <Badge status={data.status} />
                      </td>
                      <td className="px-6 py-3 cursor-pointer">
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
                                onClick={() =>
                                  navigate(
                                    `/org/membership/updateMember/${data.individual.id}`,
                                  )
                                }
                              >
                                View Member Details
                              </span>
                            </MenuItem>{" "}
                            <MenuItem className="flex flex-col gap-3">
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  // console.log(data);
                                  navigate(
                                    `/org/membership/edit/${data.individual.mobiHolderId}`,
                                  );
                                }}
                              >
                                Edit Member Details
                              </span>
                            </MenuItem>
                            <MenuItem className="flex flex-col gap-3">
                              <span
                                className="cursor-pointer"
                                onClick={() => handleUpdateMember(data)}
                              >
                                {data.status === "active"
                                  ? "De-activate Member"
                                  : "Activate Member"}
                              </span>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  ))
              ) : isLoading ? (
                <tr>
                  <td
                    colSpan={TableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    <Loader size={20} />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={TableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </Table>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <div className="lg:w-[63%] md:w-[63%] w-full flex flex-col gap-5">
              <Table
                title="Today"
                filter
                subTitle={<span>Pending Requests (Initiated)</span>}
                exportData
                tableHeader={RequetsHeaders1}
                sortFunc={(field, order) => {
                  const sortedMembers = [...initiatedMembers].sort((a, b) => {
                    if (field === "date") {
                      return order === "ASC"
                        ? new Date(a.createdAt) - new Date(b.createdAt)
                        : new Date(b.createdAt) - new Date(a.createdAt);
                    } else if (field === "name") {
                      const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                      const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                      return order === "ASC"
                        ? aName.localeCompare(bName)
                        : bName.localeCompare(aName);
                    }
                    return 0; // Default case if field is not recognized
                  });

                  setInitiatedMembers(sortedMembers);
                }}
                handleExportDataClick={() =>
                  exportToExcel(
                    RequetsHeaders1,
                    initiatedMembers.map((item) => [
                      `${item.individual.firstName} ${item.individual.lastName}`,
                      item.individual.email,
                      dateFormat(data.createdAt, "dd-MM-yyyy"),
                      item.status,
                    ]),
                    "Initiated Pending Requests.xlsx",
                  )
                }
              >
                {initiatedMembers.length > 0 ? (
                  initiatedMembers.map((data, index) => (
                    <tr
                      key={index}
                      className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                    >
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.firstName} {data.individual.lastName}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.email}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {dateFormat(data.createdAt, "dd-MM-yyyy")}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        <Badge status={data.status} />
                      </td>
                      <td className="px-6 py-3">
                        <span className="flex w-full">
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
                      </td>
                    </tr>
                  ))
                ) : isLoading ? (
                  <tr>
                    <td
                      colSpan={RequetsHeaders1.length}
                      className="text-center py-10 font-semibold text-gray-500"
                    >
                      <Loader size={20} />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan={RequetsHeaders1.length}
                      className="text-center py-10 font-semibold text-gray-500"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </Table>
            </div>

            <div className="lg:w-[37%] md:w-[37%] w-full flex-grow h-full flex flex-col gap-5">
              <MembersAnalysis members={allMembers} />
            </div>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <div className="w-full flex flex-col gap-5">
              <Table
                title="Today"
                filter
                subTitle={<span>Pending Requests (Received)</span>}
                exportData
                tableHeader={RequetsHeaders2}
                sortFunc={(field, order) => {
                  const sortedMembers = [...pendingMembers].sort((a, b) => {
                    if (field === "date") {
                      return order === "ASC"
                        ? new Date(a.createdAt) - new Date(b.createdAt)
                        : new Date(b.createdAt) - new Date(a.createdAt);
                    } else if (field === "name") {
                      const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                      const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                      return order === "ASC"
                        ? aName.localeCompare(bName)
                        : bName.localeCompare(aName);
                    }
                    return 0; // Default case if field is not recognized
                  });
                  setPendingMembers(sortedMembers);
                }}
                handleExportDataClick={() =>
                  exportToExcel(
                    RequetsHeaders2,
                    pendingMembers.map((item) => [
                      `${item.individual.firstName} ${item.individual.lastName}`,
                      item.individual.email,
                      dateFormat(data.createdAt, "dd-MM-yyyy"),
                    ]),
                    "Received Pending Requests.xlsx",
                  )
                }
              >
                {pendingMembers.length > 0 ? (
                  pendingMembers.map((data, index) => (
                    <tr
                      key={index}
                      className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                    >
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.firstName} {data.individual.lastName}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.email}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {dateFormat(data.createdAt, "dd-MM-yyyy")}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        <span className="flex gap-2">
                          <span
                            className="flex py-2 px-3 rounded-full cursor-pointer border border-[rgba(247,77,27,1)]"
                            onClick={() => handleDeclineMember(data)}
                          >
                            <p className="text-[rgba(247,77,27,1)] text-xs font-[500]">
                              Decline
                            </p>
                          </span>
                          <span
                            className="flex py-2 px-3 rounded-full cursor-pointer bg-mobiPink"
                            onClick={() => handleAcceptMember(data)}
                          >
                            <p className="text-white text-xs font-[500]">
                              Accept
                            </p>
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : isLoading ? (
                  <tr>
                    <td
                      colSpan={RequetsHeaders2.length}
                      className="text-center py-10 font-semibold text-gray-500"
                    >
                      <Loader size={20} />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan={RequetsHeaders2.length}
                      className="text-center py-10 font-semibold text-gray-500"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="Today"
              filter
              subTitle={<span>BlackListed Members</span>}
              exportData
              tableHeader={TableHeaders}
              sortFunc={(field, order) => {
                const sortedMembers = [...blackListedMembers].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.createdAt) - new Date(b.createdAt)
                      : new Date(b.createdAt) - new Date(a.createdAt);
                  } else if (field === "name") {
                    const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                    const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                    return order === "ASC"
                      ? aName.localeCompare(bName)
                      : bName.localeCompare(aName);
                  }
                  return 0; // Default case if field is not recognized
                });

                setBlackListedMembers(sortedMembers);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  TableHeaders,
                  allMembers
                    .filter((item) => item.status === "inactive")
                    .map((item) => [
                      `${item.individual.firstName} ${item.individual.lastName}`,
                      item.designation,
                      item.memberId ? item.memberId : "---",
                      item.individual.email,
                      item.status,
                    ]),
                  "Blacklisted Members.xlsx",
                )
              }
            >
              {allMembers.filter((item) => item.status === "inactive").length >
              0 ? (
                allMembers
                  .filter((item) => item.status === "inactive")
                  .map((data, index) => (
                    <tr
                      key={index}
                      className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                    >
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.firstName} {data.individual.lastName}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.designation}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.memberId ? data.memberId : "---"}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        {data.individual.email}
                      </td>
                      <td className="px-3 py-3 text-mobiTableText">
                        <Badge status={data.status} />
                      </td>
                      <td className="px-6 py-3 cursor-pointer">
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
                                onClick={() => handleUpdateMember(data)}
                              >
                                {data.status === "active"
                                  ? "De-activate Member"
                                  : "Activate Member"}
                              </span>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  ))
              ) : isLoading ? (
                <tr>
                  <td
                    colSpan={TableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    <Loader size={20} />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={TableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </Table>
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
    </>
  );
}
