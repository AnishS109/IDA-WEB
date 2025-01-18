import React, { useContext, useState } from 'react';
import { DataContext } from '../../../Context/DataProvider';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Layout from '../../../Layout/Layout';

const AddEvents = () => {
  const { account, role, backendUrl } = useContext(DataContext);

  const [errors, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [load, setLoad] = useState(false);

  const [eventForm, setEventForm] = useState({
    eventName: '',
    eventDate: '',
    eventPlace: '',
    eventType: '',
    eventPlaceName: '',
    role: role,
    HRName: account.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm({ ...eventForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/HR/Add-Events`, eventForm);
      if (response.status === 200) {
        setError('');
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess('');
          setEventForm({
            eventName: '',
            eventDate: '',
            eventPlace: '',
            eventType: '',
            eventPlaceName: '',
            role: role,
            HRName: account.name,
          })
        }, 1000);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Layout>
    <Box
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
        margin: 'auto',
        marginTop: 4,
        padding: { xs: 2, sm: 3 },
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Add Event Details
      </Typography>

      {errors && (
        <Typography sx={{ color: 'red', textAlign: 'center', mb: '20px' }}>{errors}</Typography>
      )}

      {success && (
        <Typography sx={{ color: 'green', textAlign: 'center', mb: '20px' }}>{success}</Typography>
      )}

      {load && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Event Name */}
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              required
              name="eventName"
              fullWidth
              value={eventForm.eventName}
              onChange={handleChange}
            />
          </Grid>

          {/* Event Date */}
          <Grid item xs={12}>
            <TextField
              label="Event Date"
              required
              name="eventDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={eventForm.eventDate}
              onChange={handleChange}
            />
          </Grid>

          {/* Event Place */}
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Select Event Place Type</InputLabel>
              <Select
                value={eventForm.eventPlace}
                name="eventPlace"
                onChange={handleChange}
                required
              >
                <MenuItem value="College">College</MenuItem>
                <MenuItem value="Company">Company</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Event Place Name */}
          <Grid item xs={12} sm={12}>
            <TextField
              label="Event Place Name"
              required
              name="eventPlaceName"
              fullWidth
              value={eventForm.eventPlaceName}
              onChange={handleChange}
            />
          </Grid>

          {/* Event Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Event Type</InputLabel>
              <Select
                value={eventForm.eventType}
                name="eventType"
                onChange={handleChange}
                required
              >
                <MenuItem value="For WorkShop & Training">For WorkShop & Training</MenuItem>
                <MenuItem value="For Visit">For Visit</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </form>
    </Box>
    </Layout>
  );
};

export default AddEvents;
