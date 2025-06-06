import IntroSection from "./layouts/IntroSection";
import Header from "./layouts/Header";
import ManagementSection from "./layouts/ManagementSection";
import ModuleAccess from "./layouts/ModuleAccess";
import Footer from "./layouts/Footer";

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full animate__animated animate__fadeIn">
                <div className="w-full h-full relative">
                    <div className="absolute bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029463/mobiHolder/mobiHolder_home/spring-ball-roller_d3dhsf.gif)` }}></div>
                    <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                    <Header />
                    <div className="lg:w-[70%] md:w-3/4 w-full lg:mt-10 md:mt-10 mt-[30px] px-8 lg:py-10 relative lg:px-44 xl:px-72 md:px-20 flex flex-col gap-10 z-50">
                        <IntroSection />
                    </div>
                </div>
                <div className="w-full flex">
                    <ManagementSection />
                </div>
                <div className="w-full flex">
                    <ModuleAccess />
                </div>
                <div className="w-full flex">
                    <Footer />
                </div>
            </div>
        </>
    )
}