import React, { useEffect } from 'react';
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
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlexBetween from 'components/FlexBetween';

const TransportUpdate = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;


  const [formData, setFormData] = useState({
    mongoId: '',
    name: '',
    license_number: '',
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
        license_number: data.license_number,
        nic: data.nic,
        address: data.address,
        phone: data.phone,
        email: data.email,
      }
    });
  }, [data]);

  const [vName, setVName] = useState(false);
  const [vLicenseNo, setVLicenseNo] = useState(false);
  const [vNic, setVNic] = useState(false)
  const [vAddress, setVAddress] = useState(false)
  const [vPhone, setVPhone] = useState(false)
  const [vEmail, setVEmail] = useState(false);

  useEffect(() => {
    if(formData.name === ''){
      setVName(true)
    }else{
      setVName(false)
    }

    if(formData.license_number === '' || formData.license_number.length !== 8){
      setVLicenseNo(true)
    }else{
      setVLicenseNo(false)
    }

    if(formData.phone === '' || formData.phone.length !== 10){
      setVPhone(true)
    }else{
      setVPhone(false)
    }

    if(formData.nic === '' || formData.nic.length !== 12){
      setVNic(true)
    }else{
      setVNic(false)
    }

    if(formData.email === ''){
      setVEmail(true)
    }else{
      setVEmail(false)
    }

    if(formData.address === ''){
      setVAddress(true)
    }else{
      setVAddress(false)
    }

  },[formData.name, formData.license_number, formData.nic, formData.address, formData.phone, formData.email])


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/transportDriver/update/${formData.mongoId}`,
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
            <CreateIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Update Driver Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name='name'
              label="Name"
              type='text'
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              error={vName}
              helperText={vName && 'Name cannot be empty'}
            />
            <TextField
              id="filled-basic"
              label="License No"
              name='license_number'
              type='text'
              value={formData.license_number}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              error={vLicenseNo}
              helperText={vLicenseNo && 'License number cannot be empty & should be 8 digits'}
            />
            <TextField
              id="filled-basic"
              label="NIC"
              variant="outlined"
              name='nic'
              type='text'
              value={formData.nic}
              onChange={handleChange}
              sx={{ mb: '1.5rem' }}
              error={vNic}
              helperText={vNic && 'NIC cannot be empty & should be 12 digits'}
            />
            <TextField
              id="filled-basic"
              label="Address"
              variant="outlined"
              name='address'
              type='text'
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: '1.5rem' }}
              error={vAddress}
              helperText={vAddress && 'Address cannot be empty'}
            />
            <TextField
              id="filled-basic"
              label="Phone"
              variant="outlined"
              name='phone'
              type='text'
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: '1.5rem' }}
              error={vPhone}
              helperText={vPhone && 'Phone number cannot be empty & should be 10 digits'}
            />
            <TextField
              id="filled-basic"
              label="Email"
              variant="outlined"
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: '1.5rem' }}
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
                Update
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default TransportUpdate;
