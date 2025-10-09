import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import DropdownMenu from "../../../../components/DropdownMenu";
import { useParams } from "react-router-dom";
import useApiMutation, { newApi } from "../../../../api/hooks/useApiMutation";
import StaffCard from "../../../../components/StaffCard";
import StaffCardPortrait from "../../../../components/StaffCardPortrait";
import { dateFormat } from "../../../../helpers/dateHelper";
import { useQuery } from "@tanstack/react-query";
import { FaFilePdf } from "react-icons/fa";

export default function ViewCard() {
  const user = useSelector((state) => state.userData.data);
  const { register } = useForm();

  const { id } = useParams();

  const query = useQuery({
    queryKey: [user.id, id, "view_card"],
    queryFn: async () => {
      let resp = await newApi(`/api/idcards/individual/view/card?cardId=${id}`);
      return resp.data;
    },
  });

  if (query.isFetching)
    return (
      <>
        <Header mobile data={user} title={"View ID Card"} />
        <div className="p-6 text-lg font-semibold text-center text-gray-500">
          Loading Card Details...
        </div>
      </>
    );
  if (query.isError)
    return (
      <>
        <Header mobile data={user} title={"View ID Card"} />
        <div className="h-[calc(100dvh-100px)] grid place-items-center px-4">
          <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg border border-red-200 text-center max-w-md">
            <div className="text-2xl font-bold text-red-600">
              Error Occurred
            </div>
            <p className="text-sm text-gray-600">
              Failed to load card details. Please try again.
            </p>
            <p className="text-xs text-red-500 break-words">
              {JSON.stringify(query.error?.response?.data?.message) ||
                "Unknown error"}
            </p>
            <button
              disabled={query.isFetching}
              onClick={query.refetch}
              className="btn disabled:opacity-60 disabled:cursor-not-allowed bg-mobiPink hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-md"
            >
              Reload
            </button>
          </div>
        </div>
      </>
    );
  const cardData = query?.data?.data || {};

  const handleExportPdf = () => {
    // Placeholder for PDF export logic
    alert("Export to PDF functionality not implemented yet.");
  };

  const cardOwnerName = `${cardData.individual?.firstName || ""} ${cardData.individual?.lastName || ""}`;
  const creatorInfo =
    cardData.createdBy === cardData.individual?.id
      ? "Created By Me"
      : `By ${cardData.organization?.companyName || "Unknown Organization"}`;

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn bg-gray-50">
        <div className="w-full flex flex-col gap-6 h-full p-4 md:p-8">
          <Header mobile data={user} title={"View ID Card"} />

          {/* Card Header and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-gray-800">
                ID Card Preview
              </h1>
              <p className="text-base text-gray-600">
                Viewing card for:{" "}
                <span className="font-semibold text-mobiBlue">
                  {cardOwnerName || "N/A"}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DropdownMenu
                buttonLabel={creatorInfo}
                disabled
                color="#A324F2"
                btnClass="flex items-center justify-center px-4 py-2 text-sm font-medium text-mobiPink border border-mobiPink bg-white rounded-lg shadow-sm hover:bg-purple-50 transition duration-150"
              />
              <button
                onClick={handleExportPdf}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
              >
                <FaFilePdf className="text-lg" /> Export to PDF
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full  min-h-[500px] gap-6">
            {/* Card Display Area (Left/Center) */}
            <div className="w-full grid place-items-center ">
              {cardData.template?.layout === "horizontal" ||
              cardData.template?.layout === "Landscape" ? (
                <StaffCard
                  data={cardData}
                  background={cardData.template.backgroundColor}
                  textColor={cardData.template.textColor}
                />
              ) : (
                <StaffCardPortrait
                  data={cardData}
                  background={cardData.template.backgroundColor}
                  company={cardData?.organization?.companyName}
                  textColor={cardData.template.textColor}
                />
              )}
            </div>

            <div className="w-full mt-4">
              <div className="w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                <form className="flex flex-col gap-6">
                  {/* Organisation */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Organisation
                    </label>
                    <Input
                      type="text"
                      name="organizationName"
                      value={cardData.organization?.companyName || "N/A"}
                      register={register}
                      disabled
                      placeholder="Organisation Name"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <Input
                      type="text"
                      name="designation"
                      value={cardData.designation || "N/A"}
                      register={register}
                      disabled
                      placeholder="Role/Designation"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  {/* ID Card Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      ID Card Number
                    </label>
                    <Input
                      name="cardNumber"
                      value={cardData.cardNumber?.toUpperCase() || "N/A"}
                      disabled
                      register={register}
                      type="text"
                      placeholder="Card Number"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Issue Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Issue Date
                      </label>
                      <Input
                        type="text"
                        disabled
                        name="dateIssued"
                        value={
                          dateFormat(cardData.dateIssued, "dd-MM-yyyy") || "N/A"
                        }
                        register={register}
                        placeholder="Issue Date"
                        className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                      />
                    </div>

                    {/* Expiry Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        disabled
                        name="expiryDate"
                        value={
                          dateFormat(cardData.expiryDate, "dd-MM-yyyy") || "N/A"
                        }
                        register={register}
                        placeholder="Expiry Date"
                        className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Input
                      name="status"
                      disabled
                      value={cardData.status?.toUpperCase() || "N/A"}
                      register={register}
                      type="text"
                      placeholder="Status"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Mobile View Details (Stacked below card for smaller screens) */}
            <div className="lg:hidden w-full mt-6 order-3 lg:order-none">
              <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Card Details
                </h2>
                <form className="flex flex-col gap-6">
                  {/* Organisation */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Organisation
                    </label>
                    <Input
                      type="text"
                      name="organizationName"
                      value={cardData.organization?.companyName || "N/A"}
                      register={register}
                      disabled
                      placeholder="Organisation Name"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <Input
                      type="text"
                      name="designation"
                      value={cardData.designation || "N/A"}
                      register={register}
                      disabled
                      placeholder="Role/Designation"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  {/* ID Card Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      ID Card Number
                    </label>
                    <Input
                      name="cardNumber"
                      value={cardData.cardNumber?.toUpperCase() || "N/A"}
                      disabled
                      register={register}
                      type="text"
                      placeholder="Card Number"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Issue Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Issue Date
                      </label>
                      <Input
                        type="text"
                        disabled
                        name="dateIssued"
                        value={
                          dateFormat(cardData.dateIssued, "dd-MM-yyyy") || "N/A"
                        }
                        register={register}
                        placeholder="Issue Date"
                        className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                      />
                    </div>

                    {/* Expiry Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        disabled
                        name="expiryDate"
                        value={
                          dateFormat(cardData.expiryDate, "dd-MM-yyyy") || "N/A"
                        }
                        register={register}
                        placeholder="Expiry Date"
                        className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Input
                      name="status"
                      disabled
                      value={cardData.status?.toUpperCase() || "N/A"}
                      register={register}
                      type="text"
                      placeholder="Status"
                      className="bg-gray-50 border-gray-300 focus:ring-mobiPink focus:border-mobiPink"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
