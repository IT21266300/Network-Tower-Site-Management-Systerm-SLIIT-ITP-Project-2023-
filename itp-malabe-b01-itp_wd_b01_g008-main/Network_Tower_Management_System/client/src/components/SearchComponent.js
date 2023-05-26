import React, { useContext, useEffect, useReducer } from 'react';

// import material components
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

// import material icons
import { DownloadDoneOutlined } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';

// import color palette
import { colorPalette } from 'customTheme';

// import components
import FlexBetween from './FlexBetween';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from 'store';
import { useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, siteSet: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SearchComponent = ({ tabLabel, tabCol, site, siteList }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { searchResult } = state;

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();
  site(value);



  const [{ loading, error, siteSet }, dispatch] = useReducer(reducer, {
    siteSet: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/filterSites/filterSites');
        if (result.data) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data,
          });
        }
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        {/* <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Site" />
          )}
        /> */}

        <Autocomplete
          id="inputValue"
          sx={{ width: 300 }}
          getOptionLabel={(option) =>  `${option.siteName} (${option.siteId})`}
          options={siteSet}
          autoHighlight
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.siteName} ({option.siteId})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Site"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SearchComponent;
