import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const Interested = () => {
  //------------------------- State Variables -------------------------
  // Interested category data ke liye state
  const [InterestedData, setInterestedData] = useState([]);
  
  // Loading spinner ke liye state
  const [loading, setLoading] = useState(true);
  
  // Context se backend URL aur account ka data
  const { backendUrl, account } = useContext(DataContext);
  //-------------------------

  //------------------------- Data Fetching -------------------------
  // Component mount hone par data fetch karna
  useEffect(() => {
    const fetchInterestedData = async () => {
      try {
        // Backend se data fetch karna
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name }, // salesName query parameter ke through
        });

        // "Interested" category ka data filter karna
        const filteredData = response.data.filter((data) => data.category === "Interested");

        // Filtered data ko state mein set karna
        setInterestedData(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        // Error handle karna aur console mein dikhana
        console.error("ERROR WHILE FETCHING INTERESTED DATA:", error);
      } finally {
        // Loading spinner band karna
        setLoading(false);
      }
    };

    fetchInterestedData();
  }, [account.name, backendUrl]); // Dependencies ensure karte hain ki relevant updates pe effect chale
  //-------------------------

  return (
    <Box>
      {/*------------------------- Loader -------------------------*/}
      {/* Agar loading true ho toh CircularProgress dikhana */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/*------------------------- Table Rendering -------------------------*/}
          {/* Agar InterestedData empty nahi ho toh table render karna */}
          {InterestedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* InterestedData ko map karke rows banani */}
                {InterestedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Agar data nahi mila toh message dikhana
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
          {/*------------------------- Table Rendering Ends -------------------------*/}
        </>
      )}
    </Box>
  );
};

export default Interested;
