import springRollerImage from "../../assets/spring-ball-roller.gif"
import IntroSection from "./layouts/IntroSection";
import Header from "./layouts/Header";

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full animate__animated animate__fadeIn">
                <div className="bg-mobiDarkBlue md:flex hidden w-full h-[40px]"></div>
                <div className="w-full h-full relative">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${springRollerImage})` }}></div>
                    <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                    <Header />
                    <div className="lg:w-[70%] md:w-3/4 w-full lg:mt-10 md:mt-10 mt-[100px] px-4 lg:py-10 relative lg:px-44 md:px-20 flex flex-col z-50">
                        <IntroSection />
                    </div>
                </div>
            </div>
        </>
    )
}