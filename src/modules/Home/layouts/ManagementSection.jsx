export default function ManagementSection() {
    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full h-full flex py-10 px-7" style={{ backgroundColor: 'rgba(249, 247, 243, 1)' }}>
                    <div className="md:flex hidden w-1/3 relative">
                        <div className="absolute left-[10rem] -top-[1rem]">
                            <img src="/roller-ball-animated.gif" style={{ width: '800px' }} />
                        </div>
                    </div>
                    <div className="flex md:w-2/3 w-full relative">
                        <div className="absolute h-[100px]" style={{
                            backgroundImage: `url('/Mobi_transparent.png')`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                        }}>
                        </div>
                        <div className="flex w-full md:justify-end justify-center py-6 md:px-28 z-50">
                            <div className="flex flex-col md:w-[75%] md:pl-4 gap-2">
                                <span className="flex gap-3">
                                    <p className="md:text-5xl text-2xl font-bold">Create.</p>
                                    <p className="md:text-5xl text-2xl font-bold">Personalize.</p>
                                </span>
                                <span className="text-sm leading-[30px] px-2 font-semibold">
                                    Our platform brings all your cards, documents, and
                                    credentials together in one convenient place, giving you easy access whenever you need it.
                                </span>
                                <img className="absolute top-[1rem] md:right-[7.5rem] right-0" src="/roller-ball.png" style={{ width: '37px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-10" style={{ backgroundColor: 'rgba(2, 13, 17, 1)' }}>
                    <div className="w-full flex md:flex-row flex-col">
                        <div className="md:w-[65%] w-full flex flex-col md:pt-40 mt-10 lg:px-44 md:px-20 px-6 gap-2">
                            <span className="text-4xl font-bold gradient-text">ID Card Management</span>
                            <span className="text-base leading-[30px] text-white">
                                With MobiHolder, managing digital IDs has never been easier.
                                Effortlessly create, store, and organize digital ID cards for employees,
                                visitors, contractors, and more, all within one secure and user-friendly app.
                            </span>
                        </div>
                    </div>

                    <div className="w-full flex lg:px-44 py-4">
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-5 rounded-md box-shadow-gradient" style={{ backgroundColor: 'rgba(3, 22, 22, 1)' }}>
                            <div className="w-full flex gap-4">
                                <div className="md:flex hidden">
                                    <img src="/membership.png" className="lg:w-[400px]" />
                                </div>
                                <div className="flex flex-grow lg:py-10 md:py-8 md:px-20 px-5 py-5" style={{ backgroundColor: 'rgba(17, 27, 31, 1)' }}>
                                    <div className="flex flex-col w-full gap-2">
                                        <h1 className="font-[500] text-white text-2xl">Enjoy Membership & Subscriptions</h1>
                                        <p className="text-sm text-white leading-[30px]">Become a valued member of your organization, subscribe to exclusive contents
                                            from other organizations and broaden your connectivity on MobiHolder seamlessly.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="flex flex-grow md:py-10 md:px-20 p-5" style={{ backgroundColor: 'rgba(17, 27, 31, 1)' }}>
                                    <div className="flex flex-col w-full gap-2">
                                        <h1 className="font-[500] text-white text-2xl">Event Management at Your Fingertips</h1>
                                        <p className="text-sm text-white leading-[30px]">
                                            Plan, organize, and manage events effortlessly with just one app.
                                            Whether you're hosting a small gathering or a large conference, this app provides everything you need to ensure your event runs smoothly.
                                        </p>
                                    </div>
                                </div>
                                <div className="md:flex hidden">
                                    <img src="/event.png" className="lg:w-[600px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}