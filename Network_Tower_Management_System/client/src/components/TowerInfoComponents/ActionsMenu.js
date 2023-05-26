import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { colorPalette } from 'customTheme';

export default function ActionsMenu({
  anchorEl,
  open,
  handleClose,
  handleUpdate,
  handleClickOpenAlert,
  handleView,
}) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        elevation: 2,
      }}
    >
    <MenuItem
        onClick={handleView}
        sx={{ color: colorPalette.primary[500] }}
      >
        {' '}
        <VisibilityRoundedIcon sx={{ color: colorPalette.primary[500] }} />
         View
      </MenuItem>
      <MenuItem
        onClick={handleUpdate}
        sx={{ color: colorPalette.primary[500] }}
      >
        {' '}
        <EditIcon sx={{ color: colorPalette.primary[500] }} /> Update
      </MenuItem>
      <MenuItem
        onClick={handleClickOpenAlert}
        sx={{ color: colorPalette.indigo[600] }}
      >
        {' '}
        <DeleteIcon sx={{ color: colorPalette.indigo[600] }} /> Delete
      </MenuItem>
    </Menu>
  );
}
