import { Route } from "react-router-dom";
import IDCardsPage from '../modules/AppModules/pages/IdCards';
import IndividualEvents from '../modules/AppModules/pages/Events';
import AddCard from '../modules/AppModules/pages/IdCards/addCard';
import ViewCard from '../modules/AppModules/pages/IdCards/viewCard';
import AddEvent from '../modules/AppModules/pages/Events/addEvent';
import ViewEvent from '../modules/AppModules/pages/Events/viewEvent';
import Membership from '../modules/AppModules/pages/Memberships';
import JoinOrganisation from '../modules/AppModules/pages/Memberships/joinOrganisation';
import VerificationDashboard from '../modules/AppModules/pages/Verify';
import ViewVerifiers from '../modules/AppModules/pages/Verify/viewVerifiers';
import AddVerifier from '../modules/AppModules/pages/Verify/addVerifiers';
import VerificationRequest from '../modules/AppModules/pages/Verify/verificationRequest';
import ScanEvents from '../modules/AppModules/pages/Verify/scanEvent';
import VerifyEvent from '../modules/AppModules/pages/Verify/verifyEvent';
import UpcomingEvents from '../modules/AppModules/pages/Events/upcomingEvent';
import ViewInvites from '../modules/AppModules/pages/Events/viewInvites';
import EventLog from '../modules/AppModules/pages/Events/eventLog';
import TicketRequests from '../modules/AppModules/pages/Events/ticketRequests';
import EventGallery from '../modules/AppModules/pages/Events/eventGallery';
import BuyTickets from '../modules/AppModules/pages/Events/buyTickets';
import EventHistory from '../modules/AppModules/pages/Events/eventHistory';
import OrganisationLists from '../modules/AppModules/pages/Memberships/organisationLists';
import Dashboard from '../modules/AppModules/Dashboard';
import Notification from '../modules/Notifications';
import Settings from '../modules/AppModules/Settings';
import AddNewCard from "../modules/AppModules/pages/IdCards/newCard";
import ViewPublicEvents from "../modules/AppModules/pages/Events/viewPublicEvents";
import EventInvites from "../modules/AppModules/pages/Events/eventInvites";
import AddEventVerifier from "../modules/AppModules/pages/Events/addEventVerifier";
import MyTickets from "../modules/AppModules/pages/Events/myTickets";
import EventTicket from "../modules/AppModules/pages/Events/viewTicket";
import ViewPersonalCard from "../modules/AppModules/pages/IdCards/viewPersonalCard";
import IndividualPlans from "../modules/AppModules/pages/Subscriptions/plans";
import ViewPlan from "../modules/AppModules/pages/Subscriptions/viewPlan";
import SubscriptionLog from "../modules/AppModules/pages/Subscriptions/SubscriptionLog";
import Wallet from "../modules/AppModules/pages/Wallet";

const UserRoutes = [
    <Route path="dashboard" element={<Dashboard />} />,
    <Route path="id-cards" element={<IDCardsPage />} />,
    <Route path="add-card" element={<AddCard />} />,
    <Route path="view-card/:id" element={<ViewCard />} />,
    <Route path="view-personal-card/:id" element={<ViewPersonalCard />} />,
    <Route path="add-event" element={<AddEvent />} />,
    <Route path="view-event/:id" element={<ViewEvent />} />,
    <Route path="event/view/:id" element={<ViewPublicEvents />} />,
    <Route path="join-organisation" element={<OrganisationLists />} />,
    <Route path="join-organisation-form/:id" element={<JoinOrganisation />} />,
    <Route path="membership" element={<Membership />} />,
    <Route path="events" element={<IndividualEvents />} />,
    <Route path="notification" element={<Notification />} />,
    <Route path="settings" element={<Settings />} />,
    <Route path="verify" element={<VerificationDashboard />} />,
    <Route path="add-verifiers" element={<AddVerifier />} />,
    <Route path="view-verifiers/:id" element={<ViewVerifiers />} />,
    <Route path="add-event-verifier/:id" element={<AddEventVerifier />} />,
    <Route path="verification-request" element={<VerificationRequest />} />,
    <Route path="scan-event" element={<ScanEvents />} />,
    <Route path="verify-event/:id" element={<VerifyEvent />} />,
    <Route path="upcoming-events" element={<UpcomingEvents />} />,
    <Route path="view-invites/:id" element={<ViewInvites />} />,
    <Route path="event-log/:id" element={<EventLog />} />,
    <Route path="event-invites" element={<EventInvites />} />,
    <Route path="ticket-requests/:id" element={<TicketRequests />} />,
    <Route path="event-gallery" element={<EventGallery />} />,
    <Route path="my-tickets" element={<MyTickets />} />,
    <Route path="event/view-ticket/:id" element={<EventTicket />} />,
    <Route path="order-tickets/:id" element={<BuyTickets />} />,
    <Route path="event-history" element={<EventHistory />} />,
    <Route path="id-cards/generate-card" element={<AddNewCard />} />,
    <Route path="subscription/plans" element={<IndividualPlans />} />,
    <Route path="subscription/plans/view/:id" element={<ViewPlan />} />,
    <Route path="subscription/log" element={<SubscriptionLog />} />,
    <Route path="subscription/plans/view/:id/:status" element={<ViewPlan />} />,
    <Route path="wallet" element={<Wallet />} />,
];

export default UserRoutes