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
  AppBar,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TabPanel } from '@mui/lab';
import axios from 'axios';

// import material ui icons
import { DownloadOutlined, Height } from '@mui/icons-material';

// import custom components
import FlexBetween from 'components/FlexBetween';
import SearchComponent from 'components/SearchComponent';
import Header from '../../components/Header';
import FinanceTable from 'components/FinanceComponents/FinanceTable';
import Empty from '../../components/FinanceComponents/Empty';
import ViewSafety from '../../components/SafetyComponents/ViewSafety';
import SafetyStatus from '../../components/SafetyComponents/SafetyStatus';
import { Helmet } from 'react-helmet-async';

// use reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, safetyData: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SafetyDashboard = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // state management
  const [{ loading, error, safetyData }, dispatch] = useReducer(reducer, {
    safetyData: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/safety/');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Safety Dashboard</title>
      </Helmet>
      {/* header */}
      <Header title="Safety Management" subtitle="Manage Site Safety" />

      {/* <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Sites Safety " />
        <Tab label="Site Status" />
      </Tabs> */}

      <Divider
        sx={{
          m: '1rem 0',
          backgroundColor: colorPalette.primary[500],
          height: '3px',
        }}
      />

        <ViewSafety result={safetyData} loading={loading} error={error} />
      {/* {selectedTab === 1 && <SafetyStatus />} */}
    </Box>
  );
};

export default SafetyDashboard;
