import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Pagination, TextField, CircularProgress, Box } from '@mui/material';

const Calling = () => {
  const [callingStudentDetails, setCallingStudentDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1); 
  const [limit] = useState(50); 
  const [totalPages, setTotalPages] = useState(46); 
  const [totalItems, setTotalItems] = useState(0); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const { backendUrl } = useContext(DataContext);

  const fetchCallingStudentData = async (page) => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const response = await axios.get(`${backendUrl}/calling-student-details`, {
        params: { page, limit }
      });

      if (response.status === 200) {
        setCallingStudentDetails(response.data.callingStudentData);
        setTotalItems(response.data.pagination.totalItems);
        setTotalPages(Math.ceil(response.data.pagination.totalItems / limit));
      }
    } catch (error) {
      console.error('ERROR WHILE FETCHING THE CALLING DATA', error);
    } finally {
      setLoading(false);  // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchCallingStudentData(page);
  }, [backendUrl, page]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter data based on search term
  useEffect(() => {
    setLoading(true);  // Set loading to true during filtering
    const filtered = callingStudentDetails.filter((enquiry) => {
      const responses = Array.from({ length: 10 }).map((_, idx) => enquiry[`response${idx + 1}`] || '').join(' ').toLowerCase();
      const nameMatch = enquiry.Name?.toLowerCase().includes(searchTerm.toLowerCase());
      const responseMatch = responses.includes(searchTerm.toLowerCase());
      return nameMatch || responseMatch;
    });
    setFilteredData(filtered);
    setLoading(false);  // Set loading to false after filtering
  }, [callingStudentDetails, searchTerm]);

  return (
    <div>
      {/* Search Bar */}
      <TextField
        label="Search by Name or Responses"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : filteredData.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>DOB</b></TableCell>
                <TableCell align="center"><b>Mobile No</b></TableCell>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <TableCell key={idx} align="center">
                    <b>Response {idx + 1}</b>
                  </TableCell>
                ))}
                <TableCell align="center">Confirm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .filter(enquiry => enquiry.Name)
                .map((enquiry, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{enquiry.Name}</TableCell>
                    <TableCell align="center">{enquiry.DOB}</TableCell>
                    <TableCell align="center">{enquiry.Mobile_No}</TableCell>
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const responseKey = `response${idx + 1}`;
                      return (
                        <TableCell key={idx} align="center">
                          {enquiry[responseKey] ? (
                            <Typography>{enquiry[responseKey]}</Typography>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{
                                textTransform: 'none',
                                "&:hover": {
                                  backgroundColor: "primary.main",
                                  color: "white",
                                  borderColor: "transparent",
                                },
                              }}
                            >
                              Response
                            </Button>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{
                          border: "1px solid transparent",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "success.main",
                            borderColor: "success.main",
                          },
                        }}
                      >
                        Confirmed
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Pagination Control */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2 }}
            boundaryCount={2}
            siblingCount={1}  
          />
        </>
      )}
    </div>
  );
};

export default Calling;