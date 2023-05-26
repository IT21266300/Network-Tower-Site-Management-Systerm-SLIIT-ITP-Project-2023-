import React from 'react';

import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Link,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  DialogTitle,
  TextareaAutosize,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HttpsIcon from '@mui/icons-material/Https';
import { colorPalette } from 'customTheme';
import FlexBetween from 'components/FlexBetween';
import { Helmet } from 'react-helmet-async';

import { Store } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from 'utils';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const redirectInUrl = new URLSearchParams(search).get('redirect');
  // const redirect = redirectInUrl ? redirectInUrl : '/';

  const redirect = location.state?.path || '/';

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // ctxDispatch({ type: 'SET_LOADING' });

      const { data } = await axios.post('/api/signroute/signin', {
        username,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Sign in successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate(redirect || '/');
      ctxDispatch({ type: 'SET_LOADING', payload: false });
    } catch (err) {
      ctxDispatch({ type: 'SET_LOADING', payload: false });
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Box
      width="100%"
      minHeight="75vh"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Box sx={{ width: 450 }}>
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
            <HttpsIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Sign In
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              sx={{ mb: '1.5rem' }}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              sx={{ mb: '1.5rem' }}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="filled"
              type="submit"
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[200],
                padding: '0.5rem 0',
                '&:hover': {
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </form>

        {/* show alert box when clicked forget button */}
        <Box mt="1rem">
          <Link
            to="#"
            sx={{ textAlign: 'center', fontSize: '0.9rem' }}
            onClick={handleClickOpen}
          >
            Forget Password?
          </Link>
        </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Forget Password...?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you have forgotten your password, please send your email
              address, employee ID, and Phone Number. Our project manager will
              then send you a new password promptly.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Email Address *"
              type="email"
              fullWidth
              variant="outlined"
            />
            <FlexBetween>
              <TextField
                margin="dense"
                id="id"
                label="Employee ID *"
                type="email"
                sx={{ width: '47%' }}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="phoneNumber"
                label="Phone Number *"
                type="number"
                sx={{ width: '47%' }}
                variant="outlined"
              />
            </FlexBetween>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} endIcon={<SendIcon />}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SignIn;
