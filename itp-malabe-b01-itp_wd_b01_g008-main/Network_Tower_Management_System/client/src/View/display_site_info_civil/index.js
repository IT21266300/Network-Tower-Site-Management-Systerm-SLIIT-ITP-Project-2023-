import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import { useLocation, useNavigate } from 'react-router-dom';


import { Grid, Typography } from "@mui/material";
import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

// import material ui icons
import { DownloadOutlined } from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// import color palette
import { colorPalette } from "customTheme";

// import components

import Header from "../../components/Header";
import PeremptionDownload from "../../components/TowerInfoComponents/PermissionDownload";
import PermissionUpload from "../../components/TowerInfoComponents/FileUpload";
import PermissionEdit from "../../components/TowerInfoComponents/FileEdit";

import axios from "axios";
import PieChart from "components/TowerInfoComponents/pieCharts";





const CivilSites = ({ params, tabSelector, passValue}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const { tabData, result, data } = location.state;

  console.log('data', data);
  const [showPermissionUpload, setShowPermissionUpload] = useState(false);

  const handleCheckClick = () => {
    navigate('/checkCivil', {
      state: { tabData: [tabSelector], result: result ,data: passValue },
      
    });
    console.log(passValue);

  };

  const handleButtonClick = () => {
    setShowPermissionUpload(true);
  };

  const totalExpense = 77;
  const totalActualPoAmount = 66;
  const siteProfit = totalActualPoAmount - totalExpense;
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
    document.title = 'Civil Site Information';
    setSitesData((prevState) => ({
      ...prevState,
    siteId: data.siteId,
    siteName: data.siteName,
    towerOwner: data.towerOwner,
    height: data.height,
    status: data.status,
    region: data.region,
    contractor: data.contractor,
   
   }));
  },[data]);

 
  
  const chartData = {
    NotCompleted: totalExpense,
    Completed: totalActualPoAmount,
  };
 
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header
        title="Network Tower Site Information Management System"
        subtitle="Manage Site General Details(Civil)"
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
        <Grid item xs={1}>
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
      <Typography variant="h5">Contractor:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >{sitesData.contractor}
       
      </Typography>
    </Paper>
   
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
        {/* paper06 */}
        
    <Paper
      elevation={3}
      sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
    >
      <Typography variant="h5">Region:</Typography>
      <Typography
        variant="h4"
        fontSize="1.8rem"
        color={colorPalette.primary[600]}
      >
      {sitesData.region}
         
      </Typography>
    </Paper>
  
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
   
      
        {/* paper07 */}
        
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
    <Button
        
          sx={{
            backgroundColor: colorPalette.primary[500],
            color: colorPalette.secondary[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleCheckClick}
        >
          <CheckCircleIcon sx={{ mr: "10px" }} />
          <Typography fontSize="1rem">Checkout Completion Steps</Typography>
          
        </Button>

    <PieChart chartData={chartData} profit={siteProfit} />
   

  </Box>
      
    );
  };


export default CivilSites;












