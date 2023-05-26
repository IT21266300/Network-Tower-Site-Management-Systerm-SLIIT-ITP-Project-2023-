import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import FlexBetween from 'components/FlexBetween';

import { colorPalette } from 'customTheme';
import PieChart from './PieChart';

const FinanceSummary = ({ summary, searchSiteId, searchSiteName }) => {
  console.log(summary);
  const totalActualPoAmount = summary.actualPoAmount.reduce(
    (total, current) => {
      return total + current.actualPoAmount;
    },
    0
  );

  const totalBudgetPoAmount = summary.budgetPoAmount.reduce(
    (total, current) => {
      return total + current.budgetPoAmount;
    },
    0
  );

  const totalMaterialPayments = summary.materialPayment.reduce(
    (total, current) => {
      return total + current.materialPayment;
    },
    0
  );

  const totalLabourPayments = summary.labourPayment.reduce((total, current) => {
    return total + current.labourPayment;
  }, 0);

  const totalOtherPayments = summary.otherPayment.reduce((total, current) => {
    return total + current.otherPayment;
  }, 0);

  const totalCashCollection = summary.cashCollection.reduce(
    (total, current) => {
      return total + current.cashCollection;
    },
    0
  );

  const totalInvoiceAmount = summary.invoiceAmount.reduce((total, current) => {
    return total + current.invoiceAmountInTax;
  }, 0);

  const toBeInvoice = totalActualPoAmount - totalInvoiceAmount;
  const toBeCashCollection = totalInvoiceAmount - totalCashCollection;
  const totalExpense =
    totalMaterialPayments + totalLabourPayments + totalOtherPayments;
  const siteProfit = totalActualPoAmount - totalExpense;
  const gpMargin = (siteProfit / totalActualPoAmount) * 100;

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData('Budget Po Amount', totalBudgetPoAmount.toFixed(2)),
    createData('Actual Po Amount', totalActualPoAmount.toFixed(2)),
    createData('Invoice Amount', totalInvoiceAmount.toFixed(2)),
    createData('To Be Invoice', toBeInvoice.toFixed(2)),
    createData('Cash Collection', totalCashCollection.toFixed(2)),
    createData('To Be Cash Collection', toBeCashCollection.toFixed(2)),
    createData('Material Payments', totalMaterialPayments.toFixed(2)),
    createData('Labour Payments', totalLabourPayments.toFixed(2)),
    createData('Other Payments', totalOtherPayments.toFixed(2)),
  ];

  const chartData = {
    TotalExpenses: totalExpense,
    TotalRevenue: totalActualPoAmount,
  };

  return (
    <Box sx={{ p: '2rem' }}>
      <Paper elevation={1}  sx={{ mb: '1.3rem', backgroundColor: colorPalette.secondary[100], p: '0.5rem'}}>
          <Typography sx={{fontSize: "1.5rem", color:colorPalette.primary[500]}} title="SiteName">{searchSiteName} ({searchSiteId})</Typography>
      </Paper>

      <Typography color={colorPalette.secondary[900]}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowRightIcon /> Site Overview
        </Box>
      </Typography>

      <Grid container spacing={3} sx={{ p: '0.7rem 0' }}>
        <Grid item xs={3}>
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: colorPalette.secondary[100],
              p: '0.7rem 0',
            }}
          >
            <Typography variant="h6" color={colorPalette.secondary[800]}>
              {`Total Revenue (Rs.)`}
            </Typography>
            <Typography fontSize="1.8rem" color={colorPalette.primary[500]}>
              {totalActualPoAmount.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: colorPalette.secondary[100],
              p: '0.7rem 0',
            }}
          >
            <Typography variant="h6" color={colorPalette.secondary[800]}>
              {`Total Expense (Rs.)`}
            </Typography>
            <Typography fontSize="1.8rem" color={colorPalette.primary[500]}>
              {totalExpense.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: colorPalette.secondary[100],
              p: '0.7rem 0',
            }}
          >
            <Typography variant="h6" color={colorPalette.secondary[800]}>
              {`Profit (Rs.)`}
            </Typography>
            <Typography fontSize="1.8rem" color={colorPalette.primary[500]}>
              {siteProfit.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: colorPalette.secondary[100],
              p: '0.7rem 0',
            }}
          >
            <Typography variant="h6" color={colorPalette.secondary[800]}>
              GP Margin
            </Typography>
            <Typography fontSize="1.8rem" color={colorPalette.primary[500]}>
              {gpMargin.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <FlexBetween sx={{ width: '100%' }}>
        <Box width="32%">
          <Typography color={colorPalette.secondary[900]}>
            <Box sx={{ display: 'flex', alignItems: 'center', m: '1rem 0' }}>
              <ArrowRightIcon /> Finance Overview
            </Box>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: colorPalette.secondary[100] }}
          >
            <Table sx={{ minWidth: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell> </TableCell>
                  <TableCell align="left">Total (Rs.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    border={1}
                    bordercolor={colorPalette.primary[500]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box width="68%">
          <PieChart chartData={chartData} profit={siteProfit} />
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default FinanceSummary;
