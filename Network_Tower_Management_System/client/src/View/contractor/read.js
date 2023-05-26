import React, { useContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "store";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import Actions from "../../components/ContractorComponents/ConActions";
import ActionButton from "components/ActionsComponent/ActionButton";
import DeleteAlertBox from "components/ActionsComponent/DeleteAlertBox";
import ActionsMenu from "components/ActionsComponent/ActionsMenu";
import DownloadActions from "../../components/DownloadComponent/DownloadActions";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { RawOff } from "@mui/icons-material";
import { Alert, Button, Skeleton, Stack, Divider } from "@mui/material";

// import theme
import { colorPalette } from "customTheme";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, contractorData: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ContractorTable = ({}) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [passValue, setPassValue] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //const [data, setData] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // get render cell value
  const [buttonClickedValue, setButtonClickedValue] = useState({});
  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setButtonClickedValue(params.row);
  };

  useEffect(() => {
    setPassValue(buttonClickedValue);
  }, [buttonClickedValue]);

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const [{ loading, error, contractorData }, dispatch] = useReducer(reducer, {
    contractorData: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/contractor/read");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const columns = [
    // {
    //   field: 'mongoID',
    //   headerName: 'Mongo_ID',
    //   flex: 0,
    // },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "nic",
      headerName: "NIC",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 130,
      editable: true,
    },
    {
      field: "siteID",
      headerName: "Site ID",
      width: 110,
      editable: true,
    },
    {
      field: "siteName",
      headerName: "Site Name",
      width: 150,
      editable: true,
    },
  ];
  // add actions to column
  // if (act === true) {
  //   columns.push({
  //     field: "action",
  //     headerName: "Actions",
  //     flex: 0.3,
  //     renderCell: (params) => (
  //       <Button
  //         onClick={(event) => {
  //           handleClick(event, params);
  //         }}
  //       >
  //         <Actions
  //           {...{
  //             params,
  //             passValue: passValue,
  //           }}
  //         />
  //       </Button>
  //     ),
  //   });
  // }

  //Delete data
  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);

    try {
      axios.delete(`api/contractor/delete/${passValue.mongoID}`);
      toast.success("Data successfully deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
      //navigate('/read')
    } catch (err) {
      toast.success(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  //update data
  const handleEdit = () => {
    navigate("/updateContractor", {
      state: {data: passValue },
    });
    console.log(passValue);
  };

  if (userInfo.position === "Admin") {
    columns.push({
      field: "action",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <ActionButton handleClick={handleClick} params={params} open={open} />
        </Box>
      ),
    });
  }
  console.log(passValue);

  const rows = contractorData.map((row, x) => ({
    id: x + 1,
    mongoID: row._id,
    name: row.name,
    nic: row.nic,
    phone: row.phone,
    siteID: row.siteID,
    siteName: row.siteName,
  }));

  let pdfColumn = [];
  pdfColumn = columns.slice(1, -1);

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header title="Contractor Management" />

        {/* Divider line */}
        <Divider
          sx={{
            m: "1rem 0",
            backgroundColor: colorPalette.primary[500],
            height: "3px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            m: "1rem 1rem",
          }}
        >
          <Box sx={{ ml: "1.5rem" }}>
            <DownloadActions
              pdfColumn={pdfColumn}
              rows={rows}
              funcName={"Contractor Detailed Report"}
            />
          </Box>
        </Box>
        <Box
          height="100vh"
          width="100%"
          sx={{
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[200],
              // borderBottom: 'none',
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: colorPalette.indigo[100],
              color: colorPalette.indigo[900],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colorPalette.primary[500]} !important`,
            },
            display: "flex",
            padding: "10px 10 0 0",
          }}
        >
          <Box width="100%" sx={{ mt: "1.5rem" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
        {/* action menu */}
        <ActionsMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleUpdate={handleEdit}
          funcs={"Transport"}
          handleClickOpenAlert={handleClickOpenAlert}
        />

        {/* delete alert box */}
        <DeleteAlertBox
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          handleDelete={handleDelete}
        />
      </Box>
    </div>
  );
};

export default ContractorTable;
