import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import Checkbox from "../../../../components/CheckBox";
import { Button } from "@material-tailwind/react";

const AddPermissions = ({ closeModal, id }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    const [checkedPermissions, setCheckedPermissions] = useState([])

    const { mutate } = useApiMutation();


    useEffect(() => {
        getPermissions()
    }, [id])


    const getPermissions = () => {
        mutate({
            url: `/api/admins/permissions`,
            method: "GET",
            headers: true,
            onSuccess: (response) => {
                setIsLoading(false);
                setPermissions(cleanNames(response.data.data))
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



    const getChecked = (data) => {
        if (checkedPermissions.includes(data.id)) {
            // Remove the ID from the array
            setCheckedPermissions(prev => prev.filter(id => id !== data.id));
        } else {
            // Add the ID to the array
            setCheckedPermissions(prev => [...prev, data.id]);
        }
    };


    const addRolePermissions = () => {
        const payload = {
            roleId: id,
            permissionIds: checkedPermissions
        };
        mutate({
            url: `/api/admins/role/assign/bulk/permissions`,
            method: "POST",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                closeModal();
            },
            onError: () => {
                setIsLoading(false);
            }
        });
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
                                                <Checkbox
                                                    name="permission"
                                                    label=""
                                                    register={register}
                                                    onChange={() => getChecked(permission)}
                                                />
                                            </span>
                                            <span className="flex flex-col mt-2 capitalize">
                                                {permission.name}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="w-full flex justify-center mt-3">
                                        <Button onClick={() => addRolePermissions()} className="bg-mobiPink md:w-1/2 w-full">
                                            Add Permissions
                                        </Button>
                                    </div>
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

export default AddPermissions;