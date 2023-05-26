import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  makeStyles,
} from '@mui/material';
import axios from 'axios';
import FlexBetween from 'components/FlexBetween';
import { colorPalette } from 'customTheme';
import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import { Store } from 'store';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const base64String = btoa(String.fromCharCode(...new Uint8Array(userInfo.profileImage.data.data)))

  const handleUpdate = () => {
    navigate('/updateStaff', { state: { data: userInfo } });
  };

  return (
    <Box p="3rem 0">
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
          <PersonIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center">
          User Profile
        </Typography>
      </Box>
      <form>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Grid container spacing={3} sx={{ width: '80%' }}>
            <Grid item xs={3}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
          
                <Button
                  variant="contained"
                  component="label"
                  endIcon={<CameraAltIcon />}
                  sx={{
                    color: 'white',
                    padding: '0.6rem 0.9rem',
                    m: '0.5rem 0', 
                    width: '200px',
                    '&:hover': {
                      backgroundColor: colorPalette.primary[400],
                      color: colorPalette.secondary[100],
                    },
                  }}
                >
                  Edit Profile
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Stack spacing={2}>
                <FlexBetween sx={{ mb: '1.5rem' }}>
                  <TextField
                    id="outlined-basic"
                    label="Staff ID"
                    variant="outlined"
                    value={userInfo.staffId}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={userInfo.name}
                  />
                </FlexBetween>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={userInfo.username}
                    sx={{ mb: '1.5rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={userInfo.email}
                    sx={{ mb: '1.5rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    value={userInfo.phone}
                    sx={{ mb: '1.5rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Position"
                    variant="outlined"
                    value={userInfo.position}
                    sx={{ mb: '1.5rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Team"
                    variant="outlined"
                    value={userInfo.team}
                    sx={{ mb: '1.5rem' }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  color: 'white',
                  padding: '0.6rem 0.9rem',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[400],
                    color: colorPalette.secondary[100],
                  },
                }}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;
