import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";
import EnrolledStudentCard from "../Sub_Components/EnrolledStudentCard";
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";

const EnrolledStudent = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loader state

  const { backendUrl, account } = useContext(DataContext);

  useEffect(() => {
    const fetchEnrolledStudentDetails = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/enrolled-student-details/${account.name}`
        );

        if (response.data) {
          console.log(response.data);
          setStudents(response.data);
        }
      } catch (error) {
        console.error("ERROR WHILE FETCHING ENROLLED STUDENT DETAILS");
      } finally {
        setIsLoading(false); // Stop loader after fetching
      }
    };
    fetchEnrolledStudentDetails();
  }, [backendUrl, account.name]);

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : students.length > 0 ? (
        <Grid container spacing={3}>
          {students.map((student) => (
            <EnrolledStudentCard key={student.id} student={student} />
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: "center", marginTop: 4 }}
        >
          No Enrolled Student Data is found.
        </Typography>
      )}
    </Box>
  );
};

export default EnrolledStudent;