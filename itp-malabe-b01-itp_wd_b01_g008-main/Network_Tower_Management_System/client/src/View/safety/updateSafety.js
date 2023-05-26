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
    safetyhelmets: 0,
    safetyjacket: 0,
    isafetyshoes: 0,
    safetygloves: 0,
    safetyharness: 0,
    cautionbordt: 0,
  });


  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return {
        ...newData,
        mongoId: data.mongoId,
        siteId: data.siteId,
        siteName: data.siteName,
        safetyhelmets: data.safetyhelmets,
        safetyjacket: data.safetyjacket,
        safetyshoes: data.safetyshoes,
        safetygloves: data.safetygloves,
        safetyharness: data.safetyharness,
        cautionbord: data.cautionbord,
      };
    });
  }, [data]);

  //submit button task
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/safety/update/${formData.mongoId}`,
        formData
      );
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/safety');
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  //reset button task
  const handleFormReset = () => {
    setFormData({
      mongoId: data.mongoId,
      siteId: data.siteId,
      siteName: data.siteName,
      safetyhelmets: data.safetyhelmets,
      safetyjacket: data.safetyjacket,
      safetyshoes: data.safetyshoes,
      safetygloves: data.safetygloves,
      safetyharness: data.safetyharness,
      cautionbord: data.cautionbord,
    });
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
        <title>Update Site Safety</title>
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
            Update Site Safety
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="siteName"
                label="Enter New Site Name"
                value={formData.siteName ? formData.siteName : ''}
                type="text"
                variant="outlined"
                onChange={handleChange}
                disabled
              />
              <TextField
                name="siteId"
                value={formData.siteId ? formData.siteId : ''}
                label="Enter New Site ID"
                type="text"
                variant="outlined"
                onChange={handleChange}
                disabled
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetyhelmets"
                label="Enter No of Safety Helmets"
                value={formData.safetyhelmets ? formData.safetyhelmets: ''}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
              <TextField
                name="safetyjacket"
                value={formData.safetyjacket ? formData.safetyjacket : ''}
                label="Enter No Of Safety Jackets"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetygloves"
                label="Enter No of Safety Gloves"
                value={formData.safetygloves ? formData.safetygloves: ''}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
              <TextField
                name="safetyharness"
                value={formData.safetyharness ? formData.safetyharness: ''}
                label="Enter No Of Safety Harness"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetyshoes"
                label="Enter No of Safety Shoes"
                value={formData.safetyshoes ? formData.safetyshoes : ''}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
              <TextField
                name="cautionbord"
                value={formData.cautionbord ? formData.cautionbord : ''}
                label="Enter No Of Caution Boards"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={handleChange}
              />
            </FlexBetween>
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
                Add Safety Data
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSafety;
