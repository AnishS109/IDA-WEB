import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CollegeCard = ({data}) => {

  return (
    <Card
      sx={{
        maxWidth: 400,
        minWidth:300,
        width:{xs:"85%", sm:"30vw"},
        margin: "20px auto",
        padding: "10px",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.6)",
        },
        backgroundColor: "#f8f9fa", 
        border: "1px solid #e0e0e0",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1976d2", 
            marginBottom: "10px",
          }}
        >
          <span style={{textTransform: "uppercase", color:"#1976d2"}}>{data.collegeName}</span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "10px",
            color: "#6c757d",
          }}
        >
          College Location: <span style={{textTransform:'uppercase', color:"black"}}>{data.collegeLocation}</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "10px",
            color: "#6c757d",
          }}
        >
          College Contact: <span style={{textTransform:'uppercase', color:"black"}}>{data.contactDetails}</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "10px",
            color: "#6c757d",
          }}
        >
          College Mail: <span style={{color:"black"}}>{data.email}</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#6c757d",
          }}
        >
          College Deal With: <span style={{textTransform:'uppercase', color:"black"}}>{data.dealWith}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
