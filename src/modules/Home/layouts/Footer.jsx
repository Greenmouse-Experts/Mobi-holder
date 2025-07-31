import playStore from "../../../assets/playstore.png";
import appleStore from "../../../assets/applestore.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../api/hooks/useApiMutation";

// Newsletter Subscription Component
const NewsletterSubscription = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate } = useApiMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribeToNewsletter = (data) => {
    setIsSubmitting(true);
    mutate({
      url: "/api/admins/public/submit/newsletter",
      method: "POST",
      data: data,
      onSuccess: (response) => {
        reset({ email: "" });
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error("Newsletter subscription error:", error);
        setIsSubmitting(false);
      },
    });
  };

  // return (
  //     <div className="w-full max-w-md border border-white/30 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
  //         <h4 className="text-white text-center font-semibold text-lg mb-4">News Letter</h4>
  //         <form onSubmit={handleSubmit(subscribeToNewsletter)} className="relative">
  //             <input
  //                 type="email"
  //                 placeholder="Email"
  //                 {...register("email", {
  //                     required: "Email is required",
  //                     pattern: {
  //                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //                         message: "Invalid email address"
  //                     }
  //                 })}
  //                 className="w-full px-5 py-4 pr-14 text-white bg-transparent border border-white/40 rounded-lg placeholder-white/60 focus:outline-none focus:border-white/70 focus:ring-1 focus:ring-white/30 text-base"
  //             />
  //             <button
  //                 type="submit"
  //                 disabled={isSubmitting}
  //                 className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white hover:text-mobiPink transition-colors disabled:opacity-50"
  //             >
  //                 {isSubmitting ? (
  //                     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
  //                 ) : (
  //                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  //                     </svg>
  //                 )}
  //             </button>
  //         </form>
  //         {errors.email && (
  //             <p className="text-red-400 text-sm mt-2 text-center">{errors.email.message}</p>
  //         )}
  //     </div>
  // );
};

// Newsletter Modal Component
const NewsletterModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate } = useApiMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribeToNewsletter = (data) => {
    setIsSubmitting(true);
    mutate({
      url: "/api/admins/public/submit/newsletter",
      method: "POST",
      data: data,
      onSuccess: (response) => {
        reset({ email: "" });
        setIsSubmitting(false);
        onClose();
      },
      onError: (error) => {
        console.error("Newsletter subscription error:", error);
        setIsSubmitting(false);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Stay Updated!
          </h3>
          <p className="text-gray-600">
            Subscribe to our newsletter for the latest updates and insights from
            MobiHolder.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(subscribeToNewsletter)}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Footer() {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [supportContacts, setSupportContacts] = useState({
    phones: ["+234 812 345 6789"], // Default fallback array
    emails: ["help@mobiholder.com", "support@mobiholder.com"], // Default fallback array
  });
  const { mutate } = useApiMutation();

  // Fetch support contacts on component mount
  useEffect(() => {
    mutate({
      url: "/api/admins/public/support-contacts",
      method: "GET",
      hideToast: true,
      onSuccess: (response) => {
        console.log("Footer support contacts:", response);
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          const contacts = response.data.data;

          // Extract all phone numbers and emails from all contacts
          const phones = contacts
            .map((contact) => contact.phoneNumber)
            .filter(Boolean);
          const emails = contacts
            .map((contact) => contact.email)
            .filter(Boolean);

          setSupportContacts({
            phones: phones.length > 0 ? phones : ["+234 812 345 6789"],
            emails:
              emails.length > 0
                ? emails
                : ["help@mobiholder.com", "support@mobiholder.com"],
          });
        }
      },
      onError: (error) => {
        console.error("Failed to fetch support contacts:", error);
        // Keep default values on error
      },
    });
  }, [mutate]);

  return (
    <>
      <div className="flex flex-col w-full h-full relative">
        <div
          className="absolute bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/do2kojulq/image/upload/v1736029459/mobiHolder/mobiHolder_home/circle-roller_jqv5di.gif)`,
          }}
        ></div>
        <div
          className="absolute w-full h-full"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>
        <div className="w-full h-full flex flex-col gap-8 md:pt-20 lg:px-44 md:px-20 px-6 py-6 relative">
          <div className="w-full flex flex-col md:flex-row md:py-6 gap-10 md:gap-20">
            {/* Left Section */}
            <div className="flex flex-col space-y-4 md:w-1/3 w-full items-center md:items-start">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <img src="/mobiHolder.svg" alt="Logo" className="w-8 h-8" />
                <div>
                  <span className="text-xl font-semibold text-white">
                    MobiHolder
                  </span>
                </div>
              </Link>

              {/* Description */}
              <p className="text-sm text-white text-center md:text-left leading-6">
                More than just being a digital version of your wallet,
                MobiHolder is poised to bridge the identification gap in Africa.
              </p>

              {/* Download Section */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <p className="text-lg text-white">Download the App</p>
                <div className="flex gap-4">
                  <img src={playStore} alt="Play Store" className="w-[100px]" />
                  <img
                    src={appleStore}
                    alt="Apple Store"
                    className="w-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
              {/* Company Links */}
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold">COMPANY</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="uppercase">
                      Home
                    </a>
                  </li>
                  <li>
                    <Link to="#useCases" className="uppercase">
                      Use Cases
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      Contact
                    </a>
                  </li>
                  <li>
                    <Link to={"/blogs"} className="uppercase">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Links */}
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold">SUPPORT</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/legal" className="uppercase">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/legal" className="uppercase">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <Link to="/legal" className="uppercase">
                      Legal
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold">SOCIALS</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="uppercase">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="uppercase">
                      TikTok
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold">CONTACT US</h3>
                <ul className="space-y-4">
                  {/* Dynamic Phone Numbers */}
                  {supportContacts.phones.map((phone, index) => (
                    <li key={`phone-${index}`}>
                      <a
                        href={`tel:${phone}`}
                        className="uppercase hover:text-mobiPink transition-colors"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}

                  {/* Dynamic Email Addresses */}
                  {supportContacts.emails.map((email, index) => (
                    <li key={`email-${index}`}>
                      <a
                        href={`mailto:${email}`}
                        className="break-all hover:text-mobiPink transition-colors"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Newsletter Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsNewsletterModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                  >
                    Subscribe to Newsletter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Section - Dedicated Row */}
          <div className="w-full flex justify-center items-center py-8 border-t border-white/20">
            <NewsletterSubscription />
          </div>

          <div className="w-full flex md:flex-row justify-center mt-10 md:mt-0 gap-2 md:mb-0">
            <p className="text-sm text-white">
              © 2024, Mobiholder. All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </>
  );
}
