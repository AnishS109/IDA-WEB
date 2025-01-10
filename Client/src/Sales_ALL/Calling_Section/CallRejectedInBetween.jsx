import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const CallRejectedInBetween = () => {
  //------------------------- State Variables -------------------------
  // CallRejectedInBetweenData ke liye state variable
  const [CallRejectedInBetweenData, setCallRejectedInBetweenData] = useState([]);

  // Loading spinner ke liye state variable
  const [loading, setLoading] = useState(true);

  // Context se backend URL aur account ka data
  const { backendUrl, account } = useContext(DataContext);
  //-------------------------

  //------------------------- Data Fetching -------------------------
  // Component mount hone par "Call Rejected In Between" data fetch karna
  useEffect(() => {
    const fetchCallRejectedInBetween = async () => {
      const salesName = account.name; // Current user ka naam context se
      try {
        // API se data fetch karna
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name }, // Query parameter ke roop mein salesName bhejna
        });

        // Filter karna "Call Rejected In Between" category ka data
        const filteredData = response.data.filter((data) => data.category === "Call Rejected In Between");

        // Filtered data ko state mein set karna
        if (filteredData.length > 0) {
          setCallRejectedInBetweenData(filteredData);
        } else {
          setCallRejectedInBetweenData([]); // Agar data nahi mila toh empty array set karna
        }
      } catch (error) {
        // Agar API call fail ho toh error console par show karna
        console.log("ERROR WHILE FETCHING CALL REJECTED DATA:", error);
      } finally {
        // Loading spinner ko band karna jab request complete ho jaye
        setLoading(false);
      }
    };

    fetchCallRejectedInBetween();
  }, [account.name, backendUrl]); // Dependency array mein backendUrl aur account.name add karna
  //-------------------------

  return (
    <Box>
      {/*------------------------- Loader -------------------------*/}
      {/* Agar loading true ho toh spinner dikhana */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/*------------------------- Data Rendering -------------------------*/}
          {/* Agar CallRejectedInBetweenData mein items ho toh table dikhana */}
          {CallRejectedInBetweenData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* CallRejectedInBetweenData ko map karke table rows banana */}
                {CallRejectedInBetweenData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.Mobile_No}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Agar data available na ho toh message dikhana
            <Typography variant="h6" align="center" color="textSecondary">
              No Data available.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CallRejectedInBetween;
