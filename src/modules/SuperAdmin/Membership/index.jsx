import Table from "../../../components/Tables";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import Badge from "../../../components/Badge";

export default function Members() {
  const navigate = useNavigate();
  const { mutate } = useApiMutation();
  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [paginationData, setPagination] = useState({});
  const [search, setSearch] = useState("");

  const TableHeaders = [
    "Individual",
    "Organisation",
    "Role",
    "Requested By",
    "Date Joined",
    "Status",
    "Action",
  ];

  const getMembershipData = (page) => {
    setLoading(true);
    setMembers([]);
    mutate({
      url: `/api/admins/members?page=${page}&limit=10`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setMembers(response.data.data);
        setPagination(response.data.pagination);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const getAllMembers = () => {
    mutate({
      url: `/api/admins/members?page=1&limit=1000000000`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setAllMembers(response.data.data);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getMembershipData(1);
    getAllMembers();
  }, []);

  const filteredMembers = (search === "" ? members : allMembers)?.filter(
    (data) => {
      const fullName =
        `${data.individual?.firstName} ${data.individual?.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        data.organization.companyName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        data.designation?.toLowerCase().includes(search.toLowerCase()) ||
        data.requestedBy?.toLowerCase().includes(search.toLowerCase())
      );
    },
  );

  return (
    <div className="w-full flex h-full animate__animated animate__fadeIn">
      <div className="w-full flex flex-col gap-5 h-full">
        <Header mobile superAdmin />
        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
          <Table
            title=""
            subTitle={<span>All Members</span>}
            exportData
            hasNumber
            currentPage={paginationData.page}
            totalPages={paginationData.totalPages}
            onPageChange={(page) => getMembershipData(page)}
            tableHeader={TableHeaders}
            search={search}
            onSearchChange={setSearch}
          >
            {filteredMembers.length > 0 ? (
              filteredMembers.map((data, index) => (
                <tr
                  key={index}
                  className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                >
                  <td className="px-3 py-3 text-mobiTableText">{index + 1}</td>
                  <td className="px-3 py-3 text-mobiTableText">
                    {data.individual?.firstName} {data.individual?.lastName}
                  </td>
                  <td className="px-3 py-3 text-mobiTableText">
                    {data.organization?.companyName}
                  </td>
                  <td className="px-3 py-3 text-mobiTableText">
                    {data.designation}
                  </td>
                  <td className="px-3 py-3 text-mobiTableText capitalize">
                    {data.requestedBy}
                  </td>
                  <td className="px-3 py-3 text-mobiTableText">
                    {dateFormat(data.dateJoined, "dd-MM-yyy")}
                  </td>
                  <td className="px-3 py-3 text-mobiTableText">
                    <Badge status={data.status} />
                  </td>
                  <td className="px-6 py-3 cursor-pointer">
                    <span className="flex w-full cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.4477 3.44772 5 4 5C4.55228 5 5 5.4477 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
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
            ) : loading ? (
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
    </div>
  );
}
