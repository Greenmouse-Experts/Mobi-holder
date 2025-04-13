import { useEffect, useState } from "react";
import Table from "../../../../components/Tables";
import { useParams } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Header from "../../header";
import Loader from "../../../../components/Loader";
import { dateFormat } from "../../../../helpers/dateHelper";

export default function OrgMembers() {
    const [allMembers, setAllMembers] = useState([]);
    const [paginationData, setPagination] = useState({});
    const [individual, setIndividual] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const { mutate } = useApiMutation();


    const RequetsHeaders = ["Individual", "MBIH", "Staff ID", "Email", "Date Joined", "Designation"];


    const getOrganisationMembers = (page) => {
        mutate({
            url: `/api/admins/organization/members?organizationId=${id}&page=${page}&limit=20`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setAllMembers(response.data.data);
                setPagination(response.data.pagination);
                setIsLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            onError: () => {
                setIsLoading(false);
            }
        })
    }





    const getOrganisation = () => {
        mutate({
            url: `/api/admins/view/user?id=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setIndividual(response.data.data);
                getOrganisationMembers(1);
            },
            onError: () => {

            }
        })
    }







    useEffect(() => {
        getOrganisation();
    }, []);








    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={30} />
            </div>
        )

    }














    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-5 my-2">
                        <Table width="lg:w-[1000px]" title={''} filter subTitle={<span>Members of {individual.companyName}</span>} exportData
                            tableHeader={RequetsHeaders}
                            currentPage={paginationData.page}
                            totalPages={paginationData.totalPages}
                            onPageChange={(page) => getOrganisationMembers(page)}
                            >
                            {allMembers.length > 0 ? allMembers.map((data, index) => (
                                <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.individual.firstName}{' '}{data.individual.lastName}
                                    </td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.individual.mobiHolderId}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.memberId}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.individual.email}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{dateFormat(data.dateJoined, 'dd-MM-yyy')}</td>
                                    <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.designation}</td>
                                </tr>
                            ))
                                :
                                isLoading ?
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
        </>
    )
}