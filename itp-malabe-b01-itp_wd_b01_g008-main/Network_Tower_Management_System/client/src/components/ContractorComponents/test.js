import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// import custom components
import Actions from './testAction';
import FlexBetween from 'components/FlexBetween';
import DownloadActions from '../DownloadComponent/DownloadActions'

//import materialUI
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { colorPalette } from 'customTheme';


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
  } from '@mui/material';

const ContractorTable = ({
    result,
    tabLabel,
    tabCol,
    site,
    filterExpense,
    loading, 
    error,
}) => {

    const navigate = useNavigate();
    const [passValue, setPassValue] = useState({});

    // get render cell value
    const [buttonClickedValue, setButtonClickedValue] = useState({});
    const handleClick = (event, params) => {
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
        { field: 'id', headerName: 'ID', width: 70 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'nic',
          headerName: 'NIC',
          width: 150,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          width: 130,
          editable: true,
        },
        {
          field: 'siteID',
          headerName: 'Site ID',
          width: 110,
          editable: true,
        },
        {
          field: 'siteName',
          headerName: 'Site Name',
          width: 150,
          editable: true,
        },
    ];

    // add actions to column
    if (act === true) {
        columns.push({
            field: 'action',
            headerName: 'Actions',
            flex: 0.3,
            renderCell: (params) => (
                <Button onClick={(event) => {
                    handleClick(event, params);
                  }}
                >
                    <Actions 
                        {...{
                            params,
                            passValue: passValue,
                        }}
                    />
                </Button>
            )
        });
    };

    const rows = result.map((row,x) =>({
        id:x+1,
        mongoID: row._id,
        name : row.name,
        nic : row.nic,
        phone : row.phone,
        siteID : row.siteID,
        siteName : row.siteName
    }))

    //
    let pdfColumn = [];
    pdfColumn = columns.slice(1, -1);

    
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
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          m: '1rem 1rem',
        }}
      >
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
                   onCellClick={handleCellClick}
                   onRowClick={handleRowClick}
                   components={{
                     toolbar: GridToolbar,
                   }}
                />
            </Box>
        </Box>
    </Box>
  );
};

export default ContractorTable;