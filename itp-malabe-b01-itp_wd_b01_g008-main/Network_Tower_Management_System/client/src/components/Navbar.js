import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledMenu from './StyledMenu';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { Store } from './../store';
import { useContext } from 'react';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    setAnchorEl(null);
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    navigate('/signin');
  };

  const loginProfile = () => {
    setAnchorEl(null);
    navigate('/profile')
  }

  return (
    <AppBar
      sx={{
        position: 'static',
        background: colorPalette.primary[500],
        width: '100%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          {userInfo && (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon sx={{ color: 'white', fontSize: 35 }} />
            </IconButton>
          )}
          <Box>
            <Button variant="text" sx={{ color: 'white' , fontSize: '1.5rem'}} onClick={() => navigate('/dashboard')}>
              Engenuity
            </Button>
          </Box>
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          {userInfo && (
            <Box>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  backgroundColor: colorPalette.secondary[100],
                  color: colorPalette.primary[500],
                  '&:hover': {
                    backgroundColor: colorPalette.secondary[200],
                    color: colorPalette.primary[500],
                  },
                }}
              >
                {userInfo.name} 
                <Divider orientation="vertical" flexItem sx={{m: '0 0.6rem'}}/>
                {userInfo.staffId}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={loginProfile} disableRipple>
                  <PersonIcon />
                  User Profile
                  <ArrowRightIcon />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={signoutHandler} disableRipple>
                  <LogoutIcon />
                  Logout
                  <ArrowRightIcon />
                </MenuItem>
              </StyledMenu>
            </Box>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;