import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { colorPalette } from 'customTheme';
import { useContext } from 'react';
import { Store } from 'store';

export default function ActionsMenu({
  anchorEl,
  open,
  handleClose,
  handleUpdate,
  handleClickOpenAlert,
  funcs,
  handleStatus,
}) {
  const { state } = useContext(Store);
  const { userInfo } = state;

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
      {funcs !== 'safety' ? (
        <>
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
        </>
      ) : (
        <>
          {funcs === 'safety' && userInfo.position !== 'Admin' ? (
            <MenuItem
              onClick={handleStatus}
              sx={{ color: colorPalette.indigo[600] }}
            >
              {' '}
              <ReadMoreIcon sx={{ color: colorPalette.indigo[600] }} /> View
              More
            </MenuItem>
          ) : (
            <>
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
              {/* <MenuItem
                onClick={handleStatus}
                sx={{ color: colorPalette.indigo[600] }}
              >
                {' '}
                <ReadMoreIcon sx={{ color: colorPalette.indigo[600] }} /> View
                More
              </MenuItem> */}
            </>
          )}
        </>
      )}
    </Menu>
  );
}
