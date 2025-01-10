import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, Box, CircularProgress, TextField } from "@mui/material";
import EnrolledStudentCard from "../Sub_Components/EnrolledStudentCard";
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";

const EnrolledStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // Separate state for filtered data
  const [isLoading, setIsLoading] = useState(true); // Loader state
  const [searchTerm, setSearchTerm] = useState("");

  const { backendUrl, account } = useContext(DataContext);

  useEffect(() => {
    const fetchEnrolledStudentDetails = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/enrolled-student-details/${account.name}`
        );

        if (response.data) {
          setStudents(response.data);
          setFilteredStudents(response.data); 
        }
      } catch (error) {
        console.error("ERROR WHILE FETCHING ENROLLED STUDENT DETAILS");
      } finally {
        setIsLoading(false); 
      }
    };
    fetchEnrolledStudentDetails();
  }, [backendUrl, account.name]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredData = students.filter((student) =>
      student.fullName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudents(filteredData);
  };

  return (
    <Box sx={{ padding: 2 }}>

      {/* Search Input */}

      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: "100%" }}
      />

      {/* Loader */}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredStudents.length > 0 ? (
        <Grid container spacing={3}>
          
          {/* Render Filtered Students */}

          {filteredStudents.map((student,index) => (
            <EnrolledStudentCard key={index} student={student} />
          ))}
        </Grid>
      ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No Enrolled Student Data available.
            </Typography>
      )}
    </Box>
  );
};

export default EnrolledStudent;
