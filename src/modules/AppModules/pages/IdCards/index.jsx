import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import Table from "../../../../components/Tables";
import Badge from "../../../../components/Badge";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import { dateFormat } from "../../../../helpers/dateHelper";
import Loader from "../../../../components/Loader";
import DeleteModal from "../../../../components/DeleteModal";
import ReusableModal from "../../../../components/ReusableModal";
import useModal from "../../../../hooks/modal";
import { exportToExcel } from "../../../../helpers/exportToExcel";

export default function IDCardsPage() {
  const user = useSelector((state) => state.userData.data);
  const [orgCards, setOrgCards] = useState([]);
  const [personalCards, setPersonalCards] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalOrgCards, setOriginalOrgCards] = useState([]);
  const [originalPersonalCards, setOriginalPersonalCards] = useState([]);
  const [orgCardsSearchTerm, setOrgCardsSearchTerm] = useState("");
  const [personalCardsSearchTerm, setPersonalCardsSearchTerm] = useState("");
  const [orgCardsStatusFilter, setOrgCardsStatusFilter] = useState("all");
  const [personalCardsDateFilter, setPersonalCardsDateFilter] = useState("all");
  const navigate = useNavigate();
  const { openModal, isOpen, modalOptions, closeModal } = useModal();

  const { mutate } = useApiMutation();

  const getIDCards = () => {
    mutate({
      url: "/api/idcards/fetch/cards",
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setOrgCards(response.data.data);
        setOriginalOrgCards(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  const getPersonalCards = () => {
    mutate({
      url: "/api/idcards/personal/cards",
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setPersonalCards(response.data.data);
        setOriginalPersonalCards(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  const getOrganisations = (params) => {
    mutate({
      url: `/api/memberships-subscriptions/individual/membership${params}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        if (params === "") {
          setOrganisations(response.data.data);
        }
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getIDCards();
    getPersonalCards();
    getOrganisations("");
  }, []);

  // Filter and search functionality for org cards
  useEffect(() => {
    let filteredCards = [...originalOrgCards];

    // Apply search filter
    if (orgCardsSearchTerm) {
      filteredCards = filteredCards.filter(
        (card) =>
          card.organization.companyName
            .toLowerCase()
            .includes(orgCardsSearchTerm.toLowerCase()) ||
          card.cardNumber
            .toLowerCase()
            .includes(orgCardsSearchTerm.toLowerCase()) ||
          card.designation
            .toLowerCase()
            .includes(orgCardsSearchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (orgCardsStatusFilter !== "all") {
      filteredCards = filteredCards.filter(
        (card) => card.status === orgCardsStatusFilter,
      );
    }

    setOrgCards(filteredCards);
  }, [orgCardsSearchTerm, orgCardsStatusFilter, originalOrgCards]);

  // Filter and search functionality for personal cards
  useEffect(() => {
    let filteredCards = [...originalPersonalCards];

    // Apply search filter
    if (personalCardsSearchTerm) {
      filteredCards = filteredCards.filter(
        (card) =>
          card.issuingOrganization
            .toLowerCase()
            .includes(personalCardsSearchTerm.toLowerCase()) ||
          card.cardNumber
            .toLowerCase()
            .includes(personalCardsSearchTerm.toLowerCase()) ||
          card.designation
            .toLowerCase()
            .includes(personalCardsSearchTerm.toLowerCase()),
      );
    }

    // Apply date filter
    if (personalCardsDateFilter !== "all") {
      const now = new Date();
      filteredCards = filteredCards.filter((card) => {
        const issuedDate = new Date(card.issuedDate);
        switch (personalCardsDateFilter) {
          case "thisMonth":
            return (
              issuedDate.getMonth() === now.getMonth() &&
              issuedDate.getFullYear() === now.getFullYear()
            );
          case "lastMonth":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return (
              issuedDate.getMonth() === lastMonth.getMonth() &&
              issuedDate.getFullYear() === lastMonth.getFullYear()
            );
          case "thisYear":
            return issuedDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    setPersonalCards(filteredCards);
  }, [personalCardsSearchTerm, personalCardsDateFilter, originalPersonalCards]);

  const handleReload = () => {
    getPersonalCards();
  };

  const handleDeleteCard = (data) => {
    openModal({
      size: "sm",
      content: (
        <DeleteModal
          api={`/api/idcards/personal/cards?id=${data.id}`}
          title={"Do you wish to delete this ID Card?"}
          closeModal={closeModal}
          redirect={handleReload}
        />
      ),
    });
  };

  const TableHeaders = [
    "Organisation",
    "Card Number",
    "Role",
    "Expiry Date",
    "Status",
    "Action",
  ];
  const NewTableHeaders = [
    "Organisation",
    "Card Number",
    "Role",
    "Issued Date",
    "Expiry Date",
    "Action",
  ];

  // Get unique statuses for filter
  const uniqueStatuses = [
    ...new Set(originalOrgCards.map((card) => card.status)),
  ];

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"ID Card Management"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                ID Card Management
              </p>
              <p className="text-base">
                Create, mange and do more with our ID card module
              </p>
            </div>
          </div>

          <div className="md:w-3/4 w-full md:px-0 px-3 md:flex-row flex flex-col gap-5">
            <StatCard
              cronTop
              number={orgCards.length}
              label="Total ID Cards"
              iconColor="bg-mobiLightGreen"
              IconComponent={
                <img
                  src={cards}
                  alt="ID Cards"
                  style={{ width: "22px", color: "rgba(107, 239, 215, 1)" }}
                />
              }
              colorGradient={["rgba(107, 239, 215, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <StatCard
              cronTop
              number={organisations.length}
              label="Joined Organisations"
              iconColor="bg-mobiOrange"
              IconComponent={
                <img src={cards} alt="ID Cards" style={{ width: "22px" }} />
              }
              colorGradient={["rgba(239, 149, 107, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <Link
              to={"/app/add-card"}
              className="bg-mobiDarkCloud cursor-pointer rounded-md shadow-md py-2 px-4 md:w-1/2 flex items-center justify-between"
            >
              <div className="flex flex-col items-center w-full gap-3">
                <span className={`flex gap-1`}>Add Your Card</span>
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

          {/* Search and Filter Controls for Org Cards */}
          <div className="w-full px-3 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Search Organization Cards
                </label>
                <input
                  type="text"
                  placeholder="Search by organization, card number, or role..."
                  value={orgCardsSearchTerm}
                  onChange={(e) => setOrgCardsSearchTerm(e.target.value)}
                  className="px-3 bg-mobiDarkRoamn  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <select
                  value={orgCardsStatusFilter}
                  onChange={(e) => setOrgCardsStatusFilter(e.target.value)}
                  className="px-3 py-2 border bg-mobiDarkRoamn border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="Today"
              filter
              subTitle={<span>Manage ID Cards</span>}
              exportData
              tableHeader={TableHeaders}
              sortFunc={(field, order) => {
                const sortedOrgCards = [...orgCards].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a?.expiryDate) - new Date(b?.expiryDate)
                      : new Date(b?.expiryDate) - new Date(a?.expiryDate);
                  } else if (field === "name") {
                    return order === "ASC"
                      ? a.organization.companyName.localeCompare(
                          b.organization.companyName,
                        )
                      : b.organization.companyName.localeCompare(
                          a.organization.companyName,
                        );
                  } else if (field === "cardNumber") {
                    return order === "ASC"
                      ? a.cardNumber.localeCompare(b.cardNumber)
                      : b.cardNumber.localeCompare(a.cardNumber);
                  } else if (field === "role") {
                    return order === "ASC"
                      ? a.designation.localeCompare(b.designation)
                      : b.designation.localeCompare(a.designation);
                  } else if (field === "status") {
                    return order === "ASC"
                      ? a.status.localeCompare(b.status)
                      : b.status.localeCompare(a.status);
                  }
                  return 0; // Default case if field is not recognized
                });

                setOrgCards(sortedOrgCards);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  TableHeaders,
                  orgCards.map((item) => [
                    item.organization.companyName,
                    '<img width={50} src="/id-card.png" />',
                    item.cardNumber,
                    item.designation,
                    dateFormat(item.expiryDate, "dd-MM-yyyy"),
                    item.status,
                  ]),
                  "Manage ID Cards.xlsx",
                )
              }
            >
              {orgCards.length > 0 ? (
                orgCards.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.organization.companyName}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.cardNumber}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.designation}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data?.expiryDate
                        ? dateFormat(data?.expiryDate, "dd-MM-yyyy")
                        : "---"}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      <Badge
                        status={data.status}
                        color={data.status === "revoked" ? "inactive" : ""}
                      />
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
                                navigate(`/app/view-card/${data.id}`)
                              }
                            >
                              View Card
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
                    NO ID Cards Available
                  </td>
                </tr>
              )}
            </Table>
          </div>

          {/* Search and Filter Controls for Personal Cards */}
          <div className="w-full px-3 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Search Personal Cards
                </label>
                <input
                  type="text"
                  placeholder="Search by organization, card number, or role..."
                  value={personalCardsSearchTerm}
                  onChange={(e) => setPersonalCardsSearchTerm(e.target.value)}
                  className="px-3 py-2 bg-mobiDarkRoamn  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Filter by Issue Date
                </label>
                <select
                  value={personalCardsDateFilter}
                  onChange={(e) => setPersonalCardsDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-mobiDarkRoamn"
                >
                  <option value="all">All Dates</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="thisYear">This Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="Today"
              filter
              subTitle={<span>Personal ID Cards</span>}
              exportData
              tableHeader={NewTableHeaders}
              sortFunc={(field, order) => {
                const sortedCards = [...personalCards].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a?.issuedDate) - new Date(b?.issuedDate)
                      : new Date(b?.issuedDate) - new Date(a?.issuedDate);
                  } else if (field === "name") {
                    return order === "ASC"
                      ? a.issuingOrganization.localeCompare(
                          b.issuingOrganization,
                        )
                      : b.issuingOrganization.localeCompare(
                          a.issuingOrganization,
                        );
                  } else if (field === "cardNumber") {
                    return order === "ASC"
                      ? a.cardNumber.localeCompare(b.cardNumber)
                      : b.cardNumber.localeCompare(a.cardNumber);
                  } else if (field === "role") {
                    return order === "ASC"
                      ? a.designation.localeCompare(b.designation)
                      : b.designation.localeCompare(a.designation);
                  } else if (field === "expiryDate") {
                    return order === "ASC"
                      ? new Date(a?.expiryDate || 0) -
                          new Date(b?.expiryDate || 0)
                      : new Date(b?.expiryDate || 0) -
                          new Date(a?.expiryDate || 0);
                  }
                  return 0; // Default case if field is not recognized
                });

                setPersonalCards(sortedCards);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  NewTableHeaders,
                  personalCards.map((item) => [
                    item.issuingOrganization,
                    item.cardNumber,
                    item.designation,
                    dateFormat(item?.issuedDate, "dd-MM-yyyy"),
                    item?.expiryDate
                      ? dateFormat(item?.expiryDate, "dd-MM-yyyy")
                      : "---",
                  ]),
                  "Personal ID Cards.xlsx",
                )
              }
            >
              {personalCards.length > 0 ? (
                personalCards.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.issuingOrganization}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.cardNumber}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.designation}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {dateFormat(data?.issuedDate, "dd-MM-yyyy")}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data?.expiryDate
                        ? dateFormat(data?.expiryDate, "dd-MM-yyyy")
                        : "---"}
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
                              className="cursor-pointer size-full"
                              onClick={() =>
                                navigate(`/app/view-personal-card/${data.id}`)
                              }
                            >
                              Edit Card
                            </span>
                          </MenuItem>
                          <MenuItem className="flex flex-col gap-3">
                            <span
                              className="cursor-pointer size-full"
                              onClick={() =>
                                navigate(`/app/previewcard/${data.id}`)
                              }
                            >
                              View Card
                            </span>
                          </MenuItem>
                          <MenuItem className="flex flex-col gap-3">
                            <span
                              className="cursor-pointer size-full"
                              onClick={() => handleDeleteCard(data)}
                            >
                              Delete Card
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
                    colSpan={NewTableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    <Loader size={20} />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={NewTableHeaders.length}
                    className="text-center py-10 font-semibold text-gray-500"
                  >
                    NO ID Cards Available
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>
      </div>

      <ReusableModal
        isOpen={isOpen}
        size={modalOptions.size}
        title={modalOptions.title}
        content={modalOptions.content}
        closeModal={closeModal}
      />
    </>
  );
}
