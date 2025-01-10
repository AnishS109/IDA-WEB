import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const Visited = () => {
  const [visitedData, setVisitedData] = useState([]);  // State for storing the data
  const [loading, setLoading] = useState(true);  // Loading state to show spinner
  const { backendUrl, account } = useContext(DataContext);  // Context for backend URL and account info

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
  }, [account.name, backendUrl]);  // Dependencies for useEffect to re-run when account or backend URL changes

  return (
    <Box>
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Render table if data is available */}
          {visitedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Loop through visitedData to display each row */}
                {visitedData.map((data, index) => (
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

export default Visited;
