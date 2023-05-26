import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { colorPalette } from 'customTheme';
import React, { useState } from 'react';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FlexBetween from 'components/FlexBetween';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddDriver = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [license_number, setLicense_number] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [vName, setVName] = useState(false);
  const [vLicenseNo, setVLicenseNo] = useState(false);
  const [vNic, setVNic] = useState(false)
  const [vAddress, setVAddress] = useState(false)
  const [vPhone, setVPhone] = useState(false)
  const [vEmail, setVEmail] = useState(false);

  useEffect(() => {
    if(name === ''){
      setVName(true)
    }else{
      setVName(false)
    }

    if(license_number === '' || license_number.length !== 8){
      setVLicenseNo(true)
    }else{
      setVLicenseNo(false)
    }

    if(phone === '' || phone.length !== 10){
      setVPhone(true)
    }else{
      setVPhone(false)
    }

    if(nic === '' || nic.length !== 12){
      setVNic(true)
    }else{
      setVNic(false)
    }

    if(email === ''){
      setVEmail(true)
    }else{
      setVEmail(false)
    }

    if(address === ''){
      setVAddress(true)
    }else{
      setVAddress(false)
    }

  },[name, license_number, nic, address, phone, email])


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transportDriver/add', {
        name,
        license_number,
        nic,
        address,
        phone,
        email,
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
            Add New Driver
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setName(e.target.value)}
              error={vName}
              helperText={vName && 'Name cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name="licenseNumber"
              label="License Number"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setLicense_number(e.target.value)}
              error={vLicenseNo}
              helperText={vLicenseNo && 'License number cannot be empty & should be 8 digits'}
            />
            <TextField
              id="filled-basic"
              name="nic"
              label="NIC"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setNic(e.target.value)}
              error={vNic}
              helperText={vNic && 'NIC cannot be empty & should be 12 digits'}
            />
            <TextField
              id="filled-basic"
              name="address"
              label="Address"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setAddress(e.target.value)}
              error={vAddress}
              helperText={vAddress && 'Address cannot be empty'}
            />
            <TextField
              id="filled-basic"
              name="phone"
              label="Phone"
              type="number"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setPhone(e.target.value)}
              error={vPhone}
              helperText={vPhone && 'Phone number cannot be empty & should be 10 digits'}
            />
            <TextField
              id="filled-basic"
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setEmail(e.target.value)}
              error={vEmail}
              helperText={vEmail && 'NIC cannot be empty'}
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
                disabled={vName || vAddress || vPhone || vEmail || vLicenseNo || vNic}
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
                Add New Driver
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddDriver;
