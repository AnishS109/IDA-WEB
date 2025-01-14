import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Grid,
  Container,
  Box,
  Paper,
  Avatar,
  Modal,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";
import axios from 'axios'
import { DataContext } from '../../Context/DataProvider';
import { useNavigate } from "react-router-dom";

const EnrollmentForm = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, []);

  const { backendUrl, account, setConfirmedStudentDone } = useContext(DataContext);

  const [uploadFoto, setUploadFoto] = useState([]);
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [SendingMail, setSendingMail] = useState(false);

  const [uploadingStudentImage, setUploadingImageStudent] = useState(false);
  const [uploadingDocumentImage, setUploadingImageDocument] = useState(false);
  const [uploadingPaymentSSImage, setUploadingImagePaymentSS] = useState(false);
  const [staffType, setStaffType] = useState('');
  const [referenceType, setReferenceType] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [successfulSubmit, setSuccessfulSubmit] = useState(null)

  const Navigate = useNavigate()

  const [uploadFiles, setUploadFiles] = useState({
    studentFoto: null,
    documentImage: null,
    paymentScreenshot: null,
  });

  const [uploadStatus, setUploadStatus] = useState({
    open: false,
    status: "idle",
    message: "",
  });

  // -------- Enrolled Student ko mail bhej rha hai --------

  // const handleMailSend = async () => {

  // };
  

  // -------- student ID fetch kar rahe hain --------
  useEffect(() => {
    const getStudentId = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Student-Enrolled-Number`);
        if (response.status === 200) {
          setStudentID(response.data);
        }
      } catch (error) {
        console.error("ERROR WHILE FETCHING STUDENT ID FROM BACKEND", error);
      }
    };
    getStudentId();
  }, []);
  
  // -------- Form ke initial data ke liye state define kiya --------
  const [formData, setFormData] = useState({
    studentId: "ID",
    salesName: account.name,
    fullName: "",
    photo: null,
    fathersName: "",
    mothersName: "",
    dob: "",
    mobileNumber: "",
    email: "",
    qualification: "",
    passingYear: "",
    college: "",
    occupation: "",
    gender: "",
    presentAddress: "",
    presentAddressPincode: "",
    permanentAddress: "",
    permanentAddressPincode: "",
    document: "",
    documentImage: null,
    emergencyContactName: "",
    emergencyContactMobile: "",
    emergencyContactRelation: "",
    emergencyContactFatherNumber: "",
    courseName: "",
    totalFee: "",
    registrationFee: "",
    admissionType: "",
    paymentType: "",
    paymentReceived: "",
    paymentMode: "",
    paymentScreenshot: null,
    paymentDate: "",
    courseStartDate: "",
    paymentType: "",
    numberOfInstallment: "",
    leadSource: leadSource,
    refType: referenceType,
    staffType: staffType,
    studentName: "",
    staffName: "",
  });

  // -------- Form field ke value ko handle karne ke liye --------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -------- File upload karne ke liye aur size validation --------
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const maxSizeInBytes = 500 * 1024; // 500KB tak file ki size allow hai
  
    if (file) {
      if (file.size > maxSizeInBytes) {
        alert("File size should not exceed 500KB.");
        return; 
      }
      setUploadFoto({ ...uploadFoto, [name]: file });
    }
  };
  
  // -------- Student photo ke preview ke liye function --------
  const handlePhotoPreview = () => {
    if (uploadingStudentImage) {
      return uploadFoto.studentFoto
        ? URL.createObjectURL(uploadFoto.studentFoto)
        : "https://via.placeholder.com/150";
    }
  };

  // -------- Document image preview function --------
  const handleDocumentImagePreview = () => {
    if (uploadingDocumentImage) {
      return uploadFoto.documentFoto
        ? URL.createObjectURL(uploadFoto.documentFoto)
        : "https://via.placeholder.com/150";
    }
  };

  // -------- Payment screenshot ke preview ke liye function --------
  const handlePaymentScreenshotPreview = () => {
    if (uploadingPaymentSSImage) {
      return uploadFoto.paymentSSFoto
        ? URL.createObjectURL(uploadFoto.paymentSSFoto)
        : "https://via.placeholder.com/150";
    }
  };

  // -------- Student image upload karne ka function --------
  const handleUploadStudnetImage = async () => {
    const formdata = new FormData();
    formdata.append("file", uploadFoto.studentFoto);

    setUploadStatus({
      open: true,
      status: "uploading",
      message: `Your selected Image is uploading, please wait...`,
    });
  
    try {
      const response = await axios.post(`${backendUrl}/Student-Enrolled-Images`, formdata);
  
      if (response.status === 200) {
        setUploadStatus({
          open: true,
          status: "success",
          message: `Your selected Image uploaded successfully!`,
        });
        setFormData({ ...formData, photo: response.data });
      } 
    } catch (error) {
      setUploadStatus({
        open: true,
        status: "error",
        message: error.response?.data?.message || `Your selected Image upload failed.`,
      });
      console.error("Error during image upload:", error);
    } finally {
      setUploadingImageStudent(true);
    }
  };

  // -------- Document image upload karne ka function --------
  const handleUploadDocumentImage = async () => {
    const formdata = new FormData();
    formdata.append("file", uploadFoto.documentFoto);

    setUploadStatus({
      open: true,
      status: "uploading",
      message: `Your selected Image is uploading, please wait...`,
    });
  
    try {
      const response = await axios.post(`${backendUrl}/Student-Enrolled-Images`, formdata);
  
      if (response.status === 200) {
        setUploadStatus({
          open: true,
          status: "success",
          message: `Your selected Image uploaded successfully!`,
        });
        setFormData({ ...formData, documentImage: response.data });
      } 
    } catch (error) {
      setUploadStatus({
        open: true,
        status: "error",
        message: error.response?.data?.message || `Your selected Image upload failed.`,
      });
      console.error("Error during image upload:", error);
    } finally {
      setUploadingImageDocument(true);
    }
  };

  // -------- Payment screenshot upload karne ka function --------
  const handleUploadPaymentSSImage = async () => {
    const formdata = new FormData();
    formdata.append("file", uploadFoto.paymentSSFoto);

    setUploadStatus({
      open: true,
      status: "uploading",
      message: `Your Payment Screeen Short is uploading, please wait...`,
    });
  
    try {
      const response = await axios.post(`${backendUrl}/Student-Enrolled-Images`, formdata);
  
      if (response.status === 200) {
        setUploadStatus({
          open: true,
          status: "success",
          message: `Your selected Image uploaded successfully!`,
        });
        setFormData({ ...formData, paymentScreenshot: response.data });
      } 
    } catch (error) {
      setUploadStatus({
        open: true,
        status: "error",
        message: error.response?.data?.message || `Your selected Image upload failed.`,
      });
      console.error("Error during image upload:", error.response.data.message);
    } finally {
      setUploadingImagePaymentSS(true);
    }
  };

  const handleCloseModal = () => {
    setUploadStatus({ open: false, status: "idle", message: "" });
  };

  // ---------- ERROR / SUCCESSFULL MODAL STYLING -------------------

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: 2,
  };

  // -------- Form submit karne ka function --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingMail(true)
  
    let updatedFormData = { ...formData };

    try {
      const studentIdString = studentID.studentId;
        
      if (!studentIdString || typeof studentIdString !== "string") {
         throw new Error("Invalid studentId: Ensure it is defined and a string.");
      }
  
      const studentIdParts = studentIdString.split("/");
      const prefix = studentIdParts[0]; 
  
      const numberPart = parseInt(studentIdParts[1], 10);
    if (isNaN(numberPart)) {
      throw new Error("Invalid studentId format: Numeric part is not valid.");
    }
  
      const updatedStudentId = `${prefix}/${numberPart + 1}`;

      const response = await axios.put(`${backendUrl}/Student-Enrolled-Details-Update`, {
        studentId: updatedStudentId, 
      });
  
    if (response.status === 200) {
      updatedFormData = {
        ...formData,
        studentId: `${response.data.updatedCounter.prefix}${response.data.updatedCounter.seq}`,
      };
    }
    } catch (error) {
      console.error("ERROR WHILE UPDATING STUDENT ID", error.message);
    }
  
    if (updatedFormData.studentId) {
      try {
        const response = await axios.post(
          `${backendUrl}/Student-Enrolled-Details`,
          updatedFormData
        );
  
        if (response.status === 200) {
          setConfirmedStudentDone(true)
          setSuccessfulSubmit(true)

          const mailResponse = {
            name: formData.fullName,
            email: formData.email,
            courseEnrolled: formData.courseName,
          };

  
          try {
            const emailResponse = await axios.post(`${backendUrl}/Enrolled-Student-Mail-Send`, mailResponse);
            setSendingMail(true)
            if (emailResponse.status === 200) {

            } else {
              console.error("Error while sending mail:", emailResponse.data?.error || "Unknown error");
              alert("Failed to send mail!");
            }
          } catch (emailError) {
            console.error("Error while sending the mail:", emailError);
            alert("An error occurred while sending the email.");
          } finally{
            handleMailCloseModal()
          }

          Navigate("/Sales-Home")
        }
      } catch (error) {
        console.log(
          "ERROR WHILE POSTING FORM DATA",
          error.response?.data?.message || error.message
        ) 
      }
    } else {
      console.log("Student ID is not set");
    }
    
  };

  const handleMailCloseModal = () => {
    setSendingMail(false)
  }
  

  return (
    <Container maxWidth="xl">
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Student Enrollment Form
        </Typography>
        <form >

          {/*--------------------------- Section 1: Personal Details ---------------------------*/}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 1: Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label" fullWidth>
                  Select Photo
                  <input
                    type="file"
                    hidden
                    name="studentFoto"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Avatar
                    src={handlePhotoPreview()}
                    alt="Uploaded Photo"
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
                <Button onClick={handleUploadStudnetImage}>
                  Upload Image
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  name="mothersName"
                  value={formData.mothersName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Passing Year"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="College/Organization"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/*--------------------------- Section 2: Contact Details -------------------------*/}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 2: Contact Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Present Address"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Present Address Pincode"
                  name="presentAddressPincode"
                  value={formData.presentAddressPincode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Permanent Address"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Permanent Address Pincode"
                  name="permanentAddressPincode"
                  value={formData.permanentAddressPincode}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/*--------------------------- Section 3: Document Details ---------------------------*/}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 3: Document Details
            </Typography>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                >
                  <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                  <MenuItem value="PAN Card">PAN Card</MenuItem>
                  <MenuItem value="Voter ID">Voter ID</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" component="label" fullWidth>
                  Select {formData.document || "Document"} Image
                  <input
                    type="file"
                    hidden
                    name="documentFoto"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Avatar
                    src={handleDocumentImagePreview()}
                    alt="Document Preview"
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: formData.documentImage ? "transparent" : "grey.300", // Grey background if no image
                    }}
                  />
                </Box>
                <Button onClick={handleUploadDocumentImage}>
                  Upload Image
                </Button>
              </Grid>
          </Box>

          {/*--------------------------- Section 4: Emergency Contact ---------------------------*/}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 4: Emergency Contact
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="emergencyContactMobile"
                  value={formData.emergencyContactMobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Relation"
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father's Contact Number"
                  name="emergencyContactFatherNumber"
                  value={formData.emergencyContactFatherNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/*--------------------------- Section 5: Course Details ---------------------------*/}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 5: Course Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course Name"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Fee"
                  name="totalFee"
                  value={formData.totalFee}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Registration Fee"
                  name="registrationFee"
                  value={formData.registrationFee}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Admission Type</InputLabel>
                  <Select
                    name="admissionType"
                    value={formData.admissionType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Offline">Offline</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Course Start Date"
                  name="courseStartDate"
                  value={formData.courseStartDate}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
          </Box>

          {/*--------------------------- Section 6: Payment Details ---------------------------*/}
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
              Section 6: Payment Details
            </Typography>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Mode</InputLabel>
                  <Select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                  >
                    <MenuItem value="Online" onClick={() => setPaymentMode(true)}>Online</MenuItem>
                    <MenuItem value="Cash" onClick={() => setPaymentMode(false)}>Cash</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Type</InputLabel>
                  <Select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Full Payment" onClick={() => setOnlinePayment(false)}>Full Payment</MenuItem>
                    <MenuItem value="Installment" onClick={() => setOnlinePayment(true)}>Installment</MenuItem>

                  </Select>
                </FormControl>
              </Grid>

              {onlinePayment && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of installment"
                    name="numberOfInstallment"
                    value={formData.numberOfInstallment}
                    onChange={handleChange}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Payment Received"
                  name="paymentReceived"
                  value={formData.paymentReceived}
                  onChange={handleChange}
                />
              </Grid>

              {paymentMode && (
                <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label" fullWidth>
                  Select Payment Screenshot
                  <input
                    type="file"
                    hidden
                    name="paymentSSFoto"
                    accept="image/*"
                    onChange={handleFileChange}
                    />
                </Button>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Avatar
                    src={handlePaymentScreenshotPreview()}
                    alt="Payment Screenshot"
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
                <Button onClick={handleUploadPaymentSSImage}>
                  Upload Image
                </Button>
              </Grid>
              )}
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Payment Date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
          {/*--------------------------- ENROLLED STUDENT REFERENCE ---------------------------*/}

          <Grid container spacing={3}>
          <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1565c0", mb:"20px" }}>
                      Section 7: Enrolled Student Reference
                    </Typography>
            <FormControl fullWidth>
              <InputLabel>Lead Source</InputLabel>
              <Select
                value={formData.leadSource}
                label="Lead Source"
                name="leadSource"
                onChange={(e) => {
                  handleChange(e);
                  setLeadSource(e.target.value);
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
          </Grid>

          {/* Reference Type Section */}
          {formData.leadSource === "Reference" && (
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth sx={{ marginBottom: "0px" }}>
                <FormLabel component="legend">Reference Type</FormLabel>
                <RadioGroup
                  value={formData.refType}
                  onChange={(e) => {
                    setReferenceType(e.target.value);
                    handleChange(e);
                  }}
                  name="refType"
                >
                  <FormControlLabel value="Student" control={<Radio />} label="Student" />
                  <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}

          {/* Student Reference */}
          {formData.refType === "Student" && (
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              <FormControl component="fieldset" fullWidth sx={{ marginBottom: "10px" }}>
                <FormLabel component="legend">Student Reference Type</FormLabel>
                <RadioGroup
                  value={formData.staffType}
                  onChange={(e) => {
                    setStaffType(e.target.value);
                    handleChange(e);
                  }}
                  name="staffType"
                >
                  <FormControlLabel value="Existing" control={<Radio />} label="Existing" />
                  <FormControlLabel value="NonExisting" control={<Radio />} label="Non-Existing" />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>
              )}

              {/* Staff Reference */}
              {formData.refType === "Staff" && (
                <Grid item xs={12} sx={{ marginTop: "0px" }}>
                  <TextField
                    fullWidth
                    label="Staff Name"
                    name="staffName"
                    value={formData.staffName}
                    onChange={(e) => handleChange(e)}
                    sx={{ marginBottom: "20px" }}
                  />
                </Grid>
              )}
            </Grid>


          {/*--------------------------- Submit Button ---------------------------*/}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt:"25px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                !formData.fullName || 
                !formData.photo || 
                !formData.dob || 
                !formData.email ||
                !formData.mobileNumber ||
                !formData.college ||
                !formData.gender ||
                !formData.presentAddress ||
                !formData.documentImage ||
                !formData.courseName ||
                !formData.leadSource
              }

              onClick={handleSubmit}
            >
              Submit Enrollment Form
            </Button>
          </Box>
        </form>

        <Modal
        open={uploadStatus.open}
        onClose={handleCloseModal}
        aria-labelledby="upload-modal-title"
        aria-describedby="upload-modal-description"
      >
        <Box sx={modalStyle}>
          {uploadStatus.status === "uploading" && (
            <>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {uploadStatus.message}
              </Typography>
            </>
          )}

          {uploadStatus.status === "success" && (
            <>
              <Typography variant="h6" color="success.main">
                {uploadStatus.message}
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </>
          )}

          {uploadStatus.status === "error" && (
            <>
              <Typography variant="h6" color="error.main">
                {uploadStatus.message}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      <Dialog open={SendingMail} onClose={handleMailCloseModal}>
        <DialogTitle>
          {`Enrolling ${formData.fullName} Please Wait...`}
        </DialogTitle>
      </Dialog>

      </Paper>
    </Container>
  );
};

export default EnrollmentForm;