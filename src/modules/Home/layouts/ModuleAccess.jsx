import { Accordion, AccordionBody, AccordionHeader, Button, Input } from "@material-tailwind/react";
import stringBlock from "../../../assets/string-block.gif";
import iPhone from "../../../assets/iPhone16_markup.png";
import authGroup from "../../../assets/auth-group.png";
import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";
import logoGradient from "../../../assets/logo-gradient.png";
import { useState } from "react";

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

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full h-full flex flex-col gap-8 md:py-10 md:px-10 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                    <div className="w-full flex py-8 justify-center">
                        <div className="lg:w-1/3 md:w-2/5 w-full flex justify-center">
                            <span className="md:text-4xl text-2xl tracking-wide md:leading-[55px] leading-[50px] font-bold w-full text-center">
                                <span style={{ backgroundColor: 'rgba(205, 205, 251, 1)' }}>Verification</span> Module for
                                Access <span style={{ backgroundColor: 'rgba(205, 205, 251, 1)' }}>Control</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <img src="/access_wave.png" />
                    </div>
                    <div className="absolute md:flex hidden right-48 top-16">
                        <img src="/anigma-cell.gif" className="w-[100px]" />
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="lg:w-3/5 md:w-2/5 w-full flex justify-center">
                            <p className="text-base text-center">
                                Easily manage event access with our built-in verification module.
                                Assign personnel, control entry, and monitor access in real time to ensure secure and efficient event management.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="lg:w-2/5 md:w-2/5 w-full flex justify-center mb-8">
                            <Button className="w-1/2 rounded-full p-5 bg-mobiBlue">Learn More</Button>
                        </div>
                    </div>
                    <div className="absolute md:flex hidden bottom-10 left-20">
                        <img src="/golden-roller-ball.gif" className="w-[100px]" />
                    </div>
                </div>

                <div className="w-full h-full relative flex-col">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${stringBlock})` }}></div>
                    <div className="md:w-[63%] w-full flex flex-col relative md:py-28 mt-10 lg:px-44 md:px-20 px-6 gap-5 z-50">
                        <span className="md:text-5xl text-4xl font-bold leading-[60px] gradient-text">Ready to unlock your Management potential?</span>
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
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 md:px-32 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="flex md:w-2/5">
                            <img src={iPhone} style={{ width: '400px' }} />
                            <img src={authGroup} className="absolute z-50 bottom-20 left-16 w-[460px]" />
                        </div>
                        <div className="flex md:w-1/2 flex-col gap-4 md:py-12">
                            <p className="md:text-5xl text-2xl font-bold">Download the App</p>
                            <p className="text-sm leading-[35px]">
                                Experience seamless access to all our features right at your fingertips!
                                Download the mobile app now and enjoy convenience, real-time updates, and a user-friendly interface wherever you go.
                            </p>
                            <div className="flex gap-5">
                                <img src={playStore} />
                                <img src={appleStore} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-8 md:py-14 md:px-32 relative gap-10" style={{ backgroundColor: 'rgba(2, 13, 17, 1)' }}>
                    <div className="w-full flex md:flex-row py-10 gap-10 flex-col">
                        <div className="flex w-full py-3">
                            <div className="relative flex w-full max-w-[30rem]">
                                <Input
                                    type="email"
                                    label="Email Address"
                                    className="pr-20 bg-white"
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                />
                                <Button
                                    size="sm"
                                    className="!absolute bg-mobiBlue right-1 top-1 rounded"
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-10">
                        <div className="flex flex-col w-full justify-center">
                            <img src="/conference.png" className="w-[500px]" />
                        </div>
                        <div className="flex flex-col w-full gap-8">
                            <div className="w-full flex flex-wrap gap-x-4 gap-y-4">
                                <Button className="bg-transparent w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
                                    Business Tools
                                </Button>
                                <Button className="bg-transparent w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
                                    Productivity Hacks
                                </Button>
                                <Button className="bg-transparent w-1/3 rounded-full border" style={{ borderColor: 'rgba(234, 248, 91, 0.5)' }}>
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
                        <span className="md:text-5xl text-4xl font-bold leading-[60px] gradient-text">
                            Trusted by Top Brands
                        </span>
                        <span className="text-base leading-[30px] text-white">
                            We take pride in being the go-to solution for some of the world’s top brands.
                        </span>
                    </div>

                    <div className="w-full flex">
                        <img src={logoGradient} />
                    </div>
                </div>


                <div className="w-full h-full relative">
                    <div className="w-full h-full flex md:flex-row flex-col gap-8 md:py-14 md:px-32 relative" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                        <div className="w-full flex justify-center">
                            <div className="w-3/5 flex flex-col gap-8">
                                <p className="md:text-4xl text-2xl font-bold w-full my-4 text-center">Frequently Asked Questions</p>
                                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>What is MobiHolder?</AccordionHeader>
                                    <AccordionBody>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>
                                        How does MobiHolder ensure data security?
                                    </AccordionHeader>
                                    <AccordionBody>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(3)}>
                                        Who can use MobiHolder?
                                    </AccordionHeader>
                                    <AccordionBody>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(4)}>
                                        How does MobiHolder streamline event management?
                                    </AccordionHeader>
                                    <AccordionBody>
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}