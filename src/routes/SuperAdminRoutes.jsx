import { Route } from "react-router-dom";
import DashBoard from "../modules/SuperAdmin/DashBoard";
import Organisations from "../modules/SuperAdmin/Organisations";
import Events from "../modules/SuperAdmin/Events";
import AllUsers from '../modules/SuperAdmin/Users';
import Subscriptions from '../modules/SuperAdmin/Subscriptions';
import IDCards from '../modules/SuperAdmin/Users/modules/idCards';
import ViewOrgAdmin from '../modules/SuperAdmin/Organisations/viewOrganisation';
import ViewUserAdmin from '../modules/SuperAdmin/Users/viewUser';

const SuperAdminRoutes = [
                  <Route path="dashboard" element={<DashBoard />} />,
                  <Route path="organisation" element={<Organisations />} />,
                  <Route path="individuals" element={<AllUsers />} />,
                  <Route path="view-individual/:id" element={<ViewUserAdmin />} />,
                  <Route path="view-org/:id" element={<ViewOrgAdmin />} />,
                  <Route path="events" element={<Events />} />,
                  <Route path="subscriptions" element={<Subscriptions />} />,
                  <Route path="id-cards" element={<IDCards />} />,
];

export default SuperAdminRoutes;