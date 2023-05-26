import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "store";

// import custom components
//import Actions from './ConActions';
import ActionButton from "components/ActionsComponent/ActionButton";
import DeleteAlertBox from "components/ActionsComponent/DeleteAlertBox";
import ActionsMenu from "components/ActionsComponent/ActionsMenu";

import FlexBetween from "components/FlexBetween";
import DownloadActions from "../DownloadComponent/ContractorDownload";

//import materialUI
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { colorPalette } from "customTheme";
import { toast } from "react-toastify";

import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
  Slide,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

const ContractorTable = ({
  result,
  tabLabel,
  tabCol,
  site,
  filterExpense,
  loading,
  error,
}) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const navigate = useNavigate();
  const [passValue, setPassValue] = useState({});

  // get render cell value
  const [buttonClickedValue, setButtonClickedValue] = useState({});

  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setButtonClickedValue(params.row);
  };
  // assign data-grid columns
  let act = true;

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    // {
    //   field: 'mongoID',
    //   headerName: 'Mongo_ID',
    //   flex: 0,
    // },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "nic",
      headerName: "NIC",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 130,
      editable: true,
    },
    {
      field: "siteID",
      headerName: "Site ID",
      width: 110,
      editable: true,
    },
    {
      field: "siteName",
      headerName: "Site Name",
      width: 150,
      editable: true,
    },
  ];

  if (userInfo.position === "Admin") {
    columns.push({
      field: "action",
      headerName: "Actions",
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

  const rows = result.map((row, x) => ({
    id: x + 1,
    mongoID: row._id,
    name: row.name,
    nic: row.nic,
    phone: row.phone,
    siteID: row.siteID,
    siteName: row.siteName,
  }));

  //
  let pdfColumn = [];
  pdfColumn = columns.slice(1, -1);

  //Delete data
  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);

    try {
      axios.delete(`api/contractor/delete/${passValue.mongoID}`);
      toast.success("Data successfully deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
      //navigate('/read')
    } catch (err) {
      toast.success(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  //Update data
  const handleEdit = () => {
    navigate("/updateContractor", {
      state: { result: result, data: passValue },
    });
    console.log(passValue);
  };

  return loading ? (
    <Box width="100%">
      <Stack pacing={4}>
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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          m: "1rem 1rem",
        }}
      >
        <Box sx={{ ml: "1.5rem" }}>
          <DownloadActions
            pdfColumn={pdfColumn}
            rows={rows}
            funcName={"Contractor Detailed Report"}
            siteName={site}
          />
        </Box>
      </Box>

      <Box
        height="100vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colorPalette.primary[500],
            color: colorPalette.secondary[200],
            // borderBottom: 'none',
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colorPalette.indigo[100],
            color: colorPalette.indigo[900],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colorPalette.primary[500]} !important`,
          },
          display: "flex",
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
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
            components={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>
      {/* action menu */}
      <ActionsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleUpdate={handleEdit}
        funcs={"Transport"}
        handleClickOpenAlert={handleClickOpenAlert}
      />

      {/* delete alert box */}
      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ContractorTable;
