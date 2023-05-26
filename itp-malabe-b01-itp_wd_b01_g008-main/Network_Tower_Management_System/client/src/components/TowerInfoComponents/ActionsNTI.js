// import react components
import React, { useEffect, useReducer } from 'react';

// import material ui components
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import material ui Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

// import color palette
import { colorPalette } from 'customTheme';
import FlexBetween from '../FlexBetween';

// import react router navigate
// import { Navigate } from 'react-router-dom';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Actions = ({ params, tabSelector, passValue, result}) => {
  const navigate = useNavigate();

  // const data = passValue;

  // delete alert
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOptClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    navigate('/editSite', {
      state: { tabData: [tabSelector], result: result ,data: passValue },
      
    });
    console.log(passValue);
  };
  const handleView = () => {
    
    navigate('/tiDisplay', {
      state: { tabData: [tabSelector], result: result ,data: passValue },
      
    });
    console.log(passValue);

  };

  const handleDeleteClose = async () => {
    setOpen(false);

    try {
      axios.delete(`/api/${tabSelector[0]}/delete/${passValue.siteId}`);
      toast.success('Data successfully deleted!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
    } catch (err) {
      toast.success(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  return (
    <FlexBetween>
      <Tooltip title="Edit Tower Information">
        <IconButton
          onClick={handleEdit}
          sx={{
            backgroundColor: colorPalette.primary[500],
            '&:hover': {
              backgroundColor: colorPalette.secondary[800],
            },
          }}
        >
          <EditIcon sx={{ color: colorPalette.secondary[200] }} />
        </IconButton>
      </Tooltip>
      <Box m="0 0.2rem" />

      <Tooltip title="View Tower Information">
        <IconButton
          onClick={handleView}
          sx={{
            backgroundColor: colorPalette.primary[500],
            '&:hover': {
              backgroundColor: colorPalette.secondary[800],
            },
          }}
        >
          <VisibilityRoundedIcon sx={{ color: colorPalette.secondary[200] }} />
        </IconButton>
      </Tooltip>
<Box m="0 0.2rem" />
      <Tooltip title="Delete Tower Information">
        <IconButton
          onClick={handleClickOpen}
          sx={{
            backgroundColor: colorPalette.indigo[600],
            '&:hover': {
              backgroundColor: colorPalette.secondary[800],
            },
          }}
        >
          <DeleteIcon sx={{ color: colorPalette.secondary[200] }} />
        </IconButton>
      </Tooltip>
      
      {/* alert Box */}
      <Dialog
        open={open}
        onClose={handleOptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="alert-dialog-title">
          {'Permanently Delete Data..?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this data? This action cannot be
            undone. Please double-check before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOptClose}
            sx={{ color: colorPalette.secondary[900] }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
    </FlexBetween>
  );
};

export default Actions;
