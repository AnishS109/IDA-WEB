import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';

const AlreadyPlaced = () => {
  //------------------------- State Variables -------------------------
  const [AlreadyPlacedData, setAlreadyPlacedData] = useState([]);

  const [loading, setLoading] = useState(true);

  const { backendUrl, account } = useContext(DataContext);

  //------------------------- Data Fetching -------------------------

  useEffect(() => {
    const fetchAlreadyPlacedData = async () => {
      const salesName = account.name; 
      try {
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name }, 
        });

        const filteredData = response.data.filter((data) => data.category === "Already Placed");

        if (filteredData.length > 0) {
          setAlreadyPlacedData(filteredData);
        } else {
          setAlreadyPlacedData([]); 
        }
      } catch (error) {
        console.log("ERROR WHILE FETCHING CALL REJECTED DATA:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlreadyPlacedData();
  }, [account.name, backendUrl]);

  return (
    <Box>
      {/*------------------------- Loader -------------------------*/}

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/*------------------------- Data Rendering -------------------------*/}

          {AlreadyPlacedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {AlreadyPlacedData.map((data, index) => (
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
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default AlreadyPlaced;