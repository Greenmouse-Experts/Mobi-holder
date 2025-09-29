import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import DropdownMenu from "../../components/DropdownMenu";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userSlice";
import useApiMutation from "../../api/hooks/useApiMutation";
import Checkbox from "../../components/CheckBox";
import useFileUpload from "../../api/hooks/useFileUpload";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

export default function IndividualSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadFiles, isLoadingUpload } = useFileUpload();
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { mutate } = useApiMutation();

  const createAccount = (data) => {
    if (!uploadedPhoto) {
      toast.error("Please upload a profile photo.");
      return;
    }
    const payload = {
      ...data,
      photo: uploadedPhoto,
    };
    setIsLoading(true);
    mutate({
      url: "/api/users/auth/register/individual",
      method: "POST",
      data: payload,
      navigateTo: "/verify-email",
      onSuccess: (response) => {
        dispatch(setUser(response.data.data));
        localStorage.setItem("email", JSON.stringify(data.email));
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      await uploadFiles(files, (uploadedUrl) => {
        setUploadedPhoto(uploadedUrl);
      });
    }
  };

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <AuthSideBar />
        <div className="w-full flex justify-center mt-8 px-6 py-7 bS-leftOverlay relative shadow-lg lg:ml-[33%]">
          <div className="lg:w-3/5 md:w-3/5 w-full flex flex-col h-full gap-4 justify-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-3 flex-grow">
                <Link to={"/signup"} className="w-full flex gap-3">
                  <img
                    src="/mobiHolder.svg"
                    alt="Logo"
                    className="w-[32px] h-[32px] object-contain"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-xl mt-1 font-semibold">
                      MobiHolder
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex">
                <DropdownMenu
                  buttonLabel="Individual"
                  color="#242EF2"
                  btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiBlue border rounded-md border-mobiBlue"
                >
                  <Link
                    to={"/signup/organisation"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Organisation
                  </Link>
                </DropdownMenu>
              </div>
            </div>

            <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
              <p className="lg:text-xl md:text-xl text-lg font-semibold">
                Sign Up as Individual
              </p>

              <form onSubmit={handleSubmit(createAccount)}>
                <div className="mb-1 flex flex-col gap-6 mt-5">
                  <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex md:w-1/2 flex-col gap-6">
                      <p className="-mb-3 text-mobiFormGray">First name</p>
                      <Input
                        icon="human.svg"
                        name="firstName"
                        register={register}
                        rules={{ required: "First Name is required" }}
                        errors={errors}
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="flex md:w-1/2 flex-col gap-6">
                      <p className="-mb-3 text-mobiFormGray">Last name</p>
                      <Input
                        icon="human.svg"
                        type="text"
                        name="lastName"
                        register={register}
                        rules={{ required: "Last Name is required" }}
                        errors={errors}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex md:w-1/2 flex-col gap-6">
                      <p className="-mb-3 text-mobiFormGray">Email</p>
                      <Input
                        icon="email.svg"
                        type="email"
                        name="email"
                        register={register}
                        rules={{ required: "Email is required" }}
                        errors={errors}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex md:w-1/2 flex-col gap-6">
                      <p className="-mb-3 text-mobiFormGray">Phone Number</p>
                      <Input
                        icon="phone.svg"
                        type="tel"
                        name="phoneNumber"
                        register={register}
                        rules={{ required: "Phone Number is required" }}
                        errors={errors}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Date of Birth (Optional)
                    </p>
                    <Input
                      icon="human.svg"
                      type="date"
                      name="dateOfBirth"
                      disableFutureDates
                      register={register}
                      placeholder="Enter your date of birth"
                    />
                  </div>

                  <div className="flex flex-col gap-6 my-1">
                    <div className="flex flex-col items-center gap-3">
                      <p className="-mb-3 text-mobiFormGray">
                        Upload Profile Photo
                      </p>
                      <label
                        htmlFor="profile-upload"
                        className="relative cursor-pointer"
                      >
                        <div className="w-28 h-28 rounded-full border-2 border-gray-600 flex items-center justify-center overflow-hidden bg-gray-900 hover:opacity-80 transition">
                          {uploadedPhoto ? (
                            <img
                              src={uploadedPhoto}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Camera className="text-white w-8 h-8" />
                          )}
                        </div>
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-gray-400 text-sm">
                        {!isLoadingUpload
                          ? "Click to set profile photo"
                          : "Uploading profile photo"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="-mb-3 text-mobiFormGray">Username</p>
                    <Input
                      icon="human.svg"
                      type="text"
                      name="username"
                      register={register}
                      rules={{ required: "Username is required" }}
                      errors={errors}
                      placeholder="Enter your preferred username"
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="-mb-3 text-mobiFormGray">Password</p>
                    <Input
                      icon="padlock.svg"
                      name="password"
                      register={register}
                      rules={{ required: "Password is required" }}
                      errors={errors}
                      type="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <span className="flex">
                        <Checkbox
                          name="acceptedTnC"
                          label={
                            <>
                              <span>I agree to the</span>{" "}
                              <Link to={"/legal#Terms"} className="underline">
                                Terms & Conditions
                              </Link>{" "}
                              <span>and</span>{" "}
                              <Link to={"/legal"} className="underline">
                                Privacy Policy
                              </Link>
                            </>
                          }
                          register={register}
                          rules={{ required: "Terms & Conditions is required" }}
                          errors={errors}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-mobiPink w-full p-5 rounded-full"
                    >
                      {isLoading ? "Submitting..." : "Sign Up"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex w-full justify-center">
              <p className="lg:text-base md:text-base text-[12px]">
                Already have an account ?
                <Link
                  className="text-mobiBlue font-semibold mx-1"
                  to={"/login"}
                >
                  Login
                </Link>
              </p>{" "}
            </div>
          </div>
        </div>

        {/** Dark Theme */}
        <div className="absolute flex w-full">
          <div className="flex w-full relative justify-end">
            <div className="max-w-[11rem] top-[2%] p-3 w-full flex">
              <Theme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
