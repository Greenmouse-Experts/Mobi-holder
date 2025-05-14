import { Button } from "@material-tailwind/react";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";

export default function Wallet() {
    const user = useSelector((state) => state.userData.data);

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
                                    <Button className="bg-mobiPink">
                                        Withdraw
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-20 md:mt-10 w-full">

                                <h1 className="text-center text-lg font-bold mb-4">
                                    No Account Added
                                </h1>

                                <div className="w-full flex justify-center p-1">
                                    <Button className="text-white">
                                        ADD BANK ACCOUNT
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}