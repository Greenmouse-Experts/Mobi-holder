export default function AccessControl() {
    return (
        <>
            <div className="w-full flex md:flex-row flex-col">
                <div className="md:w-[56%] w-full flex flex-col mt-10 md:px-6 px-2 gap-2">
                    <span className="text-4xl font-bold gradient-purple">Access Control</span>
                    <span className="text-base leading-[30px] text-white">
                        With MobiHolder, managing digital IDs has never been easier. Effortlessly create, store, and organize digital ID cards for employees,
                        visitors, contractors, and more, all within one secure and user-friendly app.
                    </span>
                </div>
                <div className="w-full md:w-[44%] py-6 flex sm:p-6">
                    <img src="/skeletal-mobi.png" />
                </div>
            </div>

            <div className="md:mt-10 mt-4 w-full h-[1px] border" style={{ borderColor: 'rgba(48, 48, 49, 1)' }} />

            <div className="w-full flex md:flex-row md:justify-between md:items-center flex-col gap-10">
                <div className="w-full flex h-full pb-10">
                    <div className="w-full pb-10 flex flex-col gap-5">
                        <span className="text-2xl text-center md:text-left text-white leading-[40px] font-semibold">
                            Assign verifiers to check users at your event 
                        </span>
                        <span className="text-base text-[rgba(163,162,162,1)] leading-[35px]">
                            With MobiHolder, managing digital IDs has never been easier.
                            Effortlessly create, store, and organize digital ID cards
                        </span>

                        <div className="flex flex-col items-center p-8 h-[230px] mt-5 rounded-3xl shadow-lg w-[20rem] mx-auto">
                            <div className="relative w-full h-screen flex items-center justify-center">
                                {/* Main Form (Background) */}
                                <div className="relative w-[401px] h-[284px]">
                                    <img
                                        src="/iPhone13Pro.png"
                                        alt="Event Form"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[1px] mr-14 h-full md:flex hidden border" style={{ borderColor: 'rgba(48, 48, 49, 1)' }} />

                <div className="w-full flex h-full">
                    <div className="w-full flex flex-col gap-5">
                        <span className="text-2xl text-center md:text-left text-white leading-[40px] font-semibold">
                            Request to be a Verifier at events of your choice 
                        </span>
                        <span className="text-base text-[rgba(163,162,162,1)] leading-[35px]">
                            With MobiHolder, managing digital IDs has never been easier.
                            Effortlessly create, store, and organize digital ID cards
                        </span>
                    </div>
                </div>

            </div>

        </>
    )
}