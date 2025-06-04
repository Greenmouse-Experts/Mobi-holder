import { Button } from "@material-tailwind/react";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";

export default function Wallet() {
    const user = useSelector((state) => state.userData.data);
    const [bankDetails, setBankDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const { mutate } = useApiMutation();

    const navigate = useNavigate();


    useEffect(() => {
        getUserBankDetails();
    }, []);



    const getUserBankDetails = () => {
        mutate({
            url: `/api/users/payment/subaccounts`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                if (response.data) {
                    const bankDetails = response.data.data;
                    setBankDetails(bankDetails);
                }
                setLoading(false);
            },
            onError: (error) => {
                console.error(error);
                setLoading(false);
            }
        });
    }



    /* const initiateWithdrawal = (bankId) => {
         openModal({
             size: "sm",
             content: (
                 <form className="grid grid-cols-2 gap-1">
                     {/* Country Selection 
                     <div className="col-span-2">
                         <label className="block text-sm font-medium mt-4 mb-2">Amount to Withdraw</label>
                         <input
                             type="number"
                             id="title"
                             {...register("amount", { required: "Amount is required" })}
                             placeholder="Enter amount"
                             className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                             style={{ outline: "none" }}
                             required
                         />
                     </div>
                     <div className="col-span-2 flex justify-center">
                         <Button
                             type="submit"
                             className="bg-kuduOrange text-white normal-case text-sm font-medium rounded-md hover:bg-orange-600"
                         >
                             Initiate Withdrawal
                         </Button>
                     </div>
                 </form>
             )
         })
     } */






    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} title={'Wallet'} />

                    <div className="w-full p-6 bg-white shadow rounded-lg">
                        <div className="flex w-full justify-between">
                        </div>

                        <div className="mt-4">
                            <div className="w-full flex md:flex-row flex-col gap-3 justify-between">
                                <div className="w-full flex flex-col gap-2">
                                    <p className="text-kuduRomanSilver font-semibold text-sm md:text-base">
                                        Wallet Balance
                                    </p>
                                    <p className="text-lg md:text-2xl font-bold">
                                        NGN {user.wallet}
                                    </p>
                                </div>
                                <div className="">
                                    {/* <Button className="bg-mobiPink">
                                        Withdraw
                                    </Button> */}
                                </div>
                            </div>

                            <div className="mt-20 md:mt-10 w-full">
                                {
                                    loading ? (
                                        <div className="w-full h-full">
                                            <Loader size={20} />
                                        </div>
                                    )
                                        :
                                        bankDetails.length === 0 ? (
                                            <>
                                                <h1 className="text-center text-lg font-bold mb-4">
                                                    No Account Added
                                                </h1>

                                                <div className="w-full flex justify-center p-1">
                                                    <Button className="text-white" onClick={() => navigate('/app/settings#bank_details')}>
                                                        ADD BANK ACCOUNT
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                            :


                                            <div className="overflow-x-auto p-4">
                                                <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                                                    <thead className="bg-gray-100 text-gray-700 text-left">
                                                        <tr>
                                                            <th className="p-3 border border-gray-300">S/N</th>
                                                            <th className="p-3 border border-gray-300">Bank</th>
                                                            <th className="p-3 border border-gray-300">Account Number</th>
                                                            <th className="p-3 border border-gray-300">Account Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bankDetails.map((bankDetail, index) => (
                                                            <tr key={bankDetail.id} className="border border-gray-200">
                                                                <td className="p-3 border border-gray-300">{index + 1}</td>
                                                                <td className="p-3 border border-gray-300">{bankDetail.settlementBank}</td>
                                                                <td className="p-3 border border-gray-300">{bankDetail.accountNumber}</td>
                                                                <td className="p-3 border border-gray-300">{bankDetail.businessName}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>






                                                {/* Mobile Version */}
                                                <div className="md:hidden flex flex-col gap-4">
                                                    {bankDetails.map((bankDetail, index) => (
                                                        <div
                                                            key={bankDetail.id}
                                                            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                                                        >
                                                            <div className="font-semibold text-sm text-gray-600 mb-1">
                                                                S/N: <span className="font-normal">{index + 1}</span>
                                                            </div>
                                                            <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                                                Bank:
                                                                <div className="font-normal mt-1 text-gray-800">{bankDetail.settlementBank}</div>
                                                            </div>
                                                            <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                                                Account Number:
                                                                <div className="font-normal mt-1 text-gray-800">{bankDetail.accountNumber}</div>
                                                            </div>
                                                            <div className="font-semibold text-sm text-gray-600 mb-1 mt-3">
                                                                Account Name:
                                                                <div className="font-normal mt-1 text-gray-800">{bankDetail.businessName}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>


                                            </div>

                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}