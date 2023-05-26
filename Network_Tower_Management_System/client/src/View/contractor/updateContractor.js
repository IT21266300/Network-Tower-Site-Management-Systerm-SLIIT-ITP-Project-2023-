import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import Actions from '../../components/ContractorComponents/ConActions';
import FlexBetween from 'components/FlexBetween';

// import color palette
import { colorPalette } from 'customTheme';
// import material ui icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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

export default function UpdateContractor() {

    // catch props from useNavigation
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

    //console.log(location.state);

    const [formData, setFormData] = useState({
        mongoId: '',
        name:'',
        nic: '',
        phone:'',
        siteId: '',
        siteName: '',
    });

    useEffect(() => {
        setFormData((prevState) => ({
        
            ...prevState,
            mongoId: data.mongoID,
            name: data.name,
            nic: data.nic,
            phone: data.phone,
            siteId: data.siteID,
            siteName: data.siteName,
        }));
      }, [ data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const validateForm = () => {

      let isValid = true;
      const { name, nic, phone, siteId,siteName} = formData;
      if ( !name || !nic || !phone || !siteId || !siteName) {
        toast.info("Please fill in all fields.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        isValid = false;
      } else if (!/^\d{10}$/.test(phone)) {
        toast.info("Please enter a valid phone number (10 digits).", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        isValid = false;
      } else if(!(/^\d{12}$/.test(nic) || /^\d{9}V$/.test(nic))){
        toast.info("Please enter a valid NIC number (12 digits/9 Digits with V.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        isValid = false;
      }else {
        //setErrorMessage("");
      }
      return isValid;
    };

    //update data
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(formData);

        if (isValid){
          try{
            await axios.put(`/api/contractor/update/${formData.mongoId}`,
              formData
          );
          toast.success('Data has been updated successfully!', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          navigate('/read');
          }catch(err){
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(err);
          }
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
    }}>
      <Box sx={{ width: 600 }}>
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
            <NoteAddIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Edit Contractor Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name = "siteName"
                id="SiteName"
                label="Enter Site Name"
                type="text"
                variant="outlined"
                value = {formData.siteName}
                onChange = {handleChange}
              />
              <TextField
                name='siteId'
                id="SiteID"
                label="Enter Site ID"
                type="text"
                variant="outlined"
                sx={{
                  padding: '5px',
                }}
                value={formData.siteId}
                onChange={handleChange}
              />
            </FlexBetween>
            <TextField
              name = "name"
              id="name"
              label="Enter Contractor Name"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem', width: '100%' }}
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name='nic'
              id="nic"
              label="Enter  NIC"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' , width: '100%' }}
              value={formData.nic}
              onChange={handleChange}
            />
            <TextField
              name='phone'
              id="Phone"
              label="Enter Phone Number"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' , width: '100%' }}
              value={formData.phone}
              onChange={handleChange}
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
                 onClick={() => navigate('/contractors')}
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
                Edit Data
              </Button>
            </FlexBetween>
          </box>
        </form>
      </Box>
    </Box>
  );
}
