import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';
import { colorPalette } from 'customTheme';
import FlexBetween from 'components/FlexBetween';

export const LoadingAnimation = () => {
  return (
    <Stack spacing={4}>
        <FlexBetween>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ backgroundColor: colorPalette.secondary[200] }}
            width="100%"
            height="5rem"
          />
        </FlexBetween>
      </Stack>
  );
};
