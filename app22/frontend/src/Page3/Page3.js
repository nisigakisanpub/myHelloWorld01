import React from "react";
import { Radio } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuLayout from "../MenuLayout";

import { MyContext } from "../App";

const rows = [
  { id: 1, firstName: "Javier", lastName: "Obrien" },
  { id: 2, firstName: "Kate", lastName: "Miles" },
  { id: 3, firstName: "Kim", lastName: "Jimenez" },
  { id: 4, firstName: "Juana", lastName: "Thornton" },
  { id: 5, firstName: "Prashant", lastName: "Jangam" }
];

let radioChecked = [rows[0].id]; // グローバル変数

const columns = [
  {
    field: "radiobutton",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Radio checked={radioChecked[0] === params.id} value={params.id} />
    )
  },
  {
    field: "id",
    headerName: "ID"
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150
  }
];

const Page3 = () => {
  const [selectionModel, setSelectionModel] = React.useState(radioChecked);
  radioChecked = selectionModel;

  return (
    <MenuLayout>
      <h1>Page3</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </MenuLayout>
  );
};

export default Page3;

/*

      <Typography>現在：{contextVal}</Typography>

*/
