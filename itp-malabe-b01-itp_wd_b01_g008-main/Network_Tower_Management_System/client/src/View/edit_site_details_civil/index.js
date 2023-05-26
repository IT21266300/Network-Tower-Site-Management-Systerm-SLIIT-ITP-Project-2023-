import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import FlexBetween from "components/FlexBetween";

import { Grid, Typography, IconButton } from "@mui/material";
import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


// import material ui icons

import FileUploadIcon from '@mui/icons-material/FileUpload';
// import color palette
import { colorPalette } from "customTheme";

// import components

import Header from "../../components/Header";

const editSiteInfo = () => {
  return (
  
     <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Network Tower Site Information Management System"
          subtitle="Edit Site General Details(CIVIL)"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <FileUploadIcon sx={{ mr: "10px" }} />
            <Typography fontSize="1rem">
              Upload Site permission letter
            </Typography>
          </Button>
        </Box>

        <Box>
        <Button
          sx={{
            backgroundColor: colorPalette.primary[500],
            color: colorPalette.red[500],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DeleteForeverIcon sx={{ mr: "10px" }} />
          <Typography fontSize="1rem">Delete Site</Typography>
        </Button>
      </Box>

       
      </FlexBetween>

      <Box
        sx={{
          width: "12rem",
          mt: "1rem",
          mb: "1.5rem",
          justifyItems: "center",
        }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Search Site"
          variant="standard"
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 5 }}>
          <Grid item xs={2} sm={4} md={4}>
            {/* paper01 */}
            <Paper
              elevation={3}
              sx={{
                backgroundColor: colorPalette.secondary[200],
                p: "1rem 2rem",
              }}
            >
            <FlexBetween>
            <Box>
              <Typography variant="h5">Site Name:</Typography>
              <Typography
                variant="h4"
                fontSize="1.8rem"
                color={colorPalette.primary[600]}
              >
                Ayiwela-1
              </Typography>
              </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
 {/* paper02 */}
 <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Site ID:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          MON019
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          </Grid>

<Grid item xs={2} sm={4} md={4}>
  {/* paper03 */}
  <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Tower Owner:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          Dialog
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {/* paper04 */}
      <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Height:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          40
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {/* paper05 */}
      <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Contractor:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          Engenuity
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {/* paper06 */}
      <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Region:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          Centeral
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {/* paper07 */}
      <Paper
        elevation={3}
        sx={{ backgroundColor: colorPalette.secondary[200], p: "1rem 2rem" }}
      >
      <FlexBetween>
            <Box>
        <Typography variant="h5">Status:</Typography>
        <Typography
          variant="h4"
          fontSize="1.8rem"
          color={colorPalette.primary[600]}
        >
          Completed
        </Typography>
        </Box>
              <Box><IconButton>
<EditIcon/>
              </IconButton></Box>
              </FlexBetween>
      </Paper>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
         
          
          </Grid>
        </Grid>
      </Box>
     

    </Box>
  )
}

export default editSiteInfo