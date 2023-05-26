import React, { useEffect, useReducer } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  tabsClasses,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Header from 'components/Header';
import TransportTable from 'components/TransportComponents/TransportTable';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, transportData: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Transport = () => {
  const [value, setValue] = React.useState(0);

  const tabs = [
    {
      id: 1,
      label: 'Allocations',
      col: 'allocations',
    },
    {
      id: 2,
      label: 'Drivers',
      col: 'drivers',
    },
    {
      id: 3,
      label: 'Vehicles',
      col: 'vehicles',
    },
  ];

  const [tabName, setTabName] = React.useState({
    label: 'Allocations',
    col: 'allocations',
  });

  const [{ loading, error, transportData }, dispatch] = useReducer(reducer, {
    transportData: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        let transportResult = [];
        switch (tabName.col) {
          case 'allocations':
            transportResult = await axios.get('/api/transportAllocation/');
            if (transportResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: transportResult.data,
              });
            }
            break;
          case 'drivers':
            transportResult = await axios.get('/api/transportDriver/');
            if (transportResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: transportResult.data,
              });
            }
            break;
          case 'vehicles':
            transportResult = await axios.get('/api/transportVehicle/');
            if (transportResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: transportResult.data,
              });
            }
            break;
          default:
            return transportResult;
        }
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, [tabName]);

  return (
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Finance Dashboard</title>
      </Helmet>
      <Header
        title="Transport Management"
        subtitle="Manage Company Transports"
      />
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

      <Divider
        sx={{
          m: '1rem 0',
          backgroundColor: colorPalette.primary[500],
          height: '3px',
        }}
      />

      <TransportTable
        result={transportData}
        tabLabel={tabName.label}
        tabCol={tabName.col}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default Transport;
