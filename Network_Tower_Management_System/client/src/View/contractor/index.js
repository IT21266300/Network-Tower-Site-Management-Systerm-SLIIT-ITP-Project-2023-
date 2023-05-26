import React, { useEffect, useReducer, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import Header from '../../components/Header';
//import ContractorTable from 'components/ContractorComponents/ContractorTable';
import ContractorTable from '../../components/ContractorComponents/ContractorTable';
import SearchComponent from 'components/ContractorComponents/SearchComponent';
import Empty from '../../components/Empty';
import FlexBetween from 'components/FlexBetween';

import DownloadAction from '../../components/ContractorComponents/ContractorTable' ;

import { colorPalette } from 'customTheme';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';


//import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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

//Use Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, contractorData: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const ContractorDashboard = () => {

  const [value, setValue] = React.useState(0);
  const [site, setSite] = useState(null);

  const siteFun = (site) => {
    setSite(site);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //State management
  const [{ loading, error, contractorData}, dispatch] =
    useReducer(reducer, {
      contractorData: [],
      loading: true,
      error: '',
    });
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/contractor/read');
        //const summaryResult = await axios.get(`/api/contractor/read/${site}`);
        if(result.data){
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data.filter(
              (item) => item.siteName === site
            ),
          });
        }
        //dispatch({type: 'FETCH_SUCCESS',payload: result.data}); 
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, [site]);

  return (
    <div>
      <Helmet>
        <title>Contractor Dashboard</title>
      </Helmet>

      {/* header  */}
      <Box m="1.5rem 2.5rem" >
      <Header
        title="Contractor Management"
        subtitle="Manage Contarctor Information"
      />

      {/* search & download area */}
      <SearchComponent
        site={siteFun}
        // siteList={siteList}
      /> 
      {/* Divider line */}
      <Divider
        sx={{
          m: '1rem 0',
          backgroundColor: colorPalette.primary[500],
          height: '3px',
        }}
      />

     

      {/* Search site */}

      <Box m="1.4rem 0">
        {site !== null ? (
          <FlexBetween sx={{width: "55%"}}>
            <Box sx={{width: "60%"}}>
              <Typography variant="subtitle" fontSize="1.3rem">
                Site :&nbsp;&nbsp;
              </Typography>
              <Typography
                variant="subtitle"
                fontSize="1.6rem"
                color={colorPalette.primary[500]}
              >
                {site}
              </Typography>
            </Box>
          </FlexBetween>
        ) : (
        <Empty/>
        )}
      </Box>

      {/* Import Table data */}
      {site !== null &&(
        <ContractorTable
        result={contractorData}
        site={site}
        loading={loading}
        error={error}
        />
      )}

    </Box>
    </div>

  );
}
export default ContractorDashboard;