import Header from "../header";
import Badge from "../../../components/Badge";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIndividualApi } from "../../../api/hooks/useIndividualsApi";
import Input from "../../../components/Input";
import { Button } from "@material-tailwind/react";
import Loader from "../../../components/Loader";
import { useForm } from "react-hook-form";
import { dateFormat } from "../../../helpers/dateHelper";
import useModal from "../../../hooks/modal";
import useApiMutation from "../../../api/hooks/useApiMutation";
import ReusableModal from "../../../components/ReusableModal";






const DeclineForm = ({ closeModal, verificationData, reload }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = useApiMutation();


    const updateStatus = (data) => {
        setIsLoading(true)
        const payload = {
            id: verificationData.verifiedIdCard.id,
            userId: verificationData.verifiedIdCard.userId,
            action: 'reject',
            adminNote: data.adminNote
        }
        mutate({
            url: "/api/admins/updateIdCardStatus",
            method: "POST",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                setIsLoading(false);
                closeModal();
                reload();
            },
            onError: () => {
                setIsLoading(false);
                closeModal();
            }
        });
    };



    return (
        <>
            <div className="w-full flex max-h-[95vh] overflow-auto flex-col px-3 py-6 gap-3 -mt-3">
                <form onSubmit={handleSubmit(updateStatus)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Reason for Decline
                            </p>
                            <Input type="text" name="adminNote" register={register}
                                placeholder="Reason for Decline" rules={{ required: 'Reason for decline is required' }} errors={errors} />
                        </div>
                        <div className="w-full flex md:flex-row flex-col justify-center gap-5 mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className="bg-red-500 md:w-1/3 w-full p-3 rounded-full"
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                </form>

            </div></>
    )
}















export default function ViewUserAdmin() {
    // const [params, setParams] = useSearchParams();
    // const location = useLocation();
    // const [activeStat, setActiveStat] = useState('idCards');
    const { register } = useForm();

    const [individual, setIndividual] = useState({});
    const [loadingIndividuals, setLoadingIndividuals] = useState(true);
    const [disabled, setIsDisabled] = useState(false);
    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const { id } = useParams();

    const { mutate } = useApiMutation();

    const { getSingleIndividualAdmin } = useIndividualApi();


    /*  useEffect(() => {
          params.set('activeTab', 'idCards');
          setParams(params);
      }, []);
  
      useEffect(() => {
          setActiveStat(location.search.split('?activeTab=')[1]);
      }, [location.search]); */


    const getUserData = async (params) => {
        setLoadingIndividuals(true); // Start loading
        try {
            const data = await getSingleIndividualAdmin(`?id=${params}`);
            setIndividual(data);
            setLoadingIndividuals(false)
        } catch (error) {
            console.error("Error fetching individuals:", error);
        } finally {
            setLoadingIndividuals(false); // Stop loading
        }
    };


    useEffect(() => {
        getUserData(id);
    }, []);



    const handleReload = () => {
        getUserData(id);
    }



    const handleDeclineVerification = () => {
        openModal({
            size: "sm",
            content: <DeclineForm closeModal={closeModal} verificationData={individual} reload={handleReload} />
        })
    }



    const handleVerification = () => {
        setIsDisabled(true)
        const payload = {
            id: individual.verifiedIdCard.id,
            userId: individual.verifiedIdCard.userId,
            action: 'approve',
            adminNote: ''
        }
        mutate({
            url: "/api/admins/updateIdCardStatus",
            method: "POST",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                setIsDisabled(false);
                getUserData(id);
            },
            onError: () => {
                setIsDisabled(false);
            }
        });
    }









    if (loadingIndividuals) {

        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={30} />
            </div>
        )

    }








    const eventDetails = [
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3 7.15V8.45H11.7V7.15H1.3ZM3.9 13V9.75H0V0H13V9.75H9.1V13L6.5 11.7L3.9 13ZM1.3 5.2H11.7V1.3H1.3V5.2Z" fill="#A1A1A1" />
            </svg>,
            name: `MobiHolder ID : ${individual.mobiHolderId}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.61111 2.88889C3.61111 2.12271 3.91548 1.38791 4.45725 0.846136C4.99902 0.304364 5.73382 0 6.5 0C7.26618 0 8.00098 0.304364 8.54275 0.846136C9.08453 1.38791 9.38889 2.12271 9.38889 2.88889C9.38889 3.65507 9.08453 4.38987 8.54275 4.93164C8.00098 5.47341 7.26618 5.77778 6.5 5.77778C5.73382 5.77778 4.99902 5.47341 4.45725 4.93164C3.91548 4.38987 3.61111 3.65507 3.61111 2.88889ZM3.61111 7.22222C2.65338 7.22222 1.73488 7.60268 1.05767 8.27989C0.380455 8.95711 0 9.87561 0 10.8333C0 11.408 0.228273 11.9591 0.634602 12.3654C1.04093 12.7717 1.59203 13 2.16667 13H10.8333C11.408 13 11.9591 12.7717 12.3654 12.3654C12.7717 11.9591 13 11.408 13 10.8333C13 9.87561 12.6195 8.95711 11.9423 8.27989C11.2651 7.60268 10.3466 7.22222 9.38889 7.22222H3.61111Z" fill="#A1A1A1" />
            </svg>,
            name: `Username : ${individual.username}`
        },
        {
            icon: <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.71875C0 1.26291 0.206951 0.825738 0.575326 0.50341C0.943701 0.181082 1.44332 0 1.96429 0H8.03572C8.55668 0 9.0563 0.181082 9.42467 0.50341C9.79305 0.825738 10 1.26291 10 1.71875V13.2812C10 13.7371 9.79305 14.1743 9.42467 14.4966C9.0563 14.8189 8.55668 15 8.03572 15H1.96429C1.44332 15 0.943701 14.8189 0.575326 14.4966C0.206951 14.1743 0 13.7371 0 13.2812V1.71875ZM3.75 11.875C3.60792 11.875 3.47166 11.9244 3.37119 12.0123C3.27073 12.1002 3.21429 12.2194 3.21429 12.3438C3.21429 12.4681 3.27073 12.5873 3.37119 12.6752C3.47166 12.7631 3.60792 12.8125 3.75 12.8125H6.25C6.39208 12.8125 6.52834 12.7631 6.62881 12.6752C6.72927 12.5873 6.78571 12.4681 6.78571 12.3438C6.78571 12.2194 6.72927 12.1002 6.62881 12.0123C6.52834 11.9244 6.39208 11.875 6.25 11.875H3.75Z" fill="#A1A1A1" />
            </svg>,
            name: `Phone Number : ${individual.phoneNumber}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.61111 7.8C3.40648 7.8 3.23483 7.7376 3.09617 7.6128C2.95798 7.48843 2.88889 7.33417 2.88889 7.15C2.88889 6.96583 2.95798 6.81135 3.09617 6.68655C3.23483 6.56218 3.40648 6.5 3.61111 6.5C3.81574 6.5 3.98739 6.56218 4.12606 6.68655C4.26424 6.81135 4.33333 6.96583 4.33333 7.15C4.33333 7.33417 4.26424 7.48843 4.12606 7.6128C3.98739 7.7376 3.81574 7.8 3.61111 7.8ZM6.5 7.8C6.29537 7.8 6.12396 7.7376 5.98578 7.6128C5.84711 7.48843 5.77778 7.33417 5.77778 7.15C5.77778 6.96583 5.84711 6.81135 5.98578 6.68655C6.12396 6.56218 6.29537 6.5 6.5 6.5C6.70463 6.5 6.87628 6.56218 7.01494 6.68655C7.15313 6.81135 7.22222 6.96583 7.22222 7.15C7.22222 7.33417 7.15313 7.48843 7.01494 7.6128C6.87628 7.7376 6.70463 7.8 6.5 7.8ZM9.38889 7.8C9.18426 7.8 9.01285 7.7376 8.87467 7.6128C8.736 7.48843 8.66667 7.33417 8.66667 7.15C8.66667 6.96583 8.736 6.81135 8.87467 6.68655C9.01285 6.56218 9.18426 6.5 9.38889 6.5C9.59352 6.5 9.76493 6.56218 9.90311 6.68655C10.0418 6.81135 10.1111 6.96583 10.1111 7.15C10.1111 7.33417 10.0418 7.48843 9.90311 7.6128C9.76493 7.7376 9.59352 7.8 9.38889 7.8ZM1.44444 13C1.04722 13 0.707055 12.8728 0.423944 12.6184C0.141315 12.3636 0 12.0575 0 11.7V2.6C0 2.2425 0.141315 1.93657 0.423944 1.6822C0.707055 1.4274 1.04722 1.3 1.44444 1.3H2.16667V0H3.61111V1.3H9.38889V0H10.8333V1.3H11.5556C11.9528 1.3 12.2929 1.4274 12.5761 1.6822C12.8587 1.93657 13 2.2425 13 2.6V11.7C13 12.0575 12.8587 12.3636 12.5761 12.6184C12.2929 12.8728 11.9528 13 11.5556 13H1.44444ZM1.44444 11.7H11.5556V5.2H1.44444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: `D.O.B : ${individual?.dateOfBirth?.split("-").reverse().join("-") || '---'}`
        },
        {
            icon: <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 3L7.5 6.75L1.5 3V1.5L7.5 5.25L13.5 1.5M13.5 0H1.5C0.6675 0 0 0.6675 0 1.5V10.5C0 10.8978 0.158035 11.2794 0.43934 11.5607C0.720644 11.842 1.10218 12 1.5 12H13.5C13.8978 12 14.2794 11.842 14.5607 11.5607C14.842 11.2794 15 10.8978 15 10.5V1.5C15 1.10218 14.842 0.720644 14.5607 0.43934C14.2794 0.158035 13.8978 0 13.5 0Z" fill="#A1A1A1" />
            </svg>,
            name: `Email : ${individual.email}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.61111 7.8C3.40648 7.8 3.23483 7.7376 3.09617 7.6128C2.95798 7.48843 2.88889 7.33417 2.88889 7.15C2.88889 6.96583 2.95798 6.81135 3.09617 6.68655C3.23483 6.56218 3.40648 6.5 3.61111 6.5C3.81574 6.5 3.98739 6.56218 4.12606 6.68655C4.26424 6.81135 4.33333 6.96583 4.33333 7.15C4.33333 7.33417 4.26424 7.48843 4.12606 7.6128C3.98739 7.7376 3.81574 7.8 3.61111 7.8ZM6.5 7.8C6.29537 7.8 6.12396 7.7376 5.98578 7.6128C5.84711 7.48843 5.77778 7.33417 5.77778 7.15C5.77778 6.96583 5.84711 6.81135 5.98578 6.68655C6.12396 6.56218 6.29537 6.5 6.5 6.5C6.70463 6.5 6.87628 6.56218 7.01494 6.68655C7.15313 6.81135 7.22222 6.96583 7.22222 7.15C7.22222 7.33417 7.15313 7.48843 7.01494 7.6128C6.87628 7.7376 6.70463 7.8 6.5 7.8ZM9.38889 7.8C9.18426 7.8 9.01285 7.7376 8.87467 7.6128C8.736 7.48843 8.66667 7.33417 8.66667 7.15C8.66667 6.96583 8.736 6.81135 8.87467 6.68655C9.01285 6.56218 9.18426 6.5 9.38889 6.5C9.59352 6.5 9.76493 6.56218 9.90311 6.68655C10.0418 6.81135 10.1111 6.96583 10.1111 7.15C10.1111 7.33417 10.0418 7.48843 9.90311 7.6128C9.76493 7.7376 9.59352 7.8 9.38889 7.8ZM1.44444 13C1.04722 13 0.707055 12.8728 0.423944 12.6184C0.141315 12.3636 0 12.0575 0 11.7V2.6C0 2.2425 0.141315 1.93657 0.423944 1.6822C0.707055 1.4274 1.04722 1.3 1.44444 1.3H2.16667V0H3.61111V1.3H9.38889V0H10.8333V1.3H11.5556C11.9528 1.3 12.2929 1.4274 12.5761 1.6822C12.8587 1.93657 13 2.2425 13 2.6V11.7C13 12.0575 12.8587 12.3636 12.5761 12.6184C12.2929 12.8728 11.9528 13 11.5556 13H1.44444ZM1.44444 11.7H11.5556V5.2H1.44444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: `Date Joined : ${dateFormat(individual.createdAt, 'dd MMM yyyy')}`
        },
        {
            icon: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.036 8.657L10.864 5.827C10.957 5.73416 11.0673 5.66053 11.1888 5.61034C11.3102 5.56014 11.4403 5.53435 11.5717 5.53444C11.7031 5.53454 11.8332 5.56051 11.9545 5.61088C12.0759 5.66125 12.1862 5.73502 12.279 5.828C12.3718 5.92098 12.4455 6.03133 12.4957 6.15276C12.5459 6.27419 12.5716 6.40431 12.5716 6.53571C12.5715 6.6671 12.5455 6.79719 12.4951 6.91855C12.4448 7.03991 12.371 7.15016 12.278 7.243L8.743 10.778C8.65019 10.871 8.53996 10.9449 8.41859 10.9953C8.29723 11.0457 8.16712 11.0717 8.03571 11.0718C7.90429 11.0719 7.77415 11.0461 7.65271 10.9958C7.53128 10.9456 7.42094 10.8719 7.328 10.779L5.208 8.659C5.11243 8.56682 5.03617 8.45653 4.98368 8.33456C4.93118 8.2126 4.9035 8.0814 4.90226 7.94862C4.90101 7.81584 4.92622 7.68415 4.97641 7.56122C5.02661 7.43829 5.10078 7.32658 5.19461 7.23262C5.28843 7.13867 5.40003 7.06433 5.52289 7.01397C5.64575 6.9636 5.77741 6.9382 5.91019 6.93926C6.04297 6.94032 6.17421 6.96781 6.29625 7.02013C6.41829 7.07246 6.52869 7.14856 6.621 7.244L8.036 8.657ZM8.5 16C6.37827 16 4.34344 15.1571 2.84315 13.6569C1.34285 12.1566 0.5 10.1217 0.5 8C0.5 5.87827 1.34285 3.84344 2.84315 2.34315C4.34344 0.842855 6.37827 0 8.5 0C10.6217 0 12.6566 0.842855 14.1569 2.34315C15.6571 3.84344 16.5 5.87827 16.5 8C16.5 10.1217 15.6571 12.1566 14.1569 13.6569C12.6566 15.1571 10.6217 16 8.5 16ZM8.5 14C9.28793 14 10.0681 13.8448 10.7961 13.5433C11.5241 13.2417 12.1855 12.7998 12.7426 12.2426C13.2998 11.6855 13.7417 11.0241 14.0433 10.2961C14.3448 9.56815 14.5 8.78793 14.5 8C14.5 7.21207 14.3448 6.43185 14.0433 5.7039C13.7417 4.97595 13.2998 4.31451 12.7426 3.75736C12.1855 3.20021 11.5241 2.75825 10.7961 2.45672C10.0681 2.15519 9.28793 2 8.5 2C6.9087 2 5.38258 2.63214 4.25736 3.75736C3.13214 4.88258 2.5 6.4087 2.5 8C2.5 9.5913 3.13214 11.1174 4.25736 12.2426C5.38258 13.3679 6.9087 14 8.5 14Z" fill="#A1A1A1" />
            </svg>,
            name: <span className="">Status : <span className="text-green-500 capitalize">{individual.status}</span></span>
        }
    ];


    {/* const statsData = [
        {
            cronTop: true,
            cronTopIcon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57282 0.600003C8.79268 0.222526 9.33801 0.222525 9.55787 0.600002L11.8871 4.59912C11.9677 4.73739 12.1026 4.83544 12.259 4.86931L16.7822 5.84879C17.2091 5.94124 17.3777 6.45988 17.0866 6.78562L14.003 10.2367C13.8964 10.356 13.8448 10.5147 13.861 10.6739L14.3272 15.2783C14.3712 15.713 13.93 16.0335 13.5302 15.8573L9.29519 13.9911C9.14876 13.9266 8.98194 13.9266 8.83551 13.9911L4.60047 15.8573C4.20072 16.0335 3.75954 15.713 3.80354 15.2783L4.26974 10.6739C4.28586 10.5147 4.23431 10.356 4.12769 10.2367L1.0441 6.78562C0.753034 6.45988 0.921549 5.94124 1.34849 5.84879L5.87166 4.86931C6.02806 4.83544 6.16301 4.73739 6.24355 4.59912L8.57282 0.600003Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: 329,
            label: "Created Events",
            iconColor: "bg-mobiLightGreen",
            icon: <svg width="22" height="25" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6667 3.3H25V0H21.6667V3.3H8.33333V0H5V3.3H3.33333C1.5 3.3 0 4.785 0 6.6V29.7C0 31.515 1.5 33 3.33333 33H26.6667C28.5 33 30 31.515 30 29.7V6.6C30 4.785 28.5 3.3 26.6667 3.3ZM26.6667 29.7H3.33333V13.2H26.6667V29.7ZM3.33333 9.9V6.6H26.6667V9.9H3.33333ZM6.66667 16.5H23.3333V19.8H6.66667V16.5ZM6.66667 23.1H18.3333V26.4H6.66667V23.1Z" fill="#6BEFD7" />
            </svg>,
        },
        {
            cronTop: true,
            cronTopIcon: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.119537 14.7127C0.119537 12.2108 2.14771 10.1826 4.64958 10.1826H9.72116C12.223 10.1826 14.2512 12.2108 14.2512 14.7127V14.7127C14.2512 15.5466 13.5751 16.2227 12.7412 16.2227H1.62955C0.795595 16.2227 0.119537 15.5466 0.119537 14.7127V14.7127Z" fill="#AEB9E1" />
                <path d="M7.18805 9.03192C9.41194 9.03192 11.2148 7.22911 11.2148 5.00522C11.2148 2.78133 9.41194 0.978516 7.18805 0.978516C4.96416 0.978516 3.16135 2.78133 3.16135 5.00522C3.16135 7.22911 4.96416 9.03192 7.18805 9.03192Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: 10,
            label: "ID Cards",
            link: "?activeTab=idCards",
            iconColor: "bg-mobiOrange",
            icon: <svg width="20" height="27" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14C17.866 14 21 10.866 21 7C21 3.13401 17.866 0 14 0C10.134 0 7 3.13401 7 7C7 10.866 10.134 14 14 14Z" fill="#EF956B" />
                <path d="M28 27.125C28 31.4737 28 35 14 35C0 35 0 31.4737 0 27.125C0 22.7762 6.2685 19.25 14 19.25C21.7315 19.25 28 22.7762 28 27.125Z" fill="#EF956B" />
            </svg>,
        },
        {
            cronTop: true,
            cronTopIcon: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.119537 14.7127C0.119537 12.2108 2.14771 10.1826 4.64958 10.1826H9.72116C12.223 10.1826 14.2512 12.2108 14.2512 14.7127V14.7127C14.2512 15.5466 13.5751 16.2227 12.7412 16.2227H1.62955C0.795595 16.2227 0.119537 15.5466 0.119537 14.7127V14.7127Z" fill="#AEB9E1" />
                <path d="M7.18805 9.03192C9.41194 9.03192 11.2148 7.22911 11.2148 5.00522C11.2148 2.78133 9.41194 0.978516 7.18805 0.978516C4.96416 0.978516 3.16135 2.78133 3.16135 5.00522C3.16135 7.22911 4.96416 9.03192 7.18805 9.03192Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: 37,
            label: "Total Subscriptions",
            link: "?activeTab=subscriptions",
            iconColor: "bg-mobiSubPurple",
            icon: <svg width="22" height="26" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 17.75V9.2C26 6.67976 26 5.41965 25.5095 4.45704C25.0781 3.61031 24.3897 2.9219 23.543 2.49047C22.5804 2 21.3202 2 18.8 2H9.2C6.67976 2 5.41965 2 4.45704 2.49047C3.61031 2.9219 2.9219 3.61031 2.49047 4.45704C2 5.41965 2 6.67976 2 9.2V24.8C2 27.3202 2 28.5804 2.49047 29.543C2.9219 30.3897 3.61031 31.0781 4.45704 31.5095C5.41965 32 6.67976 32 9.2 32H14M17 15.5H8M11 21.5H8M20 9.5H8M17.75 27.5L20.75 30.5L27.5 23.75" stroke="#EF6BE4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
        },
        {
            cronTop: true,
            cronTopIcon: <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5197 9.11149C16.5197 13.6218 12.8634 17.2782 8.35307 17.2782C3.84274 17.2782 0.186401 13.6218 0.186401 9.11149C0.186401 4.60117 3.84274 0.944824 8.35307 0.944824C12.8634 0.944824 16.5197 4.60117 16.5197 9.11149ZM8.3549 4.44481C8.79463 4.44481 9.15111 4.80129 9.15111 5.24102V8.31614H12.2218C12.6616 8.31614 13.018 8.67261 13.018 9.11234C13.018 9.55208 12.6616 9.90855 12.2218 9.90855H9.15111V12.9819C9.15111 13.4217 8.79463 13.7781 8.3549 13.7781C7.91516 13.7781 7.55869 13.4217 7.55869 12.9819V9.90855H4.48092C4.04118 9.90855 3.68471 9.55208 3.68471 9.11234C3.68471 8.67261 4.04118 8.31614 4.48092 8.31614H7.55869V5.24102C7.55869 4.80129 7.91516 4.44481 8.3549 4.44481Z" fill="#AEB9E1" />
            </svg>,
            cronAnalytics: null,
            value: 139,
            label: "Joined Organisations",
            link: "?activeTab=joinedOrganisations",
            iconColor: "bg-mobiSkyCloud",
            icon: <svg width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0441 12.1579C22.638 12.1579 23.9316 13.5196 23.9316 15.1974V20.8421H23.925V21.2763C23.925 21.6218 23.7946 21.9531 23.5625 22.1974C23.3305 22.4417 23.0157 22.5789 22.6875 22.5789C22.3593 22.5789 22.0445 22.4417 21.8125 22.1974C21.5804 21.9531 21.45 21.6218 21.45 21.2763V17.3684H21.4566V15.1974C21.4566 15.0822 21.4131 14.9718 21.3358 14.8903C21.2584 14.8089 21.1535 14.7632 21.0441 14.7632H11.9658C11.8564 14.7632 11.7515 14.8089 11.6741 14.8903C11.5968 14.9718 11.5533 15.0822 11.5533 15.1974V20.8421H11.55V21.2763C11.55 21.6218 11.4196 21.9531 11.1875 22.1974C10.9555 22.4417 10.6407 22.5789 10.3125 22.5789C9.98429 22.5789 9.66953 22.4417 9.43746 22.1974C9.20538 21.9531 9.075 21.6218 9.075 21.2763V17.3684H9.0783V15.1974C9.0783 13.5196 10.3702 12.1579 11.9658 12.1579H21.0441ZM30.525 15.1974V21.2763C30.525 21.6218 30.6554 21.9531 30.8875 22.1974C31.1195 22.4417 31.4343 22.5789 31.7625 22.5789C32.0907 22.5789 32.4055 22.4417 32.6375 22.1974C32.8696 21.9531 33 21.6218 33 21.2763V15.1974C33 14.3912 32.6958 13.6181 32.1543 13.0481C31.6128 12.4781 30.8783 12.1579 30.1125 12.1579H24.5437C25.1097 12.8787 25.4793 13.7766 25.5634 14.7632H30.1125C30.2219 14.7632 30.3268 14.8089 30.4042 14.8903C30.4815 14.9718 30.525 15.0822 30.525 15.1974ZM0 21.2763C6.91641e-09 21.6218 0.130379 21.9531 0.362455 22.1974C0.594531 22.4417 0.909295 22.5789 1.2375 22.5789C1.56571 22.5789 1.88047 22.4417 2.11254 22.1974C2.34462 21.9531 2.475 21.6218 2.475 21.2763V15.1974C2.475 15.0822 2.51846 14.9718 2.59582 14.8903C2.67318 14.8089 2.7781 14.7632 2.8875 14.7632H7.44645C7.52852 13.8062 7.88403 12.8979 8.46615 12.1579H2.8875C2.12169 12.1579 1.38724 12.4781 0.845729 13.0481C0.304218 13.6181 0 14.3912 0 15.1974V21.2763ZM16.5 0C17.8128 0 19.0719 0.548965 20.0002 1.52613C20.9285 2.50329 21.45 3.82861 21.45 5.21053C21.45 6.59244 20.9285 7.91776 20.0002 8.89493C19.0719 9.87209 17.8128 10.4211 16.5 10.4211C15.1872 10.4211 13.9281 9.87209 12.9998 8.89493C12.0715 7.91776 11.55 6.59244 11.55 5.21053C11.55 3.82861 12.0715 2.50329 12.9998 1.52613C13.9281 0.548965 15.1872 0 16.5 0ZM16.5 2.60526C15.8436 2.60526 15.2141 2.87975 14.7499 3.36833C14.2858 3.85691 14.025 4.51957 14.025 5.21053C14.025 5.90148 14.2858 6.56414 14.7499 7.05273C15.2141 7.54131 15.8436 7.81579 16.5 7.81579C17.1564 7.81579 17.7859 7.54131 18.2501 7.05273C18.7142 6.56414 18.975 5.90148 18.975 5.21053C18.975 4.51957 18.7142 3.85691 18.2501 3.36833C17.7859 2.87975 17.1564 2.60526 16.5 2.60526ZM27.225 1.73684C28.319 1.73684 29.3682 2.19431 30.1418 3.00862C30.9154 3.82292 31.35 4.92735 31.35 6.07895C31.35 7.23055 30.9154 8.33498 30.1418 9.14928C29.3682 9.96358 28.319 10.4211 27.225 10.4211C26.131 10.4211 25.0818 9.96358 24.3082 9.14928C23.5346 8.33498 23.1 7.23055 23.1 6.07895C23.1 4.92735 23.5346 3.82292 24.3082 3.00862C25.0818 2.19431 26.131 1.73684 27.225 1.73684ZM27.225 4.3421C26.7874 4.3421 26.3677 4.52509 26.0583 4.85081C25.7488 5.17654 25.575 5.61831 25.575 6.07895C25.575 6.53959 25.7488 6.98136 26.0583 7.30708C26.3677 7.6328 26.7874 7.81579 27.225 7.81579C27.6626 7.81579 28.0823 7.6328 28.3917 7.30708C28.7012 6.98136 28.875 6.53959 28.875 6.07895C28.875 5.61831 28.7012 5.17654 28.3917 4.85081C28.0823 4.52509 27.6626 4.3421 27.225 4.3421ZM5.775 1.73684C6.86902 1.73684 7.91823 2.19431 8.69182 3.00862C9.4654 3.82292 9.9 4.92735 9.9 6.07895C9.9 7.23055 9.4654 8.33498 8.69182 9.14928C7.91823 9.96358 6.86902 10.4211 5.775 10.4211C4.68098 10.4211 3.63177 9.96358 2.85818 9.14928C2.0846 8.33498 1.65 7.23055 1.65 6.07895C1.65 4.92735 2.0846 3.82292 2.85818 3.00862C3.63177 2.19431 4.68098 1.73684 5.775 1.73684ZM5.775 4.3421C5.33739 4.3421 4.91771 4.52509 4.60827 4.85081C4.29884 5.17654 4.125 5.61831 4.125 6.07895C4.125 6.53959 4.29884 6.98136 4.60827 7.30708C4.91771 7.6328 5.33739 7.81579 5.775 7.81579C6.21261 7.81579 6.63229 7.6328 6.94173 7.30708C7.25116 6.98136 7.425 6.53959 7.425 6.07895C7.425 5.61831 7.25116 5.17654 6.94173 4.85081C6.63229 4.52509 6.21261 4.3421 5.775 4.3421ZM1.2375 24.3158C0.909295 24.3158 0.594531 24.453 0.362455 24.6973C0.130379 24.9416 0 25.2729 0 25.6184V26.4868C0 28.2142 0.651895 29.8709 1.81228 31.0923C2.97266 32.3138 4.54647 33 6.1875 33H26.8125C28.4535 33 30.0273 32.3138 31.1877 31.0923C32.3481 29.8709 33 28.2142 33 26.4868V25.6184C33 25.2729 32.8696 24.9416 32.6375 24.6973C32.4055 24.453 32.0907 24.3158 31.7625 24.3158H1.2375ZM6.1875 30.3947C5.27433 30.3947 4.3932 30.0404 3.71257 29.3996C3.03194 28.7587 2.59956 27.8763 2.4981 26.9211H30.5019C30.4004 27.8763 29.9681 28.7587 29.2874 29.3996C28.6068 30.0404 27.7257 30.3947 26.8125 30.3947H6.1875Z" fill="#6B9BEF" />
            </svg>,
        },
    ]; */}






    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">User Overview</p>
                            <p className="text-base">Overview for: <span className="text-mobiBlue">{individual.firstName} {individual.lastName}</span></p>
                        </div>
                    </div>
                    {/* <div className="w-full flex lg:flex-row md:flex-row flex-col h-full gap-5 md:px-0 px-3">
                        <DashboardStats cronTop={true} activeStat={location.search} statsData={statsData} />
                    </div> */}
                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 my-2 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-5 md:w-[30%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-6">
                            <div className="w-full flex justify-center">
                                <div className="w-1/3">
                                    <Badge status={`${individual.isVerified ? 'Verified' : 'Not Verified'}`} color={`${individual.isVerified ? 'active' : 'inactive'}`} />
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                {individual.photo ?
                                    <img src={`${individual.photo}`} className="w-36 rounded-full object-cover h-36" />
                                    :
                                    <div className="w-36 rounded-full bg-gray-500 object-cover h-36" />
                                }
                            </div>
                            <div className="w-full flex flex-col mt-3 gap-2">
                                <div className="w-full flex justify-center">
                                    <p className="text-lg font-[500]">{individual.firstName} {individual.lastName}</p>
                                </div>
                                <div className="flex w-full flex-col gap-5 mt-3">
                                    {eventDetails.map((details, index) => (
                                        <div className="w-full flex gap-3" key={`vi-o${index}`}>
                                            <div className="p-2 rounded-lg max-h-[30px] mt-[1px] bGmobiGrayDark flex items-center">
                                                <span className="bs-mobiCeramaic">
                                                    {details.icon}
                                                </span>
                                            </div>
                                            <span className="bs-mobiCeramic flex flex-col items-center mt-1">{details.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="shadow-xl px-2 py-2 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-5">
                            {activeStat === 'idCards' &&
                                <IDCards />
                            }
                            {
                                activeStat === 'subscriptions' &&
                                <Subscriptions />
                            }
                            {
                                activeStat === 'joinedOrganisations' &&
                                <OrganisationsJoined />
                            }
                        </div> */}

                        <div className="shadow-xl px-2 py-2 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-5">
                            <div className="mb-1 flex flex-col gap-5">
                                <p className="mt-6 text-mobiFormGray px-8">Verification Documents</p>

                                <div className="w-full flex flex-col gap-8 p-8">

                                    <div className="w-full flex flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Type of Card/Document Uploaded
                                            </p>
                                            <Input type="text" name="name" register={register} disabled value={individual.verifiedIdCard?.name} placeholder="No Data Available" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card/Document Number
                                        </p>
                                        <Input type="text" name="cardNumber" register={register} disabled value={individual.verifiedIdCard?.cardNumber} placeholder="No Data Available" />
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Issue Date
                                            </p>
                                            <Input name="issueDate" type={'datetime'} register={register} disabled value={individual.verifiedIdCard?.issueDate} placeholder="No Data Available" />
                                        </div>

                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Expiry Date
                                            </p>
                                            <Input name="expiryDate" type={'datetime'} register={register} disabled value={individual.verifiedIdCard?.expiryDate} placeholder="No Data Available" />
                                        </div>
                                    </div>


                                    <div className="w-full flex flex-col gap-2">
                                        <div className="flex flex-col md:w-1/2 w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Uploaded Documents
                                            </p>
                                        </div>
                                        {individual.verifiedIdCard ?
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                <div className="relative">
                                                    <img
                                                        src={individual.verifiedIdCard?.governmentIdCardFront}
                                                        alt="Empty ID Card"
                                                        className="w-full h-30 object-cover rounded"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <img
                                                        src={individual.verifiedIdCard?.governmentIdCardBack}
                                                        alt="Empty ID Card"
                                                        className="w-full h-30 object-cover rounded"
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>

                                {!individual.isVerified ?
                                    <div className="flex px-8 gap-5">
                                        <Button type="submit" onClick={() => handleVerification()} disabled={!individual.verifiedIdCard || disabled} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            Verify User
                                        </Button>
                                        <Button type="submit" onClick={() => handleDeclineVerification()} disabled={!individual.verifiedIdCard || disabled} className="bg-red-500 md:w-1/3 w-full p-3 rounded-full">
                                            Decline Verification
                                        </Button>
                                    </div>
                                    :
                                    <></>
                                }

                            </div>
                        </div>

                    </div>

                </div>

            </div >


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