import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const UpdateSafety = () => {
  // catch props from useNavigation
  const navigate = useNavigate();

  const location = useLocation();

  const { result, data } = location.state;

  const [formData, setFormData] = useState({
    mongoId: '',
    siteId: '',
    siteName: '',
    status: ''
  });

  console.log("up", data)

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return {
        ...newData,
        mongoId: data.mongoID,
        siteId: data.siteId,
        siteName: data.siteName,
        status: data.status
      };
    });
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/doc/update/${data.mongoID}`,
        formData
      );
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/documentation');
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  return (
    <Box
      width="100%"
      minHeight="75vh"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '3rem 0',
      }}
    >
      <Helmet>
        <title>Update Site Document</title>
      </Helmet>
      <Box sx={{ width: 500 }}>
        <Box
          width="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            mb: '1.5rem',
          }}
        >
          <IconButton
            variant="solid"
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '100px',
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[100],
              '&:hover': {
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
              },
            }}
          >
            <CreateIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Update Document Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                name="siteName"
                label="Enter New Site Name"
                value={formData.siteName}
                type="text"
                variant="outlined"
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="siteId"
                value={formData.siteId}
                label="Enter New Site ID"
                type="text"
                variant="outlined"
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="status"
                label="Enter Status"
                value={formData.status}
                type="text"
                variant="outlined"
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
            <FlexBetween>
              <Button
                variant="filled"
                type="reset"
                sx={{
                  backgroundColor: colorPalette.indigo[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.indigo[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Reset
              </Button>
              <Button
                variant="filled"
                type="submit"
                sx={{
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Update Document
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSafety;
