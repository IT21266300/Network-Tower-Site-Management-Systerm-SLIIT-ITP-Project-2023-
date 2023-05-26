import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { colorPalette } from 'customTheme';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Store } from '../../store';
import { useContext } from 'react';

import i1 from '../../assets/1.jpg';
import i2 from '../../assets/2.jpg';
import i3 from '../../assets/3.jpg';
import i4 from '../../assets/4.jpg';
import i5 from '../../assets/5.jpg';
import i6 from '../../assets/6.jpg';
import i7 from '../../assets/7.jpg';
import i8 from '../../assets/8.jpg';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo, loading } = state;

  const [position, setPosition] = useState(false);

  useEffect(() => {
    switch (userInfo.position) {
      case 'Finance Executive':
        setPosition(true);
        break;
      case 'Rollout Manager':
        setPosition(true);
        break;
      case ' Business Dev Manager':
        setPosition(true);
        break;
      case 'Project Manager':
        setPosition(true);
        break;
      default:
        setPosition(false);
    }
  }, [userInfo, position]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [userInfo, navigate]);

  const functionInfo = [
    {
      id: 1,
      name: 'Tower Information',
      para: 'From This function mange finance status in each site.',
      link: '/ntInfoDash',
      img: i1,
    },
    position === true && {
      id: 2,
      name: 'Finance Management',
      para: 'From This function mange finance status in each site.',
      link: '/financial',
      img: i2,
    },
    {
      id: 3,
      name: 'Contractors',
      para: 'From This function mange finance status in each site.',
      link: '/contractors',
      img: i3,
    },
    {
      id: 4,
      name: 'Contact Information',
      para: 'From This function mange finance status in each site.',
      link: '/contact',
      img: i4,
    },
    {
      id: 5,
      name: 'Environment health and safety',
      para: 'From This function mange finance status in each site.',
      link: '/safety',
      img: i5,
    },
    {
      id: 6,
      name: 'Transports',
      para: 'From This function mange finance status in each site.',
      link: '/transports',
      img: i6,
    },
    {
      id: 7,
      name: 'Staff Management',
      para: 'From This function mange finance status in each site.',
      link: '/staff',
      img: i7,
    },
    {
      id: 8,
      name: 'Documentation',
      para: 'From This function mange finance status in each site.',
      link: '/documentation',
      img: i8,
    },
  ];

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Box m="1.5rem 2.5rem">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box mb="2rem" width="350px">
        <TextField
          id="standard-basic"
          label="Search..."
          variant="filled"
          fullWidth
        />
      </Box>
      <Box sx={{ minWidth: '100%' }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }}>
          {functionInfo.map((func) => (
            <Grid key="func.id" item xs={3} sx={{ minHeight: '200px' }}>
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: colorPalette.secondary[100],
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={func.img}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: colorPalette.primary[500] }}
                  >
                    {func.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ margin: 'auto', marginRight: 0 }}>
                  <Button
                    size="small"
                    sx={{ color: colorPalette.secondary[500] }}
                    onClick={() => {
                      navigate(func.link);
                    }}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                  >
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
