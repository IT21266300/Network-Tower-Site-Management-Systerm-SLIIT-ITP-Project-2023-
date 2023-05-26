import { Alert, Box, Paper, Skeleton, Stack, Typography } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { LoadingAnimation } from 'components/LoadingComponent/LoadingAnimationThree'
import { colorPalette } from 'customTheme'
import React from 'react'

const AllFinance = ({tabCol, tabLabel, result, loading, error}) => {
  return loading ?  (
    <Box width="35%">
      <LoadingAnimation/>
    </Box>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ): (
    <Box >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: '35%',
            p: '1rem 2rem',
            textAlign: 'left',
          }}
        >
          <Box>
            <Typography variant="h6">
              {`Company Total ${tabLabel}`}
            </Typography>
            <Typography variant="h4" color={colorPalette.primary[500]}>
            Rs.{result.toFixed(2)}
            </Typography>
          </Box>
        </Paper>
    </Box>
  )
}

export default AllFinance