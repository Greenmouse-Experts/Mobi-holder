import React from "react";
import CardType from "../../components/CardType";
import "animate.css";
import { Link } from "react-router-dom";
import Theme from "../../components/Theme";

function SignUp() {
  return (
    <>
      <div className="w-full md:h-screen h-full flex justify-center animate__animated animate__fadeIn">
        <div className="lg:w-3/5 md:w-3/5 w-full px-6 md:h-screen h-full flex flex-col gap-3 lg:gap-7 md:gap-7 lg:py-0 md:py-0 pt-16 pb-4 justify-center">
          <div className="flex justify-center gap-3">
            <img
              src="/mobiHolder.svg"
              alt="Logo"
              className="w-[32px] h-[32px] object-contain"
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl mt-1 font-semibold">MobiHolder</span>
            </div>
          </div>

          <div className="w-full flex justify-center my-1">
            <p className="lg:text-2xl text-base font-[500]">
              Welcome! Sign up as an Individual or an Organization to continue.
            </p>
          </div>

          <div className="w-full h-auto relative flex justify-center items-center my-4">
            <div className="w-full flex flex-col lg:flex-row md:flex-row lg:justify-center md:justify-center gap-6 lg:gap-10 md:gap-10">
              <div className="w-full flex flex-col h-full">
                <CardType
                  type="Individual"
                  text="manage your own account."
                  link="/signup/individual"
                />
              </div>

              <div className="w-full flex flex-col h-full">
                <CardType
                  type="Organisation"
                  text="For families, businesses, clubs, gyms, estates, and other groups"
                  link="/signup/organisation"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center my-1">
            <div
              className="lg:max-w-md md:max-w-md w-full flex rounded-full p-5 bs-boxAccount shadow shadow-md justify-center border"
              style={{ borderColor: "rgba(22, 24, 61, 0.2)" }}
            >
              <p className="lg:text-base md:text-base text-[12px]">
                Already have an account ? Proceed to
                <Link
                  className="text-mobiBlue font-semibold mx-1"
                  to={"/login"}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/** Dark Theme */}
        <div className="absolute flex w-full">
          <div className="flex w-full relative justify-end">
            <div className="max-w-[11rem] top-[2%] p-3 w-full flex">
              <Theme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
