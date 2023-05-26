import React,{ useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import FlexBetween from 'components/FlexBetween';
import './Style.css';

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

// import color palette
import { colorPalette } from 'customTheme';
// import material ui icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function AddCon() {
    const [name,setName] = useState("");
    const [nic,setNIC] = useState("");
    const [phone,setPhone] = useState("");
    const [siteID,setSiteID] = useState("");
    const [siteName,setSiteName] = useState("");

    const validateForm = () => {

      let isValid = true;

      if (!name || !nic || !phone || !siteID || !siteName) {
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
  
    function sendData(e){
        e.preventDefault();

        if(validateForm()){
          const newCon = {
            name,
            nic,
            phone,
            siteID,
            siteName,
          }
          axios.post('/api/contractor/addContractor',newCon).then(()=>{ 
            toast.success("Contractor Added!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            }).catch((err) =>{
              toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            })
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
            Add New Contractor
          </Typography>
        </Box>
        <form onSubmit={sendData}>
          <box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                id="SiteName"
                label="Enter Site Name"
                type="text"
                variant="outlined"
                onChange={(e) => {
                  setSiteName(e.target.value);
                 }}
              />
              <TextField
                id="SiteID"
                label="Enter Site ID"
                type="text"
                variant="outlined"
                sx={{
                  padding: '5px',
                }}
                onChange={(e) => {
                  setSiteID(e.target.value);
                 }}
              />
            </FlexBetween>
            <TextField
              id="name"
              label="Enter Contractor Name"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem', width: '100%' }}
              onChange={(e) => {
                setName(e.target.value);
               }}
            />
            <TextField
              id="Address"
              label="Enter NIC"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' , width: '100%' }}
              onChange={(e) => {
                setNIC(e.target.value);
               }}
            />
            <TextField
              id="Phone"
              label="Enter Phone Number"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' , width: '100%' }}
              onChange={(e) => {
                setPhone(e.target.value);
               }}
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
                Add New Data
              </Button>
            </FlexBetween>
          </box>
        </form>
      </Box>
    </Box>
  );
}
