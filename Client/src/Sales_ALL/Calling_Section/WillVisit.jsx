import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const WillVist = () => {
  const [WillVistData, setWillVistData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const { backendUrl, account, setCallingStudentName } = useContext(DataContext);

  // Function to handle the checkbox change and update the visited status
  const handleVisitedChange = (studentName, isVisited, index) => {
    setWillVistData(prevData =>
      prevData.map((data, i) =>
        i === index ? { ...data, visited: isVisited } : data
      )
    );
  };

  // Function to handle the date selection for each student
  const handleDateChange = (event, index) => {
    setWillVistData(prevData =>
      prevData.map((data, i) =>
        i === index ? { ...data, visitDate: event.target.value } : data
      )
    );
  };

  // Function to handle the confirm update for each student
  const handleConfirmUpdate = async (studentName, visitDate, visited, index) => {
    try {
      // Make a POST request to update the student's visited status and visit date
      await axios.post(`${backendUrl}/calling-will-visited-update-details`, {
        studentName,   // Send the student Name
        salesName: account.name, // Send salesName from account
        isVisited: visited,     // Send the new visited status (true or false)
        visitDate: visitDate || null, // Send the selected visit date (or null if no date)
      });

      // Update local state to reflect the change in the UI
      setWillVistData(prevData =>
        prevData.map((data, i) =>
          i === index ? { ...data, visited, visitDate } : data
        )
      );
    } catch (error) {
      console.log("Error while updating visited status:", error);
    }
  };

  useEffect(() => {
    const fetchWillVistData = async () => {
      const salesName = account.name;
      try {
        // Fetch data from the API
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },
        });

        // Filter data with "Will Visit" category
        const filteredData = response.data.filter((data) => data.category === "Will Visit");

        if (filteredData.length > 0) {
          setWillVistData(filteredData);
        } else {
          setWillVistData([]); // No data available
        }
      } catch (error) {
        console.log("Error while fetching Will Visit data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchWillVistData();
  }, [account.name, backendUrl]);

  return (
    <Box>
      {/* Show loading spinner if data is loading */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {WillVistData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Student Name</b></TableCell>
                  <TableCell><b>Mobile Number</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Visited?</b></TableCell>
                  <TableCell><b>Changes</b></TableCell>
                  <TableCell><b>Enquiry</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over WillVistData to display rows */}
                {WillVistData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                    <TableCell>
                      {/* Date Picker: Allow user to select a date */}
                      <TextField
                        type="date"
                        value={data.visitDate ? new Date(data.visitDate).toISOString().slice(0, 10) : ''}
                        onChange={(e) => handleDateChange(e, index)} // Update selected date for the student
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {/* Checkbox to indicate visited status */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.visited || false} // If visited is true, it will be checked
                            onChange={(e) => handleVisitedChange(data.Name, e.target.checked, index)} // Toggle visited status
                            color="primary"
                          />
                        }
                        label="Visited"
                      />
                    </TableCell>
                    <TableCell>
                      {/* Confirm Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={() => handleConfirmUpdate(data.Name, data.visitDate, data.visited, index)}
                      >
                        Confirm
                      </Button>
                    </TableCell>

                    <TableCell>
                    <NavLink to="/enquiry-form">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{
                        border: "1px solid transparent",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "success.main",
                          borderColor: "success.main",
                        },
                      }}
                      onClick={() => setCallingStudentName(data.Name)}
                    >
                      Enquiry
                    </Button>
                    </NavLink>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default WillVist;
