import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import Table from "../../../../components/Tables";
import Badge from "../../../../components/Badge";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useApiMutation, { newApi } from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import { exportToExcel } from "../../../../helpers/exportToExcel";
import useModal from "../../../../hooks/modal";
import RevokeCardModal from "./modal/revokeCard";
import ReusableModal from "../../../../components/ReusableModal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Eye,
  RotateCw,
  Fingerprint,
  Users,
  CreditCard,
  PlusCircle,
  MoreVertical,
} from "lucide-react";

export default function OrgIDCardsPage() {
  const user = useSelector((state) => state.orgData.orgData);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allMembers, setAllMembers] = useState([]);
  const [memberCards, setMemberCards] = useState([]);
  const { openModal, isOpen, modalOptions, closeModal } = useModal();

  const navigate = useNavigate();

  const { mutate } = useApiMutation();

  const TableHeaders = [
    "Name",
    "Staff ID",
    "Role",
    "Expiry Date",
    "Status",
    "Action",
  ];
  const NewTableHeaders = [
    "Template Name",
    "Layout",
    "Background Color",
    "Text Color",
    "Status",
    "Action",
  ];

  const getTemplates = () => {
    mutate({
      url: "/api/idcards/templates",
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setTemplates(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };
  const delete_mutation = useMutation({
    mutationFn: async (id) => {
      let resp = await newApi.delete(`/api/idcards/template?templateId=` + id);
      return resp.data;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "failed");
    },
  });
  const set_default_mutation = useMutation({
    mutationFn: async (id) => {
      let resp = await newApi.get(
        `/api/idcards/template/default?templateId=${id}`,
      );
      return resp.data;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "failed");
    },
  });
  const setDefaultTemplate = async (id) => {
    toast.promise(async () => await set_default_mutation.mutateAsync(id), {
      pending: "setting as default",
      success: "set successfully",
    });
  };

  const getOrganisationsMember = () => {
    mutate({
      url: `/api/memberships-subscriptions/organization/membership`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setAllMembers(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  const getMemberCards = () => {
    mutate({
      url: `/api/idcards/organization/fetch/member/cards`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setMemberCards(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getTemplates();
    getOrganisationsMember();
    getMemberCards();
  }, []);

  const handleRevokeCard = (data) => {
    console.log(data);
    openModal({
      size: "sm",
      content: (
        <RevokeCardModal
          closeModal={closeModal}
          cardInfo={data}
          reload={getMemberCards}
        />
      ),
    });
  };

  const handleActivateCard = (data) => {
    const payload = {
      cardId: data.cardNumber,
      status: "active",
    };
    mutate({
      url: "/api/idcards/organization/change/card/status",
      method: "POST",
      headers: true,
      data: payload,
      onSuccess: (response) => {
        getMemberCards();
        toast.success("ID Card activated successfully");
      },
      onError: () => {
        toast.error("Failed to activate ID Card");
      },
    });
  };

  const renderCardStatus = (id) => {
    const card = memberCards.find((card) => card.individual.id === id);
    if (card) {
      return <Badge status={card.status} />;
    }
    return (
      <Button
        className="bg-mobiPink w-full px-1 rounded-full text-xs shadow-none hover:shadow-none"
        onClick={() => navigate(`/org/cards/createUser/${id}`)}
      >
        <span className="text-xs normal-case flex items-center justify-center gap-1">
          <PlusCircle className="w-4 h-4" /> Create ID
        </span>
      </Button>
    );
  };

  const ColorDisplay = ({ color }) => (
    <Tooltip content={color}>
      <div
        className="w-8 h-8 rounded-full border border-gray-600 shadow-inner"
        style={{ backgroundColor: color }}
      ></div>
    </Tooltip>
  );

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header
            mobile
            organisation
            data={user}
            title={"ID Card Management"}
          />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                ID Card Management
              </p>
              <p className="text-base text-gray-400">
                Create, customize, and manage ID cards for your members
              </p>
            </div>
          </div>

          <div className="w-full md:px-0 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              cronTop
              number={allMembers.length}
              label="Total Members"
              iconColor="bg-mobiLightGreen"
              IconComponent={<Users className="w-6 h-6 text-mobiLightGreen" />}
              colorGradient={["rgba(107, 239, 215, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <StatCard
              cronTop
              number={memberCards.length}
              label="Total ID Cards"
              iconColor="bg-mobiOrange"
              IconComponent={<CreditCard className="w-6 h-6 text-mobiOrange" />}
              colorGradient={["rgba(239, 149, 107, 1)", "rgba(52, 59, 79, 1)"]}
            />
            <StatCard
              number={templates.length}
              label="ID Card Templates"
              iconColor="bg-mobiSkyCloud"
              IconComponent={
                <Fingerprint className="w-6 h-6 text-mobiSkyCloud" />
              }
              colorGradient={["rgba(107, 155, 239, 1)", "rgba(52, 59, 79, 1)"]}
            />

            <Link
              to={"/org/cards/structure"}
              className="bg-mobiDarkCloud cursor-pointer rounded-lg shadow-lg p-4 flex items-center justify-between transition duration-300 ease-in-out hover:bg-mobiTheme"
            >
              <div className="flex flex-col items-start w-full gap-2">
                <span className="text-lg font-semibold ">
                  Create Card Template
                </span>
                <span className="text-sm text-gray-400">
                  Design a new ID card layout
                </span>
              </div>
              <div className="flex-shrink-0">
                <PlusCircle className="w-10 h-10 text-mobiPink" />
              </div>
            </Link>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="ID Card Templates"
              filter
              subTitle={
                <span>Manage and customize your ID card templates</span>
              }
              exportData
              tableHeader={NewTableHeaders}
              sortFunc={(field, order) => {
                const sortedTemplates = [...templates].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.createdAt) - new Date(b.createdAt)
                      : new Date(b.createdAt) - new Date(a.createdAt);
                  } else if (field === "name") {
                    const aName = `${a.name}`;
                    const bName = `${b.name}`;

                    return order === "ASC"
                      ? aName.localeCompare(bName)
                      : bName.localeCompare(aName);
                  }
                  return 0; // Default case if field is not recognized
                });

                setTemplates(sortedTemplates);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  NewTableHeaders,
                  templates.map((item) => [
                    item.name,
                    item.layout,
                    item.backgroundColor,
                    item.textColor,
                    `${item.is_default ? "Default" : "---"}`,
                  ]),
                  "ID Templates.xlsx",
                )
              }
            >
              {templates.length > 0 ? (
                templates.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"} hover:bg-mobiDarkCloud/70 transition duration-150`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.name}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.layout}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      <ColorDisplay color={data.backgroundColor} />
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      <ColorDisplay color={data.textColor} />
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.is_default ? (
                        <Badge status="default" />
                      ) : (
                        <span className="text-gray-500">---</span>
                      )}
                    </td>
                    <td className="px-6 py-3 cursor-pointer">
                      <Menu placement="left">
                        <MenuHandler>
                          <Button
                            variant="text"
                            className="p-0 m-0 min-w-0 h-auto text-mobiTableText hover:bg-transparent"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </MenuHandler>
                        <MenuList className="bg-mobiDarkCloud border-mobiTheme shadow-lg">
                          {!data.is_default && (
                            <MenuItem
                              className="flex items-center gap-2 text-mobiTableText hover:bg-mobiTheme hover:text-white"
                              onClick={() => setDefaultTemplate(data.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Set As Default
                            </MenuItem>
                          )}
                          <MenuItem
                            className="flex items-center gap-2 text-mobiTableText hover:bg-mobiTheme hover:text-white"
                            onClick={() =>
                              navigate("/org/cards/structure/" + data.id)
                            }
                          >
                            <Pencil className="w-4 h-4" />
                            Edit Template
                          </MenuItem>
                          {!data.is_default && (
                            <MenuItem
                              className="flex items-center gap-2 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                              onClick={async () => {
                                try {
                                  toast.promise(
                                    async () => {
                                      await delete_mutation.mutateAsync(
                                        data.id,
                                      );
                                      getTemplates(); // Refresh templates after deletion
                                    },
                                    {
                                      success: "Template deleted successfully",
                                      error: "Failed to delete template",
                                      pending: "Deleting template...",
                                    },
                                  );
                                } catch (error) {
                                  console.log("deletion error", error);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </MenuItem>
                          )}
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
                    No Data Available
                  </td>
                </tr>
              )}
            </Table>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="Issued ID Cards"
              filter
              subTitle={
                <span>Manage all issued ID cards for your members</span>
              }
              exportData
              tableHeader={TableHeaders}
              sortFunc={(field, order) => {
                const sortedMembers = [...memberCards].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.expiryDate) - new Date(b.expiryDate)
                      : new Date(b.expiryDate) - new Date(a.expiryDate);
                  } else if (field === "name") {
                    const aName = `${a.individual.firstName} ${a.individual.lastName}`;
                    const bName = `${b.individual.firstName} ${b.individual.lastName}`;

                    return order === "ASC"
                      ? aName.localeCompare(bName)
                      : bName.localeCompare(aName);
                  }
                  return 0; // Default case if field is not recognized
                });

                setMemberCards(sortedMembers);
              }}
              handleExportDataClick={() =>
                exportToExcel(
                  TableHeaders,
                  memberCards.map((item) => [
                    `${item.individual.firstName} ${item.individual.lastName}`,
                    "---",
                    item.designation,
                    `${dateFormat(item.expiryDate, "dd-MM-yyyy")}`,
                    `${item.status}`,
                  ]),
                  "ID Cards.xlsx",
                )
              }
            >
              {memberCards.length > 0 ? (
                memberCards.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"} hover:bg-mobiDarkCloud/70 transition duration-150`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.individual.firstName} {data.individual.lastName}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">---</td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.designation}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {dateFormat(data.expiryDate, "dd-MM-yyyy")}
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
                          <Button
                            variant="text"
                            className="p-0 m-0 min-w-0 h-auto text-mobiTableText hover:bg-transparent"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </MenuHandler>
                        <MenuList className="bg-mobiDarkCloud border-mobiTheme shadow-lg">
                          <MenuItem
                            className="flex items-center gap-2 text-mobiTableText hover:bg-mobiTheme hover:text-white"
                            onClick={() =>
                              navigate(`/org/card/viewCard/${data.id}`)
                            }
                          >
                            <Eye className="w-4 h-4" />
                            View Card
                          </MenuItem>
                          <MenuItem
                            className="flex items-center gap-2 text-mobiTableText hover:bg-mobiTheme hover:text-white"
                            onClick={() =>
                              navigate(`/org/card/updateCard/${data.id}`)
                            }
                          >
                            <Pencil className="w-4 h-4" />
                            Update Card
                          </MenuItem>
                          {data.status !== "revoked" && (
                            <MenuItem
                              className="flex items-center gap-2 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                              onClick={() => handleRevokeCard(data)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Revoke ID Card
                            </MenuItem>
                          )}
                          {data.status === "revoked" && (
                            <MenuItem
                              className="flex items-center gap-2 text-green-400 hover:bg-green-900/50 hover:text-green-300"
                              onClick={() => handleActivateCard(data)}
                            >
                              <RotateCw className="w-4 h-4" />
                              Activate ID Card
                            </MenuItem>
                          )}
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
                    No Data Available
                  </td>
                </tr>
              )}
            </Table>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title="All Members"
              filter
              subTitle={
                <span>
                  Overview of all organization members and their ID card status
                </span>
              }
              exportData
              tableHeader={TableHeaders}
              sortFunc={(field, order) => {
                const sortedMembers = [...allMembers].sort((a, b) => {
                  if (field === "date") {
                    return order === "ASC"
                      ? new Date(a.dateJoined) - new Date(b.dateJoined)
                      : new Date(b.dateJoined) - new Date(a.dateJoined);
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
                    item.memberId,
                    item.designation,
                    `${item.dateJoined ? dateFormat(item.dateJoined, "dd-MM-yyyy") : "---"}`,
                    `${item.status}`,
                  ]),
                  "Members ID Cards.xlsx",
                )
              }
            >
              {allMembers.length > 0 ? (
                allMembers.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"} hover:bg-mobiDarkCloud/70 transition duration-150`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.individual.firstName} {data.individual.lastName}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.memberId}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.designation}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.dateJoined
                        ? dateFormat(data.dateJoined, "dd-MM-yyyy")
                        : "---"}
                    </td>
                    <td className="px-3 py-3 text-mobiTableText">
                      {renderCardStatus(data.individual.id)}
                    </td>
                    <td className="px-6 py-3 text-mobiTableText">
                      <Tooltip content="No additional actions available">
                        <span className="flex w-full">
                          <MoreVertical className="w-5 h-5" />
                        </span>
                      </Tooltip>
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
