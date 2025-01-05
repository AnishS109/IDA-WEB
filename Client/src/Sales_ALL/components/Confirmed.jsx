import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import {DataContext} from "../../Context/DataProvider";

const Confirmed = () => {
  const { backendUrl, account } = useContext(DataContext);
  const [confirmStudentDetails, setConfirmStudentDetails] = useState([]);

  useEffect(() => {
    const fetchConfirmedStudent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Confirmed_Student_Details/${account.name}`);
        setConfirmStudentDetails(response.data);
      } catch (error) {
        console.error('ERROR WHILE FETCHING CONFIRMED STUDENT DETAILS', error);
      }
    };
    fetchConfirmedStudent();
  }, [backendUrl, account.name]);

  return (
    <>
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
            {confirmStudentDetails.map((student, index) => (
              <TableRow key={index}>
                <TableCell align="center">{student.fullName}</TableCell>
                <TableCell align="center">{student.courseSpecialisation}</TableCell>
                <TableCell align="center">{student.contact_no}</TableCell>
                <TableCell align="center">
                <Button
                  variant="outlined"
                  sx={{
                    ':hover': {
                      variant: 'contained',
                      backgroundColor: 'primary.main', 
                      color: 'white',
                    },
                  }}
                >
                  Enroll
                </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Confirmed;
