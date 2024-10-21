import { Avatar, Button } from "@material-tailwind/react";

export default function IntroSection() {
    return (
        <>
            <div className="w-full flex-col flex gap-3">
            <div className="flex w-full gap-4">
                <div className="flex items-center -space-x-4">
                    <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        size="sm"
                        src="/image_1.png"
                    />
                    <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        size="sm"
                        src="/image_2.png"
                    />
                    <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        size="sm"
                        src="/image_3.png"
                    />
                    <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        size="sm"
                        src="/image_4.png"
                    />
                </div>
                <p className="text-base flex flex-col justify-center text-white font-[500]">Already trusted by 1.2k</p>
                </div>
                <p className="md:text-7xl text-4xl text-white font-bold mt-4 md:leading-[90px]">All Your IDs In <br /> One Secure Place</p>
                <p className="text-base text-white font-[500] leading-[30px]">Simplify Access, Strengthen Security,
                    and Manage Your Identity <br /> Effortlessly with Our All-in-One Platform.</p>
                
                <div className="w-full flex my-3">
                    <Button className="rounded-full w-auto bg-mobiDarkBlue">
                        <span className="normal-case flex gap-1">Download the App
                            <span className="flex flex-col justify-center pt-[1.5px]">
                            <svg width="25" height="7" viewBox="0 0 27 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.0073 4.25L19.4255 0.0647949L19.5919 8.72345L27.0073 4.25ZM1.00706 5.49986L20.273 5.12957L20.2442 3.62985L0.978233 4.00014L1.00706 5.49986Z" fill="white" />
                                </svg>
                                </span>
                        </span>
                    </Button>
                </div>
                </div>
        </>
    )
}