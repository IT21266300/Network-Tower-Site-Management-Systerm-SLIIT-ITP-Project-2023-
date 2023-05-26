
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



import FlexBetween from "components/FlexBetween";

import { Grid, Typography } from "@mui/material";
import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

// import material ui icons
import { DownloadOutlined } from "@mui/icons-material";

// import color palette
import { colorPalette } from "customTheme";



const DownloadButton = () => {
  const location = useLocation();
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`/api/download/${id}`, {
          responseType: 'blob',
        });
        setFile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFile();
  }, [id]);

  const handleDownloadClick = () => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';
    link.click();
  };
  

  return (

    
    <div>
    <Box>
      
        <Button
        onClick={handleDownloadClick}
          sx={{
            backgroundColor: colorPalette.primary[500],
            color: colorPalette.secondary[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mr: "1rem",
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          <Typography fontSize="1rem">
          
          
            Download Site permission letter
          </Typography>
        </Button>
      </Box>
      
      
    </div>
  );
};

export default DownloadButton;