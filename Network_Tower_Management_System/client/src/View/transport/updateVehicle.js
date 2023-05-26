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
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlexBetween from 'components/FlexBetween';

const UpdateVehicle = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;


  const [formData, setFormData] = useState({
    mongoId: '',
    model: '',
    registration_number: '',
    fuel_type: '',
    status: ''
  });


  const [vModel, setVModel] = useState(false);
  const [vRegistration_number, setVRegistration_number] = useState(false);
  const [vFuel_type, setVFuel_type] = useState(false);
  const [vStatus, setVStatus] = useState(false);

  useEffect(() => {
    if (formData.model === '') {
      setVModel(true)
    } else {
      setVModel(false)
    }
    if (formData.registration_number === '' || formData.registration_number.length !== 6) {
      setVRegistration_number(true);
    } else {
      setVRegistration_number(false);
    }
    if (formData.fuel_type === '') {
      setVFuel_type(true);
    } else {
      setVFuel_type(false);
    }
    if (formData.status === '') {
      setVStatus(true);
    } else {
      setVStatus(false);
    }
  }, [formData.model, formData.status, formData.registration_number, formData.fuel_type]);

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return{
        ...newData,
        mongoId: data.mongoID,
        model: data.model,
        registration_number: data.registration_number,
        fuel_type: data.fuel_type,
        status: data.status,
      }
    });
  }, [data]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/transportVehicle/update/${formData.mongoId}`,
        formData
      );
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/transports');
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
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
            Update Vehicle Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="filled-basic"
              name='model'
              label="Model"
              value={formData.model}
              type='text'
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vModel}
              helperText={vModel && 'Model cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name='registration_number'
              label="Registration No"
              type='text'
              value={formData.registration_number}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vRegistration_number}
              helperText={
                vRegistration_number &&
                'Registration number cannot be empty & should be 6 digits'
              }
            />
            <TextField
              id="filled-basic"
              name='fuel_type'
              label="Fuel type"
              type='text'
              value={formData.fuel_type}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vFuel_type}
              helperText={vFuel_type && 'Fuel type cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name='status'
              label="Status"
              type='text'
              value={formData.status}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
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
                Update
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateVehicle;