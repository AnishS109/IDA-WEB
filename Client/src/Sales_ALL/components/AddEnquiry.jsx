import React, { useReducer, useState, useContext } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from "axios";
import { DataContext } from '../../Context/DataProvider';

const AddEnquiry = () => {
  //------------------ State Variables ------------------
  const [leadCategory, setLeadCategory] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [referenceType, setReferenceType] = useState('');
  const [staffType, setStaffType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const { backendUrl, account, CallingStudentname , setCallingStudentName } = useContext(DataContext);

  //------------------ Reducer for Form State ------------------
  const reducer = (state, action) => {
    if (action.type === 'SET_FORM') {
      const { name, value } = action.payload;
      return { ...state, [name]: value }; // Form state update
    }
  
    if (action.type === 'RESET_FORM') {
      return initialState; // Reset form to initial state
    }
    return state;
  };

  //------------------ Initial State ------------------
  const initialState = {
    fullName: '',
    contact_no: '',
    current_Address: '',
    Category: leadCategory,
    passingYear: '',
    tenthPercent: '',
    twelvethPercent: '',
    educationLevel: educationLevel,
    graduateCourseName: '',
    graduateCollegeName: '',
    cgpa: '',
    postCourseName: '',
    postCollegeName: '',
    courseSpecialisation: '',
    leadSource: leadSource,
    refType: referenceType,
    staffType: staffType,
    studentName: "",
    staffName: "",
    salesName: account.name,
    postPassingYear:"",
  };

  //------------------ UseReducer Hook ------------------
  const [state, dispatchState] = useReducer(reducer, initialState);

  //------------------ Handle Input Change ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchState({ type: 'SET_FORM', payload: { name, value } }); // Update form state
  };

  //------------------ Delete Calling Data ------------------
  const DeleteCallingData = async () => {
    const DATA = {
      salesName: account.name,
      fullName: CallingStudentname,
    };

    console.log(DATA) // Check data before sending

    try {
      // API request to delete the calling data
      const response = await axios.delete(`${backendUrl}/Call-Deleting-Data`, { data: DATA });
    } catch (error) {
      console.log("ERROR WHILE DELETING THE DATA:", error);
    } finally {
      setCallingStudentName(""); // Clear the calling student name after deletion
    }
  };

  //------------------ Handle Form Submission ------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default action

    try {
      const response = await axios.post(`${backendUrl}/addEnquiryDetails`, state); // Post enquiry data to backend
      if (response.status === 200) {
        DeleteCallingData(); // Delete calling data after successful submission
        setModalTitle("Success");
        setModalMessage("Successfully Submitted!"); // Success message
        setModalOpen(true);
        dispatchState({ type: 'RESET_FORM' }); // Reset form after success
      }
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(error.response.data.message); // Error message
      setModalOpen(true);
      console.error("Error while submitting add-Enquiry Details", error);
    }
  };

  //------------------ Handle Modal Close ------------------
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      {/* <Layout> */}
        <Box
          sx={{
            maxWidth: '1200px',
            margin: 'auto',
            padding: '20px',
            boxShadow: 3,
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Lead Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>

              {/*Section 1: Lead Details */}

              <Grid item xs={12}>
                <Typography variant="h6">Section 1: Lead Details</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  name="fullName"
                  value={state.fullName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact No."
                  variant="outlined"
                  name="contact_no"
                  value={state.contact_no}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Address"
                  variant="outlined"
                  name="current_Address"
                  value={state.current_Address}
                  onChange={handleChange}
                />
              </Grid>

              {/* Section 2: Lead Category */}

              <Grid item xs={12}>
                <Typography variant="h6">Section 2: Lead Category</Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Lead Category</InputLabel>
                  <Select
                    value={leadCategory}
                    label="Lead Category"
                    onChange={(e) => {
                      setLeadCategory(e.target.value);
                      dispatchState({
                        type: 'SET_FORM',
                        payload: { name: 'Category', value: e.target.value },
                      });
                    }}
                  >
                    <MenuItem value="Fresher">Fresher (IT)</MenuItem>
                    <MenuItem value="Experienced-IT">Experienced (IT)</MenuItem>
                    <MenuItem value="Experienced-Non-IT">Experienced (Non-IT)</MenuItem>
                    <MenuItem value="Fresher-Non-IT">Fresher (Non-IT)</MenuItem>
                    <MenuItem value="Student-IT">Currently Student (IT)</MenuItem>
                    <MenuItem value="Student-Non-IT">Currently Student (Non-IT)</MenuItem>
                    <MenuItem value="JobSwitch">Job Switch</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Passing Year"
                    variant="outlined"
                    name="passingYear"
                    value={state.passingYear}
                    onChange={handleChange}
                  />
                </Grid>

              {/* Section 3: Lead Education */}

              <Grid item xs={12}>
                <Typography variant="h6">Section 3: Lead Education</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="10th Percentage"
                  variant="outlined"
                  name="tenthPercent"
                  value={state.tenthPercent}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="12th Percentage"
                  variant="outlined"
                  name="twelvethPercent"
                  value={state.twelvethPercent}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={educationLevel}
                    onChange={(e) => {
                      setEducationLevel(e.target.value);
                      dispatchState({
                        type: 'SET_FORM',
                        payload: { name: 'educationLevel', value: e.target.value },
                      });
                    }}
                  >
                    <FormControlLabel value="Graduate" control={<Radio />} label="Graduate" />
                    <FormControlLabel
                      value="GraduateRunning"
                      control={<Radio />}
                      label="Graduate (Running)"
                    />
                    <FormControlLabel value="PostGraduate" control={<Radio />} label="Post Graduate" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {(educationLevel === 'Graduate' ||
                educationLevel === 'GraduateRunning' ||
                educationLevel === 'PostGraduate') && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={educationLevel === "GraduateRunning" ? "Graduating Course Name":"Graduate Course Name"}
                      variant="outlined"
                      name="graduateCourseName"
                      value={state.graduateCourseName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label= {educationLevel === "GraduateRunning" ? "Graduating College Name":"Graduate College Name"}
                      variant="outlined"
                      name="graduateCollegeName"
                      value={state.graduateCollegeName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={educationLevel === 'GraduateRunning' ? 'Current CGPA' : 'CGPA'}
                      variant="outlined"
                      name="cgpa"
                      value={state.cgpa}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {educationLevel === 'PostGraduate' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Post Graduate Course Name"
                      variant="outlined"
                      name="postCourseName"
                      value={state.postCourseName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Post Graduate College Name"
                      variant="outlined"
                      name="postCollegeName"
                      value={state.postCollegeName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <TextField
                      fullWidth
                      label="Post Graduate Passing Year"
                      variant="outlined"
                      name="postPassingYear"
                      value={state.postPassingYear}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {/* Section 4: Lead Education Specialisation */}

              <Grid item xs={12}>
                <Typography variant="h6">Section 4: Lead Education Specialisation</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Specialisation"
                  variant="outlined"
                  name="courseSpecialisation"
                  value={state.courseSpecialisation}
                  onChange={handleChange}
                />
              </Grid>

              {/* Section 5: Lead Source */}

              <Grid item xs={12}>
                <Typography variant="h6">Section 5: Lead Source</Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Lead Source</InputLabel>
                  <Select
                    value={leadSource}
                    label="Lead Source"
                    onChange={(e) => {
                      setLeadSource(e.target.value);
                      dispatchState({
                        type: 'SET_FORM',
                        payload: { name: 'leadSource', value: e.target.value },
                      });
                    }}
                  >
                    <MenuItem value="JustDial">Just Dial</MenuItem>
                    <MenuItem value="ByCalling">By Calling</MenuItem>
                    <MenuItem value="Direct">Direct</MenuItem>
                    <MenuItem value="Website">Website</MenuItem>
                    <MenuItem value="GoogleMap">Google Map</MenuItem>
                    <MenuItem value="Reference">Reference</MenuItem>
                  </Select>
                </FormControl>

                {leadSource === 'Reference' && (
                  <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
                    <RadioGroup
                      value={referenceType}
                      onChange={(e) => {
                        setReferenceType(e.target.value)
                        dispatchState({
                          type: "SET_FORM",
                          payload: { name: "refType", value: e.target.value },
                        });
                      }}
                      name='refType'
                    >
                      <FormControlLabel value="Student" control={<Radio />} label="Student"/>
                      <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                    </RadioGroup>
                  </FormControl>
              )}

                {referenceType === 'Student' && (

                  <Box>

                  <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
                    <RadioGroup
                      value={staffType}
                      onChange={(e) => {
                        setStaffType(e.target.value)
                        dispatchState({
                          type: "SET_FORM",
                          payload: { name: "staffType", value: e.target.value },
                        });
                      }}
                      name='staffType'
                    >
                      <FormControlLabel value="Existing" control={<Radio />} label="Existing" />
                      <FormControlLabel value="NonExisting" control={<Radio />} label="Non-Existing" />
                    </RadioGroup>
                  </FormControl>

                  <TextField fullWidth label="Student Name" name='studentName'
                  value={state.studentName} onChange={handleChange}/>

                  </Box>
                )}

                {referenceType === "Staff" && (
                  <TextField fullWidth label="Staff Name" name='staffName'
                  value={state.staffName} onChange={handleChange}/>
                )}

              </Grid>

              {/* Submit & Reset Buttons */}

              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

              {/* Modal for Success/Error Message */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Layout> */}
      
    </>
  );
};

export default AddEnquiry;