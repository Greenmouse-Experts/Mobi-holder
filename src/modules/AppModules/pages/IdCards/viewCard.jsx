import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import DropdownMenu from "../../../../components/DropdownMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import useApiMutation, { newApi } from "../../../../api/hooks/useApiMutation";
import StaffCard from "../../../../components/StaffCard";
import StaffCardPortrait from "../../../../components/StaffCardPortrait";
import { dateFormat } from "../../../../helpers/dateHelper";
import { useQuery } from "@tanstack/react-query";

export default function ViewCard() {
  const user = useSelector((state) => state.userData.data);
  const { register } = useForm();

  const { id } = useParams();

  const { mutate } = useApiMutation();

  const query = useQuery({
    queryKey: [user.id, id, "view_card"],
    queryFn: async () => {
      let resp = await newApi("/api/idcards/individual/view/card?cardId=${id}");
      return resp.data;
    },
  });

  if (query.isFetching)
    return (
      <>
        <Header mobile data={user} title={"Event History"} />
        <div className="p-4 text-lg font-semibold opacity-75">Loading...</div>
      </>
    );
  if (query.isError)
    return (
      <>
        <Header mobile data={user} title={"Event History"} />
        <div className="h-[calc(100dvh-100px)] grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-lg ">Error Occured</div>
            <p className="opacity-80 text-md">
              {JSON.stringify(query.error?.response?.data?.message)}
            </p>
            <button
              disabled={query.isFetching}
              onClick={query.refetch}
              className="btn disabled:opacity-60 disabled:cursor-not-allowed  bg-mobiPink p-2 text-md font-bold text-white  px-6 rounded-md"
            >
              Reload
            </button>
          </div>
        </div>
      </>
    );
  const cardData = query?.data?.data || {};

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"View ID Card"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                View ID Card
              </p>
              <p className="text-base">
                Preview ID Card for :{" "}
                <span className="text-mobiBlue">
                  {cardData.individual?.firstName}{" "}
                  {cardData.individual?.lastName}
                </span>
              </p>
              <div className="flex my-2">
                <DropdownMenu
                  buttonLabel={
                    cardData.createdBy === cardData.individual?.id
                      ? "Created By Me"
                      : `Created By ${cardData.organization?.companyName}`
                  }
                  disabled
                  color="#A324F2"
                  btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiPink border rounded-md border-mobiPink"
                ></DropdownMenu>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-5 px-5 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <form>
                <div className="mb-1 flex flex-col gap-8 mt-5">
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
                  <div className="flex flex-col w-full mt-10 gap-6">
                    <p className="-mb-3 text-mobiFormGray">Organisation</p>
                    <Input
                      type="text"
                      name="firstName"
                      value={cardData.organization.companyName}
                      register={register}
                      disabled
                      placeholder="Green Mouse"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Role</p>
                    <Input
                      type="text"
                      name="lastName"
                      value={cardData.designation}
                      register={register}
                      disabled
                      placeholder="Sales Rep"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">ID Card Number</p>
                    <Input
                      name="phoneNumber"
                      value={cardData.cardNumber.toUpperCase()}
                      disabled
                      register={register}
                      type="text"
                      placeholder="Enter the Card Number"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Issue Date</p>
                    <Input
                      type="text"
                      disabled
                      name="email"
                      value={dateFormat(cardData.dateIssued, "dd-MM-yyyy")}
                      register={register}
                      placeholder="Email"
                    />
                  </div>

                  <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray">Expiry Date</p>
                      <Input
                        type="text"
                        disabled
                        name="dateOfBirth"
                        value={dateFormat(cardData.expiryDate, "dd-MM-yyyy")}
                        register={register}
                        placeholder="Enter your date of birth"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Status</p>
                    <Input
                      name="phoneNumber"
                      disabled
                      value={cardData.status.toUpperCase()}
                      register={register}
                      type="text"
                      placeholder="Active"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
