import React, { useContext, useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataContext } from "../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const navigate = useNavigate();

  const Logo =
    "https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png";

  const { account, setAccount } = useContext(DataContext);

  // State for controlling the modal visibility
  const [open, setOpen] = useState(false);

  // Open the modal
  const handleLogoutClick = () => {
    setOpen(true);
  };

  // Confirm the logout and clear session
  const handleConfirmLogout = () => {
    localStorage.clear()
    setAccount({ userName: "", name: "" });
    setOpen(false);
    navigate("/"); 
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setOpen(false);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", mb: "5px" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: { xs: 1, sm: 3 },
            gap: { xs: 1, sm: 0 },
            position: "relative",
          }}
        >
          {/* ----- IDA LOGO ----- */}
          <Box
            sx={{
              height: { xs: "40px", sm: "60px", md: "60px" },
              width: { xs: "150px", sm: "180px", md: "200px" },
              borderRadius: "20px",
              bgcolor: "#e0f7fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: { xs: "auto", sm: 0 },
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* ----- WELCOME MESSAGE ----- */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              color: "white",
              textAlign: { xs: "center", sm: "left" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            Hello! Welcome {account.name ? account.name : "to Insta Dot Analytics"}
          </Typography>

          {/* ----- DATE MESSAGE ----- */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              color: "#e0f7fa",
              textAlign: { xs: "center", sm: "right" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            {today}
          </Typography>

          {account.name && (
            <Button
              sx={{
                color: "white",
                bgcolor: "rgb(255, 91, 91)",
                fontWeight: 700,
                mb: { xs: "5px" },
                position: { xs: "absolute", sm: "relative" },
                right: { xs: "10px", sm: "auto" },
                top: { xs: "10px", sm: "auto" },
              }}
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* -------- Logout Confirmation Modal ------- */}

      <Dialog open={open} onClose={handleCancelLogout}>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">Cancel</Button>
          <Button onClick={handleConfirmLogout} sx={{ color: "red" }}>Confirm</Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default Navbar;
