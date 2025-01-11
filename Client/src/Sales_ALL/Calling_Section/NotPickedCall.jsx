import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const NotPickedCall = () => {
  const [notPickedCallData, setNotPickedCallData] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading status
  const { backendUrl, account } = useContext(DataContext);  // Get backend URL and account info from context

  // Fetch data on component mount or when account name or backend URL changes
  useEffect(() => {
    const fetchNotPickedCallData = async () => {
      try {
        // Send API request to fetch data
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },  // Pass salesName as query parameter
        });

        // Filter data to include only "Not Picked Call" category
        const filteredData = response.data.filter((data) => data.category === "Not Picked Call");

        // Update state with filtered data or set empty array if no data is found
        setNotPickedCallData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("Error fetching Not Picked Call data:", error);
      } finally {
        // Set loading state to false once data is fetched or an error occurs
        setLoading(false);
      }
    };

    fetchNotPickedCallData();
  }, [account.name, backendUrl]);  // Dependencies to re-run effect when these change

  // Render component UI
  return (
    <Box>
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Render data if available */}
          {notPickedCallData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render each row with student name and mobile number */}
                {notPickedCallData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
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

export default NotPickedCall;
