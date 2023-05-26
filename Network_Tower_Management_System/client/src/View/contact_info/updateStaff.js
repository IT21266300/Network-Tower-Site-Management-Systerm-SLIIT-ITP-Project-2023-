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
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlexBetween from 'components/FlexBetween';

const ContactUpdate = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;

  const [formData, setFormData] = useState({
    mongoId: '',
    staffId: '',
    siteId: '',
    name: '',
    nic: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return {
        ...newData,
        mongoId: data.mongoID,
        name: data.name,
        staffId: data.staffId,
        siteId: data.siteId,
        nic: data.nic,
        address: data.address,
        phone: data.phone,
        email: data.email,
      };
    });
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/contactStaff/update/${formData.mongoId}`, formData);
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
            <CreateIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Update Employee Details
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween>
              <TextField
                name="staffId"
                label="Staff ID"
                type="number"
                variant="outlined"
                value={formData.staffId}
                sx={{ mb: '1.5rem' }}
                onChange={handleChange}
              />
              <TextField
                name="siteId"
                label="Site ID"
                type="text"
                variant="outlined"
                value={formData.siteId}
                sx={{ mb: '1.5rem' }}
                onChange={handleChange}
              />
            </FlexBetween>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              value={formData.name}
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name="nic"
              label="NIC"
              type="text"
              variant="outlined"
              value={formData.nic}
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name="address"
              label="Address"
              type="text"
              variant="outlined"
              value={formData.address}
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name="phone"
              label="Phone"
              type="text"
              variant="outlined"
              value={formData.phone}
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
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

export default ContactUpdate;
