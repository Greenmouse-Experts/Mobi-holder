import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";

const CreateFAQ = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Create FAQ</h2>
                    </div>
                </div>
                <form>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Question
                            </p>
                            <Input type="textarea" name="name" register={register}
                                placeholder="Enter question" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Answer
                            </p>
                            <Input type="textarea" name="name" register={register}
                                placeholder="Enter answer" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
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