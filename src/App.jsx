import { useState } from "react";
import SplashScreen from "./modules/SplashScreen";
import { Route, Routes } from "react-router-dom";
import AppModules from "./modules/AppModules";
import { ThemeProvider } from "./context/ThemeContext";
import SuperAdmin from "./modules/SuperAdmin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrgModules from "./modules/OrgModules";
import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import OrgRoutes from "./routes/OrgRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import "@mantine/core/styles.css";
function App() {
  const [splash, setSplash] = useState(false);

  const queryClient = new QueryClient();

  const handleSplashScreen = () => {
    setSplash(false);
  };

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

                {/* Protected Routes */}
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppModules />
                    </ProtectedRoute>
                  }
                >
                  {UserRoutes}
                </Route>

                <Route
                  path="/org"
                  element={
                    <ProtectedRoute>
                      <OrgModules />
                    </ProtectedRoute>
                  }
                >
                  {OrgRoutes}
                </Route>

                <Route
                  path="/superadmin"
                  element={
                    <AdminProtectedRoute>
                      <SuperAdmin />
                    </AdminProtectedRoute>
                  }
                >
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
  );
}

export default App;
