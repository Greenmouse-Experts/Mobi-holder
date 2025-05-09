import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import Badge from "../../../../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import Table from "../../../../components/Tables";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { dateFormat, formatDateTime } from "../../../../helpers/dateHelper";

export default function OrgViewInvites() {
    const user = useSelector((state) => state.orgData.orgData);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [eventDetails, setEventDetails] = useState({});
    const [eventInvites, setEventInvites] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const { mutate } = useApiMutation();



    useEffect(() => {
        getEventDetails();
    }, []);



    const getEventDetails = () => {
        mutate({
            url: `/api/events/view/event?id=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEventDetails(response.data.data);
                getEventInvitees(response.data.data.id);
            },
            onError: () => {
            }
        });
    };




    const getEventInvitees = (eventId) => {
        mutate({
            url: `/api/events/event/invitees`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const invites = response.data.data.filter((data) => data.eventtickets.eventId === eventId);
                setEventInvites(invites)
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }





    const inviteUser = (data) => {
        setDisabled(true);
        const payload = {
            eventId: id,
            userId: data.userId,
            ticketId: data.ticketId,
            isFree: eventDetails.ticketType === 'Free'
        };
        mutate({
            url: `/api/events/send/invitation`,
            method: "POST",
            headers: true,
            data: payload,
            onSuccess: () => {
                getEventDetails();
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        });
    };




    const RequetsHeaders = ["Individual", "Email", "Invited On", "Status", "Action"];







    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }






    const eventDetailsBlock = [
        {
            icon: <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.892 8.17143L9.8925 8.17004C10.6126 7.28911 11.0017 6.21313 11 5.10714C10.9983 3.75313 10.4183 2.45504 9.38718 1.49761C8.35611 0.540183 6.95816 0.00159736 5.5 0M9.892 8.17143L9.88861 8.16864L9.5478 7.88825L9.50588 7.85376L9.50586 7.85379L9.50578 7.85388L9.50577 7.85389L9.50548 7.85425L9.50424 7.85575L9.4995 7.86151L9.48232 7.88237L9.45079 7.92055M9.892 8.17143L9.42135 8.00263L9.42185 8.00124L9.45079 7.92055M9.892 8.17143C9.892 8.17143 9.7415 8.35436 9.7195 8.37896M9.45079 7.92055L9.45091 7.92022L9.50539 7.85358C10.1547 7.05936 10.5015 6.09472 10.5 5.10792L10.5 5.10778C10.4985 3.8986 9.98081 2.73116 9.04696 1.86401C8.11199 0.995824 6.837 0.5016 5.5 0.5M9.45079 7.92055L9.42873 7.94727L9.37188 8.01575C9.35954 8.03054 9.35215 8.03928 9.34877 8.04328C9.34782 8.0444 9.34719 8.04516 9.34685 8.04556M5.5 0.5C5.50018 0.5 5.50037 0.5 5.50055 0.5L5.5 0M5.5 0.5C5.49982 0.5 5.49963 0.5 5.49945 0.5L5.5 0M5.5 0.5C4.163 0.501599 2.88801 0.995823 1.95304 1.86401C1.01919 2.73116 0.501542 3.8986 0.500005 5.10778L0.500005 5.10793C0.498447 6.0952 0.845464 7.06029 1.49503 7.85487M5.5 0C4.04184 0.00159736 2.64389 0.540183 1.61282 1.49761C0.58174 2.45504 0.00172609 3.75313 5.85144e-06 5.10714C-0.00174059 6.21364 0.387496 7.29011 1.108 8.17143C1.108 8.17143 1.258 8.35482 1.2825 8.38129L5.16145 12.6292L5.49999 12.2585M1.49503 7.85487L1.10856 8.17097L1.49511 7.85496M1.49503 7.85487L1.49503 7.85487L1.49505 7.85489L1.49511 7.85496M1.49503 7.85487C1.49506 7.8549 1.49508 7.85493 1.49511 7.85496M1.49511 7.85496L1.49512 7.85498L1.49542 7.85534L1.49663 7.85682L1.50132 7.86255L1.51837 7.88335L1.57172 7.9482C1.61163 7.99657 1.63994 8.03032 1.64744 8.03926C1.64878 8.04085 1.64945 8.04165 1.64941 8.04161L1.65174 8.04413L1.65173 8.04413L5.49999 12.2585M5.49999 12.2585L5.83854 12.6292L9.7195 8.37896M5.49999 12.2585L9.34685 8.04556M9.34685 8.04556C9.34648 8.046 9.34646 8.04603 9.34675 8.04571L9.7195 8.37896M9.34685 8.04556L9.35026 8.04182L9.7195 8.37896M8 5.10781V5.10714C8 4.63233 7.84817 4.17159 7.56879 3.78333C7.28979 3.3956 6.89725 3.0987 6.44486 2.9247C5.99265 2.75076 5.49692 2.70573 5.019 2.794C4.541 2.88229 4.09725 3.10098 3.74556 3.42755C3.39349 3.75448 3.14902 4.17565 3.04952 4.6401C2.94995 5.10493 3.00146 5.58629 3.19561 6.02153C3.38951 6.45621 3.71509 6.82168 4.12525 7.07617C4.53512 7.33047 5.01344 7.46429 5.5 7.46429L5.50058 7.46428C6.15176 7.46353 6.7828 7.22333 7.25371 6.78606C7.72585 6.34764 7.99914 5.74499 8 5.10781Z" stroke="#A1A1A1" />
            </svg>,
            name: `${JSON.parse(eventDetails?.venue).name}, ${JSON.parse(eventDetails?.venue).address}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3 7.15V8.45H11.7V7.15H1.3ZM3.9 13V9.75H0V0H13V9.75H9.1V13L6.5 11.7L3.9 13ZM1.3 5.2H11.7V1.3H1.3V5.2Z" fill="#A1A1A1" />
            </svg>,
            name: `Event ID : ${eventDetails.eventId}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.61111 7.8C3.40648 7.8 3.23483 7.7376 3.09617 7.6128C2.95798 7.48843 2.88889 7.33417 2.88889 7.15C2.88889 6.96583 2.95798 6.81135 3.09617 6.68655C3.23483 6.56218 3.40648 6.5 3.61111 6.5C3.81574 6.5 3.98739 6.56218 4.12606 6.68655C4.26424 6.81135 4.33333 6.96583 4.33333 7.15C4.33333 7.33417 4.26424 7.48843 4.12606 7.6128C3.98739 7.7376 3.81574 7.8 3.61111 7.8ZM6.5 7.8C6.29537 7.8 6.12396 7.7376 5.98578 7.6128C5.84711 7.48843 5.77778 7.33417 5.77778 7.15C5.77778 6.96583 5.84711 6.81135 5.98578 6.68655C6.12396 6.56218 6.29537 6.5 6.5 6.5C6.70463 6.5 6.87628 6.56218 7.01494 6.68655C7.15313 6.81135 7.22222 6.96583 7.22222 7.15C7.22222 7.33417 7.15313 7.48843 7.01494 7.6128C6.87628 7.7376 6.70463 7.8 6.5 7.8ZM9.38889 7.8C9.18426 7.8 9.01285 7.7376 8.87467 7.6128C8.736 7.48843 8.66667 7.33417 8.66667 7.15C8.66667 6.96583 8.736 6.81135 8.87467 6.68655C9.01285 6.56218 9.18426 6.5 9.38889 6.5C9.59352 6.5 9.76493 6.56218 9.90311 6.68655C10.0418 6.81135 10.1111 6.96583 10.1111 7.15C10.1111 7.33417 10.0418 7.48843 9.90311 7.6128C9.76493 7.7376 9.59352 7.8 9.38889 7.8ZM1.44444 13C1.04722 13 0.707055 12.8728 0.423944 12.6184C0.141315 12.3636 0 12.0575 0 11.7V2.6C0 2.2425 0.141315 1.93657 0.423944 1.6822C0.707055 1.4274 1.04722 1.3 1.44444 1.3H2.16667V0H3.61111V1.3H9.38889V0H10.8333V1.3H11.5556C11.9528 1.3 12.2929 1.4274 12.5761 1.6822C12.8587 1.93657 13 2.2425 13 2.6V11.7C13 12.0575 12.8587 12.3636 12.5761 12.6184C12.2929 12.8728 11.9528 13 11.5556 13H1.44444ZM1.44444 11.7H11.5556V5.2H1.44444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: `Start : ${formatDateTime(eventDetails.startDate)}`
        },
        {
            icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.61111 7.8C3.40648 7.8 3.23483 7.7376 3.09617 7.6128C2.95798 7.48843 2.88889 7.33417 2.88889 7.15C2.88889 6.96583 2.95798 6.81135 3.09617 6.68655C3.23483 6.56218 3.40648 6.5 3.61111 6.5C3.81574 6.5 3.98739 6.56218 4.12606 6.68655C4.26424 6.81135 4.33333 6.96583 4.33333 7.15C4.33333 7.33417 4.26424 7.48843 4.12606 7.6128C3.98739 7.7376 3.81574 7.8 3.61111 7.8ZM6.5 7.8C6.29537 7.8 6.12396 7.7376 5.98578 7.6128C5.84711 7.48843 5.77778 7.33417 5.77778 7.15C5.77778 6.96583 5.84711 6.81135 5.98578 6.68655C6.12396 6.56218 6.29537 6.5 6.5 6.5C6.70463 6.5 6.87628 6.56218 7.01494 6.68655C7.15313 6.81135 7.22222 6.96583 7.22222 7.15C7.22222 7.33417 7.15313 7.48843 7.01494 7.6128C6.87628 7.7376 6.70463 7.8 6.5 7.8ZM9.38889 7.8C9.18426 7.8 9.01285 7.7376 8.87467 7.6128C8.736 7.48843 8.66667 7.33417 8.66667 7.15C8.66667 6.96583 8.736 6.81135 8.87467 6.68655C9.01285 6.56218 9.18426 6.5 9.38889 6.5C9.59352 6.5 9.76493 6.56218 9.90311 6.68655C10.0418 6.81135 10.1111 6.96583 10.1111 7.15C10.1111 7.33417 10.0418 7.48843 9.90311 7.6128C9.76493 7.7376 9.59352 7.8 9.38889 7.8ZM1.44444 13C1.04722 13 0.707055 12.8728 0.423944 12.6184C0.141315 12.3636 0 12.0575 0 11.7V2.6C0 2.2425 0.141315 1.93657 0.423944 1.6822C0.707055 1.4274 1.04722 1.3 1.44444 1.3H2.16667V0H3.61111V1.3H9.38889V0H10.8333V1.3H11.5556C11.9528 1.3 12.2929 1.4274 12.5761 1.6822C12.8587 1.93657 13 2.2425 13 2.6V11.7C13 12.0575 12.8587 12.3636 12.5761 12.6184C12.2929 12.8728 11.9528 13 11.5556 13H1.44444ZM1.44444 11.7H11.5556V5.2H1.44444V11.7Z" fill="#A1A1A1" />
            </svg>,
            name: `End : ${formatDateTime(eventDetails.endDate)}`
        },
        {
            icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.625 4.82334L10.7496 1L12.0495 4.82334" fill="#A6A6A6" />
                <path d="M2.625 4.82334L10.7496 1L12.0495 4.82334" stroke="#15171E" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 4.82031H13.9993V7.11431C13.0244 7.11431 12.0494 7.87898 12.0494 9.21715C12.0494 10.5553 13.0244 11.7023 13.9993 11.7023V13.9963H1V11.7023C1.97495 11.7023 2.9499 10.9377 2.9499 9.40832C2.9499 7.87898 1.97495 7.11431 1 7.11431V4.82031Z" fill="#A6A6A6" stroke="#15171E" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.22656 8.41406H7.17646H5.22656Z" fill="#A6A6A6" />
                <path d="M5.22656 8.41406H7.17646" stroke="#15171E" strokeWidth="0.7" strokeLinecap="round" />
                <path d="M5.22656 10.7031H9.77633H5.22656Z" fill="#A6A6A6" />
                <path d="M5.22656 10.7031H9.77633" stroke="#15171E" strokeWidth="0.7" strokeLinecap="round" />
            </svg>,
            name: `${eventDetails.ticketType}`
        }
    ];





    const eventTickets = eventDetails.eventtickets?.map((ticket, index) => {
        return {
            value: ticket.id,
            label: ticket.name
        }
    });





    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Invites</p>
                            <p className="text-base">Invites for: <span className="text-mobiBlue">{eventDetails.name}</span></p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-5 md:w-[30%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-6">
                            <div className="w-full flex justify-center">
                                <img src={eventDetails.image} className="w-full rounded-xl h-full" />
                            </div>
                            <div className="w-full flex flex-col mt-3 gap-2">
                                <div className="w-1/3">
                                    <Badge status={`Type : ${eventDetails.status}`} color={`${eventDetails.status || 'inactive'}`} />
                                </div>
                                <div className="w-full my-2 text-mobiRomanSilver">
                                    <span className="text-sm">
                                        {eventDetails.description}
                                    </span>
                                </div>
                                <div className="flex w-full flex-col gap-5 mt-3">
                                    {eventDetailsBlock.map((details, index) => (
                                        <div className="w-full flex gap-3">
                                            <div className="p-2 rounded-lg max-h-[30px] mt-[1px] bGmobiGrayDark flex items-center">
                                                <span className="bs-mobiCeramaic">
                                                    {details.icon}
                                                </span>
                                            </div>
                                            <span className="bs-mobiCeramic flex flex-col items-center mt-1">{details.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 overflow-x-auto custom-scrollbar p-4">
                                    {JSON.parse(eventDetails.venueImage).map((src, index) => (
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
                        <div className="shadow-xl md:py-5 md:px-8 px-2 py-2 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            <p className="-mb-3 text-mobiFormGray">
                                Invite User(s)
                            </p>
                            <form onSubmit={handleSubmit(inviteUser)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <Input type="text" name="userId" required
                                            errors={errors}
                                            rules={{ required: `User's email or ID is required` }}
                                            register={register} placeholder="Enter User(s) email or ID" />
                                    </div>

                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Assign Ticket to Invitee
                                            </p>
                                            <Input name="ticketId" options={eventTickets} register={register} errors={errors}
                                                rules={{ required: 'Event Ticket is required' }}
                                                type="select" placeholder="Select Ticket" />
                                        </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={disabled} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Invite User(s)
                                        </Button>
                                    </div>
                                </div>

                            </form>


                            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-1">
                                <Table title="Today" filter subTitle={<span>Invite Sent</span>} exportData
                                    tableHeader={RequetsHeaders}>
                                    {eventInvites.length > 0 ?
                                        eventInvites
                                            .map((data, index) => (
                                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                                    <td className="px-3 py-3 text-mobiTableText">{data.user.firstName} {data.user.lastName}</td>
                                                    <td className="px-3 py-3 text-mobiTableText">{data.user.email}</td>
                                                    <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.invitedAt, 'dd-MM-yyy')}</td>
                                                    <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                                                    <td className="px-6 py-3">
                                                        <span className="flex w-full">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#AEB9E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                        loading ?
                                            <tr>
                                                <td colSpan={RequetsHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                    <Loader size={20} />
                                                </td>
                                            </tr>
                                            :
                                            <tr>
                                                <td colSpan={RequetsHeaders.length} className="text-center py-10 font-semibold text-gray-500">
                                                    No Data Available
                                                </td>
                                            </tr>
                                    }
                                </Table>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}