import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import { Button } from "@material-tailwind/react";
import RangeSlider from "../../../components/RangeSlider";
import DropdownMenu from "../../../components/DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import AuthSideBar from "../../../components/AuthSideBar";
import Theme from "../../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setOrg } from "../../../reducers/organisationSlice";
import Checkbox from "../../../components/CheckBox";
import MultipleSelect from "../../../components/MultipleSelect";
import useFileUpload from "../../../api/hooks/useFileUpload";

export default function OrgInfoSetUp({ moveNext }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [payload, setPayload] = useState({});
    const [errorAccess, setErrorAccess] = useState(false);
    const fileInputRef = useRef(null);
    const { uploadFiles, isLoadingUpload } = useFileUpload();
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const [btnDisabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const moveTo = (data) => {
        setPayload((prevPayload) => {
            const { country, state, street, ...restData } = data;
            const updatedPayload = {
                ...prevPayload,
                ...restData,
                companyAddress: {
                    country,
                    state,
                    street,
                },
                photo: uploadedPhoto
            };

            // Perform actions using the updated payload
            if (!updatedPayload.natureOfOrganisation) {
                setErrorAccess(true);
            } else {
                setErrorAccess(false);
                dispatch(setOrg(updatedPayload)); // Use updatedPayload here
                moveNext();
            }

            return updatedPayload; // Update the payload state
        });
    };

    const handleAccessType = (data) => {
        setPayload((prevPayload) => ({
            ...prevPayload,
            natureOfOrganisation: data,
        }));
    }


    const handleButtonClick = () => {
        // Simulate a click on the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
        setDisabled(true);
        if (files.length > 0) {
            await uploadFiles(files, (uploadedUrl) => {
                setUploadedPhoto(uploadedUrl);
                setDisabled(false)
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
                            <div className='flex gap-3 flex-grow'>
                                <Link to={'/signup'} className="w-full flex gap-3">
                                    <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                                    <div className='flex flex-col justify-center'>
                                        <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex">
                                <DropdownMenu buttonLabel="Organisation" color="#A324F2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiPink border rounded-md border-mobiPink">
                                    <Link to={'/signup/individual'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Individual
                                    </Link>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Sign Up as Organisation</p>

                            <div className="py-4 px-3 bg-mobiDarkRoamn flex w-full gap-6">
                                <div className="flex flex-col gap-2 w-auto">
                                    <p className="bs-mobiCeramaic text-base uppercase">Step 1</p>
                                    <p className="bs-mobiCeramaic text-sm">Organization Info</p>
                                </div>
                                <div className="lg:flex md:flex hidden flex-grow flex-col justify-center">
                                    <RangeSlider value={50} />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(moveTo)} autoComplete="off">
                                <div className="mb-1 flex flex-col gap-6 mt-5">
                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Name
                                        </p>
                                        <Input icon="company.svg" type="text" name="companyName" register={register}
                                            rules={{ required: 'Company Name is required' }} errors={errors} placeholder="Enter your company name" />
                                    </div>


                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Phone Number
                                        </p>
                                        <Input icon="phone.svg" type="tel" name="phoneNumber" register={register}
                                            rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter company phone number" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Address
                                        </p>
                                        <Input icon="address.svg" type="text" name="street" register={register}
                                            rules={{ required: 'Company Address is required' }} errors={errors} placeholder="Enter your address" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Country
                                            </p>
                                            <Input icon="human.svg" type="text" name="country" register={register}
                                                rules={{ required: 'Country is required' }} errors={errors} placeholder="Choose your country" />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                State
                                            </p>
                                            <Input icon="human.svg" type="text" name="state" register={register}
                                                rules={{ required: 'State is required' }} errors={errors} placeholder="Choose your state" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Email (Optional)
                                        </p>
                                        <Input icon="email.svg" type="email" name="companyEmail" register={register}
                                            placeholder="Enter organisation email" />
                                    </div>


                                    <div className="flex flex-col gap-6 my-2">
                                        <p className="-mb-3 text-mobiFormGray">
                                            About Company (Optional)
                                        </p>
                                        <Input type="text" name="aboutCompany" register={register}
                                            placeholder="Tell us about your company" />
                                    </div>

                                    <div className="flex flex-col gap-6 my-1">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Organisation Access Type
                                        </p>
                                        <MultipleSelect accessType={handleAccessType} />
                                        {errorAccess &&
                                            <p className="-mt-3" style={{ color: 'red' }}>
                                                Select Organisation Access Type
                                            </p>
                                        }
                                    </div>

                                    <div className="flex flex-col gap-6 my-1">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Upload Profile Photo
                                        </p>
                                        <div className="flex md:flex-row flex-col gap-3">
                                            {uploadedPhoto &&
                                                <div className="flex w-32 h-32">
                                                    <img src={`${uploadedPhoto}`} className="w-full h-full object-cover rounded-full" />
                                                </div>
                                            }
                                            <div className="flex flex-col justify-center md:mx-3">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    style={{ display: "none" }}
                                                    multiple
                                                />
                                                <Button className="bg-transparent px-7 rounded-full border-[0.5px] border-gray-700"
                                                    onClick={handleButtonClick}
                                                    disabled={isLoadingUpload}
                                                >
                                                    {isLoadingUpload ? 'Uploading Picture' : 'Click to Set Profile Picture'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start">
                                        <div className="flex gap-1">
                                            <span className="flex">
                                                <Checkbox
                                                    name="acceptedTnC"
                                                    label="I agree to the Terms & Conditions and Privacy Policy"
                                                    register={register}
                                                    rules={{ required: 'Terms & Conditions is required' }}
                                                    errors={errors}
                                                />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button className="bg-mobiPink w-full p-5 rounded-full" disabled={btnDisabled} type="submit">Proceed</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/** Dark Theme */}
                <div className="absolute flex w-full">
                    <div className='flex w-full relative justify-end'>
                        <div className='max-w-[11rem] top-[2%] p-3 w-full flex'>
                            <Theme />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}