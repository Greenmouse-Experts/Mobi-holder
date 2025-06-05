import { Accordion, AccordionBody, AccordionHeader, Button, Input } from "@material-tailwind/react";
import iPhone from "../../../assets/iPhone16_markup.png";
import authGroup from "../../../assets/auth-group.png";
import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";
import logoGradient from "../../../assets/logo-gradient.png";
import { useEffect, useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Tabs from "../pages/components/tabs";
import { Controller, useForm } from "react-hook-form";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export default function ModuleAccess() {
    const [open, setOpen] = useState(0);

    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [faqCategories, setFaqCategories] = useState([]);
    const [filteredFaqCategories, setFilteredFaqCategories] = useState([]);
    const [tab, setTab] = useState("individual");

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const { mutate } = useApiMutation();

    useEffect(() => {
        getFaqCategories();
    }, []);

    const getFaqCategories = () => {
        mutate({
            url: "/api/admins/public/faq-categories",
            method: "GET",
            hideToast: true,
            onSuccess: (response) => {
                setFaqCategories(response.data.data);
                const filteredCategories = response.data.data.filter((x) => x.type === tab);
                setFilteredFaqCategories(filteredCategories);
                if (response.data.data.length > 0) {
                    setActiveTab(filteredCategories[0].name);
                }
            },
            onError: (error) => {
                console.error("Error fetching FAQ categories:", error);
            },
        });
    };

    const handleAccordionOpen = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setActiveAccordion(null); // Reset accordion when changing tabs
    };


    const handleTypeChange = (newTab) => {
        if (newTab !== tab) {
            setTab(newTab);
            const filteredCategories = faqCategories.filter((x) => x.type === newTab);
            setFilteredFaqCategories(filteredCategories);
            setActiveTab(filteredCategories[0].name);
        }
    };


    // Get the currently active category's FAQs
    const activeCategory = filteredFaqCategories.find(cat => cat.name === activeTab);
    const activeFaqs = activeCategory?.faqs || [];




    const subscribeNewsLetter = (data) => {
        mutate({
            url: "/api/admins/public/submit/newsletter",
            method: "POST",
            data: data,
            onSuccess: (response) => {
                 reset({ email: "" });
                // Optionally, show a success message or reset the form
            },
            onError: (error) => {
                console.error("Subscription error:", error);
                // Optionally, show an error message
            },
        });
    }




    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full h-full flex flex-col gap-8 md:py-10 lg:px-28 xl:px-52 md:px-20 relative bg-[rgba(2,13,17,1)]">
                    <div className="w-full h-full relative flex flex-col py-10">
                        <div className="flex justify-center w-full">
                            <img src="/section-oval.png" className="md:w-3/5" />
                        </div>
                        <div className="w-full flex flex-col -mt-20 sm:-mt-52 xl:-mt-72 gap-20 gradient-layout">
                            <div className="w-full flex justify-center">
                                <div className="md:w-3/5 w-full text-center">
                                    <span className="text-4xl md:text-5xl md:leading-[70px] w-full text-center font-bold text-white">
                                        Why Individuals and SMEs choose us
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex md:px-7">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-darkBlue text-white">
                                    {/* Card 1 */}
                                    <div className="bg-gradient-to-r from-custom-dark to-custom-light p-6 rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-semibold mb-2">Easy Sign Up</h2>
                                        <p className="text-sm text-gray-400 mb-6">
                                            Choose a user type and get started in seconds with our simple and user-friendly sign-up process. Start exploring without any hassle!
                                        </p>
                                        <div className="flex items-center justify-between bg-gradient-to-r from-inner-light to-outer-light p-4 rounded-lg">
                                            <div className="w-full flex flex-col gap-3">
                                                <div className="w-full flex gap-3 justify-center">
                                                    <img src="/user_connect.png" />
                                                </div>
                                                <div className="w-full flex">
                                                    <img src="/shimmer-fade.png" />
                                                </div>
                                                <div className="w-full flex">
                                                    <img src="/signup-frame.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="bg-gradient-to-r from-custom-dark to-custom-light p-6 flex flex-col rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-semibold mb-2">Never lose your IDs</h2>
                                        <p className="text-sm text-gray-400 mb-6">
                                            Keep all your important IDs safe and accessible in one secure place. Our platform allows you to store, organize, and retrieve your IDs effortlessly.
                                        </p>
                                        <div className="flex items-center mt-auto justify-between bg-gradient-to-r from-inner-light to-outer-light p-4 rounded-lg">
                                            <img src="/frame_2.png" />
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="bg-gradient-to-r from-custom-dark to-custom-light p-6 flex flex-col rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-semibold mb-2">24/7 Customer Support</h2>
                                        <p className="text-sm text-gray-400 mb-6">
                                            You’ll receive regular reports on your privacy status and any outstanding threats. If new records become associated with you, we will send you an alert.
                                        </p>
                                        <div className="flex flex-col rounded-lg">
                                            <div className="w-1/4"><img src="/security-validation.png" /></div>
                                            <div className="flex mt-auto w-full justify-end">
                                                <div className="bg-gradient-to-r from-inner-light to-outer-light rounded-lg flex w-3/4">
                                                    <img src="/frame_67.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="md:col-span-2 bg-gradient-to-r from-custom-dark to-custom-light flex md:flex-row flex-col gap-3 p-6 rounded-xl shadow-lg">
                                        <div className="md:w-[60%] w-full flex flex-col gap-1">
                                            <h2 className="text-2xl font-semibold mb-2">Revenue from Subscriptions Module</h2>
                                            <p className="text-sm text-gray-400 mb-6">
                                                Unlock a steady revenue stream by offering subscription-based access to your organization. Our platform’s subscription module allows you to create flexible plans that cater to different user needs.
                                            </p>
                                        </div>
                                        <div className="md:w-[40%] w-full flex rounded-lg">
                                            <img src="/fram-6-7.png" className="w-full h-full object-fit-contain" />
                                        </div>
                                    </div>

                                    {/* Card 5 */}
                                    <div className="bg-gradient-to-r from-custom-dark to-custom-light p-6 flex flex-col rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-semibold mb-2">Join Us Today</h2>
                                        <p className="text-sm text-gray-400 mb-6">
                                            Enjoy these benefits as you become a Mobiholder user today
                                        </p>
                                        <button className="bg-purple-500 px-6 py-3 w-full text-center font-semibold rounded-full">Get Started →</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="w-full h-full relative flex flex-col">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029467/mobiHolder/mobiHolder_home/string-block_rhlhzf.gif)` }}></div>
                    <div className="md:w-[63%] xl:w-1/3 w-full flex flex-col xl:mx-72 relative md:py-24 mt-10 xl:px-0 lg:px-44 md:px-20 px-6 gap-5 z-50">
                        <span className="md:text-5xl text-3xl font-bold md:leading-[60px] gradient-text">Ready to unlock your Management potential?</span>
                        <span className="text-base leading-[30px] text-white">
                            Take control of your team, tasks,
                            and performance with streamlined management tools.
                            Boost productivity, enhance collaboration, and watch your business thrive!
                        </span>
                        <div className="w-full flex">
                            <div className="lg:w-2/5 md:w-2/5 w-full flex mb-8">
                                <Button className="rounded-full w-auto bg-mobiDarkBlue">
                                    <span className="normal-case flex gap-1">Get Started
                                        <span className="flex flex-col justify-center pt-[1.5px]">
                                            <svg width="25" height="7" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.0073 4.25L19.4255 0.0647949L19.5919 8.72345L27.0073 4.25ZM1.00706 5.49986L20.273 5.12957L20.2442 3.62985L0.978233 4.00014L1.00706 5.49986Z" fill="white" />
                                            </svg>
                                        </span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 xl:px-72 md:px-32 py-10 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="flex md:w-2/5 w-full md:justify-start justify-center">
                            <img src={iPhone} className="md:w-[400px] w-[200px]" />
                            <img src={authGroup} className="absolute z-50 md:flex hidden bottom-20 left-16 xl:left-64 w-[460px]" />
                        </div>
                        <div className="flex md:w-1/2 flex-col gap-4 md:py-12 md:px-0 px-7 text-black">
                            <p className="md:text-5xl text-2xl font-bold">Download the App</p>
                            <p className="text-sm leading-[35px]">
                                Experience seamless access to all our features right at your fingertips!
                                Download the mobile app now and enjoy convenience, real-time updates, and a user-friendly interface wherever you go.
                            </p>
                            <div className="flex gap-5">
                                <img src={playStore} className="md:w-[400px] w-[120px]" />
                                <img src={appleStore} className="md:w-[400px] w-[120px]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-8 md:py-14 md:px-32 xl:px-72 relative gap-7 px-6" style={{ backgroundColor: 'rgba(2, 13, 17, 1)' }}>
                    <div className="w-full flex md:flex-row py-10 md:gap-10 gap-5 flex-col">
                        <div className="flex w-full flex-col gap-2">
                            <span className="md:text-5xl text-3xl font-bold leading-[60px] gradient-text">Stay In the Loop</span>
                            <span className="text-base leading-[30px] text-white">
                                Never miss an update! Subscribe for the latest news, tips, and insights.
                            </span>
                        </div>
                        <div className="flex w-full py-3">
                            <form className="relative flex w-full max-w-[30rem]" onSubmit={handleSubmit(subscribeNewsLetter)}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue={''}
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            label="Email Address"
                                            className="pr-20 bg-white"
                                            containerProps={{
                                                className: "min-w-0",
                                            }}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm absolute -bottom-5 left-0">{errors.email.message}</p>
                                )}

                                <Button
                                    size="sm"
                                    type="submit"
                                    className="!absolute bg-mobiBlue right-1 top-1 rounded"
                                >
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="w-full flex md:flex-row flex-col gap-10">
                        <div className="flex flex-col w-full justify-center">
                            <img src="/conference.png" className="w-[500px]" />
                        </div>
                        <div className="flex flex-col w-full gap-8">
                            <div className="w-full flex flex-wrap gap-x-4 gap-y-4">
                                <Button className="bg-transparent md:w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
                                    Business Tools
                                </Button>
                                <Button className="bg-transparent md:w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
                                    Productivity Hacks
                                </Button>
                                <Button className="bg-transparent md:w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
                                    Team Management
                                </Button>
                            </div>
                            <div className="w-full flex flex-col gap-4">
                                <p className="font-[500] text-xl text-white">
                                    The Power of Real-Time Sales Analytics for Growth
                                </p>
                                <p className="text-base text-white">
                                    In the age of data, businesses can no longer afford to rely on guesswork. Real-time sales analytics provide critical insights into your business performance,
                                    enabling you to make informed, data-driven decisions.
                                    These tools allow you to track sales trends, monitor customer behaviors, and evaluate the effectiveness of marketing strategies in real time.
                                    With detailed reports and analytics, you can refine your product offerings, focus your marketing efforts, and identify areas for operational improvement.
                                    This blog explains the transformative impact of sales analytics on business growth, showing how companies that leverage this data outperform their competitors by making smarter, faster decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] border my-4" style={{ borderColor: 'rgba(30, 55, 55, 1)' }} />

                    <div className="flex flex-col gap-2 w-full">
                        <span className="md:text-5xl text-3xl font-bold md:leading-[60px] gradient-text">
                            Trusted by Top Brands
                        </span>
                        <span className="text-base leading-[30px] text-white">
                            We take pride in being the go-to solution for some of the world’s top brands.
                        </span>
                    </div>

                    <div className="w-full flex md:my-0 my-3">
                        <img src={logoGradient} />
                    </div>
                </div>


                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 md:px-32 px-6 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="w-full flex justify-center">
                            <div className="md:w-3/4 flex flex-col md:gap-8 gap-5">
                                <p className="md:text-4xl text-2xl font-bold w-full my-4 text-center text-black">Frequently Asked Questions</p>
                                <div className="w-full md:my-5 my-5 flex flex-col gap-4">

                                    <div className="flex justify-center gap-4 mb-7">
                                        <button
                                            onClick={() => handleTypeChange("individual")}
                                            className={`px-4 py-2 rounded-full font-semibold ${tab === "individual"
                                                ? "bg-black text-white"
                                                : "bg-transparent border border-white text-black"
                                                }`}
                                        >
                                            Individual Account Type
                                        </button>
                                        <button
                                            onClick={() => handleTypeChange("organization")}
                                            className={`px-4 py-2 rounded-full font-semibold ${tab === "organization"
                                                ? "bg-black text-white"
                                                : "bg-transparent border border-white text-black"
                                                }`}
                                        >
                                            Organization Account Type
                                        </button>
                                    </div>

                                    <Tabs
                                        categories={filteredFaqCategories}
                                        activeTab={activeTab}
                                        onTabChange={handleTabChange}
                                    />
                                </div>

                                <div className="w-full mb-10 flex flex-col md:gap-8 gap-5">
                                    {activeFaqs.length > 0 ? (
                                        activeFaqs.slice(0, 4).map((faq, index) => (
                                            <Accordion
                                                key={faq.id}
                                                open={activeAccordion === index}
                                                icon={<Icon id={index} open={activeAccordion} />}
                                            >
                                                <AccordionHeader onClick={() => handleAccordionOpen(index)}>
                                                    {faq.question}
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    <span className="text-base montserrat font-normal">{faq.answer}</span>
                                                </AccordionBody>
                                            </Accordion>
                                        ))
                                    ) : (
                                        <p className="text-center py-4 text-gray-500">
                                            No FAQs available for this category
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}