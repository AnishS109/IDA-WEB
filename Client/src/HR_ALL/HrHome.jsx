import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { Button, Grid } from "@mui/material";

import Company from "./components/Company"
import College from "./components/College"

import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Events from "./components/Events";
import { DataContext } from "../Context/DataProvider";

const HrHome = () => {

  const [openEvents, setOpenEvents] = useState(() => {
    const savedOpenEvent = sessionStorage.getItem("openEvents");
    return savedOpenEvent ? JSON.parse(savedOpenEvent) : true;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const firstVisit = sessionStorage.getItem("hasVisited");

    if (!firstVisit) {
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => {
        navigate("/Notification");
      }, 2000);
    } else {
      setOpenEvents(false);
    }
  }, [navigate]);

  useEffect(() => {
    sessionStorage.setItem("openEvents", JSON.stringify(openEvents));
  }, [openEvents]);

  const location = useLocation();

  const {setPressChromeBackButton, PressChromeBackButton} = useContext(DataContext)

  useEffect(() => {
    const handleBackButton = () => {
      if (location.pathname === "/HR/Home" && !PressChromeBackButton) {
        setPressChromeBackButton(true);
      }
    };
  
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location, PressChromeBackButton]);

  const [selectedOptions, setSelectedOption] = useState(sessionStorage.getItem("selectedOptions") || "Company");

  useEffect(() => {
    sessionStorage.setItem("selectedOptions", selectedOptions);
  }, [selectedOptions]);

  const options = [
    {label:"Company", icon: <ApartmentIcon/>, key:"Company"},
    {label:"College", icon: <SchoolIcon/>, key:"College"},
    {label:"Event", icon: <NotificationAddIcon/>, key:"Event"},
  ]

  const Content = () => {
    if(selectedOptions === "Company"){
      return <Company/>
    }
    else if (selectedOptions === "College"){
      return <College/>
    }
    else if (selectedOptions === "Event"){
      return <Events/>
    }
  }

  return(
    <>
    <Layout>

      <Grid container sx={{ height: "100%", minHeight: "100vh", backgroundColor: "#fafafa"}}>

      <Grid item xs={12} sm={4} md={2.5}
        sx={{
          backgroundColor: "#ffffff",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 2,
          position: { sm: "sticky" },
          top: 0,
          height: { xs: "auto", sm: "100vh" },
          boxShadow: "2px 0px 6px rgba(0, 0, 0, 0.1)",
        }}>

        {options.map((option) => (
          <Button 
          key={option.key}
          startIcon={option.icon}
          onClick={() => setSelectedOption(option.key)}
          sx={{
            width: { xs: "auto", sm: "100%" },
            textAlign: "left",
            padding: { xs: 1, sm: 2 },
            margin: { xs: 0.5, sm: 1 },
            backgroundColor: selectedOptions === option.key ? "rgb(58, 164, 250)" : "#f5f5f5",
            color: selectedOptions === option.key ? "white" : "#333",
            borderRadius: "8px",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow:
              selectedOptions === option.key
                ? "0px 4px 8px rgba(58, 164, 250, 0.4)"
                : "none",
            "&:hover": {
              backgroundColor: "rgb(125, 196, 253)",
              color: "black",
              boxShadow: "0px 4px 12px rgba(58, 164, 250, 0.5)",
            },
          }}>
            {option.label}
          </Button>
        ))}
      </Grid>

      <Grid item xs={12} sm={8} md={9.5}           
        sx={{
          padding: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "flex-start",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}>

        {Content()}

      </Grid>

      </Grid>

    </Layout>
    </>
  )
}

export default HrHome