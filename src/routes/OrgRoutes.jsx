import { Route } from "react-router-dom";
import OrgDashboard from '../modules/OrgModules/OrgDashboard';
import OrgVerificationDashboard from '../modules/OrgModules/pages/Verify';
import OrgAddVerifier from '../modules/OrgModules/pages/Verify/addVerifiers';
import OrgScanEvents from '../modules/OrgModules/pages/Verify/scanEvent';
import OrgVerifyEvent from '../modules/OrgModules/pages/Verify/verifyEvent';
import OrgVerificationRequest from '../modules/OrgModules/pages/Verify/verificationRequest';
import OrgEvents from '../modules/OrgModules/pages/Events';
import OrgAddEvent from '../modules/OrgModules/pages/Events/addEvent';
import OrgUpcomingEvents from '../modules/OrgModules/pages/Events/upcomingEvent';
import OrgViewEvent from '../modules/OrgModules/pages/Events/viewEvent';
import OrgViewInvites from '../modules/OrgModules/pages/Events/viewInvites';
import OrgTicketRequests from '../modules/OrgModules/pages/Events/ticketRequests';
import OrgEventLog from '../modules/OrgModules/pages/Events/eventLog';
import OrgEventGallery from '../modules/OrgModules/pages/Events/eventGallery';
import OrgAddEventVerifier from '../modules/OrgModules/pages/Events/addEventVerifier';
import OrgIDCardsPage from '../modules/OrgModules/pages/IdCards';
import OrgMembership from '../modules/OrgModules/pages/Memberships';
import OrgSubscriptions from '../modules/OrgModules/pages/Subscriptions';
import OrgAddCard from '../modules/OrgModules/pages/IdCards/addCard';
import CardStructure from '../modules/OrgModules/pages/IdCards/cardStructure';
import CreateUserCard from '../modules/OrgModules/pages/IdCards/createUserCard';
import PreviewCard from '../modules/OrgModules/pages/IdCards/viewCard';
import UpdateMember from '../modules/OrgModules/pages/Memberships/updateMember';
import InviteMember from '../modules/OrgModules/pages/Memberships/inviteMember';
import OrgNotification from '../modules/OrgModules/Notifications';
import OrgSettings from '../modules/OrgModules/Settings';
import AddSubscriptionPlan from '../modules/OrgModules/pages/Subscriptions/addSubscriptionPlan';
import EditSubscriptionPlan from '../modules/OrgModules/pages/Subscriptions/editSubscriptionPlan';
import SubscriptionHistory from '../modules/OrgModules/pages/Subscriptions/subscriptionHistory';
import PaymentGateway from "../modules/OrgModules/pages/Subscriptions/paymentGateway";
import UpdateCard from "../modules/OrgModules/pages/IdCards/updateCard";
import ViewOrgPublicEvents from "../modules/OrgModules/pages/Events/viewPublicEvents";
import OrgBuyTickets from "../modules/OrgModules/pages/Events/buyTickets";
import OrgEventHistory from "../modules/OrgModules/pages/Events/eventHistory";
import OrgTickets from "../modules/OrgModules/pages/Events/myTickets";
import OrgEventTicket from "../modules/OrgModules/pages/Events/viewTicket";
import ViewVerifiers from "../modules/OrgModules/pages/Verify/viewVerifiers";

const OrgRoutes = [
    <Route path="dashboard" element={<OrgDashboard />} />,
    <Route path="verify" element={<OrgVerificationDashboard />} />,
    <Route path="view-verifiers/:id" element={<ViewVerifiers />} />,
    <Route path="add-verifiers" element={<OrgAddVerifier />} />,
    <Route path="scan-event" element={<OrgScanEvents />} />,
    <Route path="verify-event/:id" element={<OrgVerifyEvent />} />,
    <Route path="verification-request" element={<OrgVerificationRequest />} />,
    <Route path="events" element={<OrgEvents />} />,
    <Route path="payment-gateway" element={<PaymentGateway />} />,
    <Route path="add-event" element={<OrgAddEvent />} />,
    <Route path="upcoming-events" element={<OrgUpcomingEvents />} />,
    <Route path="view-event/:id" element={<OrgViewEvent />} />,
    <Route path="event/view/:id" element={<ViewOrgPublicEvents />} />,
    <Route path="view-invites/:id" element={<OrgViewInvites />} />,
    <Route path="ticket-requests/:id" element={<OrgTicketRequests />} />,
    <Route path="order-tickets/:id" element={<OrgBuyTickets />} />,
    <Route path="event-log/:id" element={<OrgEventLog />} />,
    <Route path="event/view-ticket/:id" element={<OrgEventTicket />} />,
    <Route path="event-gallery" element={<OrgEventGallery />} />,
    <Route path="my-tickets" element={<OrgTickets />} />,
    <Route path="add-event-verifier/:id" element={<OrgAddEventVerifier />} />,
    <Route path="event-history" element={<OrgEventHistory />} />,
    <Route path="id-cards" element={<OrgIDCardsPage />} />,
    <Route path="membership" element={<OrgMembership />} />,
    <Route path="subscriptions" element={<OrgSubscriptions />} />,
    <Route path="add-subscription" element={<AddSubscriptionPlan />} />,
    <Route path="subscription/editPlan/:id" element={<EditSubscriptionPlan />} />,
    <Route path="subscription/history/:id" element={<SubscriptionHistory />} />,
    <Route path="add-card" element={<OrgAddCard />} />,
    <Route path="cards/structure" element={<CardStructure />} />,
    <Route path="cards/createUser/:id" element={<CreateUserCard />} />,
    <Route path="card/viewCard/:id" element={<PreviewCard />} />,
    <Route path="card/updateCard/:id" element={<UpdateCard />} />,
    <Route path="membership/updateMember/:id" element={<UpdateMember />} />,
    <Route path="membership/add" element={<InviteMember />} />,
    <Route path="notification" element={<OrgNotification />} />,
    <Route path="settings" element={<OrgSettings />} />
];

export default OrgRoutes;
