import React, { useContext, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Layout from '../../../Layout/Layout';
import { DataContext } from '../../../Context/DataProvider';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const College_Form = () => {
  const {backendUrl, role, account} = useContext(DataContext)
  const [errors, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [load, setLoad] = useState(false)
  const [collegeTechData, setCollegeTechData] = useState({
    collegeName: '',
    collegeLocation: '',
    collegeType: "",
    contactDetails: '',
    email: '',
    dealWith: '',
    HRName:account.name,
    role:role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeTechData({ ...collegeTechData, [name]: value });
  };

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    setLoad(true)
    e.preventDefault();

    if (!/^\d{10}$/.test(collegeTechData.contactDetails)) {
      setLoad(false)
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/HR/College-Details`, collegeTechData)
      if(response.status === 200){
        setError("")
        setSuccess(response.data.message)
        setTimeout(() => {
          navigate("/HR/Home")
        },1000)
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoad(false)
    }
  };

  return (
    <>
    <Layout>
      <Box
        sx={{
          maxWidth: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
          margin: 'auto',
          marginTop: 4,
          padding: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold', color: '#333' }}>
          Add College Details
        </Typography>

        {errors && (
          <Typography sx={{color:"red", textAlign:"center", mb:"20px"}}>{errors}</Typography>
        )}

        {success && (
          <Typography sx={{color:"green", textAlign:"center", mb:"20px"}}>{success}</Typography>
        )}

        {load && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* Company Type */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select College Type</InputLabel>
            <Select
              value={collegeTechData.collegeType}
              name="collegeType"
              onChange={(e) => setCollegeTechData({ ...collegeTechData, collegeType: e.target.value })}
              required
            >
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Non - Technical">Non - Technical</MenuItem>
            </Select>
          </FormControl>

          {/* Company Name */}
          <TextField
            label="College Name"
            required
            name="collegeName"
            fullWidth
            value={collegeTechData.collegeName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Company Location */}
          <TextField
            label="College Location"
            required
            name="collegeLocation"
            fullWidth
            value={collegeTechData.collegeLocation}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Contact Details */}
          <TextField
            label="Contact Details"
            required
            name="contactDetails"
            fullWidth
            value={collegeTechData.contactDetails}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Email */}
          <TextField
            label="Email"
            required
            type="email"
            name="email"
            fullWidth
            value={collegeTechData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Deal With */}
          <TextField
            label="Deal With"
            required
            name="dealWith"
            fullWidth
            placeholder="ex, MERN, Data Analytics"
            value={collegeTechData.dealWith}
            onChange={handleChange}
            sx={{ marginBottom: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: 'rgb(58, 164, 250)',
              color: '#ffffff',
              padding: '10px 0',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgb(47, 140, 224)',
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
      </Layout>
    </>
  );
};

export default College_Form;
