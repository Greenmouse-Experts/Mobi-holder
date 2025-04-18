import { useState } from "react";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";

const UpdateRoleForm = ({ closeModal, reload, role }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();


    const updateRole = (data) => {
        mutate({
            url: "/api/admins/role/update",
            method: "PUT",
            headers: true,
            data: {...data, roleId: role.id},
            onSuccess: (response) => {
                closeModal();
                reload();
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Update Role</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(updateRole)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name of Role
                            </p>
                            <Input type="text" name="name" value={role.name} errors={errors} register={register}
                                placeholder="Enter name of role" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Update Role
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateRoleForm