import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header";
import SearchInput from "../../../../components/SearchInput";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import AvatarInitials from "../../../../components/AvatarInitials";
import Loader from "../../../../components/Loader";
import { setParamsData } from "../../../../reducers/userSlice";


const Card = ({ photo, companyName }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
            <div className="mb-3 w-full h-[200px] rounded-lg">
                {photo ?
                    <img src={photo} className="w-full h-full rounded-t-lg object-cover" />
                    :
                    <AvatarInitials name={`${companyName}`} size="full" noRounded />
                }
            </div>
            <p className="text-sm text-left overflow-hidden text-ellipsis whitespace-nowrap p-3">{companyName}</p>
        </div>
    );
};


export default function OrganisationLists() {
    const user = useSelector((state) => state.userData.data);
    const [cards, setOrgCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loader, setLoader] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const { mutate } = useApiMutation();

    const getAllOrganisations = () => {
        mutate({
            url: "/api/users/all/organizations",
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrgCards(response.data.data);
                setFilteredCards(response.data.data); // Initialize filtered cards
                setLoader(false);
            },
            onError: () => {
                setLoader(false);
            }
        });
    }

    // Handle search functionality
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredCards(cards);
        } else {
            const filtered = cards.filter(card => 
                card.companyName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCards(filtered);
        }
    };

    useEffect(() => {
        getAllOrganisations();
    }, []);

    const setParams = (data) => {
        dispatch(setParamsData(data))
    }

    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile data={user} title={'Join New Organisation'} />
                <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-base">
                            Choose an organisation you want to be a member of
                        </p>
                    </div>
                    <div className="md:flex md:w-2/5 hidden">
                        <SearchInput 
                            appendIcon="search.svg" 
                            type="text" 
                            placeholder="Enter keyword to search"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex md:px-0 px-3 flex-grow">
                    <div className="shadow-xl py-5 px-5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                        <div className="py-5">
                            {loader ? (
                                <Loader />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredCards.map((card, index) => (
                                        <Link 
                                            to={`/app/join-organisation-form/${card.id}`} 
                                            onClick={() => setParams(card)}
                                            key={index}
                                        >
                                            <Card {...card} />
                                        </Link>
                                    ))}
                                    {filteredCards.length === 0 && (
                                        <div className="col-span-full text-center py-10">
                                            No organizations found matching your search
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}