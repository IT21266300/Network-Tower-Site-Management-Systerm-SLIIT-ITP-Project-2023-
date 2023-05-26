
import React from 'react'
import Header from 'components/Header'
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { colorPalette } from 'customTheme';
import HttpsIcon from '@mui/icons-material/Https';
import FlexBetween from 'components/FlexBetween';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const positions = [
  'Admin',
  'Staff',
  'Rollout Manager',
  'CEO',
  'Financial Manager',
  'Finance Executive',
  'Business Developer Manager',
];

const teams = [
  'Project Team',
  'Revanue & Commercial Team',
  'Warehouse Operation Team',
  'Rollout Team',
  'Document Team',
];


const UpdateStaff = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { data } = location.state;

  const [formData, setFormData] = useState({
    mongoId: '',
    staffId: 0,
    name: '',
    email: '',
    phone: '',
    team: '',
    nic: '',
    position: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      return{
        ...newData,
        mongoId: data.mongoID,
        staffId: data.staffId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        team: data.team,
        nic: data.nic,
        position: data.position,
        username: data.username,
      }
    });
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/staff/update/${formData.staffId}`,
        formData
      );
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/staff');
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
      minHeight="20vh"
      p="3rem 0"
      
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ width:450}}>
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
            <PersonAddIcon />
          </IconButton>
    <Typography variant="h5" textAlign="center">
     Update Profile
     </Typography> 
   </Box>
   <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name='name'
              label="Name"
              variant="outlined"
              value={formData.name ? formData.name : ''}
              type="text"
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
              required
            />
            <TextField
              name='staffId'
              label="Staff Id"
              variant="outlined"
              type="number"
              value={formData.staffId ? formData.staffId : ''}
              sx={{ mb: '1.5rem' }}
              required
              onChange={handleChange}
              disabled
            />
            <TextField
              name='username'
              label="Username"
              variant="outlined"
              type="text"
              value={formData.username ? formData.username : ''}
              sx={{ mb: '1.5rem' }}
              required
              onChange={handleChange}
            />
            <TextField
              name='password'
              label="Password"
              variant="outlined"
              type="password"
              value={formData.password ? formData.password : ''}
              sx={{ mb: '1.5rem' }}
              required
              onChange={handleChange}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              type="text"
              value={formData.phone ? formData.phone : ''}
              required
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name='email'
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email ? formData.email : ''}
              required
              sx={{ mb: '1.5rem' }}
              onChange={handleChange}
            />
            <TextField
              name='nic'
              label="NIC Number"
              variant="outlined"
              type="text"
              sx={{ mb: '1.5rem' }}
              required
              value={formData.nic ? formData.nic : ''}
              onChange={handleChange}
            />
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <FormControl sx={{width: '45%'}}>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  name="position"
                  value={formData.position}
                  label="Position"
                  onChange={handleChange}
                >
                  {positions.map((position) => (
                    <MenuItem
                    key={position}
                    value={position}
                  >
                    {position}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{width: '45%'}}>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                  name="team"
                  value={formData.team}
                  label="Team"
                  onChange={handleChange}
                >
                  {teams.map((team) => (
                    <MenuItem
                    key={team}
                    value={team}
                  >
                    {team}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </FlexBetween>
            <FlexBetween>
              <Button
                variant="filled"
                onClick={() => navigate('/staff')}
                sx={{
                  width: '45%',
                  backgroundColor: colorPalette.indigo[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  '&:hover': {
                    backgroundColor: colorPalette.indigo[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Cancel
              </Button>
              <br />
              <Button
                variant="filled"
                type='submit'
                sx={{
                  width: '45%',
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Update Member
              </Button>
            </FlexBetween>
          </Box>
        </form>
   </Box>
   </Box>
  
  );
}

export default UpdateStaff