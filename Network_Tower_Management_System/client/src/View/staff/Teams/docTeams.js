import React, { useEffect, useReducer, useState } from 'react'
import {Tabs,Tab,Box, tabsClasses} from '@mui/material';
import Header from 'components/Header'
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, teamsData: action.payload, loading: false };
      case 'FETCH_SITES':
        return { ...state, siteLists: action.payload, loading: false };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
}



const Teams = () => {
  const tabs = [
    {
    id: '3',
    label: 'Document Team',
    col:'documentTeam',
    },
    {
       id:'4',
       label: 'Rollout Team',
       col:'rolloutTeam',
    },
    {
      id:'5',
      label: 'Warehouse Operation Team',
      col:'warehouseOperationTeam',
    },
    {
      id:'5',
      label: 'Revanue & Commercial Team',
      col:'revanue&commercialTeam',
    },
    {
      id:'6',
      label: 'Project Team',
      col:'projectTeam',
    }

];

const [value, setValue] =useState(0);
const [site, setSite] = useState(null);
const [tabName, setTabName] = useState({
    label: 'Document Team',
    col:'documentTeam',
    
});
const [{teamsData,loading,error}, dispatch]= useReducer(
  reducer,
  {
    teamsData:[],
    loading:true,
    error:'',
    
  }
);
useEffect(() => {
  const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await axios.get('/api/staff/get');
      dispatch({
        type: 'FETCH_SUCCESS',
        payload:result, 
      });
      dispatch({ type: 'FETCH_SITES', payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };
  fetchData();
}, [tabName, site]);
console.log(teamsData);

  return(
    <Box m="1.5rem  2.5rem">
      <Header title="Staff Management" subtitle="Staff Teams"/> 
      
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
                setTabName({ label: tab.label})
              }
              key={tab.id}
            />
          ))}
       
      </Tabs>    
      </Box>
      </Box>
)

  
}

export default Teams