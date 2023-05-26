import { Box, Button, TextField, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { colorPalette } from 'customTheme';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SafetyCalculate = ({ passValue}) => {
  const [members, setMembers] = useState();
  const [safetygloves, setSafetygloves] = useState();
  const [safetyharness, setSafetyharness] = useState();
  const [safetyhelmets, setsafetyhelmets] = useState();
  const [safetyjacket, setSafetyjacket] = useState();
  const [safetyshoes, setSafetyshoes] = useState();
  const [cautionbord, setCautionbord] = useState();

  useEffect(() => {
    setSafetygloves(members ? members * 2 : 0);
    setSafetyharness(members ? members : 0);
    setSafetyjacket(members ? members: 0);
    setSafetyshoes(members ? members * 2: 0);
    setsafetyhelmets(members ? members:0);
    setCautionbord(members ? members : 0);
  }, [members]);

  return (
    <Box sx={{width: '40%'}}>
      <TextField
        name="members"
        label="Enter No Of Members"
        value={members}
        variant="outlined"
        sx={{ mb: '1rem' }}
        onChange={(e) => setMembers(e.target.value)}
      />
      <Typography mb="1.5rem">Safety Items Count</Typography>
      <Box
      //Add a border around
        sx={{
          border: '0.1px solid gray',
          padding: '1rem',
          backgroundColor: 'inherit',
          borderRadius: '10px',
          transition: 'transform 0.3s',
          '&:hover': {
            // backgroundColor: 'yellow',// Change to the desired hover color
            // transform: 'scale(1.05)', 
            // transition: 'transform 0.3s',
            borderColor: 'black'
          },
        }}> 
        <FlexBetween>
          <TextField
            id="outlined-basic"
            label="Safety Gloves"
            value={safetygloves}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
          <TextField
            id="outlined-basic"
            label="Safety Harness"
            value={safetyharness}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
        </FlexBetween>
        <FlexBetween>
          <TextField
            id="outlined-basic"
            label="Safety Helmets"
            value={safetyhelmets}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
          <TextField
            id="outlined-basic"
            label="Safety Jacket"
            value={safetyjacket}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
        </FlexBetween>
        <FlexBetween>
          <TextField
            id="outlined-basic"
            label="Safety Shoes"
            value={safetyshoes}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
          <TextField
            id="outlined-basic"
            label="Caution Board"
            value={cautionbord}
            variant="outlined"
            sx={{ mb: '1rem' }}
          />
        </FlexBetween>
      </Box>

    </Box>
  );
};

export default SafetyCalculate;
