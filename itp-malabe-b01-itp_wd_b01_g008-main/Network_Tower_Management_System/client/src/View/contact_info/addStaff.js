import React, { useState } from 'react';
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

const Contact_info = () => {
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState();
  const [siteId, setSiteId] = useState('');
  const [name, setName] = useState('');
  const [nic, setNic] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contactStaff/add', {
        staffId,
        siteId,
        name,
        nic,
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
      toast.error(err.message, {
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
            Add New Employee
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween>
              <TextField
                name="staffId"
                label="Staff ID"
                type="number"
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                onChange={(e) => setStaffId(e.target.value)}
              />
              <TextField
                name="siteId"
                label="Site ID"
                type="text"
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                onChange={(e) => setSiteId(e.target.value)}
              />
            </FlexBetween>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              name="nic"
              label="NIC"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setNic(e.target.value)}
            />
            <TextField
              name="address"
              label="Address"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              name="phone"
              label="Phone"
              type="text"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                Cancel
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
                Add New Staff Data
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Contact_info;
