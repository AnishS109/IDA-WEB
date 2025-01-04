import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Admin_IMG from "../assets/admin.jpeg";
import HR_IMG from "../assets/HR_IMG.png";
import Sales_IMG from "../assets/Sales-IMG.png";
import Faculty_IMG from "../assets/Teacher2.jpeg";
import { DataContext } from "../Context/DataProvider";

const Home = () => {

  const {setRole} = useContext(DataContext)

  return (
    <Layout>
      <Box
        sx={{
          border: "2px solid #1976d2",
          bgcolor: "white",
          borderRadius: "8px",
          height: "auto",
          width: "80%",
          maxWidth: "700px",
          my: "50px",
          mx: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          backgroundColor: "#f0f8ff",
        }}
      >

        <Typography
          variant="h4"
          sx={{
            mt: "10px",
            mb: "40px",
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            color: "#333",
          }}
        >
          Select Your Role
        </Typography>

        {/* Roles Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
            width:{
              xs:"70vw",
              sm:"60vw",
              md:"38vw"
            },
          }}
        >
          {/* Admin */}
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${Admin_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavLink to={"/login"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setRole("Admin")}
              >
                Admin
              </Typography>
            </NavLink>
          </Box>

          {/* HR */}
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${HR_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavLink to={"/login"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setRole("HR")}
              >
                HR
              </Typography>
            </NavLink>
          </Box>

          {/* Faculty */}
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${Faculty_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavLink to={"/login"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setRole("Faculty")}
              >
                Faculty
              </Typography>
            </NavLink>
          </Box>

          {/* Sales */}
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${Sales_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavLink to={"/login"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setRole("Sales")}
              >
                Sales
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
