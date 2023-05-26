import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import axios from 'axios';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const UpdateSite = () => {
  // catch props from useNavigation
  const navigate = useNavigate();

  const location = useLocation();

  const { tabData, result, data } = location.state;
  const [formError, setFormError] = useState('');

  console.log('data', data);

  const [formData, setFormData] = useState({
    siteId: '',
    siteName: '',
    date: '',
    towerOwner: '',
    height: 0,
    contractor: '',
    region: '',
    status: 'Not Completed',
    manual: '',
    commissioningPlan: '',
    ranClusOwner: '',
    province: '',

    
  });
  

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      switch (tabData[0][0]) {
        case 'tiInfo':
          newData.siteId = data.siteId;
          newData.siteName = data.siteName;
          newData.towerOwner = data.towerOwner;
          newData.height = data.height;
          newData.status = data.status;
          newData.manual = data.manual;
          newData.commissioningPlan = data.commissioningPlan;
          newData.ranClusOwner = data.ranClusOwner;
          newData.province = data.province;
          break;
        case 'civilInfo':
          newData.siteId = data.siteId;
          newData.siteName = data.siteName;
          newData.towerOwner = data.towerOwner;
          newData.height = data.height;
          newData.status = data.status;
          newData.contractor = data.contractor;
          newData.region = data.region;
          break;
       
        default:
          break;
      }
      return {
        ...newData,
      };
    });
  }, [tabData, result, data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Check if the commissioningPlan field is being changed
  if (name === 'commissioningPlan') {
    const selectedDate = new Date(newValue);
    const today = new Date();
    

    // Compare the selected date with today's date
    if (selectedDate <= today) {
      // If the selected date is not a future date, show an error or handle it accordingly
      // For example, you can set an error message or disable the submit button
      setFormError('Commissioning date must be a future date.');
    }else {
      // If the selected date is valid, clear the error message and update the form data
      setFormError('');
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  } else {
   
    setFormData({
      ...formData,
      [name]: newValue,
    });
  }
  
  };

  // const handleStatusChange = () => {
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     status: prevFormData.status === 'not completed' ? false : true
  //   }));
  // }

  // const formatDate = (dateString) => {
  //   // if (!dateString) {
  //   //   return '';
  //   // }

  //   // if (typeof dateString !== 'string') {
  //   //   return dateString;
  //   // }

  //   // const dateParts = dateString.split('/');
  //   // const year = dateParts[2];
  //   // const month =
  //   //   dateParts[0]?.length === 1 ? `0${dateParts[0]}` : dateParts[0];
  //   // const day = dateParts[1]?.length === 1 ? `0${dateParts[1]}` : dateParts[1];
  //   // return `${year}-${month}-${day}`;
  // };

  // const handleDateChange = (e) => {
  //   const selectedDate = new Date(e.target.value);
  //   const formattedDate = formatDate(selectedDate);
  //   setFormData({
  //     ...formData,
  //     date: formattedDate,
  //   });
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (tabData[0][0]) {
        case 'tiInfo':
          await axios.put(
            `/api/tiInfo/update/${formData.siteId}`,
            formData
          );
          break;
        case 'civilInfo':
          await axios.put(
            `/api/civilInfo/update/${formData.siteId}`,
            formData
          );
          break;
       
        default:
          await axios.put('', {});
      }
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/ntInfoDash');
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
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
            Update {tabData[0][1]}
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
            <TextField
                name="siteId"
                label="Site ID"
                type="text"
                variant="outlined"
                value={formData.siteId}
                onChange={handleChange}
                disabled
                sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="siteName"
                label="Site Name"
                type="text"
                variant="outlined"
                disabled
                value={formData.siteName}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
             </FlexBetween>
             <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="towerOwner"
                label="Tower Owner"
                type="text"
                variant="outlined"
                value={formData.towerOwner}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="height"
                label="Tower Height"
                type="number"
                variant="outlined"
                value={formData.height}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              </FlexBetween>
              <FormControlLabel control={
              <Checkbox
                name="status"
                label="Status"
                type="checkbox"
                variant="outlined"
                checked={formData.status}
                onChange={handleChange}
                // (e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ mb: '1.5rem' }}
              />
            } label="Site is completed" />
            {formError && <div style={{ color: 'red' }}>{formError}</div>}
            
            {tabData[0][0] === 'tiInfo' ? (
              
            
             
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <FlexBetween sx={{ mb: '1.5rem' }}>
                <TextField
                  name="commissioningPlan"
                  label=""
                  type="date"
                  variant="outlined"
                  sx={{ mb: '1.5rem' }}
                  value={formData.commissioningPlan}
                  onChange={handleChange}
                  helperText= "Commissioning Initial  Plan"
                />
                

                <TextField
                name="ranClusOwner"
                label="RAN Cluster Owner"
                type="text"
                variant="outlined"
                value={formData.ranClusOwner}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              
              </FlexBetween>
              
              <FlexBetween sx={{ mb: '1.5rem' }}>
                <TextField
                name="province"
                label="Province"
                type="text"
                variant="outlined"
                value={formData.province}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="manual"
                label="Manual"
                type="text"
                variant="outlined"
                value={formData.manual}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              </FlexBetween>

              </Box>
              
            ) : (
              <FlexBetween sx={{ mb: '1.5rem' }}>

              <TextField
                name="contractor"
                label="Contractor"
                type="text"
                variant="outlined"
                value={formData.contractor}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />
              
              <TextField
                name="region"
                label="Region"
                type="text"
                variant="outlined"
                value={formData.region}
                onChange={handleChange}
                sx={{ mb: '1.5rem' }}
              />

              </FlexBetween>
            )}
            <FlexBetween>
            
              <Button
                variant="filled"
                type="reset"
                onClick={() => navigate('/ntInfoDash')}
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
                Cancel
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
                Update
              </Button>
            </FlexBetween>
            
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSite;