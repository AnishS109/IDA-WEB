import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

const FollowUps = () => {
  const { backendUrl, account } = useContext(DataContext);
  const salesName = account.name;

  const tableOptions = [
    { label: 'FullName', key: 'FullName' },
    { label: 'Course Specialisation', key: 'Course Specialisation' },
    { label: 'Contact No.', key: 'Contact No.' },
    { label: 'Response 1', key: 'Response 1' },
    { label: 'Response 2', key: 'Response 2' },
    { label: 'Response 3', key: 'Response 3' },
    { label: 'Response 4', key: 'Response 4' },
    { label: 'Response 5', key: 'Response 5' },
    { label: 'Response 6', key: 'Response 6' },
    { label: 'Response 7', key: 'Response 7' },
    { label: 'Response 8', key: 'Response 8' },
    { label: 'Response 9', key: 'Response 9' },
    { label: 'Response 10', key: 'Response 10' },
    { label: 'Confirmed', key: 'Confirmed' },
  ];

  // State variables
  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState(null);
  const [responseValue, setResponseValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmedModalStudentDetails, setConfirmedModalStudentDetails] = useState([]);
  const [openConfimedModal, setOpenConfimedModal] = useState(false);
  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false); // Loader for data fetching
  const [saving, setSaving] = useState(false); // Loader for saving/updating data
  const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch data from the backend
  useEffect(() => {
    const fetchAllEnquiry = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/allEnquiryDetails/${salesName}`);
        setEnquiryData(response.data);
        setFilteredStudentDetails(response.data)
      } catch (error) {
        console.error('ERROR WHILE FETCHING ENQUIRY DATA', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEnquiry();
  }, [backendUrl, salesName]);

  const handleResponseClick = (enquiry, responseIndex) => {
    setSelectedEnquiry(enquiry);
    setSelectedResponseIndex(responseIndex);
    setResponseValue('');
    setModalOpen(true);
  };

  const handleConfirmResponse = async () => {
    setSaving(true);
    const ChangedResponse = {
      salesName,
      fullName: selectedEnquiry.fullName,
      [`response${selectedResponseIndex + 1}`]: responseValue,
    };

    try {
      await axios.put(`${backendUrl}/update-sales-enquiryResponse`, ChangedResponse);
      setMessageModal({ open: true, message: 'Response updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('ERROR WHILE UPDATING RESPONSE', error);
      setMessageModal({ open: true, message: 'Error updating response!', severity: 'error' });
    } finally {
      setSaving(false);
      setModalOpen(false);
    }
  };

  const handleConfirmedStudent = (data) => {
    setOpenConfimedModal(true);
    setConfirmedModalStudentDetails(data);
  };

  const deleteConfirmedStudent = async () => {
    setSaving(true);
    try {
      await axios.post(`${backendUrl}/add-Confirmed_Student_Details`, confirmedModalStudentDetails);
      await axios.delete(`${backendUrl}/delete-sales-enquiryDetails`, { data: confirmedModalStudentDetails });
      setMessageModal({ open: true, message: 'Student confirmed successfully!', severity: 'success' });
    } catch (error) {
      console.error('ERROR WHILE CONFIRMING STUDENT', error);
      setMessageModal({ open: true, message: 'Error while confirming student!', severity: 'error' });
    } finally {
      setSaving(false);
      setOpenConfimedModal(false);
    }
  };

  const handleCancel = () => setModalOpen(false);

  const handleConfirmModal = () => setOpenConfimedModal(false);

  const handleCloseMessageModal = () => setMessageModal({ ...messageModal, open: false });

const handleSearchChange = (e) => {
  const value = e.target.value.toLowerCase();
  setSearchTerm(value);

  const filteredData = enquiryData.filter((enquiry) => {
    const isNameMatch = enquiry.fullName.toLowerCase().includes(value);
    const isResponseMatch = Array.from({ length: 10 }).some((_, idx) => {
      const responseKey = `response${idx + 1}`;
      return enquiry[responseKey]?.toLowerCase().includes(value);
    });

    return isNameMatch || isResponseMatch;
  });

  setFilteredStudentDetails(filteredData);
};


  return (
    <>
    <Box sx={{ padding: 2 }}>
    
      <TextField
        label="Search by Name or Response"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: "100%" }}
      />
    
    </Box>

    <Box sx={{ overflowX: 'auto' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : enquiryData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No Follow ups available.
        </Typography>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableOptions.map((options) => (
                <TableCell key={options.key} align="center">
                  {options.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudentDetails.map((enquiry, index) => (
              <TableRow key={index}>
                <TableCell align="center">{enquiry.fullName}</TableCell>
                <TableCell align="center">{enquiry.courseSpecialisation}</TableCell>
                <TableCell align="center">{enquiry.contact_no}</TableCell>
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
                          startIcon={<AddIcon />}
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
                    onClick={() => handleConfirmedStudent(enquiry)}
                  >
                    Confirmed
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      )}

      {/*------------- Response update modal --------------------*/}

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
              <MenuItem value="Call not received">Call not received</MenuItem>
              <MenuItem value="Interested">Interested</MenuItem>
              <MenuItem value="Not Interested">Not Interested</MenuItem>
              <MenuItem value="Will Visit">Will Visit</MenuItem>
              <MenuItem value="Visited">Visited</MenuItem>
              <MenuItem value="Busy">Busy</MenuItem>
              <MenuItem value="Already Placed">Already Placed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmResponse} color="primary" disabled={!responseValue || saving}>
            {saving ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/*------------------- Confirm student modal ------------------------*/}

      <Dialog open={openConfimedModal} onClose={handleConfirmModal}>
        <DialogTitle>Confirm Student</DialogTitle>
        <DialogContent>
          Are you sure you want to confirm {confirmedModalStudentDetails.fullName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmModal} color="error">
            Cancel
          </Button>
          <Button onClick={deleteConfirmedStudent} disabled={saving}>
            {saving ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/*-------------------- Snackbar for messages ---------------------*/}

      <Snackbar
        open={messageModal.open}
        autoHideDuration={3000}
        onClose={handleCloseMessageModal}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseMessageModal} severity={messageModal.severity} sx={{ width: '100%' }}>
          {messageModal.message}
        </Alert>
      </Snackbar>
    </Box>
    </>
  );
};

export default FollowUps;