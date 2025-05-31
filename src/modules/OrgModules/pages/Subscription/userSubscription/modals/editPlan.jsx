import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../../../components/Input";
import { useEffect, useState } from "react";
import useApiMutation from "../../../../../../api/hooks/useApiMutation";
import { convertToRaw, EditorState } from "draft-js";
import DraftEditor from "../../../../../../components/Editor";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";

const EditPlan = ({ redirect, subscriptionData, closeModal }) => {
    const [descriptionEditor, setDescriptionEditor] = useState(() =>
        EditorState.createEmpty()
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { mutate } = useApiMutation();
    const [disabled, setDisabled] = useState(false);


    const createSubPlan = (data) => {
        setDisabled(true);
        mutate({
            url: `/api/memberships-subscriptions/subscription/plan/update`,
            method: "PUT",
            headers: true,
            data: {
                ...data,
                planId: subscriptionData.id,
                description: draftToHtml(convertToRaw(descriptionEditor.getCurrentContent()))
            },
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







    useEffect(() => {
        if (subscriptionData.description) {
            try {
                const contentState = stateFromHTML(subscriptionData.description); // Convert HTML to Draft.js state
                setDescriptionEditor(EditorState.createWithContent(contentState));
            } catch (error) {
                console.error("Error parsing description:", error);
            }
        }

    }, [subscriptionData]);













    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 overflow-y-auto gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Edit Subscription Plan</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createSubPlan)}>
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name
                            </p>
                            <Input type="text" name="name" value={subscriptionData?.name} register={register}
                                rules={{ required: 'Name is required' }} errors={errors}
                                placeholder="Enter name of plan" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Description
                            </p>
                            <DraftEditor
                                editorState={descriptionEditor}
                                setEditorState={(newState) => {
                                    setDescriptionEditor(newState);
                                    setValue("description", JSON.stringify(convertToRaw(newState.getCurrentContent())), {
                                        shouldValidate: true, // Ensure validation runs when value changes
                                    });
                                }}
                            />
                            {errors.description && <p className="text-red-500">Description is required</p>}
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Price
                            </p>
                            <Input type="text" name="price" value={subscriptionData?.price} register={register}
                                rules={{ required: 'Amount is required' }} errors={errors}
                                placeholder="Enter amount" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Duration (in months)
                            </p>
                            <Input type="text" name="validity" value={subscriptionData?.validity} register={register}
                                rules={{ required: 'Duration is required' }} errors={errors}
                                placeholder="Enter amount" />
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <Button type="submit"
                                disabled={disabled}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Edit Plan
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default EditPlan;