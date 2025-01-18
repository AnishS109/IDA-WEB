import { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import DataProvider, { DataContext } from "./Context/DataProvider";
import Loader from "./components/Loader";
import EnrollmentForm from "./Sales_ALL/Sub_Components/EnrollmentForm.jsx";
import AddEnquiry from "./Sales_ALL/components/AddEnquiry.jsx";
import ScrollToTopOnRouteChange from "./ScrollToTop.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import HRDataProvider from "./Context/HRDataProvider.jsx";
import Company_Form from "./HR_ALL/sub_components/form/Company_Form.jsx"
import College_Form from "./HR_ALL/sub_components/form/College_Form.jsx"
import Notification from "./HR_ALL/components/Notification.jsx";
import AddEvents from "./HR_ALL/sub_components/form/AddEvents.jsx";

// Lazy-loaded components
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AdminHome = lazy(() => import("./admin_ALL/AdminHome"));
const FacultyHome = lazy(() => import("./faculty_ALL/FacultyHome"));
const HrHome = lazy(() => import("./HR_ALL/HrHome"));
const SalesHome = lazy(() => import("./Sales_ALL/SalesHome"));

const PrivateRoutes = () => {
  const { account } = useContext(DataContext);
  return account.name ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {

  return (
    <DataProvider>
      <HRDataProvider>
      <BrowserRouter>
        {/* Place ScrollToTopOnRouteChange inside BrowserRouter */}
        <ScrollToTopOnRouteChange />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* ------------ PUBLIC ROUTES ------------ */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgotPassword />} />

            {/* ------------ PRIVATE ROUTES ------------ */}

            <Route element={<PrivateRoutes />}>
              {/* ------------ FOR ADMIN ------------ */}
              <Route path="/Admin-Home" element={<AdminHome />} />

              {/* ------------ FOR SALES ------------ */}
              <Route path="/Sales/Home" element={<SalesHome />} />
              <Route path="/enrollment-form" element={<EnrollmentForm />} />
              <Route path="/enquiry-form" element={<AddEnquiry />} />

              {/* ------------ FOR FACULTY ------------ */}
              <Route path="/Faculty-Home" element={<FacultyHome />} />

              {/* ------------ FOR HR ------------ */}
              <Route path="/HR/Home" element={<HrHome />} />
              <Route path="/Company/form" element={<Company_Form />} />
              <Route path="/College/form" element={<College_Form />} />
              <Route path="/Notification" element={<Notification />} />
              <Route path="/Add/Events" element={<AddEvents />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
      </HRDataProvider>
    </DataProvider>
  );
};

export default App;
