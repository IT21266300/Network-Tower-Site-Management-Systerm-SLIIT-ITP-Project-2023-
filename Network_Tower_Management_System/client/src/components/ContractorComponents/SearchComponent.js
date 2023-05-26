import React, { useContext, useEffect, useState } from "react";
import { Store } from "store";

// import material components
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

// import material icons
import { DownloadDoneOutlined } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/PersonAddAlt1';
import ViewIcon from '@mui/icons-material/Preview';

// import color palette
import { colorPalette } from 'customTheme';

// import components
import FlexBetween from '../FlexBetween';

import { useLocation, useNavigate } from 'react-router-dom';

const options = [
  'Mathalapitiya-1',
  'Welimada',
  'Kandy',
  'Galle',
  'Colombo',
  'Negombo',
];

const SearchComponent = ({ site, siteList }) => {

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();
  site(value);

  const isAdmin = userInfo.position === 'Admin';

  return (
    <Box sx={{
      padding: '20px 0px 1px',
      mr: '1rem',
    }}>
      <FlexBetween>
        <Box>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Site"
              />
            )}
          />
        </Box>
        <Box>

          {/* Read TEST */}
        <Button
              onClick={() => {
                navigate('/read');
              }}
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 10px',
                mr: '2rem',
                '&:hover': {
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[100],
                },
              }}
            >
              <ViewIcon sx={{ mr: '10px' }} />
              <Typography fontSize="0.9rem">View Data</Typography>
            </Button>     

            {/* <Button
              onClick={() => {
                navigate('/addContractor');
              }}
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: colorPalette.primary[400],
                  color: colorPalette.secondary[100],
                },
              }}
            >
              <AddIcon sx={{ mr: '10px' }} />
              <Typography fontSize="0.9rem">Add Contractor</Typography>
            </Button> */}

            {isAdmin && (
              <Button
              onClick={() => {
                navigate('/addContractor');
              }}
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: colorPalette.primary[400],
                  color: colorPalette.secondary[100],
                },
              }}
            >
              <AddIcon sx={{ mr: '10px' }} />
              <Typography fontSize="0.9rem">Add Contractor</Typography>
            </Button>
            )}

          </Box>
      </FlexBetween>
    </Box>
  );
};

export default SearchComponent;