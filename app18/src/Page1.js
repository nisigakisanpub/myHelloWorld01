import React from "react";
import { ChangeContext } from "./App";
import { TextField } from "@mui/material";
import MenuLayout from "./MenuLayout";

const Page1 = () => {
  //  const { chageContext, setChangeContext } = React.useContext(ChangeContext);
  const [value, setValue] = React.useState("default");

  function onChangeText(event) {
    const text = event.target.value;
    setValue(text);
  }

  return (
    <MenuLayout>
      <div>
        <h1>Page1</h1>

        <TextField
          id="outlined-basic"

          variant="outlined"
          onChange={onChangeText}
        />
      </div>
    </MenuLayout>
  );
};

export default Page1;
