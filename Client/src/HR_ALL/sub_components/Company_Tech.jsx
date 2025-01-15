import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CompanyCard from './card/CompanyCard';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

const Company_Tech = () => {
  const [companyData, setCompanyData] = useState(() => []); // Cleaner initialization
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { backendUrl, account, role } = useContext(DataContext);

  useEffect(() => {
    const fetchTechCompanyData = async () => {
      setLoading(true);
      setErrorMsg(''); // Reset error message before fetching
      const serverData = {
        HRName: account.name,
        role: role,
      };

      try {
        const response = await axios.get(`${backendUrl}/HR/Tech-Company-Details`, {
          params: serverData,
        });

        if (response.status === 200) {
          setCompanyData(response.data);
        }
      } catch (error) {
        const message = error?.response?.data?.message || 'An error occurred while fetching data.';
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechCompanyData();
  }, [backendUrl, account.name, role]); 
  return (
    <>
      <Box display="flex" justifyContent="center" mb={3}>
        <NavLink to="/Company/form" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              width: { xs: '70vw', sm: '58vw', md: '75vw' },
              backgroundColor: 'rgb(58, 164, 250)',
              color: '#ffffff',
              padding: '10px 0',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(58, 164, 250, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                color: '#000000',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.98)', // Slight scaling effect on click
              },
            }}
          >
            Add Company
          </Button>
        </NavLink>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : errorMsg ? (
        <Typography variant="h6" align="center" color="textSecondary">
          {errorMsg}
        </Typography>
      ) : companyData.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          justifyContent: "center", 
        }}
      >
        {companyData.map((data) => (
          <CompanyCard key={data._id} data={data} />
        ))}
      </Box>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No companies found.
        </Typography>
      )}

    </>
  );
};

export default Company_Tech;
