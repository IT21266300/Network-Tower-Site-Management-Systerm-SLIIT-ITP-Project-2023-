import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios, { Axios } from 'axios';
import FlexBetween from "components/FlexBetween";
import { useState } from 'react';
import{useEffect} from 'react';

import { Grid, Typography, Checkbox } from "@mui/material";
import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from 'react-router-dom';


// import material ui icons
import { DownloadOutlined } from "@mui/icons-material";

// import color palette
import { colorPalette } from "customTheme";

// import components

import Header from "../../components/Header";
import { Link } from 'react-router-dom';

const Civil_completion_check = () => {

  const [checklist, setChecklist] = useState({});
  const [percentComplete, setPercentComplete] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const res = await axios.get("/api/Checklist/get");
        setChecklist(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChecklist();
  }, []);

  useEffect(() => {
    const countCompletedSteps = () => {
      let count = 0;

      for (const key in checklist) {
        if (checklist[key]) {
          count++;
        }
      }
      setPercentComplete((count / 32) * 100);
    };

    countCompletedSteps();
  }, [checklist]);

  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;

    try {
      const res = await axios.put("/api/Checklist/put", {
        ...checklist,
        [name]: checked,
      });
      setChecklist({ ...checklist, [name]: checked });
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
  
     <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Network Tower Site Information Management System"
          subtitle="Update Status of the Site(CIVIL)"
        />


      </FlexBetween>

      <Box
        sx={{
          width: "12rem",
          mt: "1rem",
          mb: "1.5rem",
          justifyItems: "center",
        }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Search Site"
          variant="standard"
        />
      </Box>

      <p>{`${percentComplete.toFixed(2)}% complete`}</p>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 5 }}>
          <Grid item xs={2} sm={4} md={4}>
            {/* paper01 */}
            <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 1:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Soil investigation
              </Typography>
              </Box>
              <Box>
              <Checkbox
               checked={checklist.step1}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              />
            
              </Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
  {/* paper02 */}
  <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 2:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Submission of foundation design
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step2}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper03 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 3:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Design Approval
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step3}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper04 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 4:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tower segregation
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step4}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper05 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 5:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tower transport
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step5}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper06 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 6:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tower fabrication
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step6}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper07 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 7:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Mobilization
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step7}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper08 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 8:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Site cleaning & Settingout
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step8}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
           {/* paper09 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 9:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tree cutting
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step9}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {/* paper10  */}
          <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 10:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Excavation
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step10}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper11 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 11:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Dewatering & collapse soil removing & pit sizing
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step11}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper12 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 12:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Shoring work
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step12}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper13 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 13:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Screeding
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step13}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper14 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 14:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Re bar & all foundation materials supply(include MC,Plinth)
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step14}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper15 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 15:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Bar Cutting and bending
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step15}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper16 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 16:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Base preparing
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step16}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper17 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 17:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Base concrete
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step17}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper18 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 18:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                1st lift
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step18}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper19 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 19:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Final lift
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step19}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper20 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 20:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Curing
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step20}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper21 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 21:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Back filling
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step21}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper22 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 22:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Paint remove & Primering
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step22}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper23 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 23:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tower paint- 1st Coat
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step23}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper24 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 24:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Tower erection
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step24}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper25 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 25:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Grounding
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step25}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper26 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 26:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Fence material supply
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step26}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper27 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 27:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Fence
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step27}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper28 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 28:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Quality check & UAT tools supply
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step28}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper29 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 29:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Pre PAT
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step29}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper30 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 30:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Civil UAT
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step30}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper31 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 31:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                E & E UAT
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step31}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
           {/* paper32 */}
           <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Step 32:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Paint touchup and grouting
              </Typography>
              </Box>
              <Box><Checkbox
               checked={checklist.step32}
               onChange={handleCheckboxChange}
               inputProps={{ 'aria-label': 'controlled' }}
              /></Box>
              </FlexBetween>
            </Paper>
          </Grid>

        </Grid>

        
      
      <FlexBetween>
      <Button
                variant="filled"
                type="reset"
                onClick={() => navigate('/civilDisplay')}
                sx={{
                  backgroundColor: colorPalette.indigo[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.indigo[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                type="submit"
                onClick={() => navigate('/civilDisplay')}
                sx={{
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Update
              </Button>

              
            </FlexBetween>

            </Box>

    </Box>
  )
}

export default Civil_completion_check


