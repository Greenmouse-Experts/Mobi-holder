import { Route } from "react-router-dom";
import SignUp from '../modules/SignUp';
import Login from '../modules/Login';
import PasswordReset from '../modules/PasswordReset';
import IndividualSignUp from '../modules/SignUp/individual';
import OrganisationSignUp from '../modules/SignUp/organisation';
import Home from '../modules/Home';
import VerifyEmail from '../modules/VerifyEmail';
import AdminLogin from '../modules/Admin/Login';
import FAQ from '../modules/Home/pages/faq';
import ContactUs from '../modules/Home/pages/contactUs';
import PricingPlans from '../modules/Home/pages/pricing';
import Legal from '../modules/Home/pages/legal';

const PublicRoutes = [
        <Route path="/" element={<Home />} />,
        <Route path="/faq" element={<FAQ />} />,
        <Route path="/contact-us" element={<ContactUs />} />,
        <Route path="/pricing" element={<PricingPlans />} />,
        <Route path="/legal" element={<Legal />} />,
        <Route path="/signup" element={<SignUp />} />,
        <Route path="/verify-email" element={<VerifyEmail />} />,
        <Route path="/signup/individual" element={<IndividualSignUp />} />,
        <Route path="/signup/organisation" element={<OrganisationSignUp />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="/admin" element={<AdminLogin />} />,
        <Route path="/forgot-password" element={<PasswordReset />} />
];

export default PublicRoutes