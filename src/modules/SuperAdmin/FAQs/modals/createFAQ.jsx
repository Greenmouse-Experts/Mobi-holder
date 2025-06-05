import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useState } from "react";

const CreateFAQ = ({ categories, redirect, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filteeredCategories, setFilteredCategories] = useState(
        categories.map(category => ({
            label: category.name,
            value: category.id
        }))
    );
    const [categoryDisabled, setCategoryDisabled] = useState(true);

    const { mutate } = useApiMutation();
    const [disabled, setDisabled] = useState(false);


    const createFAQ = (data) => {
        setDisabled(true);
        mutate({
            url: `/api/admins/faq`,
            method: "POST",
            headers: true,
            data: data,
            onSuccess: () => {
                redirect();
                closeModal();
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
                closeModal();
            }
        });
    }



    const getSelectedType = (value) => {
        setCategoryDisabled(false);
        const filteredData = categories.filter((x) => x.type === value);
        setFilteredCategories(
            filteredData.map(category => ({
                label: category.name,
                value: category.id
            }))
        )
    }



    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col overflow-y-auto px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Create FAQ</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createFAQ)}>
                    <div className="flex flex-col gap-2 mt-3">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Account Type
                            </p>
                            <Input type="select" name="type" options={[
                                {
                                    label: 'Individual',
                                    value: 'individual'
                                },
                                {
                                    label: 'Organization',
                                    value: 'organization'
                                }
                            ]} register={register}
                                onChange={(e) => getSelectedType(e)}
                                placeholder="Select Account type" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Category
                            </p>
                            <Input type="select" name="categoryId" disabled={categoryDisabled} options={filteeredCategories} register={register}
                                placeholder="Select Category" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Question
                            </p>
                            <Input type="textarea" name="question" register={register}
                                rules={{ required: 'Question is required' }} errors={errors}
                                placeholder="Enter question" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Answer
                            </p>
                            <Input type="textarea" name="answer" register={register}
                                placeholder="Enter answer" />
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <Button type="submit"
                                disabled={disabled}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Create FAQ
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateFAQ;