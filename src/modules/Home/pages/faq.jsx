import { Accordion, AccordionBody, AccordionHeader, Button } from "@material-tailwind/react";
import Header from "../layouts/Header";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import Footer from "../layouts/Footer";
import useApiMutation from "../../../api/hooks/useApiMutation";

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

export default function FAQ() {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [faqCategories, setFaqCategories] = useState([]);

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
                // Set the first category as active by default if available
                if (response.data.data.length > 0) {
                    setActiveTab(response.data.data[0].name);
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

    // Get the currently active category's FAQs
    const activeCategory = faqCategories.find(cat => cat.name === activeTab);
    const activeFaqs = activeCategory?.faqs || [];

    return (
        <>
            <div className="flex flex-col w-full animate__animated animate__fadeIn">
                <div className="w-full h-full relative">
                    <div
                        className="absolute bg-cover bg-center md:top-[0px] top-[20px] w-full h-full"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)` }}
                    />
                    <div className="absolute w-full h-full md:top-[0px] top-[20px]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                    <Header />
                    <div className="w-full lg:mt-10 md:mt-10 mt-[40px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                        <p className="md:text-5xl text-3xl text-white font-bold mb-5 md:leading-[90px]">FAQs</p>
                    </div>
                </div>

                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 md:px-32 px-6 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="w-full flex justify-center">
                            <div className="flex flex-col w-full items-center gap-8">
                                <div className="md:w-3/5 flex flex-col md:gap-8 gap-5">
                                    <p className="md:text-4xl text-2xl font-bold w-full my-4 text-center text-black">Frequently Asked Questions</p>

                                    <p className="md:text-lg text-base font-[500] text-center text-black -mt-3 mb-3 md:leading-[40px] leading-[30px]">
                                        Here are some of the questions we are asked most often. If you need additional help you can also contact support below
                                    </p>

                                    <div className="w-full flex justify-center mb-6">
                                        <Button className="rounded-full w-auto bg-mobiPink">
                                            <span className="normal-case flex text-base gap-1">Contact Support
                                                <span className="flex flex-col justify-center pt-[1.5px]">
                                                    <svg width="25" height="7" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M27.0073 4.25L19.4255 0.0647949L19.5919 8.72345L27.0073 4.25ZM1.00706 5.49986L20.273 5.12957L20.2442 3.62985L0.978233 4.00014L1.00706 5.49986Z" fill="white" />
                                                    </svg>
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="w-4/5 md:my-5 my-5 flex flex-col gap-4">
                                    <Tabs
                                        categories={faqCategories}
                                        activeTab={activeTab}
                                        onTabChange={handleTabChange}
                                    />
                                </div>

                                <div className="md:w-3/5 mb-10 flex flex-col md:gap-8 gap-5">
                                    {activeFaqs.length > 0 ? (
                                        activeFaqs.map((faq, index) => (
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
                <Footer />
            </div>
        </>
    );
}