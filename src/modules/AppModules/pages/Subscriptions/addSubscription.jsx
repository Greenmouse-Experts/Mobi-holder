import { useSelector } from "react-redux";
import Header from "../../header";
import SearchInput from "../../../../components/SearchInput";
import { Link, useParams } from "react-router-dom";

const Card = ({ logo, category }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
            <div className="mb-3 w-full h-[200px] rounded-lg">{logo}</div>
            <p className="text-sm text-left p-3">{category}</p>
        </div>
    );
};


export default function AddSubscription() {
    const user = useSelector((state) => state.userData.data);
    const { id } = useParams();

    const cards = [
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/borcelle.png" className="w-full h-full rounded-t-lg object-cover" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/companyborcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/borcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/companyborcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/borcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/companyborcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/borcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
        {
            logo: <div className="w-full h-full rounded-lg">
                <img src="/companyborcelle.png" className="w-full h-full object-cover rounded-t-lg" />
            </div>,
            category: "Travelgenics",
        },
    ];


    return <>
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} />
                <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="lg:text-2xl md:text-xl text-lg font-semibold">
                            {id ? 'Join New Organisation' : 'Choose Organisation'}
                        </p>
                        <p className="text-base">
                            {id ? 'Choose an organisation you want to be a member of' : 'Choose an organisation you want to subscribe to'}</p>
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
                                    <Link to={id ? '/app/join-organisation-form' : '/app/view-organisation/239404'}>
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