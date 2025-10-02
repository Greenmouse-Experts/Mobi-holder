import { Route } from "react-router-dom";
import OrgDashboard from "../modules/OrgModules/OrgDashboard";
import OrgVerificationDashboard from "../modules/OrgModules/pages/Verify";
import OrgAddVerifier from "../modules/OrgModules/pages/Verify/addVerifiers";
import OrgScanEvents from "../modules/OrgModules/pages/Verify/scanEvent";
import OrgVerifyEvent from "../modules/OrgModules/pages/Verify/verifyEvent";
import OrgVerificationRequest from "../modules/OrgModules/pages/Verify/verificationRequest";
import OrgEvents from "../modules/OrgModules/pages/Events";
import OrgAddEvent from "../modules/OrgModules/pages/Events/addEvent";
import OrgUpcomingEvents from "../modules/OrgModules/pages/Events/upcomingEvent";
import OrgViewEvent from "../modules/OrgModules/pages/Events/viewEvent";
import OrgViewInvites from "../modules/OrgModules/pages/Events/viewInvites";
import OrgTicketRequests from "../modules/OrgModules/pages/Events/ticketRequests";
import OrgEventLog from "../modules/OrgModules/pages/Events/eventLog";
import OrgEventGallery from "../modules/OrgModules/pages/Events/eventGallery";
import OrgAddEventVerifier from "../modules/OrgModules/pages/Events/addEventVerifier";
import OrgIDCardsPage from "../modules/OrgModules/pages/IdCards";
import OrgMembership from "../modules/OrgModules/pages/Memberships";
import OrgAddCard from "../modules/OrgModules/pages/IdCards/addCard";
import CardStructure from "../modules/OrgModules/pages/IdCards/cardStructure";
import CreateUserCard from "../modules/OrgModules/pages/IdCards/createUserCard";
import PreviewCard from "../modules/OrgModules/pages/IdCards/viewCard";
import UpdateMember from "../modules/OrgModules/pages/Memberships/updateMember";
import InviteMember from "../modules/OrgModules/pages/Memberships/inviteMember";
import OrgSettings from "../modules/OrgModules/Settings";
import UpdateCard from "../modules/OrgModules/pages/IdCards/updateCard";
import ViewOrgPublicEvents from "../modules/OrgModules/pages/Events/viewPublicEvents";
import OrgBuyTickets from "../modules/OrgModules/pages/Events/buyTickets";
import OrgEventHistory from "../modules/OrgModules/pages/Events/eventHistory";
import OrgTickets from "../modules/OrgModules/pages/Events/myTickets";
import OrgEventTicket from "../modules/OrgModules/pages/Events/viewTicket";
import ViewVerifiers from "../modules/OrgModules/pages/Verify/viewVerifiers";
import OrgEditEvent from "../modules/OrgModules/pages/Events/editEvent";
import OrganisationPlans from "../modules/OrgModules/pages/Subscription/plans";
import ViewPlan from "../modules/OrgModules/pages/Subscription/viewPlan";
import SubscriptionLog from "../modules/OrgModules/pages/Subscription/SubscriptionLog";
import Notification from "../modules/Notifications";
import Wallet from "../modules/OrgModules/pages/Wallet";
import MySubPlans from "../modules/OrgModules/pages/Subscription/userSubscription";
import MySubscribers from "../modules/OrgModules/pages/Subscription/userSubscription/subscribers";
import Designations from "../modules/OrgModules/pages/Designations";
import EditMember from "../modules/OrgModules/pages/Memberships/EditMember";
import OrgTransactions from "../modules/OrgModules/pages/OrgTransactions";
import GeneralNotification from "../modules/General/GeneralNotification";
import OrgNotifications from "../modules/General/OrgNotifications";

const OrgRoutes = [
  <Route path="dashboard" element={<OrgDashboard />} />,
  <Route path="verify" element={<OrgVerificationDashboard />} />,
  <Route path="view-verifiers/:id" element={<ViewVerifiers />} />,
  <Route path="add-verifiers" element={<OrgAddVerifier />} />,
  <Route path="scan-event" element={<OrgScanEvents />} />,
  <Route path="verify-event/:id" element={<OrgVerifyEvent />} />,
  <Route path="verification-request" element={<OrgVerificationRequest />} />,
  <Route path="events" element={<OrgEvents />} />,
  <Route path="add-event" element={<OrgAddEvent />} />,
  <Route path="edit-event/:id" element={<OrgEditEvent />} />,
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
  <Route path="memberships" element={<OrgMembership />} />,
  <Route path="add-card" element={<OrgAddCard />} />,
  <Route path="cards/structure" element={<CardStructure />} />,
  <Route path="cards/createUser/:id" element={<CreateUserCard />} />,
  <Route path="card/viewCard/:id" element={<PreviewCard />} />,
  <Route path="card/updateCard/:id" element={<UpdateCard />} />,
  <Route path="membership/updateMember/:id" element={<UpdateMember />} />,
  <Route path="membership/edit/:id" element={<EditMember />} />,
  <Route path="membership/add" element={<InviteMember />} />,
  <Route path="settings" element={<OrgSettings />} />,
  <Route path="subscription/plans" element={<OrganisationPlans />} />,
  <Route path="subscription/plans/view/:id" element={<ViewPlan />} />,
  <Route path="subscription/log" element={<SubscriptionLog />} />,
  <Route path="subscription/my-plans" element={<MySubPlans />} />,
  <Route path="subscription/subscribers" element={<MySubscribers />} />,
  <Route path="designations" element={<Designations />} />,
  <Route path="transactions" element={<OrgTransactions />} />,
  <Route path="subscription/plans/view/:id/:status" element={<ViewPlan />} />,
  <Route path="notification" element={<OrgNotifications />} />,
  <Route path="wallet" element={<Wallet />} />,
];

export default OrgRoutes;
