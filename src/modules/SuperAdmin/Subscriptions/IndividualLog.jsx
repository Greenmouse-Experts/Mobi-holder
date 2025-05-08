import React, { useEffect } from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import Table from "../../../components/Tables";
import { dateFormat } from "../../../helpers/dateHelper";
import Badge from "../../../components/Badge";

const IndividualLog = () => {

    const [subscribers, setSubscribers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const TableHeaders = ["Individual", "Plan", "Validity", "Date Subscribed", "Expiry Date", "Amount", "Status"];


    useEffect(() => {
        fetchSubscribers();
    }, []);


    const fetchSubscribers = () => {
        mutate({
            url: `/api/admins/individual/subscribers`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setSubscribers(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSubscribers([]);
            }
        })
    }



    if (loading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            </>
        )
    }




    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:mt-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Individual Subscribers</p>
                        </div>
                    </div>
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5">
                        <Table title="Today" filter subTitle={<span>Subscription Log</span>} exportData
                            tableHeader={TableHeaders}>
                            {subscribers.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-3 text-mobiTableText">{data.individual.firstName} {data.individual.lastName}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.plan.name}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.plan.duration} month(s)</td>
                                    <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.subscribedAt, 'dd MMM, yyy')}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{dateFormat(data.expiresAt, 'dd MMM, yyy')}</td>
                                    <td className="px-3 py-3 text-mobiTableText">{data.plan.currency} {data.plan.amount}</td>
                                    <td className="px-3 py-3 text-mobiTableText"><Badge status={data.status} color={data.status === "active" ? "#4CAF50" : "inactive"} textColor={data.status === "active" ? "#FFFFFF" : "#000000"}
                                    /></td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualLog;
