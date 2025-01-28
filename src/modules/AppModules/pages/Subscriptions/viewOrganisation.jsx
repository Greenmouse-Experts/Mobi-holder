import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import { Button } from "@material-tailwind/react";
import RadioButtonGroup from "../../../../components/RadioButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import AvatarInitials from "../../../../components/AvatarInitials";

export default function ViewOrganisation() {
    const user = useSelector((state) => state.userData.data);
    const [orgInfo, setOrgInfo] = useState([]);
    const [subPlans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const { id } = useParams();
    const { mutate } = useApiMutation();
    const navigate = useNavigate();


    const getUserInfo = () => {
        mutate({
            url: `/api/users/${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrgInfo(response.data.data);
                getOrgSubscriptions();
            },
            onError: () => {
            }
        });
    };



    const getOrgSubscriptions = () => {
        mutate({
            url: `/api/memberships-subscriptions/organization/subscription/plans?organizationId=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setPlans(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };



    useEffect(() => {
        getUserInfo();
    }, []);




    const handleSelect = (data) => {
        setSelectedPlan(data)
    }



    const subscribePlan = () => {
        setLoader(true)
        const payload = {
            organizationId: id,
            planId: Number(selectedPlan),
            refId: 'TR-1729176774765'
        };

        mutate({
            url: "/api/memberships-subscriptions/subscribe",
            method: "POST",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                navigate(-1)
            },
            onError: (error) => {
                setIsLoading(false);
            }
        });
    }



    if (isLoading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            </>
        )
    }



    const eventDetails = [
        {
            icon: <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5556 9.16667H10.1111V10.6111H11.5556M11.5556 6.27778H10.1111V7.72222H11.5556M13 12.0556H7.22222V10.6111H8.66667V9.16667H7.22222V7.72222H8.66667V6.27778H7.22222V4.83333H13M5.77778 3.38889H4.33333V1.94444H5.77778M5.77778 6.27778H4.33333V4.83333H5.77778M5.77778 9.16667H4.33333V7.72222H5.77778M5.77778 12.0556H4.33333V10.6111H5.77778M2.88889 3.38889H1.44444V1.94444H2.88889M2.88889 6.27778H1.44444V4.83333H2.88889M2.88889 9.16667H1.44444V7.72222H2.88889M2.88889 12.0556H1.44444V10.6111H2.88889M7.22222 3.38889V0.5H0V13.5H14.4444V3.38889H7.22222Z" fill="#A3A2A2" />
            </svg>
            ,
            name: `Name : ${orgInfo.companyName}`
        },
        {
            icon: <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.892 8.17143L9.8925 8.17004C10.6126 7.28911 11.0017 6.21313 11 5.10714C10.9983 3.75313 10.4183 2.45504 9.38718 1.49761C8.35611 0.540183 6.95816 0.00159736 5.5 0M9.892 8.17143L9.88861 8.16864L9.5478 7.88825L9.50588 7.85376L9.50586 7.85379L9.50578 7.85388L9.50577 7.85389L9.50548 7.85425L9.50424 7.85575L9.4995 7.86151L9.48232 7.88237L9.45079 7.92055M9.892 8.17143L9.42135 8.00263L9.42185 8.00124L9.45079 7.92055M9.892 8.17143C9.892 8.17143 9.7415 8.35436 9.7195 8.37896M9.45079 7.92055L9.45091 7.92022L9.50539 7.85358C10.1547 7.05936 10.5015 6.09472 10.5 5.10792L10.5 5.10778C10.4985 3.8986 9.98081 2.73116 9.04696 1.86401C8.11199 0.995824 6.837 0.5016 5.5 0.5M9.45079 7.92055L9.42873 7.94727L9.37188 8.01575C9.35954 8.03054 9.35215 8.03928 9.34877 8.04328C9.34782 8.0444 9.34719 8.04516 9.34685 8.04556M5.5 0.5C5.50018 0.5 5.50037 0.5 5.50055 0.5L5.5 0M5.5 0.5C5.49982 0.5 5.49963 0.5 5.49945 0.5L5.5 0M5.5 0.5C4.163 0.501599 2.88801 0.995823 1.95304 1.86401C1.01919 2.73116 0.501542 3.8986 0.500005 5.10778L0.500005 5.10793C0.498447 6.0952 0.845464 7.06029 1.49503 7.85487M5.5 0C4.04184 0.00159736 2.64389 0.540183 1.61282 1.49761C0.58174 2.45504 0.00172609 3.75313 5.85144e-06 5.10714C-0.00174059 6.21364 0.387496 7.29011 1.108 8.17143C1.108 8.17143 1.258 8.35482 1.2825 8.38129L5.16145 12.6292L5.49999 12.2585M1.49503 7.85487L1.10856 8.17097L1.49511 7.85496M1.49503 7.85487L1.49503 7.85487L1.49505 7.85489L1.49511 7.85496M1.49503 7.85487C1.49506 7.8549 1.49508 7.85493 1.49511 7.85496M1.49511 7.85496L1.49512 7.85498L1.49542 7.85534L1.49663 7.85682L1.50132 7.86255L1.51837 7.88335L1.57172 7.9482C1.61163 7.99657 1.63994 8.03032 1.64744 8.03926C1.64878 8.04085 1.64945 8.04165 1.64941 8.04161L1.65174 8.04413L1.65173 8.04413L5.49999 12.2585M5.49999 12.2585L5.83854 12.6292L9.7195 8.37896M5.49999 12.2585L9.34685 8.04556M9.34685 8.04556C9.34648 8.046 9.34646 8.04603 9.34675 8.04571L9.7195 8.37896M9.34685 8.04556L9.35026 8.04182L9.7195 8.37896M8 5.10781V5.10714C8 4.63233 7.84817 4.17159 7.56879 3.78333C7.28979 3.3956 6.89725 3.0987 6.44486 2.9247C5.99265 2.75076 5.49692 2.70573 5.019 2.794C4.541 2.88229 4.09725 3.10098 3.74556 3.42755C3.39349 3.75448 3.14902 4.17565 3.04952 4.6401C2.94995 5.10493 3.00146 5.58629 3.19561 6.02153C3.38951 6.45621 3.71509 6.82168 4.12525 7.07617C4.53512 7.33047 5.01344 7.46429 5.5 7.46429L5.50058 7.46428C6.15176 7.46353 6.7828 7.22333 7.25371 6.78606C7.72585 6.34764 7.99914 5.74499 8 5.10781Z" stroke="#A1A1A1" />
            </svg>,
            name: `${JSON.parse(orgInfo.companyAddress).street} ${JSON.parse(orgInfo.companyAddress).state}, ${JSON.parse(orgInfo.companyAddress).country}`
        },
    ];



    const arrayOptions =
        subPlans.map((plan) => {
            return {
                name: <div className="flex flex-col gap-3">
                    <span className="text-mobiRomanSilver text-sm uppercase">{plan.name}</span>
                    <span className="font-semibold">
                        N {plan.price} / {plan.validity} Month(s)</span>

                    <span className="my-3 text-xs text-mobiRomanSilver">
                        {plan.description}
                    </span>
                </div>,
                slug: plan.id
            }
        });

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Subscribe</p>
                            <p className="text-base">Subscribe to: <span className="text-mobiBlue">{orgInfo.companyName}</span></p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-5 md:w-[30%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-6">
                            <div className="w-full flex justify-center">
                                {orgInfo.photo ?
                                    <img src={paramsData.photo} className="w-3/4 h-full rounded-full object-cover" />
                                    :
                                    <AvatarInitials name={`${orgInfo.companyName}`} size="44" />
                                }
                            </div>
                            <div className="w-full flex flex-col mt-3 gap-2">
                                <div className="w-2/5">
                                    <Badge status={`Type: ${orgInfo.natureOfOrganization}`} color="active" />
                                </div>
                                <div className="w-full my-2 text-mobiRomanSilver">
                                    <span className="text-sm">
                                        {orgInfo?.aboutCompany ?? '---'}
                                    </span>
                                </div>
                                <div className="flex w-full flex-col gap-5 mt-3">
                                    {eventDetails.map((details, index) => (
                                        <div className="w-full flex gap-3">
                                            <div className="p-2 rounded-lg bGmobiGrayDark flex items-center">
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
                        <div className="shadow-xl py-5 px-8 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            {/* <div className="w-1/2 flex gap-2 py-5">
                                <Button className="bg-mobiBlue w-auto rounded-full px-8">
                                    <span className="text-sm text-white normal-case">Monthly</span>
                                </Button>
                                <Button className="bg-[rgba(21,23,30,1)] w-auto rounded-full px-8">
                                    <span className="text-sm text-white normal-case">Annually</span>
                                </Button>
                            </div> */}

                            <div className="w-full flex flex-col gap-10">
                                <RadioButtonGroup options={arrayOptions} selectedOption={selectedPlan} select={handleSelect} className="flex flex-col gap-10" />
                            </div>

                            <div className="w-full flex my-2">
                                <Button onClick={() => subscribePlan()} disabled={selectedPlan === '' || loader} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                    Subscribe Now
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}