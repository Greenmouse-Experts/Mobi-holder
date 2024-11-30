export default function IDCardManagement() {
    const members = [
        { id: 1, name: 'Chukka Uzo', role: 'Product Designer', img: '/mobi-profile-1.jpg', active: true },
        { id: 2, name: 'Igwe Amanda Joshua', role: 'Chief Financial Officer', img: '/mobi-profile.png', active: false },
        { id: 3, name: 'Victor Odell', role: 'Media Personnel', img: '/mobi-profile-2.jpg', active: false },
    ];

    return (
        <>
            <div className="w-full flex md:flex-row flex-col">
                <div className="md:w-[56%] w-full flex flex-col mt-10 md:px-6 px-2 gap-2">
                    <span className="text-4xl font-bold gradient-purple">ID Card Management</span>
                    <span className="text-base leading-[30px] text-white">
                        With MobiHolder, managing digital IDs has never been easier.
                        Effortlessly create, store, and organize digital ID cards for employees,
                        visitors, contractors, and more, all within one secure and user-friendly app.
                    </span>
                </div>
                <div className="w-full md:w-[44%] py-6 flex sm:p-6">
                    <img src="/idCard.png" />
                </div>
            </div>

            <div className="md:mt-10 mt-4 w-full h-[1px] border" style={{ borderColor: 'rgba(48, 48, 49, 1)' }} />

            <div className="w-full flex md:flex-row md:justify-between md:items-center flex-col gap-10">
                <div className="w-full flex">
                    <div className="w-full pb-10 flex flex-col gap-5">
                        <span className="text-2xl text-center md:text-left text-white leading-[40px] font-semibold">
                            Create your IDs digitally with the platform
                        </span>
                        <span className="text-base text-[rgba(163,162,162,1)] leading-[35px]">
                            With MobiHolder, managing digital IDs has never been easier.
                            Effortlessly create, store, and organize digital ID cards
                        </span>

                        <div className="flex flex-col items-center bg-[#1E2C3C] p-8 h-[230px] mt-5 rounded-3xl shadow-lg w-[20rem] mx-auto">
                            {/* Profile Image */}
                            <div className="relative -top-10 w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-[#1E2C3C] shadow-md">
                                <img
                                    src="/human-blink.gif" // Replace with your image path
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Form Inputs */}
                            <div className="space-y-4 -mt-14 z-50 relative w-full">
                                {/* First Row */}
                                <div className="md:w-[160%] w-[134%] w-full flex absolute md:-left-[22%] -left-10 gap-2 p-2 bg-white rounded-xl">
                                    <div className="flex-1 bg-[#D9E6FB] text-[#1E2C3C] rounded-xl py-2 px-4 text-sm font-medium">
                                        Name
                                    </div>
                                    <div className="flex-1 bg-[#CDF6F7] text-[#1E2C3C] rounded-xl py-2 px-4 text-sm font-medium">
                                        Organization
                                    </div>
                                    <button className="flex items-center justify-center bg-[#D9E6FB] text-[#1E2C3C] rounded-full w-8 h-8">
                                        +
                                    </button>
                                </div>

                                {/* Second Row */}
                                <div className="md:w-[160%] w-[134%] w-full flex absolute md:-left-[22%] top-14 -left-10 gap-2 p-2 bg-white rounded-xl">
                                    <div className="flex-1 bg-[#D7F9DB] text-[#1E2C3C] rounded-xl py-3 px-4 text-sm font-medium">
                                        Card Number
                                    </div>
                                    <div className="flex-1 bg-[#FDF1C7] text-[#7F6F00] rounded-xl py-3 px-4 text-sm font-medium">
                                        Expiry Date
                                    </div>
                                </div>

                                <div className="w-full flex absolute top-36">
                                    <img src="/add-frame.png" alt="add-frame" />
                                </div>
                                <div className="w-full flex absolute top-36">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[1px] mr-20 h-full md:flex hidden border" style={{ borderColor: 'rgba(48, 48, 49, 1)' }} />

                <div className="w-full flex">
                    <div className="w-full flex flex-col gap-5">
                        <span className="text-2xl text-center md:text-left text-white leading-[40px] font-semibold">
                            Manage your members ID cards with ease
                        </span>
                        <span className="text-base text-[rgba(163,162,162,1)] leading-[35px]">
                            With MobiHolder, managing digital IDs has never been easier.
                            Effortlessly create, store, and organize digital ID cards
                        </span>

                        <div className="w-full flex justify-center">
                            <div className="relative w-full max-w-xs bg-white shadow-lg rounded-2xl p-4">
                                <h2 className="text-lg font-semibold text-[rgba(47,50,139,1)] mb-4">Members ID Cards</h2>

                                <div className="space-y-3">
                                    {members.map((member) => (
                                        <div
                                            key={member.id}
                                            className={`flex items-center p-2 rounded-lg ${member.active ? 'bg-indigo-100' : 'bg-gray-50'
                                                }`}
                                        >
                                            <img
                                                src={member.img}
                                                alt={member.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="ml-3">
                                                <p className={`text-sm font-medium ${member.active ? 'text-indigo-900' : 'text-gray-500'}`}>
                                                    {member.name}
                                                </p>
                                                <p className={`text-xs ${member.active ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Options Dropdown */}
                                <div className="absolute sm:-right-20 right-0 z-50 top-20 bg-white shadow-lg rounded-lg w-48 p-3">
                                    <button className="flex items-center cursor-default w-full text-left p-2 text-red-500 text-xs rounded-lg">
                                        <span className="mr-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8C14 11.3137 11.3137 14 8 14C6.81118 14 5.70311 13.6543 4.77087 13.0578L12.3178 3.83384C13.3593 4.91305 14 6.3817 14 8ZM3.2868 11.7133L10.7072 2.64399C9.89384 2.23209 8.97402 2 8 2C4.68629 2 2 4.68629 2 8C2 9.40208 2.48092 10.6918 3.2868 11.7133ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#F54C49" />
                                            </svg>
                                        </span>
                                        Revoke Card
                                    </button>
                                    <button className="flex items-center cursor-default w-full text-left text-xs p-2 text-[#205DC8] rounded-lg">
                                        <span className="mr-2">
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52248 0.300295L8.09283 0L7.66317 0.300295L5.19086 2.02825L6.05017 3.25772L7.34283 2.35425V11.6284H8.84283V2.35425L10.1355 3.25772L10.9948 2.02825L8.52248 0.300295ZM0.5 5.85965V10.7489C0.5 14.0626 3.18629 16.7489 6.5 16.7489H9.68566C12.9994 16.7489 15.6857 14.0626 15.6857 10.7489V5.85965H13.6857V10.7489C13.6857 12.958 11.8948 14.7489 9.68566 14.7489H6.5C4.29086 14.7489 2.5 12.958 2.5 10.7489V5.85965H0.5Z" fill="#205DC8" />
                                            </svg>
                                        </span>
                                        Update Card Details
                                    </button>
                                    <button className="flex items-center cursor-default w-full text-left p-2 text-xs text-[#34D399] rounded-lg">
                                        <span className="mr-2">
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.277 7.5903C16.5758 6.053 15.7414 4.79925 14.7737 3.82905L13.7589 4.88519C14.5864 5.70822 15.3073 6.78491 15.9306 8.12584C14.2711 11.7003 11.9154 13.3982 8.69608 13.3982C7.72975 13.3982 6.83968 13.2434 6.02587 12.9337L4.92623 14.078C6.05652 14.6212 7.31314 14.8928 8.69608 14.8928C12.5298 14.8928 15.3901 12.8149 17.277 8.65931C17.3528 8.49218 17.3922 8.30964 17.3922 8.1248C17.3922 7.93997 17.3528 7.75743 17.277 7.5903ZM16.009 0.934631L15.1587 0.048703C15.1439 0.0332634 15.1263 0.0210151 15.1069 0.0126583C15.0875 0.00430142 15.0668 0 15.0458 0C15.0248 0 15.0041 0.00430142 14.9847 0.0126583C14.9653 0.0210151 14.9477 0.0332634 14.9329 0.048703L12.7514 2.31791C11.5486 1.67858 10.1968 1.35891 8.69608 1.35891C4.8624 1.35891 2.0021 3.43673 0.115181 7.59238C0.0393354 7.75951 0 7.94205 0 8.12688C0 8.31171 0.0393354 8.49425 0.115181 8.66138C0.869018 10.3137 1.77658 11.6381 2.83785 12.6346L0.727134 14.8305C0.697231 14.8616 0.680433 14.9039 0.680433 14.9479C0.680433 14.9919 0.697231 15.0341 0.727134 15.0653L1.57864 15.9514C1.60856 15.9825 1.64914 16 1.69144 16C1.73374 16 1.77431 15.9825 1.80423 15.9514L16.009 1.16961C16.0238 1.15418 16.0356 1.13587 16.0436 1.11571C16.0517 1.09555 16.0558 1.07394 16.0558 1.05212C16.0558 1.0303 16.0517 1.00869 16.0436 0.988527C16.0356 0.968368 16.0238 0.950053 16.009 0.934631ZM1.46156 8.12584C3.12308 4.55141 5.47874 2.85345 8.69608 2.85345C9.78396 2.85345 10.7731 3.04774 11.6705 3.44275L10.2683 4.902C9.60418 4.53327 8.8438 4.39643 8.0993 4.51165C7.3548 4.62687 6.6656 4.98806 6.13337 5.54194C5.60113 6.09581 5.25406 6.81304 5.14334 7.58782C5.03262 8.3626 5.16412 9.15389 5.51844 9.84497L3.85452 11.5766C2.93359 10.7307 2.13973 9.58468 1.46156 8.12584ZM6.38231 8.12584C6.38266 7.75981 6.46597 7.39903 6.62548 7.07281C6.78499 6.74658 7.01619 6.46412 7.3003 6.24835C7.58442 6.03258 7.91344 5.8896 8.26063 5.83103C8.60782 5.77245 8.96339 5.79993 9.29846 5.91123L6.48823 8.83575C6.41779 8.60625 6.38206 8.36676 6.38231 8.12584Z" fill="#34D399" />
                                            </svg>
                                        </span>
                                        Preview Card
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}