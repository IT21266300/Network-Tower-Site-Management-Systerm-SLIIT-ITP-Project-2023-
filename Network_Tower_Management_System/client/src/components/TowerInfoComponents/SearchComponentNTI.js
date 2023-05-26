import React, { useEffect } from 'react';

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
import CellTowerIcon from '@mui/icons-material/CellTower';

// import color palette
import { colorPalette } from 'customTheme';

// import components
import FlexBetween from '../FlexBetween';

import { useLocation, useNavigate } from 'react-router-dom';

const options = [
  'Jaffna',
  'Welimada',
  'Kandy',
  'Galle',
  'Colombo',
  'Negombo',
];

const SearchComponent = ({ tabLabel, tabCol, site, siteList }) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();
  site(value);


  const tabData = [tabCol, tabLabel];

  return (
    <Box>
      <FlexBetween>
        {/* <Box>
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
        </Box> */}
        {tabCol !== 'profit' && (
          <Box>
            
            <Button
              onClick={() => {
                navigate('/addSite', { state: { tabs: [tabData] } });
              }}
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[100],
                },
              }}
            >
            
              <CellTowerIcon sx={{ mr: '10px' }} />
              <Typography fontSize="0.9rem">{`Add New ${tabLabel}`}</Typography>
            </Button>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default SearchComponent;
