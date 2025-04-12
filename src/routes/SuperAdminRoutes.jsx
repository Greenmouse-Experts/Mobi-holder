import { Route } from "react-router-dom";
import DashBoard from "../modules/SuperAdmin/DashBoard";
import Organisations from "../modules/SuperAdmin/Organisations";
import Events from "../modules/SuperAdmin/Events";
import AllUsers from '../modules/SuperAdmin/Users';
import Subscriptions from '../modules/SuperAdmin/Subscriptions';
import IDCards from '../modules/SuperAdmin/Users/modules/idCards';
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

const SuperAdminRoutes = [
    <Route path="dashboard" element={<DashBoard />} />,
    <Route path="organisation" element={<Organisations />} />,
    <Route path="individuals" element={<AllUsers />} />,
    <Route path="view-individual/:id" element={<ViewUserAdmin />} />,
    <Route path="view-org/:id" element={<ViewOrgAdmin />} />,
    <Route path="events" element={<Events />} />,
    <Route path="events/categories" element={<EventsCategories />} />,
    <Route path="subscription-individual" element={<Subscriptions />} />,
    <Route path="id-cards" element={<IDCards />} />,
    <Route path="events/verifiers/:id/:eventId" element={<EventVerifiers />} />,
    <Route path="events/event-ticket/:id" element={<EventTickets />} />,
    <Route path="events/view/:id" element={<ViewEvent />} />,
    <Route path="events/event-attendees/:id/:eventId" element={<EventAttendees />} />,
    <Route path="staffs" element={<Staffs />} />,
    <Route path="staffs/create" element={<AddStaff />} />,
    <Route path="settings" element={<AdminSettings />} />,
];

export default SuperAdminRoutes;