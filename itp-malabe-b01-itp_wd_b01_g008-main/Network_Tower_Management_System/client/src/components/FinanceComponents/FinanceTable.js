// import react components
import React, { useContext, useEffect, useState } from 'react';

// import material ui components
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
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Slide,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

// import theme
import { colorPalette } from 'customTheme';

// import custom components
import PieChart from './PieChart';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

import i1 from '../../assets/1.jpg';
import DownloadIcon from '@mui/icons-material/Download';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import { toast } from 'react-toastify';
import ActionButton from 'components/ActionsComponent/ActionButton';
import DeleteAlertBox from 'components/ActionsComponent/DeleteAlertBox';
import ActionsMenu from 'components/ActionsComponent/ActionsMenu';
// import DownloadActions from 'components/DownloadComponent/DownloadActions';
import FinanceDownload from 'components/DownloadComponent/FinanceDownload';
import { LoadingAnimation } from 'components/LoadingComponent/LoadingAnimationOne';
import { Store } from 'store';
import dayjs from 'dayjs';
import DataNotFound from './DataNotFound';

const FinanceTable = ({
  result,
  tabLabel,
  tabCol,
  site,
  siteName,
  filterExpense,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
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

  const tabSelector = [tabCol, tabLabel];

  // handle update
  const handleUpdate = () => {
    navigate('/updateFinancial', {
      state: {
        tabData: [tabSelector],
        data: passValue,
        result: [result[0]['siteId'], result[0]['siteName']],
      },
    });
  };

  // handle delete
  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      axios.delete(`/api/${tabCol}/delete/${passValue.mongoID}`);
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

  // assign data-grid columns
  let act = true;

  const [passValue, setPassValue] = useState({});

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  // assign columns
  let columns = [];
  switch (tabLabel) {
    case 'Budget PO Amount':
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Budget Po Amount',
          flex: 1,
        },
      ];
      break;
    case 'Actual PO Amount':
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Actual Po Amount',
          flex: 1,
        },
      ];
      break;
    case 'Invoice Amount':
      columns = [
        {
          field: 'mongoID',
          headerName: 'ID',
          flex: 0,
        },
        {
          field: 'id',
          headerName: 'No',
          flex: 0.2,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 0.5,
        },
        {
          field: 'invoiceNo',
          headerName: 'Invoice No',
          flex: 0.4,
        },
        {
          field: 'invoiceAmountExTax',
          headerName: 'Invoice Amount Excluding Tax',
          flex: 0.7,
        },
        {
          field: 'taxAmount',
          headerName: 'Tax Amount',
          flex: 0.4,
        },
        {
          field: 'invoiceAmountInTax',
          headerName: 'Invoice Amount Including Tax',
          flex: 0.7,
        },
      ];
      break;
    case 'Cash Collection':
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Cash Collection',
          flex: 1,
        },
      ];
      break;
    case 'Material Payment':
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Material Payments',
          flex: 1,
        },
      ];
      break;
    case 'Labour Payment':
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Labour Payments',
          flex: 1,
        },
      ];
      break;
    case 'Other Payment':
      columns = [
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
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'dataSet',
          headerName: 'Other Payments',
          flex: 1,
        },
      ];
      break;
    case 'Total Expense':
      columns = [
        {
          field: 'id',
          headerName: 'ID',
          flex: 0.3,
          renderCell: (params) => params.row.id,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 0.5,
        },
        {
          field: 'materialPayment',
          headerName: 'Material Payments',
          flex: 0.6,
          valueFormatter: (params) => params.value.toFixed(2),
        },
        {
          field: 'labourPayment',
          headerName: 'Labour Payments',
          flex: 0.6,
          valueFormatter: (params) => params.value.toFixed(2),
        },
        {
          field: 'otherPayment',
          headerName: 'Other Payments',
          flex: 0.6,
          valueFormatter: (params) => params.value.toFixed(2),
        },
        {
          field: 'totalExpense',
          headerName: 'Total Expenses',
          flex: 0.6,
          valueFormatter: (params) => params.value.toFixed(2),
        },
      ];
      break;
    default:
      columns = [];
  }

  // add actions to column
  if (userInfo.position === 'Finance Executive' && tabCol !== 'totalExpenses') {
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

  // remove columns
  let pdfColumn = [];
  if (userInfo.position === 'Finance Executive' && tabCol !== 'totalExpenses') {
    pdfColumn = columns.slice(1, -1);
  } else {
    pdfColumn = columns.slice(1);
  }

  let siteTotalExpense = 0.0;

  // assign data-grid values
  let rows = [];
  switch (tabCol) {
    case 'budgetPoAmount':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'actualPoAmount':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'invoiceAmount':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        invoiceNo: row.invoiceNo,
        invoiceAmountExTax: Number(row.invoiceAmountExTax).toFixed(2),
        taxAmount: row && row.taxAmount ? row.taxAmount.toFixed(2) : undefined,
        invoiceAmountInTax: Number(row.invoiceAmountInTax).toFixed(2),
      }));
      break;
    case 'toBeInvoice':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'cashCollection':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'materialPayment':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'labourPayment':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'otherPayment':
      rows = result.map((row, x) => ({
        id: x + 1,
        mongoID: row._id,
        date:dayjs(row.date).format('MM/DD/YYYY hh:mm A'),
        dataSet: Number(row[tabCol]).toFixed(2),
      }));
      break;
    case 'totalExpenses':
      let idCounter = 1;
      const lines = filterExpense.filteredPayments.materialPayments.reduce(
        (acc, payment) => {
          const paymentDate = dayjs(payment.date).format('MM/DD/YYYY hh:mm A');
          if (paymentDate in acc) {
            acc[paymentDate].materialPayment += payment.materialPayment;
          } else {
            acc[paymentDate] = {
              id: idCounter++,
              date: dayjs(paymentDate).format('MM/DD/YYYY hh:mm A'),
              materialPayment: payment.materialPayment,
              labourPayment: 0,
              otherPayment: 0,
            };
          }
          return acc;
        },
        {}
      );

      filterExpense.filteredPayments.labourPayments.forEach((payment) => {
        const paymentDate = dayjs(payment.date).format('MM/DD/YYYY hh:mm A');
        if (paymentDate in lines) {
          lines[paymentDate].labourPayment += payment.labourPayment;
        } else {
          lines[paymentDate] = {
            id: idCounter++,
            date: dayjs(paymentDate).format('MM/DD/YYYY hh:mm A'),
            materialPayment: 0,
            labourPayment: payment.labourPayment,
            otherPayment: 0,
          };
        }
      });

      filterExpense.filteredPayments.otherPayments.forEach((payment) => {
        const paymentDate = dayjs(payment.date).format('MM/DD/YYYY hh:mm A');
        console.log(paymentDate);
        if (paymentDate in lines) {
          lines[paymentDate].otherPayment += payment.otherPayment;
        } else {
          lines[paymentDate] = {
            id: idCounter++,
            date: dayjs(paymentDate).format('MM/DD/YYYY hh:mm A'),
            materialPayment: 0,
            labourPayment: 0,
            otherPayment: payment.otherPayment,
          };
        }
      });

      const totalExpensesByDate = filterExpense.totalExpensesByDate.reduce(
        (acc, expense) => {
          const expenseDate = dayjs(expense.date).format('MM/DD/YYYY hh:mm A');
          if (expenseDate in lines) {
            const totalExpense =
              lines[expenseDate].materialPayment +
              lines[expenseDate].labourPayment +
              lines[expenseDate].otherPayment;
            acc.push({ ...expense, totalExpense });
          } else {
            acc.push(expense);
          }
          return acc;
        },
        []
      );
      // rows = Object.values(lines);

      rows = Object.values(lines).map((row) => {
        const totalExpense =
          row.materialPayment + row.labourPayment + row.otherPayment;
        siteTotalExpense += totalExpense;

        return {
          ...row,
          totalExpense: totalExpense,
        };
      });
      break;
    default:
      rows = {};
  }

  const [totalFinance, setTotalFinance] = useState(0.0);

  useEffect(() => {
    let newTotalFinance;

    if (tabCol === 'invoiceAmount') {
      newTotalFinance = result
        .reduce((sum, item) => sum + item.invoiceAmountInTax, 0)
        .toFixed(2);
    } else {
      newTotalFinance = result
        .reduce((sum, item) => sum + item[tabCol], 0)
        .toFixed(2);
    }

    setTotalFinance(newTotalFinance);
  }, [result, tabCol]);

  // calculate total revenue
  const totalRevenue = result
    .reduce((sum, item) => sum + item.actualPo, 0)
    .toFixed(2);

  // total profit
  const totalProfit = (totalRevenue - siteTotalExpense).toFixed(2);

  const financeSummary = {
    TotalExpenses: siteTotalExpense,
    TotalRevenue: totalRevenue,
    totalProfit: totalProfit,
  };

  return loading ? (
    <Box width="100%">
      <LoadingAnimation />
    </Box>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : result.length === 0 ? (
    <DataNotFound site={site} siteName={siteName}/>
  ) : (
    <Box>
      <FlexBetween sx={{ width: '100%', mb: '2rem' }}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: colorPalette.secondary[200],
            width: '35%',
            p: '1rem 2rem',
            textAlign: 'left',
          }}
        >
          <Box>
            <Typography variant="h6">
              {tabCol !== 'totalExpenses' ? `Total ${tabLabel} ` : tabLabel}:
            </Typography>
            <Typography variant="h4" color={colorPalette.primary[500]}>
              Rs.
              {tabCol === 'totalExpenses'
                ? siteTotalExpense.toFixed(2)
                : totalFinance}
            </Typography>
          </Box>
        </Paper>

        {/* download actions */}
        <Box>
        <FinanceDownload
            pdfColumn={pdfColumn}
            rows={rows}
            site={site}
            siteName={siteName}
            tabLabel={tabLabel}
            tabCol={tabCol}
            funcName={'Finance Management'}
            totalFin={
              tabCol === 'totalExpenses' ? siteTotalExpense : totalFinance
            }
          />
        </Box>
      </FlexBetween>

      {/* financeDataGrid */}
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

      {/* action menu */}
      <ActionsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        funcs={'Transport'}
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

export default FinanceTable;
