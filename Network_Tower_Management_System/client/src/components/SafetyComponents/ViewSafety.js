import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Actions from 'components/SafetyComponents/Actions';
import FlexBetween from 'components/FlexBetween';
import SafetyCalculate from 'components/SafetyComponents/SafetyCalculate';
import { colorPalette } from 'customTheme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from 'components/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from 'store';
import { useContext } from 'react';
import ActionButton from 'components/ActionsComponent/ActionButton';
import { LoadingAnimation } from 'components/LoadingComponent/LoadingAnimationOne';
import DownloadActions from 'components/DownloadComponent/DownloadActions';
import ActionsMenu from 'components/ActionsComponent/ActionsMenu';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';
import SafePieChart from 'components/SafetyComponents/SafePieChart';

//Use to page transition when status page opening
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewSafety = ({ result, loading, error }) => {

  const { state } = useContext(Store);
  const { userInfo} = state;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };


  const downloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const downloadClose = () => {
    setAnchorEl(null);
  };

  const [statusOpen, setStatusOpen] = React.useState(false);

  const [buttonClickedValue, setButtonClickedValue] = useState({});
  const handleClick = (event, params) => {
    setButtonClickedValue(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickClose = () => {
    setAnchorEl(null);
  };

  const handleStatus = () => {
    setStatusOpen(true);
  }

  const handleStatusClose = () => {
    setStatusOpen(false);
  }

  const handleUpdate = () => {
    navigate('/updateSafety', {
      state: { result: result ,data: passValue },
    });
  };

  
  
  const [passValue, setPassValue] = useState({});

  //Calculate data for the pie chart
  let pieChartData = [];
  if (passValue) {
    pieChartData = [
    { id: 'Helmets', value: passValue.safetyhelmets },
    { id: 'Jackets', value: passValue.safetyjacket },
    { id: 'Shoes', value: passValue.safetyshoes },
    { id: 'Gloves', value: passValue.safetygloves },
    { id: 'Harness', value: passValue.safetyharness },
    { id: 'Cautions', value: passValue.cautionbord },
  ];
}

  //delete route calling
  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      axios.delete(`/api/safety/delete/${passValue.mongoId}`);
      toast.success('Data successfully deleted!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
    } catch (err) {
      toast.success(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };
  

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  let columns = [
    {
      field: 'mongoId',
      headerName: 'Mongo ID',
      flex: 0,
    },
    {
      field: 'id',
      headerName: 'No',
      flex: 0.1,
    },
    {
      field: 'siteId',
      headerName: 'site ID',
      flex: 0.2,
    },
    {
      field: 'siteName',
      headerName: 'Site Name',
      flex: 0.3,
    },
    {
      field: 'safetyhelmets',
      headerName: 'safety Helmets',
      flex: 0.3,
    },
    {
      field: 'safetyjacket',
      headerName: 'Safety Jackets',
      flex: 0.3,
    },
    {
      field: 'safetyshoes',
      headerName: 'Safety Shoes',
      flex: 0.3,
    },
    {
      field: 'safetygloves',
      headerName: 'Safety Gloves',
      flex: 0.3,
    },
    {
      field: 'safetyharness',
      headerName: 'Safety Harness',
      flex: 0.3,
    },
    {
      field: 'cautionbord',
      headerName: 'caution Board',
      flex: 0.3,
    },
    {
      field: 'safetyStatus',
      headerName: 'Safety Status',
      width: 130,
      renderCell: (params) => (
        <>
          {params.value === 1 ? (
            <CheckCircleRoundedIcon sx={{color: colorPalette.primary[500], fontSize: "2rem"}} />
          ) : params.value === 0 ? (
            <CancelRoundedIcon sx={{color: colorPalette.indigo[600], fontSize: "2rem"}} />
          ) : (
            <HorizontalRuleRoundedIcon sx={{color: colorPalette.indigo[900], fontSize: "2rem"}}/>
          )}
        </>
      ),
    },
  ];


  if (userInfo.position === 'Admin' || userInfo.position === 'Rollout Manager') {
    columns.push({
      field: 'Action',
      // headerName: 'Actions',
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ActionButton handleClick={handleClick} params={params} open={open} />
      ),
    });
  } 
  

  console.log('pass', passValue);

  let pdfColumn = [];
  if (userInfo.position === 'Finance Exective') {
    pdfColumn = columns.slice(1, -1);
  } else {
    pdfColumn = columns.slice(1);
  }

  let rows = {};
  let totalSites = 0;
  let totalHelmets = 0; // New variable to store the total count of safety helmets
  let totalJackets = 0; // New variable to store the total count of safety jackets
  let totalShoes = 0; // New variable to store the total count of safety shoes
  let totalGloves = 0; // New variable to store the total count of safety gloves
  let totalHarness = 0; // New variable to store the total count of safety harness
  let totalCautions = 0; // New variable to store the total count of safety cautions

  rows = result.map((row, x) => {
    totalHelmets += row.safetyhelmets; // Add the count of safety helmets to the total count
    totalJackets += row.safetyjacket; // Add the count of value
    totalShoes+= row.safetyshoes; // Add the count of value
    totalGloves+=row.safetygloves; // Add the count of value
    totalHarness+=row.safetyharness; // Add the count of value
    totalCautions+=row.cautionbord; // Add the count of value
    return {
      mongoId: row._id,
      id: x + 1,
      siteId: row.siteId,
      siteName: row.siteName,
      safetyhelmets: row.safetyhelmets,
      safetyjacket: row.safetyjacket,
      safetyshoes: row.safetyshoes,
      safetygloves: row.safetygloves,
      safetyharness: row.safetyharness,
      cautionbord: row.cautionbord,
      safetyStatus: row.isAccepted
    };
  });

  console.log('r', result);

  const [isAccepted, setIsAccepted] = useState();

  //update accept route
  const updateAccepted = async () => {
    const newIsAccepted = 1;
    try {
      await axios.put(`/api/safety/updateStatus/${passValue.mongoId}`, {
        isAccepted: newIsAccepted,
      });
      toast.success('Safety status Accepted!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  //update declined route
  const updateDeclined = async (e) => {
    const newIsAccepted = 0;
    try {
      await axios.put(`/api/safety/updateStatus/${passValue.mongoId}`, {
        isAccepted: newIsAccepted,
      });
      toast.warning('Safety status Declined!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  const downloadPdf = () => {
    setAnchorEl(null);
    const doc = new jsPDF();
    doc.text('Safety', 20, 10);
    doc.autoTable({
      columns: pdfColumn.map((col) => ({
        header: col.headerName,
        dataKey: col.field,
      })),
      body: rows,
    });
    doc.save('finance.pdf');
  };

  return loading ? (
    <Box width="100%">
      <LoadingAnimation/>
    </Box>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <Box>  
      <FlexBetween sx={{ m: '2rem 0',justifyContent:'stretch'}}>
        <Box sx={{ m: '2rem 1', display: 'flex', }}>
          {/* ************************************************************** */}
          {/* New code to display the total count of safety helmets */}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'auto',
            p: '1rem 2rem',
            textAlign: 'left',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Helmets: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalHelmets}
            </Typography>
          </Box>
          </Paper>
          {/* New code to display the total count of safety jackets*/}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'auto',
            p: '1rem 2rem',
            textAlign: 'left',
            marginLeft: '1rem',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Jacket: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalJackets}
            </Typography>
          </Box>
          </Paper>
          {/* New code to display the total count of safety shoes */}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'fixed',
            p: '1rem 2rem',
            textAlign: 'left',
            marginLeft: '1rem',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Shoes: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalShoes}
            </Typography>
          </Box>
          </Paper>
          {/* New code to display the total count of safety gloves */}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'fixed',
            p: '1rem 2rem',
            textAlign: 'left',
            marginLeft: '1rem',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Gloves: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalGloves}
            </Typography>
          </Box>
          </Paper>
          {/* New code to display the total count of safety harness */}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'fixed',
            p: '1rem 2rem',
            textAlign: 'left',
            marginLeft: '1rem',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Harness: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalHarness}
            </Typography>
          </Box>
          </Paper>
          {/* New code to display the total count of safety causions */}
          <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: 'fixed',
            p: '1rem 2rem',
            textAlign: 'left',
            marginLeft: '1rem',
            overflowX: 'auto', // Enable horizontal scrolling if needed
            whiteSpace: 'nowrap', // Prevent line breaks in the box
          }}>
          <Box sx={{ display: 'flex'}}>
            <Typography variant="h6">Total Cautions: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {totalCautions}
            </Typography>
          </Box>
          </Paper>
        </Box>
      </FlexBetween>
{/* //********************************************** */ }
      <FlexBetween sx={{ m: '2rem 0' }}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: '20%',
            p: '1rem 2rem',
            textAlign: 'left',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6">No Of Sites: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {result.length}
            </Typography>
          </Box>
        </Paper>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={() => {
              navigate('/addSafety');
            }}
            sx={{
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              mr: '1rem',
              '&:hover': {
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
              },
            }}
          >
            <AddBoxIcon sx={{ mr: '10px' }} />
            <Typography fontSize="0.9rem">Add New Safety</Typography>
          </Button>

          {/* PDF download with imported DownloadActions.js */}
          <Box>
          <DownloadActions
            pdfColumn={pdfColumn}
            rows={rows}
            tabLabel={''}
            funcName={'Safety Management'}
          />
          </Box>
        </Box>
      </FlexBetween>
      <Box
        height="100vh"
        width="100%"
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colorPalette.primary[500],
            color: colorPalette.secondary[200],
            // borderBottom: 'none',
          },

          '& .MuiDataGrid-footerContainer': {
            backgroundColor: colorPalette.indigo[100],
            color: colorPalette.indigo[900],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colorPalette.primary[500]} !important`,
          },
          display: 'flex',
        }}
      >
        <Box width="100%">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  mongoId: false,
                },
              },
              // sorting: { sortModel: [{field: 'date', sort: 'asc'}]}
            }}
            //Search& Filter of top on the table
            components={{
              toolbar: () => {
                return (
                  <GridToolbarContainer
                    style={{ justifyContent: 'flex-start', padding: '0.4rem' }}
                  >
                    <GridToolbarFilterButton />
                    <GridToolbarQuickFilter />
                  </GridToolbarContainer>
                );
              },
            }}
          />
        </Box>
      </Box>

      {/* Safety Status Page(View More)       */}
      <Dialog
        fullScreen
        open={statusOpen}
        onClose={handleStatusClose}
        TransitionComponent={Transition}
      >
        {/* App Bar which display on top of the page */}
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="white"
              onClick={handleStatusClose} //close AppBar by clicking close icon
              aria-label="close"
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SafePieChart data={pieChartData}/>
        <Box m="2rem">
          <Header title="View Site Safety Status" subtitle="" />
          <FlexBetween sx={{ width: '100%', m: '2rem 0' }}>
            <Box sx={{ width: '40%' }}>
              <FlexBetween>
                <TextField
                  id="outlined-basic"
                  label="Site Name"
                  value={passValue.siteName}
                  variant="outlined"
                  sx={{ mb: '1rem' }}
                />
                <TextField
                  id="outlined-basic"
                  label="Site Name"
                  value={passValue.siteId}
                  variant="outlined"
                  sx={{ mb: '1rem' }}
                />
              </FlexBetween>
              <Typography mb="1.5rem">Safety Items Distribution</Typography>
              <Box
              //background borders for the view more page componenets
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
                    value={passValue.safetygloves}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Safety Harness"
                    value={passValue.safetyharness}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                </FlexBetween>
                <FlexBetween>
                  <TextField
                    id="outlined-basic"
                    label="Safety Helmets"
                    value={passValue.safetyhelmets}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Safety Jacket"
                    value={passValue.safetyjacket}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                </FlexBetween>
                <FlexBetween>
                  <TextField
                    id="outlined-basic"
                    label="Safety Shoes"
                    value={passValue.safetyshoes}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Caution Board"
                    value={passValue.cautionbord}
                    variant="outlined"
                    sx={{ mb: '1rem' }}
                  />
                </FlexBetween>
              </Box>
            </Box>
            {/* Call safety calculate.js */}
            <SafetyCalculate />
          </FlexBetween>
            {/* Call PieChart */}
            {/* <SafePieChart data={pieChartData} /> */}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <FlexBetween sx={{ width: '30%' }}>
              <Button
                variant="filled"
                type="reset"
                onClick={updateDeclined}
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
                Declare
              </Button>
              <Button
                variant="filled"
                type="submit"
                onClick={updateAccepted}
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
                Accept
              </Button>
            </FlexBetween>
          </Box>
          
        </Box>
      </Dialog>

      <ActionsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}  //close opened task
        handleUpdate={handleUpdate} //naviagete to update page
        handleClickOpenAlert={handleClickOpenAlert} //opem Alerts
        funcs={'safety'}
        handleStatus={handleStatus}  //import from ActionsMenu.js to 'View More' 
      />
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ViewSafety;
