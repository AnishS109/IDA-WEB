import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const JoinedOtherCoaching = () => {
  //------------------------- State Variables -------------------------
  // Data for "Joined Other Institute" category
  const [joinedOtherCoachingData, setJoinedOtherCoachingData] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing loading spinner

  // Access backendUrl and account from DataContext
  const { backendUrl, account } = useContext(DataContext);
  //-------------------------

  //------------------------- Data Fetching -------------------------
  useEffect(() => {
    const fetchJoinedOtherCoachingData = async () => {
      try {
        // Fetch data from the backend API
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name }, // Pass salesName as a query parameter
        });

        // Filter data for "Joined Other Institute" category
        const filteredData = response.data.filter((data) => data.category === "Joined Other Institute");

        // Set the state with the filtered data
        setJoinedOtherCoachingData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("ERROR WHILE FETCHING JOINED OTHER COACHING DATA:", error);
      } finally {
        // Set loading state to false after request completion
        setLoading(false);
      }
    };

    fetchJoinedOtherCoachingData();
  }, [account.name, backendUrl]); // Dependencies to refetch data when necessary
  //-------------------------

  return (
    <Box>
      {/*------------------------- Loader -------------------------*/}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box> // Display a loader while data is being fetched
      ) : (
        <>
          {/*------------------------- Data Table -------------------------*/}
          {joinedOtherCoachingData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map over the data and create table rows */}
                {joinedOtherCoachingData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Display a message when no data is available
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default JoinedOtherCoaching;
