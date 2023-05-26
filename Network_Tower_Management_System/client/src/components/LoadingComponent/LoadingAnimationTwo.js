import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';
import { colorPalette } from 'customTheme';

export const LoadingAnimation = () => {
  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ backgroundColor: colorPalette.secondary[200] }}
          width="25%"
          height="3rem"
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ backgroundColor: colorPalette.secondary[200], ml: '1rem' }}
          width="25%"
          height="3rem"
        />
      </Box>
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ backgroundColor: colorPalette.secondary[200] }}
        width="100%"
        height="40vh"
      />
    </Stack>
  );
};
