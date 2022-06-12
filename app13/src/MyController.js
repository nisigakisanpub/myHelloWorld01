import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Paper, Box, Grid, Button, CircularProgress} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import cloneDeep from "lodash/cloneDeep";
import MyDialog from './MyDialog';
import axios from "axios";

const baseURL = "http://url1";

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
    const params = {};
    axios.post(baseURL, params)
    .then(function (response) {
      const rows = response.data;
      setRows(rows);
    })
    .catch(err => {
      console.log("err:", err);
    });
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: '文書名',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'カテゴリ',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'ボタン',
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
      }

    },
    {
      field: 'fullName',
      headerName: 'アイコン',
      width: 160,
      editable: false,
      renderCell: (cellValues) => {
        return <CircularProgress size={20} />
      }
    },
  ];
  

  function onClick1(event){
    setShow(true);
  }

  function onClick2(event, cellValues){
    console.log(cellValues);
  }

  const changeCell = (v) => {
    console.log(v);
    let newValue = cloneDeep(rows);
    let idx = rows.findIndex(d => d.id == v.id);
    newValue[idx][v.field] = v.value;
    setRows(newValue);
  }
  

  return (
    <Box sx={{margin:"10px" }}>
<Grid container direction='column' spacing={2} sx={{color:"white"}}>
  <Grid item xs={10}>
    <div style={{ height: '80vh', width: '100%' }}>
      {rows.length > 0 &&
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        density="standard"
        components={{ Toolbar: CustomToolbar, }}
        initialState={{ ...initialState, }} 
        onCellEditCommit={changeCell}
      />
      }
    </div>
  </Grid>
  <Grid item xs={2}>
    <Button variant='contained' size="large" onClick={onClick1}>登録</Button>
  </Grid>
</Grid>
    <MyDialog open={show} rows={rows}>登録しました</MyDialog>
    </Box>
  );
}


