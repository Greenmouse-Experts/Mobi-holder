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
import FAQ from './modules/Home/pages/faq';
import ContactUs from './modules/Home/pages/contactUs';
import PricingPlans from './modules/Home/pages/pricing';
import Legal from './modules/Home/pages/legal';
import IDCardsPage from './modules/AppModules/pages/IdCards';
import IndividualSubscriptions from './modules/AppModules/pages/Subscriptions';
import IndividualEvents from './modules/AppModules/pages/Events';
import AddCard from './modules/AppModules/pages/IdCards/addCard';
import ViewCard from './modules/AppModules/pages/IdCards/viewCard';
import AddEvent from './modules/AppModules/pages/Events/addEvent';
import ViewEvent from './modules/AppModules/pages/Events/viewEvent';
import AddSubscription from './modules/AppModules/pages/Subscriptions/addSubscription';
import ViewOrganisation from './modules/AppModules/pages/Subscriptions/viewOrganisation';
import Membership from './modules/AppModules/pages/Memberships';
import JoinOrganisation from './modules/AppModules/pages/Memberships/joinOrganisation';
import VerificationDashboard from './modules/AppModules/pages/Verify';
import ViewVerifiers from './modules/AppModules/pages/Verify/viewVerifiers';
import AddEventVerifier from './modules/AppModules/pages/Verify/addEventVerifier';
import AddVerifier from './modules/AppModules/pages/Verify/addVerifiers';
import VerificationRequest from './modules/AppModules/pages/Verify/verificationRequest';
import ScanEvents from './modules/AppModules/pages/Verify/scanEvent';
import VerifyEvent from './modules/AppModules/pages/Verify/verifyEvent';
import UpcomingEvents from './modules/AppModules/pages/Events/upcomingEvent';
import ViewInvites from './modules/AppModules/pages/Events/viewInvites';
import EventLog from './modules/AppModules/pages/Events/eventLog';
import TicketRequests from './modules/AppModules/pages/Events/ticketRequests';
import EventGallery from './modules/AppModules/pages/Events/eventGallery';
import BuyTickets from './modules/AppModules/pages/Events/buyTickets';
import EventHistory from './modules/AppModules/pages/Events/eventHistory';
import OrgModules from './modules/OrgModules';
import OrgDashboard from './modules/OrgModules/OrgDashboard';
import OrgVerificationDashboard from './modules/OrgModules/pages/Verify';
import OrgAddVerifier from './modules/OrgModules/pages/Verify/addVerifiers';
import OrgScanEvents from './modules/OrgModules/pages/Verify/scanEvent';
import OrgVerifyEvent from './modules/OrgModules/pages/Verify/verifyEvent';
import OrgVerificationRequest from './modules/OrgModules/pages/Verify/verificationRequest';
import OrgEvents from './modules/OrgModules/pages/Events';
import OrgAddEvent from './modules/OrgModules/pages/Events/addEvent';
import OrgUpcomingEvents from './modules/OrgModules/pages/Events/upcomingEvent';
import OrgViewEvent from './modules/OrgModules/pages/Events/viewEvent';
import OrgViewInvites from './modules/OrgModules/pages/Events/viewInvites';
import OrgTicketRequests from './modules/OrgModules/pages/Events/ticketRequests';
import OrgEventLog from './modules/OrgModules/pages/Events/eventLog';
import OrgEventGallery from './modules/OrgModules/pages/Events/eventGallery';
import OrgAddEventVerifier from './modules/OrgModules/pages/Events/addEventVerifier';
import OrgIDCardsPage from './modules/OrgModules/pages/IdCards';
import OrgMembership from './modules/OrgModules/pages/Memberships';
import OrgSubscriptions from './modules/OrgModules/pages/Subscriptions';
import OrgAddCard from './modules/OrgModules/pages/IdCards/addCard';
import CardStructure from './modules/OrgModules/pages/IdCards/cardStructure';
import CreateUserCard from './modules/OrgModules/pages/IdCards/createUserCard';
import PreviewCard from './modules/OrgModules/pages/IdCards/viewCard';
import UpdateMember from './modules/OrgModules/pages/Memberships/updateMember';
import InviteMember from './modules/OrgModules/pages/Memberships/inviteMember';
import OrgNotification from './modules/OrgModules/Notifications';
import OrgSettings from './modules/OrgModules/Settings';

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
                  <Route path='id-cards' element={<IDCardsPage />} />
                  <Route path='add-card' element={<AddCard />} />
                  <Route path='view-card' element={<ViewCard />} />
                  <Route path='add-event' element={<AddEvent />} />
                  <Route path='view-event/:id' element={<ViewEvent />} />
                  <Route path='subscriptions' element={<IndividualSubscriptions />} />
                  <Route path='add-subscription' element={<AddSubscription />} />
                  <Route path='join-organisation/:id' element={<AddSubscription />} />
                  <Route path='join-organisation-form' element={<JoinOrganisation />} />
                  <Route path='view-organisation/:id' element={<ViewOrganisation />} />
                  <Route path='membership' element={<Membership />} />
                  <Route path='events' element={<IndividualEvents />} />
                  <Route path='notification' element={<Notification />} />
                  <Route path='settings' element={<Settings />} />
                  <Route path='verify' element={<VerificationDashboard />} />
                  <Route path='add-verifiers' element={<AddVerifier />} />
                  <Route path='view-verifiers/:id' element={<ViewVerifiers />} />
                  <Route path='add-event-verifier/:id' element={<AddEventVerifier />} />
                  <Route path='verification-request' element={<VerificationRequest />} />
                  <Route path='scan-event' element={<ScanEvents />} />
                  <Route path='verify-event/:id' element={<VerifyEvent />} />
                  <Route path='upcoming-events' element={<UpcomingEvents />} />
                  <Route path='view-invites/:id' element={<ViewInvites />} />
                  <Route path='event-log/:id' element={<EventLog />} />
                  <Route path='ticket-requests/:id' element={<TicketRequests />} />
                  <Route path='event-gallery' element={<EventGallery />} />
                  <Route path='order-tickets/:id' element={<BuyTickets />} />
                  <Route path='event-history' element={<EventHistory />} />
                </Route>
                <Route path='/org' element={<OrgModules />}>
                  <Route path='dashboard' element={<OrgDashboard />} />
                  <Route path='verify' element={<OrgVerificationDashboard />} />
                  <Route path='add-verifiers' element={<OrgAddVerifier />} />
                  <Route path='scan-event' element={<OrgScanEvents />} />
                  <Route path='verify-event/:id' element={<OrgVerifyEvent />} />
                  <Route path='verification-request' element={<OrgVerificationRequest />} />
                  <Route path='events' element={<OrgEvents />} />
                  <Route path='add-event' element={<OrgAddEvent />} />
                  <Route path='upcoming-events' element={<OrgUpcomingEvents />} />
                  <Route path='view-event/:id' element={<OrgViewEvent />} />
                  <Route path='view-invites/:id' element={<OrgViewInvites />} />
                  <Route path='ticket-requests/:id' element={<OrgTicketRequests />} />
                  <Route path='event-log/:id' element={<OrgEventLog />} />
                  <Route path='event-gallery' element={<OrgEventGallery />} />
                  <Route path='add-event-verifier/:id' element={<OrgAddEventVerifier />} />
                  <Route path='id-cards' element={<OrgIDCardsPage />} />
                  <Route path='membership' element={<OrgMembership />} />
                  <Route path='subscriptions' element={<OrgSubscriptions />} />
                  <Route path='add-card' element={<OrgAddCard />} />
                  <Route path='cards/structure' element={<CardStructure />} />
                  <Route path='cards/createUser/:id' element={<CreateUserCard />} />
                  <Route path='card/viewCard' element={<PreviewCard />} />
                  <Route path='membership/updateMember/:id' element={<UpdateMember />} />
                  <Route path='membership/add' element={<InviteMember />} />
                  <Route path='notification' element={<OrgNotification />} />
                  <Route path='settings' element={<OrgSettings />} />
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
