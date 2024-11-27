import { useState } from 'react'
import SplashScreen from './modules/SplashScreen'
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './modules/SignUp';
import Login from './modules/Login';
import PasswordReset from './modules/PasswordReset';
import IndividualSignUp from './modules/SignUp/individual';
import OrganisationSignUp from './modules/SignUp/organisation';
import AppModules from './modules/AppModules';
import Dashboard from './modules/AppModules/Dashboard';
import Notification from './modules/AppModules/Notifications';
import { ThemeProvider } from './context/ThemeContext';
import Settings from './modules/AppModules/Settings';
import Home from './modules/Home';
import SuperAdmin from './modules/SuperAdmin';
import DashBoard from "./modules/SuperAdmin/DashBoard";
import Organisations from "./modules/SuperAdmin/Organisations";
import Events from "./modules/SuperAdmin/Events";
import AllUsers from './modules/SuperAdmin/Users';
import Subscriptions from './modules/SuperAdmin/Subscriptions';
import IDCards from './modules/SuperAdmin/IDCards';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './modules/VerifyEmail';
import AdminLogin from './modules/Admin/Login';
import OrgDashboard from './modules/AppModules/OrgDashboard';
import FAQ from './modules/Home/pages/faq';
import ContactUs from './modules/Home/pages/contactUs';
import PricingPlans from './modules/Home/pages/pricing';
import Legal from './modules/Home/pages/legal';

function App() {
  const [splash, setSplash] = useState(true);

  const queryClient = new QueryClient();

  const handleSplashScreen = () => {
    setSplash(false);
  }

  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {splash ?
              <SplashScreen clearScreen={handleSplashScreen} />
              :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/pricing" element={<PricingPlans />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path='/signup/individual' element={<IndividualSignUp />} />
                <Route path='/signup/organisation' element={<OrganisationSignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<AdminLogin />} />
                <Route path='/forgot-password' element={<PasswordReset />} />
                <Route path='/app' element={<AppModules />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='org-dashboard' element={<OrgDashboard />} />
                  <Route path='notification' element={<Notification />} />
                  <Route path='settings' element={<Settings />} />
                </Route>
                <Route path='/superadmin' element={<SuperAdmin />}>
                  <Route path='dashboard' element={<DashBoard />} />
                  <Route path="organisations" element={<Organisations />} />
                  <Route path="events" element={<Events />} />
                  <Route path='users' element={<AllUsers />} />
                  <Route path='subscriptions' element={<Subscriptions />} />
                  <Route path='id-cards' element={<IDCards />} />
                </Route>
              </Routes>
            }
          </QueryClientProvider>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </ThemeProvider>
    </>
  )
}

export default App
