import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlexBetween from 'components/FlexBetween';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const UpdateAllocation = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;

  const [formData, setFormData] = useState({
    mongoId: '',
    type: '',
    location: '',
    driver_id: '',
    vehicle_number: '',
    date: '',
  });

  const [validateLocation, setValidateLocation] = useState(false);
  const [validateDate, setDateValidate] = useState(false)
  const [validateDriverId, setValidateDriverId] = useState(true)
  const [validateVehicleNo, setValidateVehicleNo] = useState(false)

  useEffect(()=>{
    if(formData.location === ''){
      setValidateLocation(true)
    }else{
      setValidateLocation(false)
    }
    
    if(formData.driver_id === '' || formData.driver_id.length < 8){
      setValidateDriverId(true)
    }else{
      setValidateDriverId(false)
    }
    
    if(formData.vehicle_number === '' || formData.vehicle_number.length < 8){
      setValidateVehicleNo(true)
    }else{
      setValidateVehicleNo(false)
    }
  },[formData.location, formData.driver_id, formData.vehicle_number])

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return {
        ...newData,
        mongoId: data.mongoID,
        type: data.type,
        location: data.location,
        driver_id: data.driver_id,
        vehicle_number: data.vehicle_number,
        date: dayjs(data.date, 'MM/DD/YYYY hh:mm A'),
      };
    });
  }, [data]);

  // useEffect(() => {
  //   const currentTime = new Date();
  //   const hours = currentTime.getHours();
  //   const minutes = currentTime.getMinutes();
  //   const today = new Date().toLocaleDateString();
  //   const time = `${hours}:${minutes.toString().padStart(2, '0')}`;
  //   const fixedDate = `${today} - ${time}`;
  //   setFormData.date(fixedDate.toString());
  // }, [formData]);

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/transportAllocation/update/${formData.mongoId}`,
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
            Update Allocation Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Allocation Type:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="type"
                  defaultValue={formData.type}
                  value={formData.type}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Collection"
                    control={<Radio />}
                    label="Collection"
                  />
                  <FormControlLabel
                    value="Distribution"
                    control={<Radio />}
                    label="Distribution"
                  />
                  <FormControlLabel
                    value="Return"
                    control={<Radio />}
                    label="Return"
                  />
                </RadioGroup>
              </FormControl>
            </FlexBetween>
            <TextField
              id="filled-basic"
              label="Location"
              name="location"
              value={formData.location}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={validateLocation}
              helperText={validateLocation && 'Location cannot be empty'}
            />
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                name="date"
                value={formData.date ? formData.date : ''}
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                onChange={handleDateChange}
              />
            </DemoContainer>
            <FlexBetween>
              <TextField
                id="filled-basic"
                label="Driver ID"
                name="driver_id"
                value={formData.driver_id}
                variant="outlined"
                sx={{ mb: '1.5rem', mr: '1.5rem' }}
                onChange={handleChange}
                error={validateDriverId}
                helperText={validateDriverId && 'Driver ID cannot be empty & should be 8 digits'}
              />
              <TextField
                id="filled-basic"
                label="Vehicle ID"
                name="vehicle_number"
                variant="outlined"
                value={formData.vehicle_number}
                sx={{ mb: '1.5rem' }}
                onChange={handleChange}
                error={validateVehicleNo}
                helperText={validateVehicleNo && 'Vehicle number cannot be empty & should be 8 digits'}
              />
            </FlexBetween>
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
                disabled={validateDate || validateDriverId || validateLocation || validateVehicleNo}
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

export default UpdateAllocation;
