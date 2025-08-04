import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { formatDateTime } from "../../../../helpers/dateHelper";

import {
  User,
  MapPin,
  FileText,
  Calendar,
  CalendarCheck,
  Ticket,
} from "lucide-react";

export default function OrgViewEvent() {
  const user = useSelector((state) => state.orgData.orgData);
  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch event details
  const {
    data: eventDetails = {},
    isLoading: eventLoading,
    error: eventError,
    refetch: eventrefetch,
  } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: async () => {
      const response = await newApi.get(`/api/events/view/event?id=${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  // Fetch user details based on event's userId
  const {
    data: userDetails = {},
    isLoading: userLoading,
    error: userError,
    refetch: userRefech,
  } = useQuery({
    queryKey: ["userDetails", eventDetails.userId],
    queryFn: async () => {
      const response = await newApi.get(`/api/users/${eventDetails.userId}`);
      return response.data.data;
    },
    enabled: !!eventDetails.userId,
  });

  const loading = eventLoading || userLoading;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const eventDetailsBlock = [
    {
      icon: <User size={24} color="#A1A1A1" />,
      name: `Organiser : ${userDetails.companyName}`,
    },
    {
      icon: <MapPin size={24} color="#A1A1A1" />,
      name: `${eventDetails?.venue?.name}, ${eventDetails?.venue?.address}`,
    },
    {
      icon: <FileText size={24} color="#A1A1A1" />,
      name: `Event ID : ${eventDetails.eventId}`,
    },
    {
      icon: <Calendar size={24} color="#A1A1A1" />,
      name: `Start : ${formatDateTime(eventDetails.startDate)}`,
    },
    {
      icon: <CalendarCheck size={24} color="#A1A1A1" />,
      name: `End : ${formatDateTime(eventDetails.endDate)}`,
    },
    {
      icon: <Ticket size={24} color="#A1A1A1" />,
      name: `${eventDetails.ticketType}`,
    },
  ];
  const any_error = eventError || userError;
  if (any_error) {
    return (
      <>
        <Header mobile organisation data={user} title={"Event Details"} />
        <div className="h-[calc(100dvh-100px)] grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-lg ">Error Occured</div>
            <p className="opacity-80 text-md">
              {any_error?.response?.data?.messeage}
            </p>
            <button
              disabled={loading}
              onClick={() => {
                userRefech();
                eventrefetch();
              }}
              className="btn disabled:opacity-60 disabled:cursor-not-allowed  bg-mobiPink p-2 text-md font-bold text-white  px-6 rounded-md"
            >
              Reload
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile organisation data={user} title={"Event Details"} />
          <div className="w-full md:w-3/4 flex justify-between items-center gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Event Details
              </p>
              <p className="text-base">
                Event details for :{" "}
                <span className="text-mobiBlue">{eventDetails.name}</span>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-2 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <form>
                <div className="mb-1 flex flex-col gap-8 mt-5">
                  <img src={eventDetails.image} className="w-full rounded-xl" />
                  <div className="flex flex-col w-full mt-1 gap-3">
                    <div className="w-1/4">
                      <Badge status={eventDetails.status} />
                    </div>
                    <p>{eventDetails.description}</p>
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    {eventDetailsBlock.map((details, index) => (
                      <div className="w-full flex gap-3" key={index}>
                        <div className="p-2 rounded-lg bGmobiGrayDark flex items-center">
                          <span className="bs-mobiCeramaic">
                            {details.icon}
                          </span>
                        </div>
                        <span className="bs-mobiCeramic flex flex-col items-center mt-1">
                          {details.name}
                        </span>
                      </div>
                    ))}

                    <p>Location Photos</p>
                    <div className="flex gap-4 overflow-x-auto p-4">
                      {eventDetails.venueImage?.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Venue ${index + 1}`}
                          className="w-48 h-32 object-cover rounded-xl shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* <button className="p-2 px-4 bg-mobiPink text-white">sss</button>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
