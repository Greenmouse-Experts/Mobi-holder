import { useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { get, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { Button } from "@material-tailwind/react";

export default function BankDetails() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const user = useSelector((state) => state.userData.data);

    const [bankList, setBankList] = useState([]);
    const [bankDetails, setBankDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const { mutate } = useApiMutation();


    useEffect(() => {
        getBankList();
        getUserBankDetails();
    }, []);



    const getBankList = () => {
        fetch('https://api.paystack.co/bank')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setBankList(data.data.map(bank => ({
                        label: bank.name,
                        value: bank.code
                    })));
                } else {
                    console.error('Failed to fetch bank list:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching bank list:', error);
            });
    }




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





    const setAccount = (data) => {
        setIsDisabled(true);
        mutate({
            url: `/api/users/create/individual/subaccount`,
            method: "POST",
            headers: true,
            data: data,
            onSuccess: (response) => {
                setIsDisabled(false);
                getUserBankDetails();
                setLoading(true);
            },
            onError: (error) => {
                setIsDisabled(false);
            }
        });
    }





    if (loading) {
        return (
            <>
                <div className="w-full h-full">
                    <Loader size={20} />
                </div>
            </>
        )
    }






    return (
        <>

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




            <form onSubmit={handleSubmit(setAccount)}>
                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Select Bank
                            </p>
                            <Input type="select" register={register} rules={{ required: 'Bank is required' }} errors={errors}
                                name="settlementBank" placeholder="Bank Name" options={bankList} />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Account Number
                            </p>
                            <Input type="text" register={register} rules={{ required: 'Account Number is required' }}
                                errors={errors} name="accountNumber" placeholder="Account Number" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name
                            </p>
                            <Input type="text" register={register} name="name" value={`${user.firstName} ${user.lastName}`} rules={{ required: 'Name is required' }} errors={errors} placeholder="Name" />
                        </div>
                    </div>

                    <div className="flex">
                        <Button type="submit" disabled={isDisabled} className="bg-mobiPink py-3 px-5 rounded-full">
                            Create Bank Account
                        </Button>
                    </div>

                </div>
            </form>
        </>
    )
}