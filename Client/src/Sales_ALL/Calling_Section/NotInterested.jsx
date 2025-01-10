import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const NotInterested = () => {
  //------------------------- State Variables -------------------------
  const [notInterestedData, setNotInterestedData] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing the loading spinner

  // Access backendUrl and account from DataContext
  const { backendUrl, account } = useContext(DataContext);
  //-------------------------

  //------------------------- Data Fetching -------------------------
  useEffect(() => {
    const fetchNotInterestedData = async () => {
      try {
        // Fetch data from the backend API
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name }, // Pass salesName as a query parameter
        });

        // Filter data for "Not Interested" category
        const filteredData = response.data.filter((data) => data.category === "Not Interested");

        // Update state with the filtered data
        setNotInterestedData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("ERROR WHILE FETCHING NOT INTERESTED DATA:", error);
      } finally {
        // Set loading state to false after the request is completed
        setLoading(false);
      }
    };

    fetchNotInterestedData();
  }, [account.name, backendUrl]); // Dependencies to refetch data when necessary
  //-------------------------

  //------------------------- Render UI -------------------------
  return (
    <Box>
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Render data table if data is available */}
          {notInterestedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over the data to render each row */}
                {notInterestedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Show a message if no data is available
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default NotInterested;
