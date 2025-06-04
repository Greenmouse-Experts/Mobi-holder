import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountInfo from "./tabs/accountInfo";
import Security from "./tabs/security";
import Support from "./tabs/support";
import DropdownMenu from "../../../components/DropdownMenu";
import OrganisationData from "./tabs/organisationData";
import UserData from "./tabs/userData";
import BankDetails from "./tabs/bankDetails";
import { useLocation, useNavigate } from "react-router-dom";
import useModal from "../../../hooks/modal";
import useApiMutation from "../../../api/hooks/useApiMutation";
import ReusableModal from "../../../components/ReusableModal";
import { Button } from "@material-tailwind/react";

export default function OrgSettings() {
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(
        location.hash === '#bank_details'
            ? 'Bank Details'
            : location.hash === '#support'
                ? 'Support'
                : 'Organisation Data'
    );

    const { openModal, isOpen, modalOptions, closeModal } = useModal();
    const [loading, setLoading] = useState(false);

    const { mutate } = useApiMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.hash === '#bank_details') {
            setActiveTab('Bank Details');
        } else if (location.hash === '#support') {
            setActiveTab('Support');
        } else {
            setActiveTab('Organisation Data');
        }
    }, [location.hash]);



    const tabs = [
        {
            slug: 'Organisation Data',
            name: 'Organisation Data'
        },
        {
            slug: 'User Data',
            name: 'User Data'
        },
        {
            slug: 'Account Info',
            name: 'Account Info'
        },
        {
            slug: 'Security',
            name: 'Security'
        },
        {
            slug: 'Bank Details',
            name: 'Bank Details'
        },
        {
            slug: 'Support',
            name: 'Support'
        }
    ];





    const deleteAccount = () => {
        setLoading(true);
        mutate({
            url: `/api/users/delete-account`,
            method: "PUT",
            headers: true,
            onSuccess: () => {
                dispatch(setUser(null));
                navigate('/login')
                setLoading(false);
            },
            onError: (error) => {
                closeModal();
                setLoading(false);
            }
        });
    }



    const handleDeleteModal = () => {
        openModal({
            size: "md",
            content: <>
                <div className="max-w-lg mx-auto bg-white rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">We’re sad to see you go 😢</h2>
                    <p className="text-gray-600 mb-4">
                        Before you delete your account, is there anything we can do to make your experience better?
                    </p>
                    <p className="text-gray-600 mb-4">
                        This action is permanent and you’ll lose all your data and access.
                    </p>

                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            onClick={() => [navigate('#support'), closeModal()]}
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
                        >
                            Contact Support
                        </Button>
                        <Button
                            onClick={closeModal}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => deleteAccount()}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>            </>
        })
    }





    document.documentElement.style.position = null;
    const user = useSelector((state) => state.orgData.orgData);

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} title={'Settings'} />
                    <div className="w-full flex flex-col gap-8 my-2 px-3">
                        <div className="w-full flex justify-between items-center">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">Settings</p>
                            <div className="flex w-1/2 md:hidden">
                                <DropdownMenu buttonLabel={activeTab} color="#242EF2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiBlue border rounded-md border-mobiBlue">
                                    {tabs.map((tab, index) => (
                                        <div key={index} onClick={() => setActiveTab(tab.slug)} className={`flex items-center text-black py-2 cursor-pointer px-4 h-[40px] rounded-lg transition`}>
                                            <span>{tab.name}</span>
                                        </div>
                                    ))}
                                    <div onClick={() => handleDeleteModal()} className={`flex items-center text-black py-2 cursor-pointer px-4 h-[40px] rounded-lg transition`}>
                                        <span className="text-red-500">Delete Account</span>
                                    </div>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="w-full flex gap-10 items-start">
                            <div className="bg-mobiDarkCloud w-[23%] rounded-md lg:flex md:flex hidden flex-col gap-3 px-2 py-5">
                                <nav className="px-1 space-y-4">
                                    {tabs.map((tab, index) => (
                                        <div key={index} onClick={() => setActiveTab(tab.slug)} className={`flex items-center py-2 cursor-pointer px-4 h-[40px] rounded-lg ${activeTab === tab.slug ? 'bg-mobiBlueFade' : 'hover:bg-mobiBlueFade text-mobiRomanSilver'} transition`}>
                                            <span className={`${activeTab === tab.slug ? 'text-mobiPink font-[500]' : ''}`}>{tab.name}</span>
                                        </div>
                                    ))}
                                </nav>
                                <nav className="px-1 space-y-4">
                                    <div onClick={() => handleDeleteModal()} className={`flex items-center py-2 cursor-pointer px-4 h-[40px] rounded-lg transition`}>
                                        <span className="text-red-500">Delete Account</span>
                                    </div>
                                </nav>
                            </div>

                            <div className="w-full flex flex-grow">
                                <div className="shadow-xl py-7 px-5 md:w-[77%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-3">
                                    {activeTab === 'Organisation Data' && <OrganisationData />}
                                    {activeTab === 'User Data' && <UserData />}
                                    {activeTab === 'Account Info' && <AccountInfo />}
                                    {activeTab === 'Security' && <Security />}
                                    {activeTab === 'Support' && <Support />}
                                    {activeTab === 'Bank Details' && <BankDetails />}
                                </div>
                            </div>
                        </div>
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
    )
}