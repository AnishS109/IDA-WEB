import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import DataProvider from "./Context/DataProvider";
import Loader from "./components/Loader";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));

const AdminHome = lazy(() => import("./admin_ALL/AdminHome"));
const FacultyHome = lazy(() => import("./faculty_ALL/FacultyHome"));
const HrHome = lazy(() => import("./HR_ALL/HrHome"));
const SalesHome = lazy(() => import("./Sales_ALL/SalesHome"));
const AddEnquiry = lazy(() => import("./Sales_ALL/components/AddEnquiry"));

// const PrivateRoutes = ({ authStatus }) => {
//   console.log(authStatus);
  
//   if (authStatus) {
//     return <Outlet />;
//   }
//   return <Navigate to="/" />;
// };

const App = () => {
  // const [authStatus, setAuthStatus] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   if (accessToken) {
  //     console.log("DONE")
  //     setAuthStatus(true);
  //   } else {
  //     setAuthStatus(false);
  //   }
  //   setLoading(false); 
  // }, [authStatus]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <DataProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* ------------ PUBLIC ROUTES ------------ */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

              {/* ------------ FOR ADMIN ------------ */}
              <Route path="/Admin-Home" element={<AdminHome />} />

              {/* ------------ FOR SALES ------------ */}
              <Route path="/Sales-Home" element={<SalesHome />} />

              {/* ------------ FOR FACULTY ------------ */}
              <Route path="/Faculty-Home" element={<FacultyHome />} />

              {/* ------------ FOR HR ------------ */}
              <Route path="/HR-Home" element={<HrHome />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
