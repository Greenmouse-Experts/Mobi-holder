import { useState } from 'react'
import SplashScreen from './modules/SplashScreen'
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppModules from './modules/AppModules';
import { ThemeProvider } from './context/ThemeContext';
import SuperAdmin from './modules/SuperAdmin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrgModules from './modules/OrgModules';
import PublicRoutes from './routes/PublicRoutes';
import UserRoutes from './routes/UserRoutes';
import OrgRoutes from './routes/OrgRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';

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
            {splash ? (
              <SplashScreen clearScreen={handleSplashScreen} />
            ) : (
              <Routes>
                {/* Public Routes */}
                {PublicRoutes}

                {/* Individual/User Routes */}
                <Route path="/app" element={<AppModules />}>
                  {UserRoutes}
                </Route>

                {/* Organisation Routes */}
                <Route path="/org" element={<OrgModules />}>
                  {OrgRoutes}
                </Route>

                {/* Super Admin Routes */}
                <Route path="/superadmin" element={<SuperAdmin />}>
                  {SuperAdminRoutes}
                </Route>
              </Routes>
            )}
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
