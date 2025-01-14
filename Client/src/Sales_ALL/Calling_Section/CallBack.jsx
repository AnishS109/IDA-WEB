import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, TextField } from '@mui/material';

const CallBack = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, []);

  const [CallBackData, setCallBackData] = useState([]);  // State to hold the callback data
  const [loading, setLoading] = useState(true);          // State for loading status
  const [searchTerm, setSearchTerm] = useState("")
  const { backendUrl, account } = useContext(DataContext);  // Fetching data from context (backend URL & user account)

  //------------------------- Data Fetching -------------------------
  useEffect(() => {
    const fetchCallBackData = async () => {
      const salesName = account.name;
      try {
        const response = await axios.get(`${backendUrl}/Call-Category-Data`, {
          params: { salesName: account.name },
        });

        // Filter data by "Call Back" category
        const filteredData = response.data.filter((data) => data.category === "Call Back");

        setCallBackData(filteredData.length > 0 ? filteredData : []); // Update state with fetched data
      } catch (error) {
        // console.log("ERROR WHILE FETCHING CALL BACK DATA:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchCallBackData();  // Fetch callback data when component mounts
  }, [account.name, backendUrl]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filterData = CallBackData.filter((data) =>
    data.Name.toLowerCase().includes(searchTerm.toLowerCase()))
  

  //------------------------- Return JSX -------------------------
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

      {/* Show loading spinner if data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {CallBackData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Student Name</b></TableCell>
                  <TableCell><b>Mobile Number</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Loop through each callback data */}
                {filterData.map((data, index) => (
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

export default CallBack;