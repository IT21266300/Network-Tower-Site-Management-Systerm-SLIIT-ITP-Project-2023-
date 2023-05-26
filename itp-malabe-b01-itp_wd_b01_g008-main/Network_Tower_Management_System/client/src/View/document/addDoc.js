// import react components
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  console.log(file);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/doc/add',
        {
          siteName,
          siteId,
          status,
          file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/documentation');
    } catch (err) {
      console.log(err);
    }
  };

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
        <title>Add New Document</title>
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
            Add New Document
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name="siteName"
              label="Enter New Site Name"
              value={siteName}
              type="text"
              variant="outlined"
              onChange={(e) => setSiteName(e.target.value)}
              sx={{ mb: '1.5rem' }}
            />
            <TextField
              name="siteId"
              value={siteId}
              label="Enter New Site ID"
              type="text"
              variant="outlined"
              onChange={(e) => setSiteId(e.target.value)}
              sx={{ mb: '1.5rem' }}
            />
            <TextField
              name="status"
              label="Enter Status"
              value={status}
              type="text"
              variant="outlined"
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mb: '1.5rem' }}
            />
            <Button variant="contained" component="label" sx={{ mb: '1.5rem', color: 'white'}}>
              Upload PDF
              <input
                hidden
                accept="pdf/*"
                multiple
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {/* <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              sx={{ mb: '1.5rem' }}
            /> */}
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
                Add New Document
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddSafety;
