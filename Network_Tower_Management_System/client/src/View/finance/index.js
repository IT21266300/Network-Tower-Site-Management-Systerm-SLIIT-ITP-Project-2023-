// import react components
import React, { useEffect, useReducer, useState } from 'react';

// import custom theme
import { colorPalette } from 'customTheme';

// import material ui components
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Container,
  Stack,
  Tabs,
  Tab,
  tabsClasses,
  Card,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TabPanel } from '@mui/lab';
import axios from 'axios';

// import material ui icons
import { DownloadOutlined, Height } from '@mui/icons-material';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// import custom components
import FlexBetween from 'components/FlexBetween';
import SearchComponent from 'components/SearchComponent';
import Header from '../../components/Header';
import FinanceTable from 'components/FinanceComponents/FinanceTable';
import Empty from '../../components/FinanceComponents/Empty';

import { Helmet } from 'react-helmet-async';
import FinanceSummary from 'components/FinanceComponents/FinanceSummary';
import { useNavigate } from 'react-router-dom';
import AllFinance from 'components/FinanceComponents/AllFinance';
import { useContext } from 'react';
import { Store } from 'store';
import Footer from 'components/Footer';
import DataNotFound from 'components/FinanceComponents/DataNotFound';

// use reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, financeData: action.payload, loading: false };
    case 'FETCH_AUTO':
      return { ...state, financeAuto: action.payload, loading: false };
    case 'FETCH_NON_SITE':
      return { ...state, financeNonSite: action.payload, loading: false };
    case 'FETCH_EXPENSES':
      return { ...state, filterExpenses: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FinanceDashboard = () => {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // main tabs list
  const tabs = [
    {
      id: 1,
      label: 'Budget PO Amount',
      col: 'budgetPoAmount',
    },
    {
      id: 2,
      label: 'Actual PO Amount',
      col: 'actualPoAmount',
    },
    {
      id: 3,
      label: 'Invoice Amount',
      col: 'invoiceAmount',
    },
    {
      id: 4,
      label: 'Cash Collection',
      col: 'cashCollection',
    },
    {
      id: 5,
      label: 'Material Payment',
      col: 'materialPayment',
    },
    {
      id: 6,
      label: 'Labour Payment',
      col: 'labourPayment',
    },
    {
      id: 7,
      label: 'Other Payment',
      col: 'otherPayment',
    },
    {
      id: 8,
      label: 'Total Expense',
      col: 'totalExpenses',
    },
  ];

  const [value, setValue] = React.useState(0);

  const [site, setSite] = useState(null);

  const siteFun = (site) => {
    setSite(site);
  };

  const [searchSite, setSearchSite] = useState(null);
  const [searchSiteName, setSearchSiteName] = useState(null);

  useEffect(() => {
    if (site) {
      setSearchSite(site.siteId);
      setSearchSiteName(site.siteName);
    }
  }, [searchSite, site, searchSiteName]);

  const [tabName, setTabName] = React.useState({
    label: 'Budget PO Amount',
    col: 'budgetPoAmount',
  });

  // state management
  const [
    {
      loading,
      error,
      financeData,
      financeAuto,
      filterExpenses,
      financeNonSite,
    },
    dispatch,
  ] = useReducer(reducer, {
    financeData: [],
    financeAuto: [],
    financeNonSite: [],
    filterExpenses: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/all');
        const summaryResult = await axios.get(
          `/api/all/siteSummary/${searchSite}`
        );
        if (result.data && result.data[tabName.col]) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data[tabName.col].filter(
              (item) => item.siteId === searchSite
            ),
          });
        }

        console.log(summaryResult);

        // get finance Summary
        if (summaryResult) {
          dispatch({
            type: 'FETCH_AUTO',
            payload: summaryResult.data,
          });
        }

        // non site total expense
        let noMaterialPayments = 0;
        let noLabourPayments = 0;
        let noOtherPayments = 0;

        result.data.materialPayment.forEach((payment) => {
          noMaterialPayments += payment.materialPayment;
        });

        result.data.otherPayment.forEach((payment) => {
          noOtherPayments += payment.otherPayment;
        });

        result.data.labourPayment.forEach((payment) => {
          noLabourPayments += payment.labourPayment;
        });

        const nonTotalExpensesPayment =
          noMaterialPayments + noOtherPayments + noLabourPayments;

        // finance non site
        result.data &&
        result.data[tabName.col] &&
        site === null &&
        tabName.col !== 'invoiceAmount'
          ? dispatch({
              type: 'FETCH_NON_SITE',
              payload: result.data[tabName.col]
                .map((nonCol) => {
                  return nonCol[tabName.col];
                })
                .reduce((sum, value) => sum + value, 0),
            })
          : result.data && site === null && tabName.col === 'totalExpenses'
          ? dispatch({
              type: 'FETCH_NON_SITE',
              payload: nonTotalExpensesPayment,
            })
          : dispatch({
              type: 'FETCH_NON_SITE',
              payload:
                result.data && result.data.invoiceAmount
                  ? result.data.invoiceAmount
                      .map((nonCol) => {
                        return nonCol.invoiceAmountExTax;
                      })
                      .reduce((sum, value) => sum + value, 0) * 0.15
                  : 0, // default value if result.data.invoiceAmount is undefined
            });

        // filter material payments
        const siteMaterialPayments =
          result.data.materialPayment &&
          result.data.materialPayment.filter(
            (payment) => payment.siteId === searchSite
          );

        // filter labour payments
        const siteLabourPayments =
          result.data.labourPayment &&
          result.data.labourPayment.filter(
            (labour) => labour.siteId === searchSite
          );

        // filter other payments
        const siteOtherPayments =
          result.data.otherPayment &&
          result.data.otherPayment.filter(
            (other) => other.siteId === searchSite
          );

        const groupedPayments = {};
        const addPaymentToGroup = (payment) => {
          const date = payment.date;
          if (!groupedPayments[date]) {
            groupedPayments[date] = [];
          }
          groupedPayments[date].push(payment);
        };

        siteMaterialPayments.forEach(addPaymentToGroup);
        siteLabourPayments.forEach(addPaymentToGroup);
        siteOtherPayments.forEach(addPaymentToGroup);

        const totalExpensesByDate = [];

        Object.keys(groupedPayments).forEach((date) => {
          const paymentsForDate = groupedPayments[date];
          const totalExpenseForDate = paymentsForDate.reduce(
            (total, payment) => {
              const { type, materialPayment, labourPayment, otherPayment } =
                payment;
              return total + materialPayment + labourPayment + otherPayment;
            },
            0
          );
          totalExpensesByDate.push({
            date,
            totalExpense: totalExpenseForDate,
          });
        });

        const filteredExpense = {
          filteredPayments: {
            materialPayments: [...siteMaterialPayments],
            labourPayments: [...siteLabourPayments],
            otherPayments: [...siteOtherPayments],
          },
          totalExpensesByDate,
        };

        dispatch({ type: 'FETCH_EXPENSES', payload: filteredExpense });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, [tabName, site, searchSite]);

  const tabData = [tabName.col, tabName.label];
  // const siteData = [
  //   financeData?.[0]?.siteId ?? '',
  //   financeData?.[0]?.siteName ?? '',
  // ];

  const siteData = [searchSite, searchSiteName];

  console.log('autos', financeData);

  return (
    <Box m="1.5rem 2.5rem" minHeight="80vh">
      <Helmet>
        <title>Finance Dashboard</title>
      </Helmet>
      {/* header */}
      <Header
        title="Financial Management"
        subtitle="Manage Site Financial Status"
      />

      {/* tab group */}
      <Box sx={{ width: '100%', m: '1rem 0' }}>
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              label={tab.label}
              onClick={(e, val) =>
                setTabName({ label: tab.label, col: tab.col })
              }
              key={tab.id}
            />
          ))}
        </Tabs>
      </Box>

      {/* search & download area */}
      <SearchComponent
        tabLabel={tabName.label}
        tabCol={tabName.col}
        site={siteFun}
        // siteList={siteList}
      />

      <Divider
        sx={{
          m: '1rem 0',
          backgroundColor: colorPalette.primary[500],
          height: '3px',
        }}
      />

      <Box m="1.4rem 0">
        {site !== null ? (
          <FlexBetween sx={{ width: '100%' }}>
            <Box sx={{ width: '35%' }}>
              <Typography variant="subtitle" fontSize="1.3rem">
                Site :
              </Typography>
              <Typography
                variant="subtitle"
                fontSize="1.6rem"
                color={colorPalette.primary[500]}
              >
                {searchSiteName} ({searchSite})
              </Typography>
            </Box>
            <FlexBetween sx={{ minWidth: '40%' }}>
              <Button
                variant="contained"
                startIcon={<ViewQuiltIcon />}
                onClick={handleClickOpen}
                sx={{
                  color: 'white',
                  padding: '0.6rem 0.9rem',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[400],
                    color: colorPalette.secondary[100],
                  },
                }}
              >
                View Site Overview
              </Button>
              {userInfo.position === 'Finance Executive' &&(
                <Button
                  onClick={() => {
                    navigate('/addFinancial', {
                      state: { tabs: [tabData], siteData: siteData },
                    });
                  }}
                  sx={{
                    backgroundColor: colorPalette.primary[500],
                    color: colorPalette.secondary[100],
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: colorPalette.primary[400],
                      color: colorPalette.secondary[100],
                    },
                  }}
                >
                  <AddCircleIcon sx={{ mr: '10px' }} />
                  <Typography fontSize="0.9rem">{`Add New ${tabName.label}`}</Typography>
                </Button>
              )}
            </FlexBetween>
          </FlexBetween>
        ) : (
          <AllFinance
            tabCol={tabName.col}
            tabLabel={tabName.label}
            result={financeNonSite}
            loading={loading}
            error={error}
          />
        )}
      </Box>

      {/* import finance table */}
      {site !== null && (
        <FinanceTable
          result={financeData}
          filterExpense={filterExpenses}
          tabLabel={tabName.label}
          tabCol={tabName.col}
          site={searchSite}
          siteName={searchSiteName}
          loading={loading}
          error={error}
        />
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: 'relative',
            backgroundColor: colorPalette.primary[500],
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color={colorPalette.secondary[100]}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon
                sx={{ color: colorPalette.secondary[100], fontSize: '2rem' }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <FinanceSummary
          summary={financeAuto}
          searchSiteId={searchSite}
          searchSiteName={searchSiteName}
        />
      </Dialog>
    </Box>
  );
};

export default FinanceDashboard;
