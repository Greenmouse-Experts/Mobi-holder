import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OrgAddCard() {
    const user = useSelector((state) => state.orgData.orgData);
    const [categorySet, setCategorySet] = useState(null);
    const navigate = useNavigate();

    const validateCategorySelection = () => {
        if (categorySet) {
            localStorage.setItem('cardStructure', JSON.stringify(categorySet));
            navigate('/org/cards/structure')
        }
        else {
            toast.error('Select Card Template', { duration: 5000 });
        }
    }

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} title={'ID Card Categories'} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-base">All your create ID Card for your different categories</p>
                        </div>
                        <div className="flex md:w-2/5 w-full justify-end">
                            <Button className="bg-mobiPink rounded-full" onClick={() => validateCategorySelection()}>
                                Create New ID Category
                            </Button>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-2 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            <div className="w-full flex gap-4 md:flex-row flex-col my-5">
                                <div className="w-auto py-4 px-4 flex flex-col gap-4 rounded-xl cursor-pointer bGmobiGrayDark"
                                    onClick={() => setCategorySet('Senior')}
                                    data-category={categorySet === 'Senior' ? 'selected' : null}
                                >
                                    <p className="text-sm">Senior Staff ID</p>
                                    <img src="/card-placeholder-staff.png" width={300} />
                                </div>

                                <div className="w-auto py-4 px-4 flex flex-col gap-4 rounded-xl cursor-pointer bGmobiGrayDark"
                                    onClick={() => setCategorySet('Regular')}
                                    data-category={categorySet === 'Regular' ? 'selected' : null}
                                >
                                    <p className="text-sm">Regular Staff ID</p>
                                    <img src="/card-placeholder-regular.png" width={300} />
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}