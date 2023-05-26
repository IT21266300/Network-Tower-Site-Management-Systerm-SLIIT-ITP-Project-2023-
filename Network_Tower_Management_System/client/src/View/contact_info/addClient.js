import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlexBetween from 'components/FlexBetween';

const AddContractor = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [vName, setVName] = useState(false);
  const [vClientId, setVClientId] = useState(false);
  const [vAddress, setVAddress] = useState(false);
  const [vPhone, setVPhone] = useState(false);
  const [vEmail, setVEmail] = useState(false);

  useEffect(() => {

    if(name === ''){
      setVName(true);
    }else{
      setVName(false);
    }
    if(clientId === '' || clientId[0] !== 'C'){
      setVClientId(true)
    }else{
      setVClientId(false)
    }
    if(address === ''){
      setVAddress(true)
    }else{
      setVAddress(false)
    }
    if(phone === '' || phone.length !== 10){
      setVPhone(true)
    }else{
      setVPhone(false)
    }
    if(email === ''){
      setVEmail(true)
    }else{
      setVEmail(false)
    }

  },[name, clientId, address, phone, email])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contactClient/add', {
        name,
        clientId,
        address,
        phone,
        email,
      });
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/contact');
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
            Add New Client
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name="name"
              type="text"
              label="Name"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setName(e.target.value)}
              error={vName}
              helperText={vName && 'Name cannot be empty'}
            />
            <TextField
              name="clientId"
              label="Client ID"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setClientId(e.target.value)}
              error={vClientId}
              helperText={vClientId && 'Client ID cannot be empty'}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              type="text"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setAddress(e.target.value)}
              error={vAddress}
              helperText={vAddress && 'Address cannot be empty'}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              type="text"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setPhone(e.target.value)}
              error={vPhone}
              helperText={vPhone && 'Phone number cannot be empty & should be 10 digits'}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setEmail(e.target.value)}
              error={vEmail}
              helperText={vEmail && 'Email cannot be empty'}
            />
            <FlexBetween>
              <Button
                variant="filled"
                type="reset"
                onClick={() => navigate('/contact')}
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
                disabled={vName || vClientId || vAddress || vPhone || vEmail}
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
                Add New Client Data
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddContractor;
