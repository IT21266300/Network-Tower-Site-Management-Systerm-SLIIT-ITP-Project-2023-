// import react components
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import { Tabs, Tab, Box, tabsClasses, Divider } from '@mui/material';
import { colorPalette } from 'customTheme';

import DocumentTables from 'components/DocumentComponents/documentTables';

// use reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, documentData: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Document = () => {
 


  // state management
  const [{ loading, error, documentData }, dispatch] = useReducer(reducer, {
    documentData: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/doc/');
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, []);


  return (
    <Box m="1.5rem  2.5rem">
      <Header title="Document Management" subtitle="Manage Company Documents" />

      <Divider
        sx={{
          m: '1rem 0',
          backgroundColor: colorPalette.primary[500],
          height: '3px',
        }}
      />

      <DocumentTables
        result={documentData}
        loading={loading}
        error={error}
      />
      
    </Box>
  );
};

export default Document;
