import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { DataContext } from '../../Context/DataProvider';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Pagination, TextField, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';

const Calling = () => {

  //------------------------- State Variables -------------------------
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState(null);
  const [responseValue, setResponseValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);  
  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: 'success' });

  const [callingStudentDetails, setCallingStudentDetails] = useState([]);
  const [page, setPage] = useState(1); 
  const [limit] = useState(100); 
  const [totalPages, setTotalPages] = useState(0); 
  const [totalItems, setTotalItems] = useState(0); 
  const [searchTerm, setSearchTerm] = useState('');  
  const [loading, setLoading] = useState(false); 

  const { backendUrl, account, setCallingStudentName, role } = useContext(DataContext);
  //-------------------------------------------------------------------

  //------------------------- Modal Handlers -------------------------
  const handleCancel = () => setModalOpen(false);
  const handleCloseMessageModal = () => setMessageModal({ ...messageModal, open: false });

  const handleResponseClick = (enquiry, responseIndex) => {
    setSelectedEnquiry(enquiry);
    setSelectedResponseIndex(responseIndex);
    setResponseValue('');
    setModalOpen(true);
  };
  //-------------------------------------------------------------------

  //------------------------- Response Update Handler -------------------------
  const handleCallingResponse = async () => {
    const responseData = {
      fullName: selectedEnquiry.Name,
      [`response${selectedResponseIndex + 1}`]: `${responseValue} (By ${account.name})`,
      salesName: account.name,
      role:role
    };

    try {
      setSaving(true);  
      const response = await axios.put(`${backendUrl}/calling-student-update-details`, responseData);
      setMessageModal({ open: true, message: 'Response updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('ERROR WHILE UPDATING RESPONSE', error);
      setMessageModal({ open: true, message: 'Error updating response!', severity: 'error' });
    } finally {
      setSaving(false);  
      setModalOpen(false);
    }
  };
  //-------------------------------------------------------------------

  //------------------------- Data Fetch Handler -------------------------
  const fetchCallingStudentData = async (page) => {
    try {
      setLoading(true); 
      const response = await axios.get(`${backendUrl}/calling-student-details`, {
        params: { page, limit }, 
      });

      if (response.status === 200) {
        setCallingStudentDetails(response.data.callingStudentData);
        setTotalItems(response.data.pagination?.totalItems || response.data.callingStudentData.length); 
        setTotalPages(response.data.pagination ? Math.ceil(response.data.pagination.totalItems / limit) : 1);
      }
    } catch (error) {
      console.error('ERROR WHILE FETCHING THE CALLING DATA', error);
    } finally {
      setLoading(false);  
    }
  };
  //------------------------------------------------------------------

  //------------------------- Effects and Event Handlers -------------------------
  useEffect(() => {
    fetchCallingStudentData(page);
  }, [backendUrl, page]);

  // Page change handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Search input change handler
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toUpperCase(); // Convert search term to uppercase
    setSearchTerm(searchValue);
    setPage(1);  // Reset to first page when search term changes
  };
  //-------------------------------------------------------------------

const filteredData = callingStudentDetails.filter((enquiry) => {
  const studentName = enquiry.Name ? enquiry.Name.toUpperCase() : ''; 
  const searchTermUpper = searchTerm.toUpperCase();

  // Filter by name or by any response field (also ensure response is not null)
  const responses = Object.keys(enquiry)
    .filter(key => key.startsWith('response'))
    .map(key => (enquiry[key] ? enquiry[key].toUpperCase() : ''));

  return studentName.includes(searchTermUpper) || responses.some(response => response.includes(searchTermUpper));
});


  return (
    <div>
      {/*-------------- Search Bar --------------*/}
      <TextField
        label="Search by Name or Responses"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      {/*-------------- Loading and Table Content --------------*/}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : filteredData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No Calling Data available.
        </Typography>
      ) : (
        <>
          {/*-------------- Table to Display Data --------------*/}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Mobile No</b></TableCell>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <TableCell key={idx} align="center">
                    <b>Response {idx + 1}</b>
                  </TableCell>
                ))}
                <TableCell align="center">Enquiry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((enquiry, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{enquiry.Name}</TableCell>
                  <TableCell align="center">{enquiry.Mobile_No}</TableCell>
                  {Array.from({ length: 8 }).map((_, idx) => {
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
                            onClick={() => handleResponseClick(enquiry, idx)}
                          >
                            Response
                          </Button>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <NavLink to="/enquiry-form">
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
                      onClick={() => setCallingStudentName(enquiry.Name)}
                    >
                      Enquiry
                    </Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/*----------- Pagination Control -------------*/}
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

      {/*------------- Response Update Modal --------------*/}
      <Dialog open={modalOpen} onClose={handleCancel}>
        <DialogTitle>Update Response</DialogTitle>
        <DialogContent>
          <FormControl sx={{ width: '30vw', mt: '20px' }}>
            <InputLabel id="response-label">Select Response</InputLabel>
            <Select
              labelId="response-label"
              value={responseValue}
              onChange={(e) => setResponseValue(e.target.value)}
            >
              <MenuItem value="Call Rejected">Call Rejected</MenuItem>
              <MenuItem value="Not Picked Call">Not Picked Call</MenuItem>
              <MenuItem value="Visited">Visited</MenuItem>
              <MenuItem value="Not Interested">Not Interested</MenuItem>
              <MenuItem value="Interested">Interested</MenuItem>
              <MenuItem value="Call Forwarded">Call Forwarded</MenuItem>
              <MenuItem value="Will Visit">Will Visit</MenuItem>
              <MenuItem value="Already Placed">Already Placed</MenuItem>
              <MenuItem value="Not Require Any Course">Not Require Any Course</MenuItem>
              <MenuItem value="Call Back">Call Back</MenuItem>
              <MenuItem value="Call Rejected In Between">Call Rejected In Between</MenuItem>
              <MenuItem value="Appointment Scheduled">Appointment Scheduled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="contained">Cancel</Button>
          <Button
            disabled={!responseValue || saving}
            onClick={handleCallingResponse}
            color="primary"
            variant="contained"
          >
            {saving ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/*------------- Snackbar for Success/Error Messages --------------*/}
      <Snackbar
        open={messageModal.open}
        autoHideDuration={6000}
        onClose={handleCloseMessageModal}
      >
        <Alert
          onClose={handleCloseMessageModal}
          severity={messageModal.severity}
          sx={{ width: '100%' }}
        >
          {messageModal.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Calling;
