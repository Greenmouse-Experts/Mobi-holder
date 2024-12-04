import { useSelector } from "react-redux";
import Header from "../../header";
import SearchInput from "../../../../components/SearchInput";
import { Link, useParams } from "react-router-dom";

const Card = ({ logo, category }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col relative">
            <span className="absolute w-auto py-1 px-2 top-[8px] left-[10px] rounded-md bg-[rgba(0,0,0,0.7)]">
                <p className="text-white text-xs font-semibold">18 Jun</p>
                <p className="text-white text-xs mt-1">Today</p>
            </span>
            <div className="mb-1 w-full h-[200px] rounded-lg">{logo}</div>
            <p className="text-xs text-mobiBlue text-left p-3">{category}</p>
            <p className="text-sm text-white px-3 font-semibold">Google UI Event</p>
            <div className="w-full flex gap-3 px-3 my-1">
                <div className="rounded-lg max-h-[30px] mt-[1px] flex items-center">
                    <span className="bs-mobiCeramaic">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_6472_35774" fill="white">
                                <path d="M6.5 13C5.21442 13 3.95771 12.6188 2.8888 11.9046C1.81988 11.1903 0.986755 10.1752 0.494786 8.98744C0.00281634 7.79972 -0.125905 6.49279 0.124899 5.23191C0.375702 3.97104 0.994767 2.81285 1.90381 1.90381C2.81285 0.994767 3.97104 0.375702 5.23191 0.124899C6.49279 -0.125905 7.79972 0.00281634 8.98744 0.494786C10.1752 0.986755 11.1903 1.81988 11.9046 2.8888C12.6188 3.95771 13 5.21442 13 6.5C13 8.22391 12.3152 9.87721 11.0962 11.0962C9.87721 12.3152 8.22391 13 6.5 13ZM6.5 0.928574C5.39808 0.928574 4.3209 1.25533 3.40468 1.86753C2.48847 2.47973 1.77436 3.34986 1.35267 4.36791C0.930986 5.38595 0.820653 6.50618 1.03563 7.58693C1.2506 8.66768 1.78123 9.66042 2.56041 10.4396C3.33959 11.2188 4.33232 11.7494 5.41307 11.9644C6.49382 12.1793 7.61405 12.069 8.63209 11.6473C9.65014 11.2256 10.5203 10.5115 11.1325 9.59532C11.7447 8.6791 12.0714 7.60193 12.0714 6.5C12.0714 5.02237 11.4844 3.60525 10.4396 2.56041C9.39475 1.51556 7.97764 0.928574 6.5 0.928574Z" />
                            </mask>
                            <path d="M6.5 13V12V13ZM12.0714 6.5H13.0714H12.0714ZM6.5 12C5.4122 12 4.34884 11.6774 3.44437 11.0731L2.33323 12.736C3.56659 13.5601 5.01664 14 6.5 14V12ZM3.44437 11.0731C2.5399 10.4687 1.83495 9.60975 1.41867 8.60476L-0.429094 9.37013C0.138563 10.7406 1.09986 11.9119 2.33323 12.736L3.44437 11.0731ZM1.41867 8.60476C1.00238 7.59977 0.893465 6.4939 1.10568 5.42701L-0.855887 5.03682C-1.14528 6.49168 -0.996751 7.99968 -0.429094 9.37013L1.41867 8.60476ZM1.10568 5.42701C1.3179 4.36011 1.84173 3.3801 2.61092 2.61092L1.1967 1.1967C0.147808 2.2456 -0.566498 3.58197 -0.855887 5.03682L1.10568 5.42701ZM2.61092 2.61092C3.3801 1.84173 4.36011 1.3179 5.42701 1.10568L5.03682 -0.855887C3.58197 -0.566498 2.2456 0.147808 1.1967 1.1967L2.61092 2.61092ZM5.42701 1.10568C6.4939 0.893465 7.59977 1.00238 8.60476 1.41867L9.37013 -0.429094C7.99968 -0.996751 6.49168 -1.14528 5.03682 -0.855887L5.42701 1.10568ZM8.60476 1.41867C9.60975 1.83495 10.4687 2.5399 11.0731 3.44437L12.736 2.33323C11.9119 1.09986 10.7406 0.138563 9.37013 -0.429094L8.60476 1.41867ZM11.0731 3.44437C11.6774 4.34884 12 5.4122 12 6.5H14C14 5.01664 13.5601 3.56659 12.736 2.33323L11.0731 3.44437ZM12 6.5C12 7.95869 11.4205 9.35764 10.3891 10.3891L11.8033 11.8033C13.2098 10.3968 14 8.48913 14 6.5H12ZM10.3891 10.3891C9.35764 11.4205 7.95869 12 6.5 12V14C8.48913 14 10.3968 13.2098 11.8033 11.8033L10.3891 10.3891ZM6.5 -0.0714258C5.2003 -0.0714258 3.92978 0.313982 2.84911 1.03606L3.96025 2.699C4.71202 2.19668 5.59586 1.92857 6.5 1.92857V-0.0714258ZM2.84911 1.03606C1.76845 1.75814 0.92617 2.78445 0.428794 3.98523L2.27655 4.75059C2.62255 3.91527 3.20849 3.20131 3.96025 2.699L2.84911 1.03606ZM0.428794 3.98523C-0.0685815 5.186 -0.198718 6.50729 0.0548423 7.78202L2.01641 7.39184C1.84002 6.50507 1.93055 5.58591 2.27655 4.75059L0.428794 3.98523ZM0.0548423 7.78202C0.308402 9.05676 0.93427 10.2277 1.8533 11.1467L3.26751 9.73249C2.62819 9.09316 2.1928 8.27861 2.01641 7.39184L0.0548423 7.78202ZM1.8533 11.1467C2.77233 12.0657 3.94325 12.6916 5.21798 12.9452L5.60816 10.9836C4.72139 10.8072 3.90684 10.3718 3.26751 9.73249L1.8533 11.1467ZM5.21798 12.9452C6.49271 13.1987 7.81401 13.0686 9.01478 12.5712L8.24941 10.7234C7.41409 11.0694 6.49493 11.16 5.60816 10.9836L5.21798 12.9452ZM9.01478 12.5712C10.2155 12.0738 11.2419 11.2316 11.9639 10.1509L10.301 9.03975C9.79869 9.79152 9.08473 10.3774 8.24941 10.7234L9.01478 12.5712ZM11.9639 10.1509C12.686 9.07023 13.0714 7.79971 13.0714 6.5H11.0714C11.0714 7.40414 10.8033 8.28798 10.301 9.03975L11.9639 10.1509ZM13.0714 6.5C13.0714 4.75715 12.3791 3.08568 11.1467 1.8533L9.73249 3.26751C10.5898 4.12482 11.0714 5.28758 11.0714 6.5H13.0714ZM11.1467 1.8533C9.91432 0.620919 8.24285 -0.0714258 6.5 -0.0714258V1.92857C7.71242 1.92857 8.87518 2.41021 9.73249 3.26751L11.1467 1.8533Z" fill="#A1A1A1" mask="url(#path-1-inside-1_6472_35774)" />
                            <mask id="path-3-inside-2_6472_35774" fill="white">
                                <path d="M8.63051 9.2846L6.03516 6.68924V2.32031H6.96373V6.30388L9.28516 8.62995L8.63051 9.2846Z" />
                            </mask>
                            <path d="M8.63051 9.2846L7.92341 9.9917L8.63051 10.6988L9.33762 9.9917L8.63051 9.2846ZM6.03516 6.68924H5.03516V7.10345L5.32805 7.39635L6.03516 6.68924ZM6.03516 2.32031V1.32031H5.03516V2.32031H6.03516ZM6.96373 2.32031H7.96373V1.32031H6.96373V2.32031ZM6.96373 6.30388H5.96373V6.71751L6.25591 7.01028L6.96373 6.30388ZM9.28516 8.62995L9.99226 9.33706L10.6987 8.63066L9.99297 7.92355L9.28516 8.62995ZM9.33762 8.57749L6.74226 5.98213L5.32805 7.39635L7.92341 9.9917L9.33762 8.57749ZM7.03516 6.68924V2.32031H5.03516V6.68924H7.03516ZM6.03516 3.32031H6.96373V1.32031H6.03516V3.32031ZM5.96373 2.32031V6.30388H7.96373V2.32031H5.96373ZM6.25591 7.01028L8.57734 9.33635L9.99297 7.92355L7.67154 5.59748L6.25591 7.01028ZM8.57805 7.92285L7.92341 8.57749L9.33762 9.9917L9.99226 9.33706L8.57805 7.92285Z" fill="#A1A1A1" mask="url(#path-3-inside-2_6472_35774)" />
                        </svg>
                    </span>
                </div>
                <span className="bs-mobiCeramic flex flex-col items-center mt-1">7:30 - 1:00PM</span>
            </div>
            <div className="w-full flex gap-3 px-3 mb-3">
                <div className="rounded-lg max-h-[30px] mt-[1px] flex items-center">
                    <span className="bs-mobiCeramaic">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 4.82334L10.7496 1L12.0495 4.82334" fill="#A6A6A6" />
                            <path d="M2.625 4.82334L10.7496 1L12.0495 4.82334" stroke="#15171E" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 4.82031H13.9993V7.11431C13.0244 7.11431 12.0494 7.87898 12.0494 9.21715C12.0494 10.5553 13.0244 11.7023 13.9993 11.7023V13.9963H1V11.7023C1.97495 11.7023 2.9499 10.9377 2.9499 9.40832C2.9499 7.87898 1.97495 7.11431 1 7.11431V4.82031Z" fill="#A6A6A6" stroke="#15171E" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.22656 8.41406H7.17646H5.22656Z" fill="#A6A6A6" />
                            <path d="M5.22656 8.41406H7.17646" stroke="#15171E" stroke-width="0.7" stroke-linecap="round" />
                            <path d="M5.22656 10.7031H9.77633H5.22656Z" fill="#A6A6A6" />
                            <path d="M5.22656 10.7031H9.77633" stroke="#15171E" stroke-width="0.7" stroke-linecap="round" />
                        </svg>
                    </span>
                </div>
                <span className="bs-mobiCeramic flex flex-col items-center mt-1">Free</span>
            </div>
        </div>
    );
};


export default function ScanEvents() {
    const user = useSelector((state) => state.userData.data);
    const { id } = useParams();

    const cards = [
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/google-ui-event.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Education",
        },
    ];


    return <>
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} />
                <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">
                            Scan Event
                        </p>
                        <p className="text-base">
                        Choose an event to verify for    
                        </p>
                    </div>
                    <div className="md:flex md:w-2/5 hidden">
                        <SearchInput appendIcon="search.svg" type="text" placeholder="Enter keyword to search" />
                    </div>
                </div>

                <div className="w-full flex md:px-0 px-3 flex-grow">
                    <div className="shadow-xl py-5 px-5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                        <div className="py-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {cards.map((card, index) => (
                                    <Link to='/app/verify-event/:id'>
                                        <Card key={index} {...card} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}