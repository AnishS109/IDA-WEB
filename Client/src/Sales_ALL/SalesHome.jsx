import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import AddEnquiry from "./components/AddEnquiry";
import Layout from "../Layout/Layout";
import FollowUps from "./components/FollowUps";
import Calling from "./components/Calling";
import Confirmed from "./components/Confirmed";

import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SchoolIcon from '@mui/icons-material/School';
import EnrolledStudent from "./components/EnrolledStudent";

const SalesHome = () => {

<<<<<<< HEAD
  const [selectedOption, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOption") || "Add Enquiry"
  );

  useEffect(() => {
    sessionStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);
=======
  const [selectedOption, setSelectedOption] = useState("Add Enquiry");
>>>>>>> 7b8cde19163ac237036aa52c66321f6849182de1

  const options = [
    { label: "Add Enquiry", icon: <AddIcon />, key: "Add Enquiry" },
    { label: "Follow-Ups", icon: <LoopIcon />, key: "Follow-Ups" },
    { label: "Calling", icon: <PhoneInTalkIcon />, key: "Calling" },
    { label: "Confirmed", icon: <CheckCircleOutlineIcon />, key: "Confirmed" },
    { label: "Enrolled Student", icon: <SchoolIcon />, key: "Enrolled Student" }
  ];

  const Content = () => {
    if (selectedOption === "Add Enquiry") {
      return <AddEnquiry />;
    } 
    else if (selectedOption === "Follow-Ups") {
      return <FollowUps />;
    } 
    else if (selectedOption === "Calling") {
      return <Calling />;
    } 
    else if (selectedOption === "Confirmed") {
      return <Confirmed />;
    }
    else if (selectedOption === "Enrolled Student") {
      return <EnrolledStudent />;
    }
  };

  return (
    <Layout>
      <Grid container sx={{ height: "100%", minHeight: "100vh", backgroundColor: "#fafafa" }}>

        {/*----------Left Navbar-------------*/}

        <Grid
          item
          xs={12}
          sm={4}
          md={3}
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
          }}
        >
          {options.map((option) => (
            <Button
            key={option.key}
            onClick={() => setSelectedOption(option.key)}
            startIcon={option.icon}
              sx={{
                width: { xs: "auto", sm: "100%" },
                textAlign: "left",
                padding: { xs: 1, sm: 2 },
                margin: { xs: 0.5, sm: 1 },
                backgroundColor: selectedOption === option.key ? "rgb(58, 164, 250)" : "#f5f5f5",
                color: selectedOption === option.key ? "white" : "#333",
                borderRadius: "8px",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "500",
                transition: "all 0.3s ease",
                boxShadow:
                  selectedOption === option.key
                    ? "0px 4px 8px rgba(58, 164, 250, 0.4)"
                    : "none",
                "&:hover": {
                  backgroundColor: "rgb(125, 196, 253)",
                  color: "black",
                  boxShadow: "0px 4px 12px rgba(58, 164, 250, 0.5)",
                },
              }}
            >
              {option.label}
            </Button>
          ))}
        </Grid>

        {/*----------Right Content Area-------------*/}

        <Grid
          item
          xs={12}
          sm={8}
          md={9}
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
          }}
        >
          {Content()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SalesHome;
