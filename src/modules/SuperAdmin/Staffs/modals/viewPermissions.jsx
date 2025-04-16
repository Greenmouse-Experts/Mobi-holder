import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { Checkbox } from "@material-tailwind/react";
import Loader from "../../../../components/Loader";

const ViewPermissions = ({ closeModal, id }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);

    const { mutate } = useApiMutation();


    useEffect(() => {
        getPermissions(id)
    }, [id])


    const getPermissions = (roleId) => {
        mutate({
            url: `/api/admins/role/view/permissions?roleId=${roleId}`,
            method: "GET",
            headers: true,
            onSuccess: (response) => {
                setIsLoading(false);
                setPermissions(cleanNames(response.data.data.permissions))
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    const cleanNames = (data) => {
        return data.map(item => ({
            ...item,
            name: item.name.replace(/[_-]/g, ' ')
        }));
    }





    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3 overflow-y-auto">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Permissions</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    {isLoading ?
                        <div className="w-full flex items-center justify-center">
                            <Loader size={14} />
                        </div>
                        :
                        permissions.length > 0 ?
                            <div className="flex flex-col w-full gap-6">
                                {permissions?.map((permission, index) => (
                                    <div className="flex gap-2">
                                        <span className="flex">
                                            <Checkbox disabled defaultChecked />
                                        </span>
                                        <span className="flex flex-col mt-2 capitalize">
                                            {permission.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="w-full flex items-center my-2 justify-center">
                                <p className="text-lg font-semibold">No Permissions set</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
};

export default ViewPermissions;