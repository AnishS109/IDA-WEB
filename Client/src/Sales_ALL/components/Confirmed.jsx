import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import { DataContext } from "../../Context/DataProvider";
import { NavLink } from "react-router-dom";

const Confirmed = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, []);

  const { 
    backendUrl, 
    account, 
    confirmedStudentDone, 
    setConfirmedStudentDone, 
    role } = useContext(DataContext);

  const [confirmStudentDetails, setConfirmStudentDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [confirmedStudent, setConfirmedStudent] = useState(() => {
    const savedStudent = sessionStorage.getItem("confirmedStudent");
    return savedStudent ? JSON.parse(savedStudent) : null;
  });

  useEffect(() => {
    sessionStorage.setItem("confirmedStudent", JSON.stringify(confirmedStudent));
  }, [confirmedStudent]);

  // Fetch confirmed student details
  useEffect(() => {
    const fetchConfirmedStudent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/Confirmed_Student_Details/${account.name}`);
        const studentData = response.data || []; // Ensure it defaults to an array
        setConfirmStudentDetails(studentData);
        setFilteredStudentDetails(studentData);
      } catch (error) {
        console.error('ERROR WHILE FETCHING CONFIRMED STUDENT DETAILS', error);
        setConfirmStudentDetails([]); // Fallback to empty array in case of an error
        setFilteredStudentDetails([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConfirmedStudent();
  }, [backendUrl, account.name]);

  useEffect(() => {
    const deleteConfirmStudentDetails = async () => {
      if (confirmedStudentDone && confirmedStudent) {
        const reqData = { salesName: account.name, fullName: confirmedStudent, role:role };

        try {
          await axios.delete(`${backendUrl}/confirm-student-details-delete`, { data: reqData });

          setConfirmStudentDetails((prevDetails) =>
            prevDetails.filter((student) => student.fullName !== confirmedStudent)
          );

          setConfirmedStudent(null);
        } catch (error) {
          console.error("ERROR WHILE DELETING CONFIRMED DETAILS", error);
        } finally {
          setConfirmedStudentDone(false);
        }
      }
    };

    deleteConfirmStudentDetails();
  }, [confirmedStudentDone, confirmedStudent, account.name]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredStudentDetails(confirmStudentDetails); 
    } else {
      const filtered = confirmStudentDetails.filter((student) =>
        student.fullName?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredStudentDetails(filtered);
    }
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2, width: "100%" }}
        />
      </Box>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : filteredStudentDetails.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          style={{ marginTop: '20px' }}
        >
          No Confirmed Student Details Available
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>FULL NAME</b></TableCell>
                <TableCell align="center"><b>COURSE</b></TableCell>
                <TableCell align="center"><b>CONTACT</b></TableCell>
                <TableCell align="center"><b>ENROLL STUDENT</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudentDetails.map((student, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{student.fullName}</TableCell>
                  <TableCell align="center">{student.courseSpecialisation}</TableCell>
                  <TableCell align="center">{student.contact_no}</TableCell>
                  <TableCell align="center">
                    <NavLink to={"/enrollment-form"}>
                      <Button
                        variant="outlined"
                        sx={{
                          ':hover': {
                            variant: 'contained',
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                        onClick={() => setConfirmedStudent(student.fullName)}
                      >
                        Enroll
                      </Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Confirmed;
