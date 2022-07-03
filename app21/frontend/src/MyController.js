import  React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Box, Grid, Button, CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import cloneDeep from "lodash/cloneDeep";
import MyDialog from "./MyDialog";
import axios from "axios";

const baseURL = "endpoint1/";

function APICALL(callbackSuccess, callbackError) {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  const params = {};
  axios
    .post(baseURL, params)
    .then(function (response) {
      console.log("response:", response);
      callbackSuccess(response);
    })
    .catch((err) => {
      console.log("err:", err);
      callbackError(err);
    });
}

const dummyDataRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const initialState = {
  columns: {
    columnVisibilityModel: {
      id: false,
    },
  },
};

export default function MyController() {
  const [rows, setRows] = React.useState([]);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    APICALL(onResponceSuccess, onResponceError);
  }, []);

  function onResponceSuccess(response) {
    setRows(response.data);
  }
  function onResponceError(error) {

  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "display_name",
      headerName: "文書名",
      width: 150,
      editable: false,
    },
    {
      field: "category",
      headerName: "カテゴリ",
      width: 150,
      editable: true,
    },
    {
      field: "button",
      headerName: "ボタン",
      width: 110,
      editable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              onClick2(event, cellValues);
            }}
          >
            詳細
          </Button>
        );
      },
    },
    {
      field: "icon",
      headerName: "アイコン",
      width: 160,
      editable: false,
      renderCell: (cellValues) => {
        return <CircularProgress size={20} />;
      },
    },
  ];

  function onClick1(event) {
    setShow(true);
  }

  function onClick2(event, cellValues) {
    console.log(cellValues);
  }

  const changeCell = (v) => {
    console.log(v);
    let newValue = cloneDeep(rows);
    let idx = rows.findIndex((d) => d.id == v.id);
    newValue[idx][v.field] = v.value;
    setRows(newValue);
  };

  return (
    <Box sx={{ margin: "10px" }}>
      <Grid container direction="column" spacing={2} sx={{ color: "white" }}>
        <Grid item xs={10}>
          <div style={{ height: "80vh", width: "100%" }}>
            {rows.length > 0 && (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                density="standard"
                components={{ Toolbar: CustomToolbar }}
                initialState={{ ...initialState }}
                onCellEditCommit={changeCell}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" size="large" onClick={onClick1}>
            登録
          </Button>
        </Grid>
      </Grid>
      <MyDialog open={show} rows={rows}>
        登録しました
      </MyDialog>
    </Box>
  );
}
