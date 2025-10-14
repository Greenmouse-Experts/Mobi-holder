import { useEffect, useState } from "react";
import Header from "../header";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import Table from "../../../components/Tables";
import useApiMutation from "../../../api/hooks/useApiMutation";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../../helpers/exportToExcel";

export default function AllPersonalIDCards() {
  const [personalCards, setPersonalCards] = useState([]);
  const [paginationData, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { mutate } = useApiMutation();
  const navigate = useNavigate();

  const NewTableHeaders = [
    "Individual",
    "Issuing Organisation",
    "Card Number",
    "Role",
    "Issued Date",
    "Expiry Date",
    "Action",
  ];

  const getAllIDCards = (page) => {
    setIsLoading(true);
    setPersonalCards([]);
    mutate({
      url: `/api/admins/personal/idcards?page=${page}&limit=20`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setPersonalCards(response.data.data);
        setPagination(response.data.pagination);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    getAllIDCards(1);
  }, []);

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile superAdmin />
          <div className="w-full flex flex-col gap-5 my-2">
            <Table
              filter
              subTitle={<span>Personal ID Cards</span>}
              exportData
              tableHeader={NewTableHeaders}
              sortFunc={(field, order) => {
                const sortedCards = [...personalCards].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.issuedDate) - new Date(b.issuedDate)
                      : new Date(b.issuedDate) - new Date(a.issuedDate);
                  } else if (field === "name") {
                    return order === "ASC"
                      ? a.issuingOrganization.localeCompare(
                          b.issuingOrganization,
                        )
                      : b.issuingOrganization.localeCompare(
                          a.issuingOrganization,
                        );
                  }
                  return 0; // Default case if field is not recognized
                });

                setPersonalCards(sortedCards);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  NewTableHeaders,
                  personalCards.map((item) => [
                    `${item.individual?.firstName} ${item.individual?.lastName}`,
                    item.issuingOrganization,
                    item.cardNumber,
                    item.designation,
                    dateFormat(item.issuedDate, "dd-MM-yyyy"),
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
                      {data.individual?.firstName} {data.individual?.lastName}
                    </td>
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
                      {dateFormat(data.issuedDate, "dd-MM-yyyy")}
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
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`view-personal-card/${data.id}`)
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
    </>
  );
}
