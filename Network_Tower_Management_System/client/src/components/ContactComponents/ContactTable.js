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
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { colorPalette } from 'customTheme';
import React, { useContext, useEffect, useState } from 'react';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from 'store';
import ActionButton from 'components/ActionsComponent/ActionButton';
import { LoadingAnimation } from 'components/LoadingComponent/LoadingAnimationOne';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadActions from 'components/DownloadComponent/DownloadActions';
import ActionsMenu from 'components/ActionsComponent/ActionsMenu';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ContactTable = ({ result, tabLabel, tabCol, loading, error }) => {
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
      tabCol === 'employeeContact'
        ? '/updateStaffContact'
        : tabCol === 'clientContact'
        ? '/updateClientContact'
        : tabCol === 'constructorContact'
        ? '/updateContractorContact'
        : '',
      { state: { data: passValue } }
    );
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      switch (tabCol) {
        case 'employeeContact':
          axios.delete(`/api/contactStaff/delete/${passValue.mongoID}`);
          break;
        case 'clientContact':
          axios.delete(`/api/contactClient/delete/${passValue.mongoID}`);
          break;
        case 'constructorContact':
          axios.delete(`/api/contactContract/delete/${passValue.mongoID}`);
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
  switch (tabCol) {
    case 'employeeContact':
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
          field: 'staffId',
          headerName: 'Staff ID',
          flex: 0.4,
        },
        {
          field: 'siteId',
          headerName: 'Site ID',
          flex: 0.4,
        },
        {
          field: 'name',
          headerName: 'Employee Name',
          flex: 0.7,
        },
        {
          field: 'nic',
          headerName: 'NIC',
          flex: 0.6,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          flex: 0.6,
        },
        {
          field: 'address',
          headerName: 'Address',
          flex: 0.7,
        },
        {
          field: 'email',
          headerName: 'E-mail',
          flex: 0.7,
        },
      ];
      break;
    case 'clientContact':
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
          field: 'clientId',
          headerName: 'Client ID',
          flex: 0.4,
        },
        {
          field: 'name',
          headerName: 'Client Name',
          flex: 0.7,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          flex: 0.7,
        },
        {
          field: 'address',
          headerName: 'Address',
          flex: 0.7,
        },
        {
          field: 'email',
          headerName: 'E-mail',
          flex: 0.7,
        },
      ];
      break;
    case 'constructorContact':
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
          headerName: 'Contractor Name',
          flex: 0.7,
        },
        {
          field: 'nic',
          headerName: 'NIC',
          flex: 0.7,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          flex: 0.7,
        },
        {
          field: 'address',
          headerName: 'Address',
          flex: 0.7,
        },
        {
          field: 'email',
          headerName: 'E-mail',
          flex: 0.7,
        },
      ];
      break;
    default:
      columns = [];
  }

  if (userInfo.position === 'Admin' && tabCol !== 'totalExpenses') {
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
  if (userInfo.position === 'Admin' && tabCol !== 'totalExpenses') {
    pdfColumn = columns.slice(1, -1);
  } else {
    pdfColumn = columns.slice(1);
  }

  let rows = [];
  switch (tabCol) {
    case 'employeeContact':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        staffId: row.staffId,
        siteId: row.siteId,
        name: row.name,
        nic: row.nic,
        phone: row.phone,
        address: row.address,
        email: row.email,
      }));
      break;
    case 'clientContact':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        clientId: row.clientId,
        name: row.name,
        address: row.address,
        phone: row.phone,
        email: row.email,
      }));
      break;
    case 'constructorContact':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        name: row.name,
        nic: row.nic,
        address: row.address,
        phone: row.phone,
        email: row.email,
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
        {userInfo.position === 'Admin' &&(
          <Button
            onClick={() => {
              navigate(
                tabCol === 'employeeContact'
                  ? '/addStaffContact'
                  : tabCol === 'clientContact'
                  ? '/addClientContact'
                  : tabCol === 'constructorContact'
                  ? '/addContractorContact'
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
        <DownloadActions pdfColumn={pdfColumn} rows={rows} tabLabel={''} funcName={'Contacts'}/>
        
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
        funcs={'contact'}
      />
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
       
    </Box>
  );
};

export default ContactTable;
