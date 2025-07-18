import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import useApiMutation from "../../../api/hooks/useApiMutation";
import useFileUpload from "../../../api/hooks/useFileUpload";

export default function UpdateStaff() {
    const [roles, setRoles] = useState([]);
    const [staffDetail, setStaffDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();

    const navigate = useNavigate();
    const { mutate } = useApiMutation();
    const { uploadFiles, isLoadingUpload } = useFileUpload();


    useEffect(() => {
        getRoles();
        getStaff();
    }, [])



    const getRoles = () => {
        mutate({
            url: `/api/admins/roles`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setRoles(response.data.data.map((data) => {
                    return {
                        value: data.id,
                        label: data.name
                    }
                }));
                getStaff();
            },
            onError: () => {
                getStaff();
            }
        })
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload image using Cloudinary
        await uploadFiles([file], (uploadedUrl) => {
            setImageUrl(uploadedUrl);
            setValue('photo', uploadedUrl);
        });
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageUrl("");
        setValue('photo', "");
        // Clear the file input
        const fileInput = document.querySelector('input[name="photo"]');
        if (fileInput) {
            fileInput.value = "";
        }
    };






    const getStaff = () => {
        mutate({
            url: `/api/admins/staffs`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setStaffDetail(response.data.data.find(x => x.id === id))
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        })
    }







    const createStaff = (data) => {
        setDisabled(true);
        
        // Use the uploaded image URL instead of file, or keep existing photo if no new upload
        const staffData = {
            ...data,
            id: id,
            photo: imageUrl || data.photo || staffDetail.photo || ""
        };

        mutate({
            url: `/api/admins/staff/update`,
            method: "PUT",
            headers: true,
            data: staffData,
            onSuccess: (response) => {
                navigate(-1);
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            }
        })
    }




    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }








    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile superAdmin />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Update Staff</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(createStaff)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Staff Full Name
                                        </p>
                                        <Input type="text" name="fullname"
                                            register={register}
                                            value={staffDetail.admin.name}
                                            rules={{ required: 'Staff Name is required' }} errors={errors} placeholder="Enter Staff Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Staff Email
                                        </p>
                                        <Input type="text" name="email" value={staffDetail.email} register={register}
                                            rules={{ required: 'Staff Email is required' }} errors={errors} placeholder="Email" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Phone Number
                                        </p>
                                        <Input type="text" name="phoneNumber" value={staffDetail.phoneNumber}
                                            register={register}
                                            rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter Phone Number" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Staff Designation
                                            </p>
                                            <Input type="text" name="designation" value={staffDetail.designation}
                                                register={register}
                                                rules={{ required: 'Designation is required' }} errors={errors} placeholder="Enter Designation" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Department
                                            </p>
                                            <Input type="text" name="department"
                                                value={staffDetail.department}
                                                register={register}
                                                rules={{ required: 'Department is required' }} errors={errors} placeholder="Enter Department" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                BirthDate
                                            </p>
                                            <Input type="date" name="birthdate" value={staffDetail.birthdate} disableFutureDates
                                                register={register}
                                                rules={{ required: 'BirthDate is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>


                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Employment Date
                                            </p>
                                            <Input type="date" name="employmentDate" value={staffDetail.employmentDate} disableFutureDates
                                                register={register}
                                                rules={{ required: 'Employment Date is required' }} errors={errors} placeholder="Enter your date of birth" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Assign a Role
                                            </p>
                                            <Input name="roleId" register={register} value={staffDetail.admin.role.id} errors={errors} rules={{ required: 'Role is required' }}
                                                type="select" options={roles} placeholder="Assign a Role" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Update Staff Photo (Optional)
                                            </p>
                                            
                                            {/* Custom Image Upload Component */}
                                            <div className="flex flex-col gap-4">
                                                {/* Current photo display */}
                                                {staffDetail?.photo && !imagePreview && (
                                                    <div className="relative">
                                                        <p className="text-sm text-gray-600 mb-2">Current Photo:</p>
                                                        <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                                                            <img
                                                                src={staffDetail.photo}
                                                                alt="Current photo"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* File Input */}
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mobiPink focus:border-transparent outline-none"
                                                        disabled={isLoadingUpload}
                                                    />
                                                    {isLoadingUpload && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-mobiPink"></div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* New Image Preview */}
                                                {imagePreview && (
                                                    <div className="relative">
                                                        <p className="text-sm text-gray-600 mb-2">New Photo Preview:</p>
                                                        <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                                            disabled={isLoadingUpload}
                                                        >
                                                            ×
                                                        </button>
                                                        {isLoadingUpload && (
                                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                                                <div className="text-white text-sm">Uploading...</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Upload Status */}
                                                {imageUrl && !isLoadingUpload && (
                                                    <p className="text-green-600 text-sm">✓ New image uploaded successfully</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={disabled} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Update Staff
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}