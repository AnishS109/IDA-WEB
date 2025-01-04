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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

const AllEnquiry = () => {
  const tableOptions = [
    { label: "FullName", key: "FullName" },
    { label: "Course Specialisation", key: "Course Specialisation" },
    { label: "Contact No.", key: "Contact No." },
    { label: "Fresh Call", key: "Fresh Call" },
    { label: "Response 2", key: "Response 2" },
    { label: "Response 3", key: "Response 3" },
    { label: "Response 4", key: "Response 4" },
    { label: "Response 5", key: "Response 5" },
    { label: "Response 6", key: "Response 6" },
    { label: "Response 7", key: "Response 7" },
    { label: "Response 8", key: "Response 8" },
    { label: "Response 9", key: "Response 9" },
    { label: "Response 10", key: "Response 10" },
    { label: "Confirmed", key: "Confirmed" },
  ];

  const { backendUrl, account } = useContext(DataContext);
  const salesName = account.name;

  const [enquiryData, setEnquiryData] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState(null);
  const [responseValue, setResponseValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllEnquiry = async () => {
      try {
        const response = await axios.get(`${backendUrl}/allEnquiryDetails/${salesName}`);
        setEnquiryData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("ERROR WHILE FETCHING ENQUIRY DATA", error);
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

    const handleConfirmResponse = async() => {
      const ChangedResponse = {
        salesName: salesName,
        fullName: selectedEnquiry.fullName,
        [`response${selectedResponseIndex + 1}`]: responseValue, // Dynamically set the response key
      };
  
      try {
        const response = await axios.put(`${backendUrl}/update-sales-enquiryResponse`, ChangedResponse)
      } catch (error) {
        console.error("ERROR WHILE FETCHING ENQUIRY DATA", error);
      }
    
      setModalOpen(false);
    };
  
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirmedStudent = (data) => {
    console.log(data)
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      {enquiryData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No enquiries available.
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
  {enquiryData.map((enquiry, index) => (
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
                sx={{ textTransform: 'none' }}
                onClick={() => handleResponseClick(enquiry, idx)}
              >
                Response
              </Button>
            )}
          </TableCell>
        );
      })}
      <TableCell align="center">
        <Button variant="contained" color="success" size="small" onClick={() => handleConfirmedStudent(enquiry)}>
          Confirmed
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onClose={handleCancel}>
        <DialogTitle>Update Response</DialogTitle>
        <DialogContent>
          <FormControl sx={{ width: "30vw", mt: "20px" }}>
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
          <Button onClick={handleConfirmResponse} color="primary" disabled={!responseValue}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllEnquiry;
