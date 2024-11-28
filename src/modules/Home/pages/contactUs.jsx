import Header from "../layouts/Header";
import springRollerImage from "../../../assets/spring-ball-roller.gif"
import Footer from "../layouts/Footer";
import { Button } from "@material-tailwind/react";



const ContactForm = () => {
    return (
        <div className="flex items-center justify-center md:px-4 py-3">
            <form className="md:px-6 px-3 rounded-lg w-full max-w-lg space-y-6">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-200" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full mt-2 p-3 bg-white text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                {/* Location Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-200" htmlFor="location">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Choose your location"
                        className="w-full mt-2 p-3 bg-white text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                {/* Phone Number Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-200" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full mt-2 p-3 bg-white text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                {/* Subject Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-200" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        id="subject"
                        type="text"
                        placeholder="Enter the subject of your message"
                        className="w-full mt-2 p-3 bg-white text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                {/* Message Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-200" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        placeholder="Enter your message"
                        rows="4"
                        className="w-full mt-2 p-3 bg-white text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                {/* Submit Button */}
                <Button className="rounded-full w-full text-center flex justify-center bg-mobiPink">
                    <span className="normal-case flex text-base gap-1">Send Message
                        <span className="flex flex-col justify-center pt-[1.5px]">
                            <svg width="25" height="7" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.0073 4.25L19.4255 0.0647949L19.5919 8.72345L27.0073 4.25ZM1.00706 5.49986L20.273 5.12957L20.2442 3.62985L0.978233 4.00014L1.00706 5.49986Z" fill="white" />
                            </svg>
                        </span>
                    </span>
                </Button>
            </form>
        </div>
    );
};




export default function ContactUs() {
    return (
        <>
            <div className="flex flex-col w-full h-full animate__animated animate__fadeIn">
                <div className="w-full h-full relative">
                    <div className="absolute bg-cover bg-center md:top-[0px] top-[20px] w-full h-full" style={{ backgroundImage: `url(${springRollerImage})` }}></div>
                    <div className="absolute w-full md:top-[0px] top-[20px] h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                    <Header />
                    <div className="w-full lg:mt-10 md:mt-10 mt-[40px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                        <p className="md:text-5xl text-3xl text-white font-bold mb-5 md:leading-[90px]">Contact Us</p>
                    </div>
                </div>

                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row justify-center flex-col gap-8 md:py-14 md:px-32 px-2 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>

                        <div className="w-full my-10 md:w-4/5 gap-5 flex md:flex-row rounded-3xl flex-col py-8 md:px-5 px-3 bg-[rgba(13,21,29,1)]">
                            <div className="w-full py-6 px-5 md:px-7 h-full contact-gradient rounded-3xl flex flex-col gap-3">
                                <p className="my-2 text-xl text-white font-semibold">
                                    Contact Information
                                </p>
                                <p className="text-base text-white">
                                    We are here to help make your experience convenient and smooth, shoot us a mail today
                                </p>
                                <div className="flex flex-col mt-10 gap-10">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col justify-center">
                                            <svg width="30" height="31" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1079 0.5C16.8345 0.5 23.741 16.0396 23.741 17.7662C23.741 21.2194 18.5611 24.6727 16.8345 28.1259C15.1079 31.5791 18.5611 35.0324 22.0144 38.4856C23.3612 39.8324 28.9209 45.3921 32.3741 43.6655C35.8273 41.9388 39.2806 36.759 42.7338 36.759C44.4604 36.759 60 43.6655 60 45.3921C60 52.2986 54.8201 57.4784 49.6403 59.205C44.4604 60.9317 41.0072 60.9317 34.1007 59.205C27.1942 57.4784 22.0144 55.7518 13.3813 47.1187C4.7482 38.4856 3.02158 33.3058 1.29496 26.3993C-0.431655 19.4928 -0.431655 16.0396 1.29496 10.8597C3.02158 5.67986 8.20144 0.5 15.1079 0.5Z" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-base text-white">
                                                0700 000 0000
                                            </p>
                                            <p className="text-base text-white">
                                                0700 000 0000
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex flex-col justify-center">
                                            <svg width="30" height="20" viewBox="0 0 57 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M51.3 0.5H5.7C2.565 0.5 0.0285 3.0875 0.0285 6.25L0 40.75C0 43.9125 2.565 46.5 5.7 46.5H51.3C54.435 46.5 57 43.9125 57 40.75V6.25C57 3.0875 54.435 0.5 51.3 0.5ZM50.16 12.7188L30.0105 25.4263C29.0985 26.0012 27.9015 26.0012 26.9895 25.4263L6.84 12.7188C6.55422 12.5569 6.30397 12.3383 6.10438 12.0761C5.9048 11.8138 5.76003 11.5135 5.67884 11.1932C5.59765 10.8729 5.58173 10.5393 5.63205 10.2126C5.68236 9.88595 5.79786 9.57296 5.97155 9.29261C6.14525 9.01227 6.37352 8.77039 6.64257 8.58161C6.91161 8.39284 7.21583 8.2611 7.53681 8.19436C7.85779 8.12762 8.18886 8.12728 8.50997 8.19335C8.83109 8.25942 9.13557 8.39053 9.405 8.57875L28.5 20.625L47.595 8.57875C47.8644 8.39053 48.1689 8.25942 48.49 8.19335C48.8111 8.12728 49.1422 8.12762 49.4632 8.19436C49.7842 8.2611 50.0884 8.39284 50.3574 8.58161C50.6265 8.77039 50.8548 9.01227 51.0284 9.29261C51.2021 9.57296 51.3176 9.88595 51.368 10.2126C51.4183 10.5393 51.4023 10.8729 51.3212 11.1932C51.24 11.5135 51.0952 11.8138 50.8956 12.0761C50.696 12.3383 50.4458 12.5569 50.16 12.7188Z" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-base text-white">
                                                infomobiholder@gmail.com
                                            </p>
                                            <p className="text-base text-white">
                                                mobisupport@gmail.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex flex-col justify-center">
                                            <svg width="21" height="41" viewBox="0 0 51 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M25.5 33.725C23.0846 33.725 20.7682 32.79 19.0603 31.1256C17.3524 29.4612 16.3929 27.2038 16.3929 24.85C16.3929 22.4962 17.3524 20.2388 19.0603 18.5744C20.7682 16.91 23.0846 15.975 25.5 15.975C27.9154 15.975 30.2318 16.91 31.9397 18.5744C33.6476 20.2388 34.6071 22.4962 34.6071 24.85C34.6071 26.0155 34.3716 27.1696 33.9139 28.2463C33.4562 29.3231 32.7854 30.3015 31.9397 31.1256C31.094 31.9497 30.0901 32.6034 28.9852 33.0494C27.8802 33.4954 26.696 33.725 25.5 33.725ZM25.5 0C18.737 0 12.251 2.61812 7.46878 7.2784C2.6866 11.9387 0 18.2594 0 24.85C0 43.4875 25.5 71 25.5 71C25.5 71 51 43.4875 51 24.85C51 18.2594 48.3134 11.9387 43.5312 7.2784C38.749 2.61812 32.263 0 25.5 0Z" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-base text-white">
                                                Lekki , Lagos
                                            </p>
                                            <p className="text-base text-white">
                                                London, UK
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/** CONTACT FORM BLOCK */}

                            <div className="w-full h-full flex flex-col">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}