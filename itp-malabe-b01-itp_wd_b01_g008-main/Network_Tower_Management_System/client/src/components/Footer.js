import { Box } from '@mui/material';
import { colorPalette } from 'customTheme';
import React from 'react';

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: colorPalette.primary[500] }}
      color="white"
      fontSize="1rem"
      textAlign="center"
      p="1rem 0"
      m="1.4rem 0"
    >
      
    </Box>
  );
};

export default Footer;
