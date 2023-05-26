// import react components
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { colorPalette } from 'customTheme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import { Store } from 'store';
import ActionButton from 'components/ActionsComponent/ActionButton';
import DownloadActions from 'components/DownloadComponent/DownloadActions';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FlexBetween from 'components/FlexBetween';
import ActionsMenu from 'components/ActionsComponent/ActionsMenu';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DocumentTables = ({ result, loading, error }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

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

  const [buttonClickedValue, setButtonClickedValue] = useState({});
  const handleClick = (event, params) => {
    setButtonClickedValue(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    navigate('/updateDoc', { state: { data: passValue } });
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      axios.delete(`/api/doc/delete/${passValue.mongoID}`);
      toast.success('Data successfully deleted!', {
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

  const [passValue, setPassValue] = useState({});

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  let columns = [
    {
      field: 'mongoID',
      headerName: 'ID',
      flex: 0,
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.3,
    },
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
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
    },
  ];

  columns.push({
    field: 'pdfDownload',
    headerName: 'Download PDF',
    flex: 0.5,
    renderCell: (params) => (
      <Button
        onClick={async (event) => {
          try {
            const res = await axios.get(
              `api/doc/download/${params.row.mongoID}`,
              { responseType: 'blob' }
            );
            const blob = new Blob([res.data], { type: res.data.type });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'file.pdf';
            // link.download = res.headers["content-disposition"].split("file=")[1];
            link.click();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Download
      </Button>
    ),
  });

  if (
    userInfo.position === 'Admin' ||
    userInfo.position === 'Rollout Manager'
  ) {
    columns.push({
      field: 'action',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ActionButton handleClick={handleClick} params={params} open={open} />
      ),
    });
  }

  let pdfColumn = [];
  if (userInfo.position === 'Finance Exective') {
    pdfColumn = columns.slice(1, -1);
  } else {
    pdfColumn = columns.slice(1);
  }

  // assign data-grid values
  let rows = result.map((row, x) => ({
    id: x + 1,
    mongoID: row._id,
    siteId: row.siteId,
    siteName: row.siteName,
    status: row.status,
  }));

  return loading ? (
    <Box width="100%">
      <Stack spacing={4}>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ backgroundColor: colorPalette.secondary[200] }}
            width="25%"
            height="3rem"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ backgroundColor: colorPalette.secondary[200], ml: '1rem' }}
            width="25%"
            height="3rem"
          />
        </Box>
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
            <Typography variant="h6">No Of Documents: </Typography>
            <Typography variant="h5" color={colorPalette.primary[500]}>
              {result.length}
            </Typography>
          </Box>
        </Paper>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={() => {
              navigate('/addDoc');
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
            <Typography fontSize="0.9rem">Add New Document</Typography>
          </Button>
          <Box>
            {/* <DownloadActions
              pdfColumn={pdfColumn}
              rows={rows}
              tabLabel={''}
              funcName={'Document Management'}
            /> */}
          </Box>
        </Box>
      </FlexBetween>
      <Box
        height="100vh"
        minWidth="100%"
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
        <Box minWidth="100%">
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
        funcs={''}
      />
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default DocumentTables;
