import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context/DataProvider";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("");
  
  const initialState = {
    error: "",
    successfulMsg: "",
    loading: false, // Loader state
    registerDetails: {
      name: "",
      userName: "",
      password: "",
      phoneNumber: "",
      email: "",
      role: "",
    },
  };

  const reducer = (state, action) => {
    if (action.type === "SET_FORM") {
      return {
        ...state,
        registerDetails: {
          ...state.registerDetails,
          [action.field]: action.value,
        },
      };
    }
    if (action.type === "SET_ERROR") {
      return {
        ...state,
        error: action.payload,
        loading: false, // Stop loader on error
      };
    }
    if (action.type === "SET_SUCCESS") {
      return {
        ...state,
        successfulMsg: action.payload,
        loading: false, // Stop loader on success
      };
    }
    if (action.type === "SET_LOADING") {
      return {
        ...state,
        loading: action.payload, // Control loader state
      };
    }
    if (action.type === "RESET_FORM") {
      return {
        ...state,
        registerDetails: { name: "", userName: "", password: "" },
        error: "",
      };
    }
    return state;
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

    if (
      !state.registerDetails.name ||
      !state.registerDetails.userName ||
      !state.registerDetails.password
    ) {
      dispatchState({ type: "SET_ERROR", payload: "All fields are required" });
      return;
    }

    if (state.registerDetails.userName.length < 8) {
      dispatchState({
        type: "SET_ERROR",
        payload: "Username must be at least 8 characters long.",
      });
      return;
    }

    if (state.registerDetails.password.length < 8) {
      dispatchState({
        type: "SET_ERROR",
        payload: "Password must be at least 8 characters long.",
      });
      return;
    }

    dispatchState({ type: "SET_LOADING", payload: true }); // Start loader

    try {
      const response = await axios.post(
        `${backendUrl}/userRegister`,
        state.registerDetails
      );
      if (response.status === 200) {
        dispatchState({
          type: "SET_ERROR",
          payload: "",
        });
        dispatchState({ type: "SET_SUCCESS", payload: "Registered Successfully" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatchState({ type: "SET_ERROR", payload: response.data.msg });
      }
    } catch (error) {
      console.log("Error while registering", error);
      dispatchState({
        type: "SET_ERROR",
        payload: error.response.data.msg,
      });
    } finally {
      dispatchState({ type: "SET_LOADING", payload: false }); 
    }
  };

  const Logo =
    "https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png";

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
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
          padding: "10px 30px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
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

        {/* Error and Success Messages */}
        {state.error && (
          <Typography
            variant="body1"
            sx={{
              color: "red",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            {state.error}
          </Typography>
        )}

        {state.successfulMsg && (
          <Typography
            variant="body1"
            sx={{
              color: "green",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            {state.successfulMsg}
          </Typography>
        )}

        {/* Loader */}
        {state.loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Form Heading */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "600",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          Register Here!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "14px",
            marginBottom: "30px",
            color: "#555",
          }}
        >
          Please fill in the details below to complete your registration.
        </Typography>

        {/* Role Dropdown */}
        <Grid item xs={12} sx={{ mb: "20px" }}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              label="role"
              onChange={(e) => {
                setSelectedRole(e.target.value);
                dispatchState({
                  type: "SET_FORM",
                  field: "role",
                  value: e.target.value,
                });
              }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Form Fields */}
        <TextField
          label="Name"
          placeholder="Enter your name"
          variant="outlined"
          fullWidth
          required
          name="name"
          value={state.registerDetails.name}
          onChange={handleChange}
          sx={{
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        />

        <TextField
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          fullWidth
          required
          name="userName"
          value={state.registerDetails.userName}
          onChange={handleChange}
          sx={{
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        />

        <TextField
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          fullWidth
          required
          name="email"
          value={state.registerDetails.email}
          onChange={handleChange}
          sx={{
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        />

        <TextField
          label="Phone Number"
          placeholder="Enter your number"
          variant="outlined"
          fullWidth
          required
          name="phoneNumber"
          value={state.registerDetails.phoneNumber}
          onChange={handleChange}
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
          required
          value={state.registerDetails.password}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: "30px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            marginBottom: "10px",
            padding: "10px 0",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "25px",
          }}
        >
          Submit
        </Button>

        {/* Link to Login */}
        <Typography sx={{ color: "black" }}>
          Already have an account?
          <NavLink to={"/login"}>
            <Button>Sign in</Button>
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
