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
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TabPanel } from '@mui/lab';
import axios from 'axios';

// import material ui icons
import { DownloadOutlined, Height } from '@mui/icons-material';

// import custom components
import FlexBetween from 'components/FlexBetween';
import SearchComponent from 'components/TowerInfoComponents/SearchComponentNTI';
import Header from '../../components/Header';
import TowerInfoTable from 'components/TowerInfoComponents/TowerInfoTable';
import Empty from '../../components/TowerInfoComponents/Empty';

import { Helmet } from 'react-helmet-async';

// use reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, towerInfoData: action.payload, loading: false };
    case 'FETCH_SITES':
      return { ...state, siteLists: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const TowerInfoDashboard = () => {
  // main tabs list
  const tabs = [
    {
      id: 1,
      label: 'TI Project',
      col: 'tiInfo',
    },
    {
      id: 2,
      label: 'CIVIL Project',
      col: 'civilInfo',
    },

  ];

  const [value, setValue] = React.useState(0);

  const [site, setSite] = useState(null);

  const siteFun = (site) => {
    setSite(site);
  };

  const [tabName, setTabName] = React.useState({
    label: 'TI Project',
    col: 'tiInfo',
  });

  // state management
  const [{ loading, error, towerInfoData, siteLists, filterExpenses }, dispatch] =
    useReducer(reducer, {
      towerInfoData: [],
      siteLists: [],
      filterExpenses: {},
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/nti_all');
        if (result.data) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data[tabName.col]
          });
        }

      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, [tabName, site]);

   console.log("Expenses: ", towerInfoData)

  return (
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Site Information Management Dashboard</title>
      </Helmet>
      {/* header */}
      <Header
        title="NetWork Tower (site) Information Management Dashboard"
        subtitle="Manage Site Information"
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
          <Box>
            <Typography variant="subtitle" fontSize="1rem">
              Site :
            </Typography>
            <Typography
              variant="subtitle"
              fontSize="1.6rem"
              color={colorPalette.primary[500]}
            >
              {site}
            </Typography>
          </Box>
        ) : (
          <Empty />
        )}
      </Box>

      {/* import Tower info table */}
     
        <TowerInfoTable
          result={towerInfoData}
          tabLabel={tabName.label}
          tabCol={tabName.col}
          site={site}
          loading={loading}
          error={error}
        />

    </Box>
  );
};

export default TowerInfoDashboard;

