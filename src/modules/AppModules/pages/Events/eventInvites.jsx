import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Table from "../../../../components/Tables";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";
import Badge from "../../../../components/Badge";
import useModal from "../../../../hooks/modal";
import ReusableModal from "../../../../components/ReusableModal";
import AlertModal from "../../../../components/AlertModal";
import { Button } from "@material-tailwind/react";
import { usePaystackPayment } from "react-paystack";

export default function EventInvites() {
  const user = useSelector((state) => state.userData.data);
  const { openModal, isOpen, modalOptions, closeModal } = useModal();
  const navigate = useNavigate();
  const [eventInvites, setEventInvites] = useState([]);
  const [paymentGateway, setGateway] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  const { mutate } = useApiMutation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEventInvites();
    fetchGateway();
  }, []);

  const getEventInvites = () => {
    mutate({
      url: `/api/events/event/inviters`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setEventInvites(response.data.data);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const fetchGateway = () => {
    mutate({
      url: `/api/users/fetch/subscription/payment/gateway`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setGateway(response.data.data);
      },
      onError: () => {},
    });
  };

  const handleDeclineModal = (invitationToken) => {
    openModal({
      size: "sm",
      content: (
        <AlertModal
          closeModal={closeModal}
          title={"Decline Invitation"}
          redirect={getEventInvites}
          api={`/api/events/invitation/respond`}
          method={"PUT"}
          body={{ token: invitationToken, status: "Declined" }}
          text={"Do you want to decline this invitation?"}
        />
      ),
    });
  };

  const handleAcceptModal = (data) => {
    setSelectedEvent(data);
    openModal({
      size: "sm",
      content: data.isFree ? (
        <AlertModal
          closeModal={closeModal}
          title={"Accept Invitation"}
          redirect={getEventInvites}
          api={`/api/events/invitation/respond`}
          method={"PUT"}
          body={{ token: data.invitationToken, status: "Accepted" }}
          text={"Do you want to accept this invitation?"}
        />
      ) : (
        <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
          <div className="text-center w-full flex flex-col gap-3">
            <p className="font-semibold text-center text-lg">
              Accept Invitation
            </p>
            <p className="text-base">Do you want to accept this invitation?</p>
            <p className="text-sm text-gray-800">
              You will be charged{" "}
              <span className="font-semibold text-mobiPink">
                ₦{data?.eventtickets?.price}
              </span>{" "}
              for this event.
            </p>
          </div>
          <div className="flex justify-center mt-5 gap-4">
            <Button
              onClick={() => handlePayment(data)}
              className="bg-mobiPink text-white outline-none px-4 py-2 rounded-lg"
            >
              Yes Accept
            </Button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    });
  };

  const handlePayment = (event) => {
    const paystackConfig = {
      reference: new Date().getTime().toString(),
      email: "greenmousedev@gmail.com",
      amount:
        Number(event?.eventtickets.price) > 0
          ? Number(event?.eventtickets.price) * 100
          : 0,
      publicKey: `${paymentGateway?.publicKey}`,
      currency: `NGN`,
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    initializePayment({ onSuccess, onClose });
  };

  const onSuccess = (reference) => {
    mutate({
      url: `/api/events/invitation/respond`,
      method: "PUT",
      headers: true,
      data: {
        token: selectedEvent.invitationToken,
        status: "Accepted",
        refID: reference.reference,
      },
      onSuccess: (response) => {
        getEventInvites();
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const TableHeaders = [
    "Event Name",
    "Ticket Type",
    "Invited On",
    "Status",
    "Action",
  ];

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"Event Invites"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Event Invites
              </p>
              <p className="text-base">All events you are invited for</p>
            </div>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-6">
            <Table
              title=""
              filter
              subTitle={<span>Received Requests</span>}
              exportData
              tableHeader={TableHeaders}
            >
              {eventInvites.length > 0 ? (
                eventInvites.map((data, index) => (
                  <tr
                    key={index}
                    className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
                  >
                    <td className="px-3 py-3 text-mobiTableText">
                      {data.event.name}
                    </td>
                    <td className="px-5 py-3 text-mobiTableText">
                      {data.event.ticketType}
                    </td>
                    <td className="px-5 py-3 text-mobiTableText">
                      {dateFormat(data.invitedAt, "dd-MM-yyy")}
                    </td>
                    <td className="py-3 text-mobiTableText">
                      {data.status === "Pending" ? (
                        <span className="flex gap-2">
                          <span
                            onClick={() =>
                              handleDeclineModal(data.invitationToken)
                            }
                            className="flex cursor-pointer py-2 px-3 rounded-full border border-[rgba(247,77,27,1)]"
                          >
                            <p className="text-[rgba(247,77,27,1)] text-xs font-[500]">
                              Decline
                            </p>
                          </span>
                          <span
                            onClick={() => handleAcceptModal(data)}
                            className="flex cursor-pointer py-2 px-3 rounded-full bg-mobiPink"
                          >
                            <p className="text-white text-xs font-[500]">
                              Accept
                            </p>
                          </span>
                        </span>
                      ) : (
                        <Badge
                          status={data.status}
                          color={
                            data.status === "Accepted"
                              ? "bg-green-500 text-white"
                              : data.status === "Pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                          }
                        />
                      )}
                    </td>
                    <td className="px-6 py-3 cursor-pointer">
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
