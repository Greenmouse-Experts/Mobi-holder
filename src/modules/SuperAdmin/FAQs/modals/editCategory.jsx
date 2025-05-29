import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useState } from "react";

const EditCategory = ({ redirect, categoryData, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabled, setDisabled] = useState(false);

    const { mutate } = useApiMutation();


    const createCategory = (data) => {
        setDisabled(true);
        const payload = {
            name: data.name,
            id: categoryData.id
        };
        mutate({
            url: `/api/admins/faq-category`,
            method: "PUT",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                closeModal();
                redirect()
                setDisabled(false);
            },
            onError: () => {
                closeModal();
                setDisabled(false);
            }
        });
    }


    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Edit FAQ Category</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createCategory)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Category Name
                            </p>
                            <Input type="text" name="name" value={categoryData?.name} register={register}
                                placeholder="Enter name" rules={{ required: 'Name is required' }} errors={errors} />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={disabled}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Edit FAQ Category
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default EditCategory;