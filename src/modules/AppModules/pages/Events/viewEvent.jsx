import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader";
import { formatDateTime } from "../../../../helpers/dateHelper";
import {
  User,
  MapPin,
  FileText,
  CalendarClock,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function ViewEvent() {
  const user = useSelector((state) => state.userData.data);
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setIsLoading] = useState(true);

  const { id } = useParams();

  const { mutate } = useApiMutation();

  const getEventDetails = () => {
    mutate({
      url: `/api/events/view/event?id=${id}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setEventDetails(response.data.data);
        getEventOrganiser(response.data.data.userId);
      },
      onError: () => {},
    });
  };

  const getEventOrganiser = (id) => {
    mutate({
      url: `/api/users/${id}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setUserDetails(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getEventDetails();
  }, [getEventDetails]);

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
      name: `Organiser : ${userDetails.firstName} ${userDetails.lastName}`,
    },
    {
      icon: <MapPin size={24} color="#A1A1A1" />,
      name: `${eventDetails?.venue.name}, ${eventDetails?.venue.address}`,
    },
    {
      icon: <FileText size={24} color="#A1A1A1" />,
      name: `Event ID : ${eventDetails.eventId}`,
    },
    {
      icon: <CalendarClock size={24} color="#A1A1A1" />,
      name: `Start : ${formatDateTime(eventDetails.startDate)}`,
    },
    {
      icon: <Calendar size={24} color="#A1A1A1" />,
      name: `End : ${formatDateTime(eventDetails.endDate)}`,
    },
    {
      icon: <CreditCard size={24} color="#A1A1A1" />,
      name: `${eventDetails.ticketType}`,
    },
  ];

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"Event Details"} />
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
                      <div
                        className="w-full flex gap-3"
                        key={`details${index}`}
                      >
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
                      {eventDetails.venueImage.map((src, index) => (
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
