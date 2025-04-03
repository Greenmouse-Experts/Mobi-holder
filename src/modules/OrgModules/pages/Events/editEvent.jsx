import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useEffect, useState } from "react";
import AboutEvent from "./components/aboutEvent";
import LocationEvent from "./components/locationEvent";
import TicketEvent from "./components/ticketEvent";
import { useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";

export default function OrgEditEvent() {
    const user = useSelector((state) => state.orgData.orgData);

    const { id } = useParams();

    const [activeTab, setActiveTab] = useState(1);
    const [eventDetail, setEventDetail] = useState({});
    const [loader, setLoader] = useState(true);

    const { mutate } = useApiMutation();


    useEffect(() => {
        getEventDetail(id);
    }, []);



    const getEventDetail = (id) => {
        mutate({
            url: `/api/events/event/details?id=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEventDetail(response.data.data);
                setLoader(false)
            },
            onError: () => {

            }
        })
    }


    if(id && loader) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Edit Event</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow flex-col md:px-0 px-3 gap-10">
                        <div className="hidden flex-col md:w-3/4 w-full md:gap-0 gap-3 md:flex sm:flex-row">
                            <button
                                className={`w-full px-4 py-2 ${activeTab > 0 ? 'border-b-2 border-mobiBlue' : 'border-b border-mobiBorderFray'
                                    }`}
                            >
                                About Event
                            </button>
                            <button
                                className={`w-full px-4 py-2 ${activeTab > 1 ? 'border-b-2 border-mobiBlue' : 'border-b border-mobiBorderFray'
                                    }`}
                            >
                                Location & Time
                            </button>
                            <button
                                className={`w-full px-4 py-2 ${activeTab > 2 ? 'border-b-2 border-mobiBlue' : 'border-b border-mobiBorderFray'
                                    }`}
                            >
                                Tickets
                            </button>
                        </div>
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            {activeTab === 1 &&
                                <AboutEvent data={eventDetail} next={() => [setActiveTab((prev) => activeTab + 1), window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })]} />
                            }
                            {activeTab === 2 &&
                                <LocationEvent data={eventDetail} next={() => [setActiveTab((prev) => activeTab + 1), window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })]}
                                    back={() => [setActiveTab((prev) => activeTab - 1), window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })]} />
                            }
                            {activeTab === 3 &&
                                <TicketEvent data={eventDetail} back={() => [setActiveTab((prev) => activeTab - 1), window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })]} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}