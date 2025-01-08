import { lazy, Suspense, useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import DataProvider, { DataContext } from "./Context/DataProvider";
import Loader from "./components/Loader";
import EnrollmentForm from "./Sales_ALL/Sub_Components/EnrollmentForm.jsx";

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
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* ------------ PUBLIC ROUTES ------------ */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/enrollment-form" element={<EnrollmentForm />} />

            {/* ------------ PRIVATE ROUTES ------------ */}

            <Route element={<PrivateRoutes />}>

              {/* ------------ FOR ADMIN ------------ */}
              <Route path="/Admin-Home" element={<AdminHome />} />

              {/* ------------ FOR SALES ------------ */}
              <Route path="/Sales-Home" element={<SalesHome />} />

              {/* ------------ FOR FACULTY ------------ */}
              <Route path="/Faculty-Home" element={<FacultyHome />} />

              {/* ------------ FOR HR ------------ */}
              <Route path="/HR-Home" element={<HrHome />} />

            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
