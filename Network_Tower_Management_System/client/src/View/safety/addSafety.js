// import react components
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

// import material ui components
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

// import material ui icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';

// import material ui custom components
import FlexBetween from 'components/FlexBetween';
import { Helmet } from 'react-helmet-async';

const AddSafety = () => {
  // catch props from useNavigation

  const navigate = useNavigate();


  const [siteName, setSiteName] = useState('');
  const [siteId, setSiteId] = useState('');
  const [safetyhelmets, setSafetyhelmets] = useState(0);
  const [safetyjacket, setsafetyjacket] = useState(0);
  const [safetyshoes, setSafetyshoes] = useState(0);
  const [safetygloves, setSafetygloves] = useState(0);
  const [safetyharness, setSafetyharnes] = useState(0);
  const [cautionbord, setcautionbord] = useState(0);


  //validations
  
  const validateSafefront = () => {

    let isValid = true;

    if (!siteName || !siteId|| !safetyhelmets || !safetyjacket || !safetyshoes || !cautionbord) {
      toast.info("Some Important Safe Items are Empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      isValid = false;
    } else if (!/^[1-9]\d*$/.test(safetyhelmets) || !/^[1-9]\d*$/.test(safetyjacket) || !/^[1-9]\d*$/.test(safetyshoes) || !/^[1-9]\d*$/.test(safetygloves) || !/^[1-9]\d*$/.test(safetyharness) || !/^[1-9]\d*$/.test(cautionbord)) {
      toast.info("Please enter a Positive Number", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      isValid = false;
     }
    else if(siteIdExists()) {
      toast.error('Site ID already exists!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      isValid = false;
    }
    else {
      //ERROR MESSAGE
    }
    return isValid;
  };

  //Function to check if the site ID already exists
  const siteIdExists = async () => {
    try {
      const response = await axios.get(`/api/safety/${siteId}`);
      return response.data.exists;
    } catch (err) {
      console.log(err);
      return false; // Assuming the request failed, site ID doesn't exist
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if(validateSafefront()){
    /************************************************* */
    try {
      await axios.post('/api/safety/add', {
        siteName,
        siteId,
        safetyhelmets,
        safetyjacket,
        safetygloves,
        safetyshoes,
        safetyharness,
        cautionbord
      });
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/safety');
    } catch (err) {
      console.log(err);
    }
    /************************************************** */
  }
  };
  

  console.log(siteName);

  //Inserting Safety
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
        <title>Add New Safety</title>
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
            <NoteAddIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Add New Safety
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="siteName"
                label="Enter New Site Name"
                value={siteName}
                type="text"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSiteName(e.target.value)}
              />
              <TextField
                name="siteId"
                value={siteId}
                label="Enter New Site ID"
                type="text"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSiteId(e.target.value)}
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetyhelmets"
                label="Enter No of Safety Helmets"
                value={safetyhelmets}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSafetyhelmets(e.target.value)}
              />
              <TextField
                name="safetyjacket"
                value={safetyjacket}
                label="Enter No Of Safety Jackets"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setsafetyjacket(e.target.value)}
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetygloves"
                label="Enter No of Safety Gloves"
                value={safetygloves}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSafetygloves(e.target.value)}
              />
              <TextField
                name="safetyharness"
                value={safetyharness}
                label="Enter No Of Safety Harness"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSafetyharnes(e.target.value)}
              />
            </FlexBetween>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="safetyshoes"
                label="Enter No of Safety Shoes"
                value={safetyshoes}
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setSafetyshoes(e.target.value)}
              />
              <TextField
                name="cautionbord"
                value={cautionbord}
                label="Enter No Of Caution Boards"
                type="number"
                variant="outlined"
                inputProps={{min:0, step:1}} //Only positive values
                onChange={(e) => setcautionbord(e.target.value)}
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
                onClick={()=>{
                  setSiteName('');
                  setSiteId('');
                  setSafetyhelmets(0);
                  setsafetyjacket(0);
                  setSafetyshoes(0);
                  setSafetygloves(0);
                  setSafetyharnes(0);
                  setcautionbord(0);
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
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddSafety;
