import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import DropZone from "../../../../components/DropZone";
import useApiMutation, { newApi } from "../../../../api/hooks/useApiMutation";
import { useEffect, useRef, useState } from "react";
import SelectField from "../../../../components/SelectField";
import { toast } from "react-toastify";
import MultipleSelect from "../../../../components/MultipleSelect";
import { setOrg } from "../../../../reducers/organisationSlice";
import Loader from "../../../../components/Loader";
import useFileUpload from "../../../../api/hooks/useFileUpload";
import { useQuery } from "@tanstack/react-query";
import SimpleInput from "../../../../components/shared/SimpleInput";

// Helper function to parse address
const parseAddress = (address) => {
  if (typeof address === "string") {
    return JSON.parse(address);
  }
  return address;
};

export default function OrganisationData() {
  const user = useSelector((state) => {
    const orgData = state.orgData.orgData;
    const address = parseAddress(orgData.companyAddress);
    return { ...orgData, companyAddress: address };
  });

  const dispatch = useDispatch();
  const { mutate } = useApiMutation();
  const { uploadFiles, isLoadingUpload } = useFileUpload();
  const fileInputRef = useRef(null);
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [files, setFiles] = useState([]);
  const [documentSelected, setSelectedDocument] = useState(null);
  const [customError, setCustomError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: user.companyName,
      phoneNumber: user.phoneNumber,
      companyEmail: user.companyEmail,
      address: user.companyAddress.street,
      country: user.companyAddress.country,
      state: user.companyAddress.state,
      natureOfOrganization: user?.natureOfOrganization || "closed",
    },
  });

  // Form for documents
  const {
    register: registerUpload,
    setValue: setValueUpload,
    handleSubmit: handleSubmitUpload,
    formState: { errors: errorsUpload },
  } = useForm();

  const get_docs = useQuery({
    queryKey: ["docs", user?.id],
    queryFn: async () => {
      let resp = await newApi("/api/users/get/business-document");
      return resp.data.data;
    },
  });
  const uploadedIDData = get_docs.data?.data;

  const changeProfile = (data) => {
    const payloadData = {
      ...user,
      companyAddress: {
        country: data.country,
        state: data.state,
        street: data.address,
      },
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      phoneNumber: data.phoneNumber,
      natureOfOrganization: data.natureOfOrganization || "closed",
    };

    // Remove fields that shouldn't be in update payload
    delete payloadData.natureOfOrganization;
    delete payloadData.companyAddress;

    setIsLoading(true);
    mutate({
      url: "/api/users/profile/update/organization",
      method: "PUT",
      data: {
        ...payloadData,
        companyAddress: {
          country: data.country,
          state: data.state,
          street: data.address,
        },
        natureOfOrganization: data.natureOfOrganization || "closed",
      },
      headers: true,
      onSuccess: (response) => {
        dispatch(setOrg(response.data.data));
        window.location.reload();
        setIsLoading(false);
      },
      onError: () => setIsLoading(false),
    });
  };

  const updateDocuments = (data) => {
    const hasFile = files.length > 0 || uploadedIDData?.documentUrl;

    if (!hasFile) {
      toast.error("No file(s) selected");
      return;
    }

    if (!documentSelected) {
      setCustomError(true);
      return;
    }

    setIsLoadingDocuments(true);
    mutate({
      url: "/api/users/business-document",
      method: "POST",
      data: {
        name: documentSelected,
        documentUrl: files[0] || uploadedIDData?.documentUrl,
        ...data,
      },
      headers: true,
      onSuccess: () => {
        setIsLoadingDocuments(false);
        get_docs.refetch();
      },
      onError: () => setIsLoadingDocuments(false),
    });
  };

  const changeProfilePhoto = async (uploadedUrl) => {
    mutate({
      url: "/api/users/profile/photo/upload",
      method: "PUT",
      data: { photo: uploadedUrl },
      headers: true,
      onSuccess: (response) => {
        dispatch(setOrg(response.data.data));
        get_docs.refetch();
      },
    });
  };

  // Event handlers
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      await uploadFiles(files, changeProfilePhoto);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (data) => {
    setFiles([data]);
  };

  // Verification status badge
  const getVerificationStatus = () => {
    if (!uploadedIDData) {
      return { text: "Unverified", className: "bg-red-500" };
    }
    return uploadedIDData.isVerified
      ? { text: "Verified", className: "bg-green-500" }
      : {
          text: "Verification is under review",
          className: "bg-yellow-500 text-black",
        };
  };

  if (get_docs.isLoading) {
    return (
      <div className="w-full h-full">
        <Loader size={20} />
      </div>
    );
  }

  const verificationStatus = getVerificationStatus();
  const documentOptions = [{ name: "Company Registration Document" }];
  const displayFiles =
    files.length > 0
      ? files
      : uploadedIDData?.documentUrl
        ? [uploadedIDData.documentUrl]
        : [];

  return (
    <>
      {/* Profile Form */}
      <form onSubmit={handleSubmit(changeProfile)}>
        <div className="mb-1 flex flex-col gap-5">
          <div className="w-full flex justify-end items-center">
            <Button disabled className={verificationStatus.className}>
              {verificationStatus.text}
            </Button>
          </div>

          {/* Profile Picture */}
          <div className="flex md:flex-row flex-col gap-3">
            {user.photo ? (
              <div className="flex w-32 h-32">
                <img
                  src={user.photo}
                  className="w-full h-full object-cover rounded-full"
                  alt="Company"
                />
              </div>
            ) : (
              <AvatarInitials name={user.companyName} size="32" />
            )}
            <div className="flex flex-col justify-center md:mx-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
              />
              <Button
                className="bg-transparent px-7 rounded-full chartColor border-[0.5px] border-gray-700"
                onClick={handleButtonClick}
                disabled={isLoadingUpload}
              >
                {isLoadingUpload ? "Changing Picture" : "Change Picture"}
              </Button>
            </div>
          </div>

          {/* Company Name */}
          <div className="flex flex-col w-full gap-6">
            <SimpleInput {...register("companyName")} label="Company Name" />
            {/* <p className="-mb-3 text-mobiFormGray">Company Name</p>
            <Input
              type="text"
              name="companyName"
              register={register}
              // watch={watch}
              // setValue={setValue}
              rules={{ required: "Company Name is required" }}
              errors={errors}
              placeholder="Company Name"
            />*/}
          </div>

          {/* Phone and Email */}
          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
            <div className="flex flex-col w-full gap-6">
              <SimpleInput
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                label="Company Phone Number"
                placeholder="Phone Number"
              />
            </div>

            <div className="flex flex-col w-full gap-6">
              <SimpleInput
                {...register("companyEmail", {
                  required: "Company Email is required",
                })}
                label="Company Email"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col w-full gap-6">
            <SimpleInput
              {...register("address", {
                required: "Company Address is required",
              })}
              label="Company Address"
              placeholder="Enter your address"
            />
          </div>

          {/* Country and State */}
          <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
            <div className="flex md:w-1/2 flex-col gap-6">
              <SimpleInput
                {...register("country", { required: "Country is required" })}
                label="Country"
                placeholder="Choose your country"
              />
            </div>

            <div className="flex md:w-1/2 flex-col gap-6">
              <SimpleInput
                {...register("state", { required: "State is required" })}
                label="State"
                placeholder="Choose your state"
              />
            </div>
          </div>

          {/* Access Type */}
          <div className="flex flex-col w-full gap-6">
            <p className="-mb-3 text-mobiFormGray">Access Type</p>
            <Controller
              name="natureOfOrganization"
              control={control}
              render={({ field }) => {
                return (
                  <MultipleSelect
                    accessType={field.onChange}
                    selectedData={user.natureOfOrganization}
                  />
                );
              }}
            ></Controller>
          </div>

          <div className="flex">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full"
            >
              {isLoading ? "Updating..." : "Update Info"}
            </Button>
          </div>
        </div>
      </form>

      {/* Documents Form */}
      <form onSubmit={handleSubmitUpload(updateDocuments)}>
        <div className="mb-1 flex flex-col gap-5 mt-6">
          <p className="mt-6 text-mobiFormGray">Verification Documents</p>

          <div className="w-full flex flex-col gap-8 border-2 rounded-xl border-gray-900 border-dashed p-8">
            {/* Document Selection */}
            <div className="flex flex-col w-full gap-6">
              <p className="-mb-3 text-mobiFormGray">
                Select Card/Document to Upload
              </p>
              <SelectField
                value={uploadedIDData?.name}
                options={documentOptions}
                label="Document"
                errors={customError}
                selectedOption={setSelectedDocument}
              />
            </div>

            {/* Document Number */}
            <div className="flex flex-col w-full gap-6">
              <SimpleInput
                {...registerUpload("registrationNumber", {
                  required: "Document Number is required",
                })}
                label="Card/Document Number"
                placeholder="Enter card Number"
                defaultValue={uploadedIDData?.registrationNumber}
              />
            </div>

            {/* Registration Date */}
            <div className="flex flex-col w-full gap-6">
              <SimpleInput
                type="date"
                {...registerUpload("registrationDate", {
                  required: "Registration Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    return !isNaN(date.getTime()) || "Invalid date";
                  },
                })}
                label="Company Registration Date"
                placeholder="Enter registration date"
                defaultValue={uploadedIDData?.registrationDate}
                onChange={(value) =>
                  setValueUpload("registrationDate", value, {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            {/* File Upload */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-6">
                <p className="-mb-3 text-mobiFormGray">
                  Upload Company Registration Document(s)
                </p>
                <DropZone onUpload={handleDrop} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {displayFiles.map((fileObj, index) => (
                  <div key={index} className="relative">
                    <img
                      src={fileObj}
                      alt="preview"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex">
            <Button
              type="submit"
              disabled={isLoadingDocuments}
              className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full"
            >
              {isLoadingDocuments ? "Updating..." : "Update Documents"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
