// import react components
import React, { useEffect, useState, Link } from 'react';

// import material ui components
import {
  Alert,
  Box,
  Paper,
  Typography,
  Skeleton,
  Slide,
  Stack,

} from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';



// import theme
import { colorPalette } from 'customTheme';

// import custom components
import Actions from './ActionsNTI';

import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import axios from 'axios';
import { toast } from 'react-toastify';
import ActionButton from 'components/ActionsComponent/ActionButton';
import ActionsMenu from 'components/TowerInfoComponents/ActionsMenu';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';
import DownloadActions from '../TowerInfoComponents/DownloadActions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TowerInfoTable = ({
  result,
  tabLabel,
  tabCol,
  site,
  filterExpense,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  // console.log('Result', filterExpense);

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

  const tabSelector = [tabCol, tabLabel];


  // assign data-grid columns
  let act = true;

  // get render cell value
  const [buttonClickedValue, setButtonClickedValue] = useState({});
  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setButtonClickedValue(params.row);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const [passValue, setPassValue] = useState({});
  console.log("button", passValue)
  
  const handleUpdate = () => {
    navigate('/editSite', {
      state: { tabData: [tabSelector], result: result ,data: passValue },
    });
  };

  const handleView = () => {
  switch(tabCol){
    case 'tiInfo': 
      navigate('/tiDisplay', {
        state: { tabData: [tabSelector], result: result, data: passValue }
      });
      break;
    default:
      navigate('/civilDisplay', {
        state: { tabData: [tabSelector], result: result, data: passValue }
      });
  }
};





  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      axios.delete(`/api/${tabSelector[0]}/delete/${passValue.siteId}`);
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

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const [selectedRows, setSelectedRows] = useState(null);

  // assign columns
  let columns = [null];
  switch (tabCol) {
    case 'tiInfo':
      columns = [
        {
          field: 'id',
          headerName: 'ID',
          flex: 0.2,
        },
        // {
        //   field: 'mongoID',
        //   headerName: 'Mongo ID',
        //   flex: 0.000000001,
        // },
        {
          field: 'siteId',
          headerName: 'Site ID',

          flex: 0.4,
        },
        // {
        //   field: 'date',
        //   headerName: 'Date',
        //   flex: 1,
        // },
        
        {
          field: 'siteName',
          headerName: 'Site Name',
          flex: 0.5,
        },
        
        
        {
          field: 'towerOwner',
          headerName: 'Tower Owner',
          flex: 0.4,
        },
        {
          field: 'height',
          headerName: 'Height',
          flex: 0.4,
        },
        {
          field: 'manual',
          headerName: 'Manual',
          flex: 0.4,
        },
        {
          field: 'commissioningPlan',
          headerName: 'Commissioning Initial  Plan',
          flex: 0.8,
        },
        {
          field: 'ranClusOwner',
          headerName: 'RAN Cluster owner',
          flex: 0.6,
        },
        {
          field: 'province',
          headerName: 'Province',
          flex: 0.5,
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 0.6,
        },
      ];
      break;
    case 'civilInfo':
      columns = [
        {
          field: 'id',
          headerName: 'ID',
          flex: 0.5,
        },
        // {
        //   field: 'mongoID',
        //   headerName: 'Mongo ID',
        //   flex: 0.3,
        // },
        {
          field: 'siteId',
          headerName: 'Site ID',
          flex: 0.5,
        },
        {
          field: 'siteName',
          headerName: 'Site Name',
          flex: 0.5,
        },
        {
          field: 'towerOwner',
          headerName: 'Tower Owner',
          flex: 0.5,
        },
        {
          field: 'height',
          headerName: 'Height',
          flex: 0.5,
        },
        {
          field: 'region',
          headerName: 'Region',
          flex: 0.5,
        },
        {
          field: 'contractor',
          headerName: 'Contractor',
          flex: 0.5,
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 0.5,
        },
      ];
      break;

    default:
      columns = [];
  }

  // add actions to column
  if (act === true && tabCol !== 'totalExpenses') {
    columns.push({
      field: 'action',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <ActionButton handleClick={handleClick} params={params} open={open} />
        </Box>
      ),
    });
  }

  // assign data-grid values
  let rows = {};
  switch (tabCol) {
    case 'tiInfo':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,

        // date:
        //   typeof row.date === 'string'
        //     ? new Date(row.date).toLocaleDateString()
        //     : '',
        siteId: row.siteId,
        siteName: row.siteName,
        towerOwner: row.towerOwner,
        height: row.height,
        manual: row.manual,
        commissioningPlan: 
                typeof row.commissioningPlan === 'string' ? new Date(row.commissioningPlan).toLocaleDateString():'',
        ranClusOwner: row.ranClusOwner,
        province: row.province,
        status: row.status===true?"Completed":"Not Completed",


      }));
      break;
    case 'civilInfo':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        siteId: row.siteId,
        siteName: row.siteName,
        towerOwner: row.towerOwner,
        height: row.height,
        contractor: row.contractor,
        region: row.region,
        status: row.status===true?"Completed":"Not Completed",

      }));
      break;
    
    default:
      rows = {};
  }

  console.log(rows);
  let pdfColumn = [];
    pdfColumn = columns.slice(1, -1);

  return  (
    loading ? (
      <Box width="100%">
        <Stack spacing={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ backgroundColor: colorPalette.secondary[200] }}
            width="35%"
            height="5rem"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ backgroundColor: colorPalette.secondary[200] }}
            width="100%"
            height="40vh"
          />
        </Stack>
      </Box>
    ) : error ? (
      <Alert severity="error">{error}</Alert>
    ) : (
      <Box>
      <FlexBetween sx={{ m: '2rem 0' }}>
      <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: '25%',
            p: '1rem 2rem',
            textAlign: 'left',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6">No Of Projects : </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {result.length}
            </Typography>
          </Box>
        </Paper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          m: '1rem 1rem',
        }}
      >
        <Box sx={{ml: '1.5rem'}}>
          <DownloadActions
            pdfColumn={pdfColumn}
            rows={rows}
          />
        </Box>
      </Box>
      </FlexBetween>

{/* //table */}
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
              checkboxSelection
              rows={rows}
              columns={columns}
              pageSize={10}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
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
        <ActionsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        handleClickOpenAlert={handleClickOpenAlert}
        handleView={handleView}
      />
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
      </Box>
    )
  ) 
};

export default TowerInfoTable;