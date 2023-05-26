import React from 'react';
import { Typography, Box ,TextField, Button } from '@mui/material';
import { colorPalette } from 'customTheme';
const Member = () => {
    return(
    <Box>
     <Typography variant="h5" textAlign="center">
      Staff Details
      </Typography> 
    
     <form>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       <TextField
              id="filled-basic"
              label="Name *"
              variant="outlined"
              type="name"
              sx={{ mb: '1.5rem' }}
            />
        <TextField
              id="filled-basic"
              label="Phone *"
              variant="outlined"
              type="phone"
              sx={{ mb: '1.5rem' }}
            />
          <TextField
              id="filled-basic"
              label="Email  *"
              variant="outlined"
              type="email"
              sx={{ mb: '1.5rem' }}
            />
           <TextField
              id="filled-basic"
              label="Position *"
              variant="outlined"
              type="Position"
              sx={{ mb: '1.5rem' }}
            />
          <Button
              variant="filled"
              sx={{
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[200],
                padding: '0.5rem 0',
                '&:hover': {
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                },
              }}
            >
              Update
            </Button>
       </Box>

     </form>
     </Box>
    )
}
    
  


export default Member