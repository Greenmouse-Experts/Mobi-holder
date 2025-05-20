import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";

const CreateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Create FAQ Category</h2>
                    </div>
                </div>
                <form>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Category Name
                            </p>
                            <Input type="textarea" name="name" register={register}
                                placeholder="Enter name" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Create FAQ Category
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateCategory;