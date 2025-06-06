import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useEffect, useState } from "react";
import AboutEvent from "./components/aboutEvent";
import LocationEvent from "./components/locationEvent";
import TicketEvent from "./components/ticketEvent";

export default function AddEvent() {
    const user = useSelector((state) => state.userData.data);

    const [activeTab, setActiveTab] = useState(1);


    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('Page is being unloaded');
            localStorage.removeItem('eventPayload');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            localStorage.removeItem('eventPayload'); // React navigation
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} title={'Create Event'} />

                    <div className="w-full flex flex-grow flex-col md:px-0 px-3 gap-10">
                        <div className="w-full flex flex-col gap-2 md: hidden">
                            <p className="text-base font-semibold md:hidden">Create Event</p>
                        </div>

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
                                <AboutEvent next={() => [setActiveTab((prev) => activeTab + 1), window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })]} />
                            }
                            {activeTab === 2 &&
                                <LocationEvent next={() => [setActiveTab((prev) => activeTab + 1), window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })]}
                                    back={() => [setActiveTab((prev) => activeTab - 1), window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })]} />
                            }
                            {activeTab === 3 &&
                                <TicketEvent
                                    back={() => [setActiveTab((prev) => activeTab - 1), window.scrollTo({
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