import React from 'react';
import CardType from '../../components/CardType';
import 'animate.css';
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <>
            <div className='w-full h-screen flex justify-center animate__animated animate__fadeIn'>
                <div className='lg:w-3/5 md:w-3/5 w-full px-6 h-screen flex flex-col gap-3 lg:gap-7 md:gap-7 lg:py-0 md:py-0 justify-center'>
                    <div className='flex justify-center gap-3'>
                        <img src="/mobiHolder.svg" alt="Logo" className="w-[32px] h-[32px] object-contain" />
                        <div className='flex flex-col justify-center'>
                            <span className='text-xl mt-1 font-semibold'>MobiHolder</span>
                        </div>
                    </div>

                    <div className='w-full flex justify-center my-1'>
                        <p className='lg:text-2xl text-base font-[500]'>Welcome! Choose a user type to Sign Up as : </p>
                    </div>

                    <div className='w-full h-auto relative flex justify-center items-center my-4'>
                        <div className='w-full flex flex-col lg:flex-row md:flex-row lg:justify-center md:justify-center gap-6 lg:gap-10 md:gap-10'>
                            <div className='w-full flex flex-col h-full'>
                            <CardType type="Individual"
                                text="This account type is for regular users"
                                    link='/signup/individual'
                            />
                        </div>

                        <div className='w-full flex flex-col h-full'>
                            <CardType type="Organisation"
                                text="This account type is for companies and organizations"
                                    link='/signup/organisation'
                            />
                        </div>
                    </div>
                </div>

                    <div className='w-full flex justify-center my-1'>
                        <div className='lg:max-w-md md:max-w-md w-full flex rounded-2xl p-5 bs-boxAccount justify-center border' style={{ borderColor: 'rgba(22, 24, 61, 0.2)' }}>
                            <p className='lg:text-base md:text-base text-[12px]'>Already have an account ? Proceed to
                                <Link className='text-mobiBlue font-semibold mx-1' to={'/login'}>Login</Link>
                            </p>
                        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;
