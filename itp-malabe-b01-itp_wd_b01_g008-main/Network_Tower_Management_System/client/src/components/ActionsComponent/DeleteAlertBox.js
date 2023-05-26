import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { colorPalette } from 'customTheme';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAlertBox({ openAlert, handleCloseAlert, handleDelete }) {
  return (
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
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
          Are you sure you want to delete this data? This action cannot be undone.
          Please double-check before proceeding.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAlert}
          sx={{ color: colorPalette.secondary[900] }}
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
