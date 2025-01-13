import React, { useContext, useEffect, useReducer, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../Context/DataProvider";

const ForgotPassword = () => {
  // --------- Logo URL ---------
  const Logo = "https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png";

  // --------- Backend URL from Context ---------
  const { backendUrl } = useContext(DataContext);

  // --------- Initial State for Reducer ---------
  const initialState = {
    errorMsg: "",
    successMsg: "",
    otpVisible: false,
    formData: {
      email: "",
      otp: "",
      password: "",
    },
  };

  const navigate = useNavigate();

  // --------- State for Button and Loader ---------
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------- Reducer Function for State Management ---------
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FORM":
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.field]: action.value,
          },
        };
      case "OPT":
        return {
          ...state,
          otpVisible: true,
        };
      case "Error":
        return {
          ...state,
          errorMsg: action.value,
        };
      case "Success":
        return {
          ...state,
          successMsg: action.value,
        };
      default:
        return state;
    }
  };

  // --------- Use Reducer Hook ---------
  const [state, dispatchState] = useReducer(reducer, initialState);

  // --------- Handle Change in Form Fields ---------
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchState({ type: "SET_FORM", field: name, value });
  };

  // --------- Reset Error and Success Messages when Inputs Change ---------
  useEffect(() => {
    dispatchState({ type: "Error", value: "" });
  }, [state.formData.email, state.formData.otp, state.formData.password]);

  useEffect(() => {
    dispatchState({ type: "Success", value: "" });
  }, [state.formData.otp, state.formData.password]);

  // --------- Handle Verify Button Click ---------
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = state.formData.email;

    if (!email) {
      setLoading(false);
      dispatchState({ type: "Error", value: "Email is Required" });
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/forgetPassword`, {
        email: email,
      });

      if (response.status === 200) {
        // OTP successfully sent
        dispatchState({ type: "OPT" });
        dispatchState({ type: "Error", value: "" });
        dispatchState({ type: "Success", value: response.data.message });
        setSubmitButton(true);
      }
    } catch (error) {
      // Handle error response
      dispatchState({ type: "Error", value: error.response?.data?.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  // --------- Handle Submit Button Click ---------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serverResponse = {
      email: state.formData.email,
      code: state.formData.otp,
      password: state.formData.password,
    };

    if (!serverResponse.email || !serverResponse.code || !serverResponse.password) {
      setLoading(false);
      dispatchState({ type: "Error", value: "All fields are Required" });
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/changePassword`, serverResponse);
      if (response.status === 200) {
        // Password successfully changed
        dispatchState({ type: "Error", value: "" });
        dispatchState({ type: "Success", value: response.data.message });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      dispatchState({ type: "Error", value: error.response?.data?.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          height: "auto",
          width: "28rem",
          bgcolor: "white",
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          textAlign: "center",
          padding: "40px 30px",
          position: "relative", // For positioning the loader
        }}
      >
        {/* --------- Logo Section --------- */}
        <img
          src={Logo}
          alt="IDA LOGO"
          style={{
            maxHeight: "70px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        {/* --------- SUCCESS MESSAGE --------- */}
        {state.successMsg && (
          <Typography sx={{ color: "green", mb: "5px" }}>{state.successMsg}</Typography>
        )}

        {/* --------- ERROR MESSAGE --------- */}
        {state.errorMsg && (
          <Typography sx={{ color: "red", mb: "5px" }}>{state.errorMsg}</Typography>
        )}

        {/* --------- LOADER (Centered) --------- */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(255, 255, 255, 0.8)", // Slightly dim the background
              borderRadius: "20px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* --------- Form Heading --------- */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Recover Password
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Please enter your registered email to recover your password.
        </Typography>

        {/* --------- Email Input --------- */}
        <TextField
          label="Email Address"
          name="email"
          fullWidth
          variant="outlined"
          placeholder="Enter your email"
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
            marginBottom: "20px",
          }}
          onChange={handleChange}
          value={state.formData.email}
        />

        {/* --------- OTP Input (if OTP visible) --------- */}
        {state.otpVisible && (
          <>

          <TextField
            label="OTP"
            name="otp"
            fullWidth
            variant="outlined"
            placeholder="Enter your OTP"
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
              marginBottom: "20px",
            }}
            onChange={handleChange}
            value={state.formData.otp}
          />

          <TextField
            label="New Password"
            name="password"
            fullWidth
            variant="outlined"
            placeholder="Enter new Password"
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
              marginBottom: "20px",
            }}
            onChange={handleChange}
            value={state.formData.password}
          />
          </>
        )}

        {/* --------- VERIFY BUTTON (Conditional Rendering) --------- */}
        {submitButton ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px 0px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "30px",
              marginBottom: "20px",
            }}
            aria-label="Submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px 0px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "30px",
              marginBottom: "20px",
            }}
            aria-label="Verify Email"
            onClick={handleVerify}
            disabled={loading}
          >
            Verify
          </Button>
        )}

        {/* --------- Login Prompt --------- */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Remember your password?{" "}
          <NavLink to={"/login"}>
            <Button
              size="small"
              sx={{
                textTransform: "none",
                padding: 0,
                fontSize: "14px",
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              Login here
            </Button>
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;