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
  Checkbox,
} from '@mui/material';

// import material ui icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';

// import material ui custom components
import FlexBetween from 'components/FlexBetween';

const AddSite = () => {
  // catch props from useNavigation
  const location = useLocation();
  const tabData = location.state?.tabs;

  const navigate = useNavigate();

  console.log(tabData);


  const [siteName, setSiteName] = useState('');
  const [siteId, setSiteId] = useState('');
  const [date, setDate] = useState('');
  const [towerOwner, setOwner] = useState('');
  const [height, setHeight] = useState('');
  const [status, setStatus] = useState(false);
  const [siteIdError, setSiteIdError] = useState(false);


  // Ti site
  const [manual, setManual] = useState('');
  const [commissioningPlan, setCommInPlan] = useState('');
  const [ranClusOwner, setRanClusOwner] = useState('');
  const [province, setProvince] = useState('');

  // Civil site
  const [contractor, setContractor] = useState('');
  const [region, setRegion] = useState('');

  // console.log("New Site",tabData[0][0]);

  const validateForm = () => {

    let isValid = true;

    if ( !towerOwner || !siteId || !siteName) {
      toast.info("Please fill in all fields.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      isValid = false;
    } else if (!/[A-Za-z]{3}[0-9]{3}/.test(siteId)) {
      toast.info("Please enter a valid siteId .", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      isValid = false;
    
    }else {
      //setErrorMessage("");
    }
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(validateForm()){
    try {
      switch (tabData[0][0]) {
        case 'civilInfo':
          await axios.post('/api/civilInfo/add', {
            siteName,
            siteId,
            date,
            towerOwner,
            height,
            contractor,
            region,
            status,
          });
          break;
        case 'tiInfo':
          await axios.post('/api/tiInfo/add', {
            siteName,
            siteId,
            date,
            towerOwner,
            height,
            manual,
            commissioningPlan,
            ranClusOwner,
            province,
            status,
          });
          break;
       
        default:
          await axios.post('', {});
      }
      toast.success('New Site data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/ntInfoDash');
      window.location.reload();
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
     
    }
  }
  };

  // console.log(siteName);

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
            <NoteAddIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Add New {tabData[0][1]}
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                id="siteName"
                label="Enter New Site Name"
                type="text"
                variant="outlined"
                required
                onChange={(e) => setSiteName(e.target.value)}
              />
              <TextField
                id="siteId"
                label="Enter New Site ID"
                type="text"
                variant="outlined"
                pattern="[A-Za-z]{3}"
                error={siteIdError}
                helperText={siteIdError ? "Invalid site ID format" : ""}
                required
                onChange={(e) => setSiteId(e.target.value)}
              />
            </FlexBetween>
            
            <TextField
              id="date"
              type="date"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              value={new Date().toISOString().substr(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              disable
              helperText="New Data Created Date"
            />
            <TextField
              id="towerOwner"
              label="Enter Tower Owner"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              required
              onChange={(e) => setOwner(e.target.value)}
            />
            <TextField
              id="height"
              label="Enter Tower Height"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setHeight(e.target.value)}
            />
            Site is Completed

            <Checkbox
              name="status"
              label="Site is Completed"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              sx={{ mb: '1.5rem' }}
            />

             {/* <TextField
              name="status"
              label="Site is Completed"
              type="checkbox"
              variant="outlined"
              checked={true}
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setStatus(e.currentTarget.checked)}
            /> */}

            {tabData[0][0] === 'tiInfo' ? (
              <Stack>
                <TextField
                  id="manual"
                  label="Manual"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setManual(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                />
                Commissioning Initial Plan
                <TextField
                  id="commissioningPlan"
                  // label="Commissioning Initial Plan"
                  type="date"
                  variant="outlined"
                  onChange={(e) => setCommInPlan(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                />
                <TextField
                  id="ranClusOwner"
                  label="Enter RAN Cluster Owner"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setRanClusOwner(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                />
                <TextField
                  id="province"
                  label="Enter Province"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setProvince(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                  required
                />
              </Stack>
            ) : (
              <Stack>
                <TextField
                  id="contractor"
                  label="Enter Contractor Name"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setContractor(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                />
                <TextField
                  id="region"
                  label="Enter Region"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setRegion(e.target.value)}
                  sx={{ mb: '1.5rem' }}
                  required
                />
                </Stack>
            )}
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
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddSite;