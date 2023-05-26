import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const AddVehicle = () => {
  const navigate = useNavigate();

  const [model, setModel] = useState('');
  const [registration_number, setRegistration_number] = useState('');
  const [fuel_type, setFuel_type] = useState('');
  const [status, setStatus] = useState('');

  const [vModel, setVModel] = useState(false);
  const [vRegistration_number, setVRegistration_number] = useState(false);
  const [vFuel_type, setVFuel_type] = useState(false);
  const [vStatus, setVStatus] = useState(false);

  useEffect(() => {
    if (model === '') {
      setVModel(true)
    } else {
      setVModel(false)
    }
    if (registration_number === '' || registration_number.length !== 6) {
      setVRegistration_number(true);
    } else {
      setVRegistration_number(false);
    }
    if (fuel_type === '') {
      setVFuel_type(true);
    } else {
      setVFuel_type(false);
    }
    if (status === '') {
      setVStatus(true);
    } else {
      setVStatus(false);
    }
  }, [model, status, registration_number, fuel_type]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transportVehicle/add', {
        model,
        registration_number,
        fuel_type,
        status,
      });
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/transports');
      window.location.reload();
    } catch (err) {
      toast.error('Data cannot be duplicated', {
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
            <NoteAddIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Add New Vehicle
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="filled-basic"
              name="model"
              label="Model"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setModel(e.target.value)}
              error={vModel}
              helperText={vModel && 'Model cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name="registration_number"
              label="Registration No"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setRegistration_number(e.target.value)}
              error={vRegistration_number}
              helperText={
                vRegistration_number &&
                'Registration number cannot be empty & should be 6 digits'
              }
            />
            <TextField
              id="filled-basic"
              name="fuel_type"
              label="Fuel type"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setFuel_type(e.target.value)}
              error={vFuel_type}
              helperText={vFuel_type && 'Fuel type cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name="status"
              label="Status"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setStatus(e.target.value)}
              error={vStatus}
              helperText={vStatus && 'Status cannot be empty'}
            />

            <FlexBetween>
              <Button
                variant="filled"
                type="reset"
                onClick={() => navigate('/transports')}
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
                disabled={vModel || vFuel_type || vRegistration_number || vStatus}
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
                Add New Vehicle
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddVehicle;
