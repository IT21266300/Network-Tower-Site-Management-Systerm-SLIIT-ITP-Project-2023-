/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Typography } from "@mui/material";
import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

// import material ui icons
import { DownloadOutlined } from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

// import color palette
import { colorPalette } from "customTheme";

// import components

import Header from "../../components/Header";
import PermissionEdit from "../../components/TowerInfoComponents/FileEdit";
import PeremptionDownload from "../../components/TowerInfoComponents/PermissionDownload";
import PermissionUpload from "../../components/TowerInfoComponents/FileUpload";

import axios from "axios";


const TiSites = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { tabData, result, data } = location.state;

  console.log('data', data);
  const [showPermissionUpload, setShowPermissionUpload] = useState(false);
  const handleButtonClick = () => {
    setShowPermissionUpload(true);
  };



  const [sitesData, setSitesData] = useState({
    siteId: '',
    siteName: '',
    date: '',
    towerOwner: '',
    height: 0,
    contractor: '',
    region: '',
    status: 'Not Completed',
    manual: '',
    commissioningPlan: '',
    ranClusOwner: '',
    province: '',
});

  useEffect(() => {
    document.title = 'Ti Site Information';
    setSitesData((prevState) => ({
      ...prevState,
    siteId: data.siteId,
    siteName: data.siteName,
    towerOwner: data.towerOwner,
    height: data.height,
    status: data.status,
    manual: data.manual,
    commissioningPlan: data.commissioningPlan,
    ranClusOwner: data.ranClusOwner,
    province: data.province,

   }));
  },[data]);
  const handleStatusChange = () => {
    setSitesData(prevFormData => ({
      ...prevFormData,
      status: prevFormData.status === 'not completed' ? false : true
    }));
  }
  
  // useEffect(() => {
  //   axios.get('/api/tiInfo?id=${siteId}').then((response) => {
  //     setSitesData(response.data);
  //   });
  // }, [siteId]);

  // useEffect(() => {
  //   axios.get('/api/tiInfo').then((response) => {
  //     setSitesData(response.data);
  //   });
  // }, []);

  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header
        title="Network Tower Site Information Management System"
        subtitle="Manage Site General Details(TI)"
      />
    
    <Box>
      
      <Button
      
        sx={{
          backgroundColor: colorPalette.primary[500],
          color: colorPalette.secondary[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={handleButtonClick}
      >
        <FileUploadIcon sx={{ mr: "10px" }} />
        <Typography fontSize="1rem">Upload Site Permission Letter</Typography>
        
      </Button>
      {showPermissionUpload && <PermissionUpload />}
    </Box>
    <PeremptionDownload>
        
      </PeremptionDownload>

    </FlexBetween>
    

    <Box
      sx={{
        width: "12rem",
        mt: "1rem",
        mb: "1.5rem",
        justifyItems: "center",
      }}
    >
      
    </Box>

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5}}>
      
        <Grid item xs={1} >
          {/* paper01 */}
          
          <Paper 
            elevation={3}
            sx={{
              backgroundColor: colorPalette.secondary[200],
              p: "1rem 2rem",
            }}
          >
            <Typography variant="h5">Site Name:</Typography>
            <Typography
              variant="h4"
              fontSize="1.8rem"
              color={colorPalette.primary[600]}
            >
            {sitesData.siteName}
              
            </Typography>
          </Paper>
          
        </Grid>
        
        <Grid item xs={2} >
{/* paper02 */}

    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Site ID:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.siteId}
        
      </Typography>
    </Paper>
    
        </Grid>

<Grid item xs={2}>
{/* paper03 */}

<Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Tower Owner:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.towerOwner}
        
      </Typography>
    </Paper>
    
        
        </Grid>
        <Grid item xs={2}>
        {/* paper04 */}
       
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Height:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.height}
        
      </Typography>
    </Paper>
  
        
        </Grid>
        <Grid item xs={2}>
        {/* paper05 */}
        
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Manual:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
        {sitesData.manual}
      </Typography>
    </Paper>
    
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        {/* paper06 */}
       
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Commissioning Initial Plan:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.commissioningPlan}
        
      </Typography>
    </Paper>
    
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        {/* paper07 */}
        
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">RAN Cluster owner:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.ranClusOwner}
       
      </Typography>
    </Paper>
    
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        {/* paper08 */}
        
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Province:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
        {sitesData.province}
      </Typography>
    </Paper>
    
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        {/* paper09 */}
        
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Status:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.status}
        
      </Typography>
    </Paper>
    

        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        
        </Grid>
        

      </Grid>
    </Box>
   
  </Box>
      
    );
  };


export default TiSites;