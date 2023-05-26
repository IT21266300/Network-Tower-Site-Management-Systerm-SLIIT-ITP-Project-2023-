import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { colorPalette } from 'customTheme';
import React, { useEffect, useState } from 'react';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Store } from 'store';
import ActionButton from 'components/ActionsComponent/ActionButton';
import { LoadingAnimation } from 'components/LoadingComponent/LoadingAnimationOne';
import DownloadActions from 'components/DownloadComponent/DownloadActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ActionsMenu from 'components/ActionsComponent/ActionsMenu';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';
import dayjs from 'dayjs';


const TransportTable = ({ result, tabLabel, tabCol, loading, error }) => {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

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

  const [buttonClickedValue, setButtonClickedValue] = useState({});

  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setButtonClickedValue(params.row);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    navigate(
      tabCol === 'allocations'
        ? '/updateAllocation'
        : tabCol === 'drivers'
        ? '/updateDriver'
        : tabCol === 'vehicles'
        ? '/updateVehicle'
        : '',
      { state: { data: passValue } }
    );
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      switch (tabCol) {
        case 'allocations':
          axios.delete(`/api/transportAllocation/delete/${passValue.mongoID}`);
          break;
        case 'drivers':
          axios.delete(`/api/transportDriver/delete/${passValue.mongoID}`);
          break;
        case 'vehicles':
          axios.delete(`/api/transportVehicle/delete/${passValue.mongoID}`);
          break;
        default:
          return;
      }
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

  const [passValue, setPassValue] = useState({});

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  // console.log("pass", passValue);

  let columns = [];
  switch (tabLabel) {
    case 'Allocations':
      columns = [
        {
          field: 'mongoID',
          headerName: 'ID',
          flex: 0,
        },
        {
          field: 'id',
          headerName: 'No',
          flex: 0.3,
        },
        {
          field: 'type',
          headerName: 'Allocation Type',
          flex: 0.5,
        },
        {
          field: 'location',
          headerName: 'Location',
          flex: 1,
        },
        {
          field: 'driver_id',
          headerName: 'Driver ID',
          flex: 0.7,
        },
        {
          field: 'vehicle_number',
          headerName: 'Vehicle Number',
          flex: 0.7,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
      ];
      break;
    case 'Drivers':
      columns = [
        {
          field: 'mongoID',
          headerName: 'ID',
          flex: 0,
        },
        {
          field: 'id',
          headerName: 'No',
          flex: 0.3,
        },
        {
          field: 'name',
          headerName: 'Driver Name',
          flex: 0.7,
        },
        {
          field: 'license_number',
          headerName: 'License Number',
          flex: 0.7,
        },
        {
          field: 'nic',
          headerName: 'NIC Number',
          flex: 0.7,
        },
        {
          field: 'address',
          headerName: 'Address',
          flex: 0.7,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          flex: 0.7,
        },
        {
          field: 'email',
          headerName: 'email',
          flex: 0.7,
        },
      ];
      break;
    case 'Vehicles':
      columns = [
        {
          field: 'mongoID',
          headerName: 'ID',
          flex: 0,
        },
        {
          field: 'id',
          headerName: 'No',
          flex: 0.3,
        },
        {
          field: 'model',
          headerName: 'Vehicle Model',
          flex: 0.3,
        },
        {
          field: 'registration_number',
          headerName: 'Registration Number',
          flex: 0.3,
        },
        {
          field: 'fuel_type',
          headerName: 'Fuel Type',
          flex: 0.3,
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 0.3,
        },
      ];
      break;
    default:
      columns = [];
  }

  if (userInfo.position === 'Rollout Manager' && tabCol !== 'totalExpenses') {
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

  let pdfColumn = [];
  if (userInfo.position === 'Finance Exective' && tabCol !== 'totalExpenses') {
    pdfColumn = columns.slice(1, -1);
  } else {
    pdfColumn = columns.slice(1);
  }

  let rows = [];
  switch (tabCol) {
    case 'allocations':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        type: row.type,
        location: row.location,
        driver_id: row.driver_id,
        vehicle_number: row.vehicle_number,
        date: dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
      }));
      break;
    case 'drivers':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        name: row.name,
        license_number: row.license_number,
        nic: row.nic,
        address: row.address,
        phone: row.phone,
        email: row.email,
      }));
      break;
    case 'vehicles':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        model: row.model,
        registration_number: row.registration_number,
        fuel_type: row.fuel_type,
        status: row.status,
      }));
      break;
    default:
      rows = {};
  }

  const tabData = [tabCol, tabLabel];

  return loading ? (
    <Box width="100%">
      <LoadingAnimation />
    </Box>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          m: '2rem 0',
        }}
      >
        {userInfo.position === 'Rollout Manager' && (
          <Button
            onClick={() => {
              navigate(
                tabCol === 'allocations'
                  ? '/addAllocation'
                  : tabCol === 'drivers'
                  ? '/addDriver'
                  : tabCol === 'vehicles'
                  ? '/addVehicle'
                  : ''
              );
            }}
            sx={{
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              mr: '1rem',
              '&:hover': {
                backgroundColor: colorPalette.primary[400],
                color: colorPalette.secondary[100],
              },
            }}
          >
            <AddCircleIcon sx={{ mr: '10px' }} />
            <Typography fontSize="0.9rem">{`Add New ${tabLabel}`}</Typography>
          </Button>
        )}
        <DownloadActions pdfColumn={pdfColumn} rows={rows} tabLabel={''} funcName={'Transport Management'}/>
      </Box>
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
            initialState={{
              columns: {
                columnVisibilityModel: {
                  mongoID: false,
                },
              },
              // sorting: { sortModel: [{field: 'date', sort: 'asc'}]}
            }}
            pageSize={10}
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
        funcs={'transport'}
      />
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default TransportTable;
