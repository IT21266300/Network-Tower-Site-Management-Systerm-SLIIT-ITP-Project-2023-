import React, { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';

import CellTowerIcon from '@mui/icons-material/CellTower';
import TimelineIcon from '@mui/icons-material/Timeline';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useEffect, useSate } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import { colorPalette } from 'customTheme';
import Dashboard from 'View/dashboard';

import { Store } from './../store';
import { useContext } from 'react';

const navItems = [
  {
    text: 'Dashboard',
    op: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'ntInfoDash',
    op: 'Towers Information',
    path: '/ntInfoDash',
    icon: <CellTowerIcon />,
  },
  {
    text: 'Financial',
    op: 'Finance Management',
    icon: <TimelineIcon />,
  },
  {
    text: 'Contractors',
    op: 'Contractors',
    icon: <EngineeringIcon />,
  },
  {
    text: 'Contact',
    op: 'Contacts Information',
    icon: <PermContactCalendarIcon />,
  },
  {
    text: 'Safety',
    op: 'Environment health and safety',
    icon: <HealthAndSafetyIcon />,
  },
  {
    text: 'Transports',
    op: 'Transports',
    icon: <LocalShippingIcon />,
  },
  {
    text: 'Staff',
    op: 'Staff Management',
    icon: <Diversity3Icon />,
  },
  {
    text: 'Documentation',
    op: 'Documentation',
    icon: <FolderIcon />,
  },
];
 
const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isDesktop,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  //   const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [position, setPosition] = useState(null);
  
  useEffect(() => {
    userInfo && (
      (() => {
        switch (userInfo.position) {
          case 'Finance Executive':
            setPosition(true);
            break;
          case 'Rollout Manager':
            setPosition(true);
            break;
          case 'Business Dev Manager':
            setPosition(true);
            break;
          case 'Project Manager':
            setPosition(true);
            break;
          default:
            setPosition(false);
        }
      })()
    )
  }, [userInfo]);
  

  

  const newItems = position === false ? navItems.filter(item => item.text !== 'Financial') : navItems;

  return userInfo && (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: colorPalette.secondary[100],
              backgroundColor: colorPalette.primary[500],
              boxSizing: 'border-box',
              borderWidth: isDesktop ? 0 : '2px',
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={colorPalette.secondary[500]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Engenuity
                  </Typography>
                </Box>
                {!isDesktop && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <DashboardIcon />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {newItems.map(({ text, icon, op }) => {
                const simText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${simText}`);
                        setActive(simText);
                      }}
                      sx={{
                        backgroundColor:
                          active === simText
                            ? colorPalette.primary[100]
                            : 'transparent',
                        color:
                          active === simText
                            ? colorPalette.primary[900]
                            : '#fff',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '1rem',
                          color:
                            active === simText
                              ? colorPalette.primary[900]
                              : '#fff',
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={op} />
                      {active === simText && (
                        <KeyboardArrowRightIcon
                          sx={{ ml: 'auto', color: colorPalette.primary[900] }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;