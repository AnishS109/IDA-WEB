import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: { xs: "20px 10px", sm: "20px 10px" },
        mt: "20px",
        position: "relative",
      }}
    >
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {/*---------Address Section---------*/}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1rem", sm: "1.4rem" },
            }}
          >
            <RoomIcon sx={{ mr: 1 }} /> Address
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size for mobile
            }}
          >
            P13-14, H3 Ground Floor, <br />
            B-block Metro Tower, <br />
            Near Mangal City Mall, <br />
            Satya Sai Square, Vijay Nagar, <br />
            Indore, M.P. 451010
          </Typography>
        </Grid>

        {/*------------Contact Section--------*/}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1rem", sm: "1.4rem" },
            }}
          >
            <PhoneIcon sx={{ mr: 1 }} /> Contact Us
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Phone: <br />
            +91 99811 21214 <br />
            +91 99811 21215
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            <EmailIcon sx={{ mr: 1 }} />
            <Link
              href="mailto:contact@instadotanalytics.com"
              underline="hover"
              sx={{
                color: "#e0f7fa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              contact@instadotanalytics.com
            </Link>
          </Typography>
        </Grid>

        {/* ---------VISIT US Section--------*/}
        <Grid item xs={12} sm={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1rem", sm: "1.4rem" },
            }}
          >
            <LanguageIcon sx={{ mr: 1 }} /> Visit Us
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              lineHeight: 1.8,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            <LanguageIcon sx={{ mr: 1 }} />
            <Link
              href="https://www.instadotanalytics.com"
              target="_blank"
              underline="hover"
              sx={{
                color: "#e0f7fa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              www.instadotanalytics.com
            </Link>
          </Typography>
        </Grid>
      </Grid>

      {/* All Rights Reserved Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          pt: 2,
          borderTop: "1px solid #e0f7fa", // Separator line
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            color: "#e0f7fa",
          }}
        >
          &copy; {new Date().getFullYear()} Insta Dot Analytics. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
