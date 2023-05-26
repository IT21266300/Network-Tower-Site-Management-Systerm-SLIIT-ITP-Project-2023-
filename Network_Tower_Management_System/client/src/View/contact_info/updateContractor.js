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
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const UpdateContactor = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;


  const [formData, setFormData] = useState({
    mongoId: '',
    name: '',
    nic: '',
    address: '',
    phone: 0,
    email: '',
  });

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return{
        ...newData,
        mongoId: data.mongoID,
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone: data.phone,
        email: data.email,
      }
    });
  }, [data]);

  const [vName, setVName] = useState(false);
  const [vNic, setVNic] = useState(false);
  const [vAddress, setVAddress] = useState(false);
  const [vPhone, setVPhone] = useState(false);
  const [vEmail, setVEmail] = useState(false);

useEffect(() => {

  if(formData.name === ''){
    setVName(true);
  }else{
    setVName(false);
  }

  if(formData.nic === '' || formData.nic.length !== 12){
    setVNic(true)
  }else{
    setVNic(false)
  }

  if(formData.address === ''){
    setVAddress(true)
  }else{
    setVAddress(false)
  }

  if(formData.phone === '' || formData.phone.length !== 10){
    setVPhone(true)
  }else{
    setVPhone(false)
  }

  if(formData.email === ''){
    setVEmail(true)
  }else{
    setVEmail(false)
  }

}, [formData.name, formData.nic, formData.address, formData.phone, formData.email])


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/contactContract/update/${formData.mongoId}`,
        formData
      );
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/contact');
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
            Update Contractor Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name="name"
              type="text"
              label="Name"
              value={formData.name}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vName}
              helperText={vName && 'Name cannot be empty'}
            />
            <TextField
              name="nic"
              label="NIC"
              type="text"
              value={formData.nic}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vNic}
              helperText={vNic && 'NIC cannot be empty & should be 12 digits'}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              value={formData.address}
              type="text"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vAddress}
              helperText={vAddress && 'Address cannot be empty'}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              value={formData.phone}
              type="text"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vPhone}
              helperText={vPhone && 'Phone number cannot be empty & should be 10 digits'}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              error={vEmail}
              helperText={vEmail && 'NIC cannot be empty'}
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
                disabled={vName || vAddress || vPhone || vEmail || vNic}
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

export default UpdateContactor;