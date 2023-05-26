import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const Empty = () => {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      Looking for data? Begin by searching for a site.
    </Alert>
  );
};

export default Empty;
