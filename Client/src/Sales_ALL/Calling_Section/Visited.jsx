import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, Button, TextField } from '@mui/material';

const Visited = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, []);

  const [visitedData, setVisitedData] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const { backendUrl, account, setCallingStudentName } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchVisited = async () => {
      try {
        // Fetching data from the API
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },  // Send salesName as query parameter
        });

        // Filter data for "Visited" category
        const filteredData = response.data.filter((data) => data.category === "Visited");

        // Update state with filtered data or an empty array if no matches
        setVisitedData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("Error while fetching Visited data:", error);  // Enhanced error logging
      } finally {
        setLoading(false);  // Set loading to false after data fetch is completed
      }
    };

    fetchVisited();
  }, [account.name, backendUrl]);  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filterData = visitedData.filter((data) => 
  data.Name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Box>

      <TextField
      placeholder='Search by Name'
      label='Search by Name'
      name='searchName'
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      />

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Render table if data is available */}
          {visitedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Enquiry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Loop through visitedData to display each row */}
                {filterData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
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
            // Show message if no data is found
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Visited;
