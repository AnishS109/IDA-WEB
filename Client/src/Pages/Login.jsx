import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../Context/DataProvider";

const Login = () => {
  const { role, setAccount } = useContext(DataContext);
  const savedRole = localStorage.getItem("role");

  const reducer = (state, action) => {
    if (action.type === "SET_FORM") {
      return {
        ...state,
        loginDetails: {
          ...state.loginDetails,
          [action.field]: action.value,
        },
      };
    }
    if (action.type === "RESET_FORM") {
      return {
        ...state,
        loginDetails: { username: "", password: "", role: "" },
        error: "",
      };
    }
    if (action.type === "SET_ERROR") {
      return {
        ...state,
        error: action.payload,
      };
    }
  };

  const initialState = {
    error: "",
    successMsg: "",
    loginDetails: {
      userName: "",
      password: "",
      role: role || savedRole,
    },
  };

  const [state, dispatchState] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchState({ type: "SET_FORM", field: name, value });
  };

  const { backendUrl } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!state.loginDetails.userName || !state.loginDetails.password) {
      dispatchState({ type: "SET_ERROR", payload: "All fields are required!" });
      return;
    }
  
    try {
      const response = await axios.post(
        `${backendUrl}/userLogin`,
        state.loginDetails
      );
      const Data = response.data;
  
      if (response.status === 200) {
        sessionStorage.setItem(`accessToken`, `${Data.accessToken}`);
        sessionStorage.setItem(`refreshToken`, `${Data.refreshToken}`);
  
        setAccount({ name: Data.name, userName: Data.userName });
  
        if (Data.role === "Admin") {
          setTimeout(() => {
            navigate("/Admin-Home");
          }, 1000);
        } else if (Data.role === "HR") {
          setTimeout(() => {
            navigate("/HR-Home");
          }, 1000);
        } else if (Data.role === "Faculty") {
          setTimeout(() => {
            navigate("/Faculty-Home");
          }, 1000);
        } else if (Data.role === "Sales") {
          setTimeout(() => {
            navigate("/Sales-Home");
          }, 1000);
        } else {
          if (Data.msg === "Role is not found") {
            navigate("/");
          }
          dispatchState({ type: "SET_ERROR", payload: Data.message });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data.message);
        dispatchState({
          type: "SET_ERROR",
          payload: error.response.data.message || "Something went wrong!",
        });
      }
       else {
        console.error("Error during setup:", error.message);
        dispatchState({
          type: "SET_ERROR",
          payload: "Error during request. Please try again.",
        });
      }
    }
  };
  

  const Logo =
    "https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png";

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
            borderRadius: "15px",
            padding: "20px 30px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* --------- ORGANISATION LOGO --------- */}
          <Box sx={{ m: "20px" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxHeight: "70px",
                maxWidth: "200px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* --------- ERROR MESSAGE --------- */}
          {state.error && (
            <Typography
              variant="body1"
              sx={{
                color: "red",
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {state.error}
            </Typography>
          )}

          {/* --------- LOGIN FORM --------- */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "600",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Login Here!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              marginBottom: "30px",
              color: "#555",
            }}
          >
            Please log in to access your account
          </Typography>

          <TextField
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            fullWidth
            name="userName"
            onChange={handleChange}
            value={state.loginDetails.userName}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            value={state.loginDetails.password}
            fullWidth
            sx={{
              marginBottom: "30px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              marginBottom: "20px",
              padding: "10px 0",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "25px",
            }}
          >
            Login
          </Button>

          {/* --------- ROUTES FOR REGISTER --------- */}
          <Typography sx={{ color: "black" }}>
            Don't have an account?
            <NavLink to={"/register"}>
              <Button>Sign up</Button>
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
