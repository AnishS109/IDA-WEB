import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CollegeCard from './card/CollegeCardd';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

const College_Tech = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { backendUrl, account, role } = useContext(DataContext);

  useEffect(() => {
    const fetchTechCompanyData = async () => {
      setLoading(true);
      setErrorMsg('');
      const serverData = {
        HRName: account.name,
        role: role,
      };

      try {
        const response = await axios.get(`${backendUrl}/HR/Tech-College-Details`, {
          params: serverData,
        });

        if (response.status === 200) {
          setCompanyData(response.data);
        }
      } catch (error) {
        const message = error?.response?.data?.message || 'Failed to fetch data. Please try again.';
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechCompanyData();
  }, [backendUrl, account.name, role]);

  return (
    <Box
      sx={{
        backgroundColor: '#f4f5f7',
        minHeight: '100vh',
        padding: { xs: '10px', sm: '20px 30px' }, // Responsive padding
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'Roboto, sans-serif',
            fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          }}
        >
          Tech Colleges
        </Typography>
        <NavLink to="/College/form" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3a98f0',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(58, 164, 250, 0.3)',
              '&:hover': {
                backgroundColor: '#357edd',
              },
            }}
          >
            Add College
          </Button>
        </NavLink>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '300px' }}
        >
          <CircularProgress />
        </Box>
      ) : errorMsg ? (
        <Typography
          variant="h6"
          align="center"
          color="error"
          sx={{ marginTop: '20px' }}
        >
          {errorMsg}
        </Typography>
      ) : companyData.length > 0 ? (
        <Box
          sx={{
            display:"flex",
            justifyContent:"center",
            flexWrap:"wrap",
            padding: '15px',
          }}
        >
          {companyData.map((data) => (
            <CollegeCard key={data._id} data={data} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          sx={{ marginTop: '20px' }}
        >
          No colleges found.
        </Typography>
      )}
    </Box>
  );
};

export default College_Tech;