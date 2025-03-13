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
            id: verificationData.businessinformation.id,
            userId: verificationData.businessinformation.userId,
            action: 'reject',
            adminNote: data.adminNote
        }
        mutate({
            url: "/api/admins/updateBusinessInformationStatus",
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















export default function ViewOrgAdmin() {
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
            id: individual.businessinformation.id,
            userId: individual.businessinformation.userId,
            action: 'approve',
            adminNote: ''
        }
        mutate({
            url: "/api/admins/updateBusinessInformationStatus",
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
            icon: <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.892 8.17143L9.8925 8.17004C10.6126 7.28911 11.0017 6.21313 11 5.10714C10.9983 3.75313 10.4183 2.45504 9.38718 1.49761C8.35611 0.540183 6.95816 0.00159736 5.5 0M9.892 8.17143L9.88861 8.16864L9.5478 7.88825L9.50588 7.85376L9.50586 7.85379L9.50578 7.85388L9.50577 7.85389L9.50548 7.85425L9.50424 7.85575L9.4995 7.86151L9.48232 7.88237L9.45079 7.92055M9.892 8.17143L9.42135 8.00263L9.42185 8.00124L9.45079 7.92055M9.892 8.17143C9.892 8.17143 9.7415 8.35436 9.7195 8.37896M9.45079 7.92055L9.45091 7.92022L9.50539 7.85358C10.1547 7.05936 10.5015 6.09472 10.5 5.10792L10.5 5.10778C10.4985 3.8986 9.98081 2.73116 9.04696 1.86401C8.11199 0.995824 6.837 0.5016 5.5 0.5M9.45079 7.92055L9.42873 7.94727L9.37188 8.01575C9.35954 8.03054 9.35215 8.03928 9.34877 8.04328C9.34782 8.0444 9.34719 8.04516 9.34685 8.04556M5.5 0.5C5.50018 0.5 5.50037 0.5 5.50055 0.5L5.5 0M5.5 0.5C5.49982 0.5 5.49963 0.5 5.49945 0.5L5.5 0M5.5 0.5C4.163 0.501599 2.88801 0.995823 1.95304 1.86401C1.01919 2.73116 0.501542 3.8986 0.500005 5.10778L0.500005 5.10793C0.498447 6.0952 0.845464 7.06029 1.49503 7.85487M5.5 0C4.04184 0.00159736 2.64389 0.540183 1.61282 1.49761C0.58174 2.45504 0.00172609 3.75313 5.85144e-06 5.10714C-0.00174059 6.21364 0.387496 7.29011 1.108 8.17143C1.108 8.17143 1.258 8.35482 1.2825 8.38129L5.16145 12.6292L5.49999 12.2585M1.49503 7.85487L1.10856 8.17097L1.49511 7.85496M1.49503 7.85487L1.49503 7.85487L1.49505 7.85489L1.49511 7.85496M1.49503 7.85487C1.49506 7.8549 1.49508 7.85493 1.49511 7.85496M1.49511 7.85496L1.49512 7.85498L1.49542 7.85534L1.49663 7.85682L1.50132 7.86255L1.51837 7.88335L1.57172 7.9482C1.61163 7.99657 1.63994 8.03032 1.64744 8.03926C1.64878 8.04085 1.64945 8.04165 1.64941 8.04161L1.65174 8.04413L1.65173 8.04413L5.49999 12.2585M5.49999 12.2585L5.83854 12.6292L9.7195 8.37896M5.49999 12.2585L9.34685 8.04556M9.34685 8.04556C9.34648 8.046 9.34646 8.04603 9.34675 8.04571L9.7195 8.37896M9.34685 8.04556L9.35026 8.04182L9.7195 8.37896M8 5.10781V5.10714C8 4.63233 7.84817 4.17159 7.56879 3.78333C7.28979 3.3956 6.89725 3.0987 6.44486 2.9247C5.99265 2.75076 5.49692 2.70573 5.019 2.794C4.541 2.88229 4.09725 3.10098 3.74556 3.42755C3.39349 3.75448 3.14902 4.17565 3.04952 4.6401C2.94995 5.10493 3.00146 5.58629 3.19561 6.02153C3.38951 6.45621 3.71509 6.82168 4.12525 7.07617C4.53512 7.33047 5.01344 7.46429 5.5 7.46429L5.50058 7.46428C6.15176 7.46353 6.7828 7.22333 7.25371 6.78606C7.72585 6.34764 7.99914 5.74499 8 5.10781Z" stroke="#A1A1A1" />
            </svg>,
            name: `Address : ${JSON.parse(individual.companyAddress).street} ${JSON.parse(individual.companyAddress).state}, ${JSON.parse(individual.companyAddress).country}`
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
            name: `Date Joined : ${dateFormat(individual.createdAt, 'dd MMM yyyy')}`
        },
        {
            icon: <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 3L7.5 6.75L1.5 3V1.5L7.5 5.25L13.5 1.5M13.5 0H1.5C0.6675 0 0 0.6675 0 1.5V10.5C0 10.8978 0.158035 11.2794 0.43934 11.5607C0.720644 11.842 1.10218 12 1.5 12H13.5C13.8978 12 14.2794 11.842 14.5607 11.5607C14.842 11.2794 15 10.8978 15 10.5V1.5C15 1.10218 14.842 0.720644 14.5607 0.43934C14.2794 0.158035 13.8978 0 13.5 0Z" fill="#A1A1A1" />
            </svg>,
            name: `Email : ${individual.email}`
        },
        {
            icon: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.036 8.657L10.864 5.827C10.957 5.73416 11.0673 5.66053 11.1888 5.61034C11.3102 5.56014 11.4403 5.53435 11.5717 5.53444C11.7031 5.53454 11.8332 5.56051 11.9545 5.61088C12.0759 5.66125 12.1862 5.73502 12.279 5.828C12.3718 5.92098 12.4455 6.03133 12.4957 6.15276C12.5459 6.27419 12.5716 6.40431 12.5716 6.53571C12.5715 6.6671 12.5455 6.79719 12.4951 6.91855C12.4448 7.03991 12.371 7.15016 12.278 7.243L8.743 10.778C8.65019 10.871 8.53996 10.9449 8.41859 10.9953C8.29723 11.0457 8.16712 11.0717 8.03571 11.0718C7.90429 11.0719 7.77415 11.0461 7.65271 10.9958C7.53128 10.9456 7.42094 10.8719 7.328 10.779L5.208 8.659C5.11243 8.56682 5.03617 8.45653 4.98368 8.33456C4.93118 8.2126 4.9035 8.0814 4.90226 7.94862C4.90101 7.81584 4.92622 7.68415 4.97641 7.56122C5.02661 7.43829 5.10078 7.32658 5.19461 7.23262C5.28843 7.13867 5.40003 7.06433 5.52289 7.01397C5.64575 6.9636 5.77741 6.9382 5.91019 6.93926C6.04297 6.94032 6.17421 6.96781 6.29625 7.02013C6.41829 7.07246 6.52869 7.14856 6.621 7.244L8.036 8.657ZM8.5 16C6.37827 16 4.34344 15.1571 2.84315 13.6569C1.34285 12.1566 0.5 10.1217 0.5 8C0.5 5.87827 1.34285 3.84344 2.84315 2.34315C4.34344 0.842855 6.37827 0 8.5 0C10.6217 0 12.6566 0.842855 14.1569 2.34315C15.6571 3.84344 16.5 5.87827 16.5 8C16.5 10.1217 15.6571 12.1566 14.1569 13.6569C12.6566 15.1571 10.6217 16 8.5 16ZM8.5 14C9.28793 14 10.0681 13.8448 10.7961 13.5433C11.5241 13.2417 12.1855 12.7998 12.7426 12.2426C13.2998 11.6855 13.7417 11.0241 14.0433 10.2961C14.3448 9.56815 14.5 8.78793 14.5 8C14.5 7.21207 14.3448 6.43185 14.0433 5.7039C13.7417 4.97595 13.2998 4.31451 12.7426 3.75736C12.1855 3.20021 11.5241 2.75825 10.7961 2.45672C10.0681 2.15519 9.28793 2 8.5 2C6.9087 2 5.38258 2.63214 4.25736 3.75736C3.13214 4.88258 2.5 6.4087 2.5 8C2.5 9.5913 3.13214 11.1174 4.25736 12.2426C5.38258 13.3679 6.9087 14 8.5 14Z" fill="#A1A1A1" />
            </svg>,
            name: <span className="">Status : <span className="text-green-500 capitalize">{individual.status}</span></span>
        }
    ];



    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Organisation Overview</p>
                            <p className="text-base">Overview for: <span className="text-mobiBlue">{individual.companyName}</span></p>
                        </div>
                    </div>
                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
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
                                    <p className="text-lg font-[500]">
                                        {individual.companyName}
                                    </p>
                                </div>
                                <div className="w-full my-2 text-mobiRomanSilver">
                                    <span className="text-sm">
                                        {individual.aboutCompany}
                                    </span>
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
                        <div className="shadow-xl px-2 py-2 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-5">
                            <div className="mb-1 flex flex-col gap-5">
                                <p className="mt-6 text-mobiFormGray px-8">Verification Documents</p>

                                <div className="w-full flex flex-col gap-8 p-8">

                                    <div className="w-full flex flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Type of Card/Document Uploaded
                                            </p>
                                            <Input type="text" name="name" register={register} disabled value={individual.businessinformation?.name} placeholder="No Data Available" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Card/Document Number
                                        </p>
                                        <Input type="text" name="cardNumber" register={register} disabled value={individual.businessinformation?.registrationNumber} placeholder="No Data Available" />
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Registration Date
                                            </p>
                                            <Input name="issueDate" register={register} disabled value={individual.businessinformation?.registrationDate} placeholder="No Data Available" />
                                        </div>
                                    </div>


                                    <div className="w-full flex flex-col gap-2">
                                        <div className="flex flex-col md:w-1/2 w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Uploaded Documents
                                            </p>
                                        </div>
                                        {individual.businessinformation ?
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                <div className="relative">
                                                    <img
                                                        src={individual.businessinformation?.documentUrl}
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
                                        <Button type="submit" onClick={() => handleVerification()} disabled={!individual.businessinformation || disabled} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            Verify User
                                        </Button>
                                        <Button type="submit" onClick={() => handleDeclineVerification()} disabled={!individual.businessinformation || disabled} className="bg-red-500 md:w-1/3 w-full p-3 rounded-full">
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