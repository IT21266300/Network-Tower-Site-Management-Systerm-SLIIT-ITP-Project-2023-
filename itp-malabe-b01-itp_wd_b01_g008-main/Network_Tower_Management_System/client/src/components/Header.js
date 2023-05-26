import { Typography, useTheme, Box } from '@mui/material';
import React from 'react';
import { colorPalette } from 'customTheme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return(
    <Box>
      <Typography
        variant="h5"
        color={colorPalette.primary[500]}
        fontWeight="bold"
        sx={{ mb: '5px' }}
      >{title}</Typography>
      <Typography
        variant="h6"
        fontSize="1rem"
        color={theme.palette.secondary[300]}
      >{subtitle}</Typography>
    </Box>
  );
};

export default Header;