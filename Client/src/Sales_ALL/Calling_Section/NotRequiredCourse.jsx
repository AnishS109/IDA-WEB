import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const NotRequiredAnyCourse = () => {
  const [notRequiredAnyCourseData, setNotRequiredAnyCourseData] = useState([]);
  const [loading, setLoading] = useState(true);  // State to track loading
  const { backendUrl, account } = useContext(DataContext);  // Access backend URL and account info from context

  // Fetch data when component mounts or when account name/backend URL changes
  useEffect(() => {
    const fetchNotRequiredAnyCourseData = async () => {
      try {
        // Send request to fetch data based on salesName
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },  // Include salesName in query params
        });

        // Filter data for "Not Require Any Course" category
        const filteredData = response.data.filter((data) => data.category === "Not Require Any Course");

        // Set filtered data or empty array if no data found
        setNotRequiredAnyCourseData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("Error fetching Not Required Any Course data:", error);
      } finally {
        setLoading(false);  // Set loading to false after data fetching
      }
    };

    fetchNotRequiredAnyCourseData();
  }, [account.name, backendUrl]);  // Dependencies to trigger effect when they change

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
          {notRequiredAnyCourseData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map through the filtered data and render rows */}
                {notRequiredAnyCourseData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Display message if no data is found
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default NotRequiredAnyCourse;
