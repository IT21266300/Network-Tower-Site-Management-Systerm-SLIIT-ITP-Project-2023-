import React, { useEffect } from 'react';
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
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const AddAllocation = () => {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [driver_id, setDriver_id] = useState('');
  const [vehicle_number, setVehicle_number] = useState('');
  const [error, setError] = React.useState(null);

  const currentDateTime = dayjs();
  const [date, setDate] = useState(dayjs(currentDateTime));

  const [validateLocation, setValidateLocation] = useState(false);
  const [validateDate, setDateValidate] = useState(false)
  const [validateDriverId, setValidateDriverId] = useState(true)
  const [validateVehicleNo, setValidateVehicleNo] = useState(false)

  useEffect(()=>{
    if(location === ''){
      setValidateLocation(true)
    }else{
      setValidateLocation(false)
    }
    
    if(driver_id === '' || driver_id.length < 8){
      setValidateDriverId(true)
    }else{
      setValidateDriverId(false)
    }
    
    if(vehicle_number === '' || vehicle_number.length < 8){
      setValidateVehicleNo(true)
    }else{
      setValidateVehicleNo(false)
    }
  },[location, driver_id, vehicle_number])
  
  const errorMessage = React.useMemo(() => {
    if(error === 'invalidDate'){
      setDateValidate(true)
      return 'Make sure to enter valid date..!';
    }else{
      setDateValidate(false)
    }

  }, [error]);

  console.log(typeof date);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transportAllocation/add', {
        type,
        location,
        driver_id,
        vehicle_number,
        date,
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
            Add New Allocation
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setLocation(e.target.value)}
              error={validateLocation}
              helperText={validateLocation && 'Location cannot be empty'}
            />
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                name="date"
                value={date}
                variant="outlined"
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
                sx={{ mb: '1.5rem' }}
                onChange={(newValue) => setDate(newValue)}
              />
            </DemoContainer>
            <FlexBetween>
              <TextField
                id="filled-basic"
                label="Driver ID"
                name="driver_id"
                variant="outlined"
                sx={{ mb: '1.5rem', mr: '1.5rem' }}
                onChange={(e) => setDriver_id(e.target.value)}
                error={validateDriverId}
                helperText={validateDriverId && 'Driver ID cannot be empty & should be 8 digits'}
              />
              <TextField
                id="filled-basic"
                label="Vehicle ID"
                name="vehicle_number"
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                onChange={(e) => setVehicle_number(e.target.value)}
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
                Add New Allocation
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddAllocation;
