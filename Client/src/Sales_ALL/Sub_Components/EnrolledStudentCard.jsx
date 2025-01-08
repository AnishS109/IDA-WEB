import React, { useContext, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography, CircularProgress, Box } from "@mui/material";
import { DataContext } from "../../Context/DataProvider";

const EnrolledStudentCard = ({ student }) => {
  const { backendUrl } = useContext(DataContext);
  const [isImageLoading, setIsImageLoading] = useState(true); 

  const handleImageLoad = () => {
    setIsImageLoading(false); 
  };

  const handleImageError = () => {
    setIsImageLoading(false); 
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out", 
          "&:hover": {
            transform: "scale(1.01)", 
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {isImageLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <CardMedia
            component="img"
            alt={student.name}
            height="180"
            image={`${backendUrl}/file/${student.photo}`}
            sx={{
              objectFit: "contain",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              visibility: isImageLoading ? "hidden" : "visible", 
            }}
            onLoad={handleImageLoad} 
            onError={handleImageError} 
          />
        </Box>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {student.fullName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Student ID: {student.studentId}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Course: {student.courseName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Contact No: {student.mobileNumber}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EnrolledStudentCard;
