import React from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import DropdownMenu from "../../components/DropdownMenu";
import AuthSideBar from "../../components/AuthSideBar";
import Theme from "../../components/Theme";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";
import { setUser } from "../../reducers/userSlice";
import { toast } from "react-toastify";

export default function IndividualSignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (userData) => apiClient.post('/api/users/auth/register/individual', userData),
        onSuccess: (data) => {
            dispatch(setUser(data.data.data));
            toast.success(data.data.message);
            navigate('/verify-email');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const createAccount = (data) => {
        mutation.mutate(data);
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
                                <DropdownMenu buttonLabel="Individual" color="#242EF2" btnClass="inline-flex justify-center w-full px-4 h-full py-1 gap-3 font-medium text-mobiBlue border rounded-md border-mobiBlue">
                                    <Link to={'/signup/organisation'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Organisation
                                    </Link>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="bS-borderRay py-7 px-5 w-full flex rounded-xl flex-col gap-3">
                            <p className="lg:text-xl md:text-xl text-lg font-semibold">Sign Up as Individual</p>

                            <form onSubmit={handleSubmit(createAccount)}>
                                <div className="mb-1 flex flex-col gap-6 mt-5">
                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                First name
                                            </p>
                                            <Input icon="human.svg" name="firstName" register={register}
                                                rules={{ required: 'First Name is required' }} errors={errors} type="text" placeholder="Enter your first name" />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Last name
                                            </p>
                                            <Input icon="human.svg" type="text" name="lastName" register={register}
                                                rules={{ required: 'Last Name is required' }} errors={errors} placeholder="Enter your last name" />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Email
                                            </p>
                                            <Input icon="email.svg" type="email" name="email" register={register}
                                                rules={{ required: 'Email is required' }} errors={errors} placeholder="Enter your email" />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Phone Number
                                            </p>
                                            <Input icon="phone.svg" type="tel" name="phoneNumber" register={register}
                                                rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Enter your phone number" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Date of Birth (Optional)
                                        </p>
                                        <Input icon="human.svg" type="date" name="dateOfBirth" register={register}
                                            placeholder="Enter your date of birth" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Username
                                        </p>
                                        <Input icon="human.svg" type="text" name="username" register={register}
                                            rules={{ required: 'Username is required' }} errors={errors} placeholder="Enter your preferred username" />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Password
                                        </p>
                                        <Input icon="padlock.svg" name="password" register={register}
                                            rules={{ required: 'Password is required' }} errors={errors} type="password" placeholder="Password" />
                                    </div>

                                    <div className="flex justify-start">
                                        <div className="flex gap-2">
                                            <span className="flex">
                                                <Checkbox name="acceptedTnC" register={register}
                                                    rules={{ required: 'This is required' }} errors={errors} />
                                            </span>
                                            <span className="flex flex-col justify-center">I agree to the Terms & Conditions and Privacy Policy</span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={mutation.isLoading} className="bg-mobiPink w-full p-5 rounded-full">
                                            {mutation.isLoading ? 'Submitting...' : 'Sign Up'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex w-full justify-center">
                            <p className='lg:text-base md:text-base text-[12px]'>Already have an account ?
                                <Link className='text-mobiBlue font-semibold mx-1' to={'/login'}>Login</Link>
                            </p>                        </div>
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