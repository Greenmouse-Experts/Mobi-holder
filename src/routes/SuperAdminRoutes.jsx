import { Route } from "react-router-dom";
import DashBoard from "../modules/SuperAdmin/DashBoard";
import Organisations from "../modules/SuperAdmin/Organisations";
import Events from "../modules/SuperAdmin/Events";
import AllUsers from '../modules/SuperAdmin/Users';
import Subscriptions from '../modules/SuperAdmin/Subscriptions';
import IDCards from '../modules/SuperAdmin/IDCards';
import ViewOrgAdmin from '../modules/SuperAdmin/Organisations/viewOrganisation';
import ViewUserAdmin from '../modules/SuperAdmin/Users/viewUser';
//import EventLog from "../modules/SuperAdmin/Events/modules/eventLog";
import EventTickets from "../modules/SuperAdmin/Events/modules/eventVerifiers";
import EventsCategories from "../modules/SuperAdmin/Events/eventsCategories";
import Staffs from "../modules/SuperAdmin/Staffs";
import AddStaff from "../modules/SuperAdmin/Staffs/addStaff";
import ViewEvent from "../modules/SuperAdmin/Events/modules/viewEvent";
import EventAttendees from "../modules/SuperAdmin/Events/modules/eventAttendees";
import AdminSettings from "../modules/SuperAdmin/Settings";
import EventVerifiers from "../modules/SuperAdmin/Events/modules/eventVerifiers";
import AllVerifiers from "../modules/SuperAdmin/Verifiers";
import Members from "../modules/SuperAdmin/Membership";
import OrgMembers from "../modules/SuperAdmin/Organisations/modules/Members";
import AdminViewCard from "../modules/SuperAdmin/IDCards/viewCard";
import AllTemplates from "../modules/SuperAdmin/IDCards/allTemplates";
import AllPersonalIDCards from "../modules/SuperAdmin/IDCards/personalIDCards";
import ViewPersonalCard from "../modules/SuperAdmin/IDCards/modules/viewPersonalIDCard";
import OrgTemplates from "../modules/SuperAdmin/Organisations/modules/Templates";
import ViewTemplate from "../modules/SuperAdmin/IDCards/modules/viewTemplate";
import ViewRoles from "../modules/SuperAdmin/Staffs/roles";
import UpdateStaff from "../modules/SuperAdmin/Staffs/updateStaff";
import IndividualPlan from "../modules/SuperAdmin/Subscriptions/IndividualPlan";
import CreatePlan from "../modules/SuperAdmin/Subscriptions/modules/createPlan";
import OrganisationPlan from "../modules/SuperAdmin/Subscriptions/OrganisationPlan";
import OrgCreatePlan from "../modules/SuperAdmin/Subscriptions/modules/orgCreatePlan";
import IndividualLog from "../modules/SuperAdmin/Subscriptions/IndividualLog";

const SuperAdminRoutes = [
    <Route path="dashboard" element={<DashBoard />} />,
    <Route path="organisation" element={<Organisations />} />,
    <Route path="organisation/members/:id" element={<OrgMembers />} />,
    <Route path="organisation/templates/:id" element={<OrgTemplates />} />,
    <Route path="individuals" element={<AllUsers />} />,
    <Route path="view-individual/:id" element={<ViewUserAdmin />} />,
    <Route path="view-org/:id" element={<ViewOrgAdmin />} />,
    <Route path="membership" element={<Members />} />,
    <Route path="events" element={<Events />} />,
    <Route path="events/categories" element={<EventsCategories />} />,
    <Route path="subscription-individual" element={<Subscriptions />} />,
    <Route path="subscription-individual/plans" element={<IndividualPlan />} />,
    <Route path="subscription-organisation/plans" element={<OrganisationPlan />} />,
    <Route path="subscription-individual/plans/create" element={<CreatePlan />} />,
    <Route path="subscription-organisation/plans/create" element={<OrgCreatePlan />} />,
    <Route path="subscription-individual/plans/edit/:id" element={<CreatePlan />} />,
    <Route path="subscription-organisation/plans/edit/:id" element={<OrgCreatePlan />} />,
    <Route path="subscription-log/individual" element={<IndividualLog />} />,
    <Route path="personal-idCards" element={<AllPersonalIDCards />} />,
    <Route path="personal-idCards/view-personal-card/:id" element={<ViewPersonalCard />} />,
    <Route path="idCardsTemplate" element={<AllTemplates />} />,
    <Route path="idCardsTemplate/view/:id" element={<ViewTemplate />} />,
    <Route path="id-cards" element={<IDCards />} />,
    <Route path="id-cards/view/:id" element={<AdminViewCard />} />,
    <Route path="events/verifiers/:id/:eventId" element={<EventVerifiers />} />,
    <Route path="events/event-ticket/:id" element={<EventTickets />} />,
    <Route path="events/view/:id" element={<ViewEvent />} />,
    <Route path="events/event-attendees/:id/:eventId" element={<EventAttendees />} />,
    <Route path="verifiers" element={<AllVerifiers />} />,
    <Route path="staffs" element={<Staffs />} />,
    <Route path="staffs/create" element={<AddStaff />} />,
    <Route path="staffs/update/:id" element={<UpdateStaff />} />,
    <Route path="staffs/roles" element={<ViewRoles />} />,
    <Route path="settings" element={<AdminSettings />} />,
];

export default SuperAdminRoutes;