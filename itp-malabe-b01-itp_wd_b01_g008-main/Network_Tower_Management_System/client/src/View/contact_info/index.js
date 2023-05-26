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
import TransportTable from 'components/ContactComponents/ContactTable';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, contactData: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Transport = () => {
  const [value, setValue] = React.useState(0);

  const tabs = [
    // {
    //   id: 1,
    //   label: 'Employee Contact',
    //   col: 'employeeContact',
    // },
    {
      id: 2,
      label: 'Client Contact',
      col: 'clientContact',
    },
    {
      id: 3,
      label: 'Constructor Contact',
      col: 'constructorContact',
    },
  ];

  const [tabName, setTabName] = React.useState({
    label: 'Client Contact',
    col: 'clientContact',
  });

  const [{ loading, error, contactData }, dispatch] = useReducer(reducer, {
    contactData: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        let contactResult = [];
        switch (tabName.col) {
          case 'employeeContact':
            contactResult = await axios.get('/api/contactStaff/');
            if (contactResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: contactResult.data,
              });
            }
            break;
          case 'constructorContact':
            contactResult = await axios.get('/api/contactContract/');
            if (contactResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: contactResult.data,
              });
            }
            break;
          case 'clientContact':
            contactResult = await axios.get('/api/contactClient/');
            if (contactResult.data) {
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: contactResult.data,
              });
            }
            break;
          default:
            return contactResult;
        }
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, [tabName]);

  console.log('contact', contactData);

  return (
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Contact Dashboard</title>
      </Helmet>
      <Header
        title="Contact Information"
        subtitle="Manage Company Contact Details"
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
        result={contactData}
        tabLabel={tabName.label}
        tabCol={tabName.col}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default Transport;
