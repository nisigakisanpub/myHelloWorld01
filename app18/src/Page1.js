import React from "react";
import { MyContext } from "./App";
import { TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuLayout from "./MenuLayout";

const Page1 = (props) => {
  const { isMenu } = props;
  const location = useLocation();
  console.log(location);
  console.log(props);
  // const { isMenu } = location.state;

  const { contextVal, setContextVal } = React.useContext(MyContext);
  //const [value, setValue] = React.useState("default");

  React.useEffect(() => {
    console.log("ueEffect@Page1" + "isMenu:");
  }, []);

  function onChangeText(event) {
    const text = event.target.value;
    setContextVal(text);
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
        <Typography>現在：{contextVal}</Typography>
        <Typography>location：{location.pathname}</Typography>
      </div>
    </MenuLayout>
  );
};

export default Page1;
