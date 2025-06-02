import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import { Button } from "@material-tailwind/react";
import RangeSlider from "../../../components/RangeSlider";
import DropdownMenu from "../../../components/DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import AuthSideBar from "../../../components/AuthSideBar";
import Theme from "../../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../../../reducers/organisationSlice";
import Checkbox from "../../../components/CheckBox";
import MultipleSelect from "../../../components/MultipleSelect";
import useFileUpload from "../../../api/hooks/useFileUpload";
import { Camera } from "lucide-react";
import { State, Country } from "country-state-city";
import { toast } from "react-toastify";


export default function OrgInfoSetUp({ moveNext }) {
    const user = useSelector((state) => state.orgData.signUpData);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [payload, setPayload] = useState({});
    const [errorAccess, setErrorAccess] = useState(false);
    const fileInputRef = useRef(null);
    const { uploadFiles, isLoadingUpload } = useFileUpload();
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const [btnDisabled, setDisabled] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [states, setStates] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const countries = Country.getAllCountries();


    const handleCountryChange = (isoCode) => {
        if (!isoCode) return;
        const country = countries.find((c) => c.name === isoCode);
        setSelectedCountry(country);
        setSelectedState(null);
        setStates(State.getStatesOfCountry(country.isoCode));
    };

    const handleStateChange = (isoCode) => {
        if (!isoCode || !selectedCountry) return;

        const state = states.find((s) => s.name === isoCode);

        setSelectedState(state);
    };



    const moveTo = (data) => {
        if(!uploadedPhoto) {
            toast.error("Please upload an organization logo.");
            return;
        }
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
            if (!updatedPayload.natureOfOrganization) {
                setErrorAccess(true);
            } else {
                setErrorAccess(false);
                dispatch(setSignUpData(updatedPayload)); // Use updatedPayload here
                moveNext();
            }

            return updatedPayload; // Update the payload state
        });
    };

    const handleAccessType = (data) => {
        setPayload((prevPayload) => ({
            ...prevPayload,
            natureOfOrganization: data,
        }));
    }


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


    useEffect(() => {
        if (user)
            setUploadedPhoto(user.photo);
        setDisabled(false)
    }, [user]);


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
                                        <Input icon="company.svg" type="text" value={user?.companyName} name="companyName" register={register}
                                            rules={{ required: 'Company Name is required' }} errors={errors} placeholder="Enter your company name" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Address
                                        </p>
                                        <Input icon="address.svg" type="text" value={user?.companyAddress.street} name="street" register={register}
                                            rules={{ required: 'Company Address is required' }} errors={errors} placeholder="Enter your address" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Country
                                            </p>
                                            <Input
                                                icon="human.svg"
                                                type="select"
                                                name="country"
                                                value={selectedCountry?.isoCode}
                                                options={countries
                                                    .filter((country) => country.name === 'Nigeria') // only Nigeria
                                                    .map((country) => ({
                                                        value: country.name,
                                                        label: country.name
                                                    }))}
                                                onChange={handleCountryChange} // Add this line
                                                register={register}
                                                rules={{ required: 'Country is required' }}
                                                errors={errors}
                                                placeholder="Enter your country name"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                State
                                            </p>
                                            <Input
                                                icon="human.svg"
                                                type="select"
                                                name="state"
                                                value={selectedState?.isoCode}
                                                options={states.map((state) => ({
                                                    value: state.name,
                                                    label: state.name,
                                                }))}
                                                onChange={handleStateChange} // Add this line
                                                register={register}
                                                rules={{ required: 'State is required' }}
                                                errors={errors}
                                                placeholder="Select your state"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Registered Date (Optional)
                                        </p>
                                        <Input icon="company.svg" type="date" value={user?.dateOfBirth}
                                            name="dateOfBirth" disableFutureDates register={register}
                                            placeholder="Enter company registered date" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Company Email (Optional)
                                        </p>
                                        <Input icon="email.svg" type="email" value={user?.companyEmail} name="companyEmail" register={register}
                                            placeholder="Enter organisation email" />
                                    </div>


                                    <div className="flex flex-col gap-6 my-2">
                                        <p className="-mb-3 text-mobiFormGray">
                                            About Company (Optional)
                                        </p>
                                        <Input type="text" name="aboutCompany" value={user?.aboutCompany} register={register}
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

                                        <div className="flex flex-col items-center gap-3">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Upload Organization Logo
                                            </p>
                                            <label htmlFor="profile-upload" className="relative cursor-pointer">
                                                <div className="w-28 h-28 rounded-full border-2 border-gray-600 flex items-center justify-center overflow-hidden bg-gray-900 hover:opacity-80 transition">
                                                    {uploadedPhoto ? (
                                                        <img src={uploadedPhoto} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Camera className="text-white w-8 h-8" />
                                                    )}
                                                </div>
                                                <input id="profile-upload" type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                            </label>
                                            <p className="text-gray-400 text-sm">{!isLoadingUpload ? 'Click to set organization logo' : 'Uploading organization logo'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-start">
                                        <div className="flex gap-1">
                                            <span className="flex">
                                                <Checkbox
                                                    name="acceptedTnC"
                                                    label={<><span>I agree to the</span>{' '}<Link to={'/legal#Terms'} className="underline">Terms & Conditions</Link>{' '}<span>and</span>{' '}<Link to={'/legal'} className="underline">Privacy Policy</Link></>}
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