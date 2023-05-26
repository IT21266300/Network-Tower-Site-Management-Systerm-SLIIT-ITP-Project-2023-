import { Box, Typography } from '@mui/material';
import { colorPalette } from 'customTheme';
import React from 'react';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const DataNotFound = ({ site, siteName }) => {
  return (
    <Box
      width="100%"
      height="300px"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{ color: colorPalette.primary[500], textAlign: 'Center' }}
        >
          OOPS..! <SentimentVeryDissatisfiedIcon sx={{fontSize: "5rem"}}/>
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: colorPalette.secondary[700], textAlign: 'Center' }}
        >{`No data found for ${siteName} (${site}) Site, Please try another site.`}</Typography>
      </Box>
    </Box>
  );
};

export default DataNotFound;
