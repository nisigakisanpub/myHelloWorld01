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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function MyController() {

  const [rows, setRows] = React.useState(initialRows);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let newValue = cloneDeep(rows);
    setRows(newValue);
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
//    console.log(JSON.stringify(rows));
    setShow(true);
  }

  function onClick2(event, cellValues){
    console.log(cellValues);
  }


  const initialState = {
    columns: {
      columnVisibilityModel: {
        id: false,
      }, 
    }, 
  };

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


