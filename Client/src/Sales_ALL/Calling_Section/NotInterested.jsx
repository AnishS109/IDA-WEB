import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress,Typography } from '@mui/material';

const NotInterested = () => {
  const [notInterestedData, setNotInterestedData] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const { backendUrl, account } = useContext(DataContext);

  useEffect(() => {
    const fetchNotInterestedData = async () => {
      const salesName = account.name;
      try {
        // Fetch data from the API
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },  // Send salesName as query parameter
        });

        // Filter data with "Rejected Call" category and update the state
        const filteredData = response.data.filter((data) => data.category === "Not Interested");

        if (filteredData.length > 0) {
          setNotInterestedData(filteredData);
        } else {
          setNotInterestedData([]);  // Set an empty array if no data
        }
      } catch (error) {
        console.log("ERROR WHILE FETCHING CALL REJECTED DATA:", error);
      } finally {
        setLoading(false);  // Set loading to false when the request is completed
      }
    };

    fetchNotInterestedData();
  }, [account.name, backendUrl]);  // Add backendUrl and account.name as dependencies

  return (
    <Box>
      {/* Show loading spinner if data is loading */}
      {loading ? (
        <CircularProgress />  // Loader will show when loading is true
      ) : (
        <>
          {notInterestedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over callRejectedData and display items with the "Rejected Call" category */}
                {notInterestedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
                        <Typography variant="h6" align="center" color="textSecondary">
            No Data available.
          </Typography>   // Display this if no data is available
          )}
        </>
      )}
    </Box>
  );
};

export default NotInterested;