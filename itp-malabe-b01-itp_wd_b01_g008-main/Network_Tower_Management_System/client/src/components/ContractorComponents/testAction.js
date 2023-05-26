import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate} from 'react-router-dom';

// import material ui Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// import color palette
import { colorPalette } from 'customTheme';
import FlexBetween from '../FlexBetween';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Actions = ({ params, passValue, result}) => {
    
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOptClose = () => {
        setOpen(false);
    };

    //Update data
    const handleEdit = () => {
        navigate('/updateContractor', {
          state: { result: result ,data: passValue },
        });
        console.log(passValue);
    };
  
    
    //Delete data
    const handleDeleteClose = async () => {
        
        setOpen(false);
    
        try {
          axios.delete(`api/contractor/delete/${passValue.mongoID}`);
          toast.success('Data successfully deleted!', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          window.location.reload();
          //navigate('/read')
        } catch (err) {
          toast.success(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(err);
        }
    };

  return (
    <div>
      <FlexBetween>
      <Tooltip title="Edit Contractor">
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
               onClick={handleEdit}
               variant="outlined"
            //    sx={{
            //      backgroundColor: colorPalette.primary[500],
            //      '&:hover': {
            //        backgroundColor: colorPalette.secondary[800],
            //      },
            //    }}
            >Assign</Button>
        </Box>
        
      </Tooltip>
      <Box m="0 0.2rem" />
      
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
    </div>
  );
}

export default Actions;
