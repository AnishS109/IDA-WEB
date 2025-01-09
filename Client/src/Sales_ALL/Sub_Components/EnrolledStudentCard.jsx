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
      minHeight: "450px", // Ensures all cards are the same height
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
          objectFit: "contain", // Ensures the image is cropped and fills the space nicely
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          visibility: isImageLoading ? "hidden" : "visible",
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </Box>
    <CardContent sx={{ paddingTop: "10px" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        {student.fullName}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
        Student ID: {student.studentId}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
        Course: {student.courseName}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
        Contact No: {student.mobileNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
        Source: {student.leadSource}
      </Typography>

      {student.leadSource === "Reference" && (
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Ref.Type: {student.refType}
        </Typography>
      )}

      {student.refType === "Student" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Type: {student.staffType}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Ref. Name: {student.studentName}
          </Typography>
        </>
      )}

      {student.refType === "Staff" && (
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Ref. Name: {student.staffName}
        </Typography>
      )}
    </CardContent>
  </Card>
</Grid>

  );
};

export default EnrolledStudentCard;
