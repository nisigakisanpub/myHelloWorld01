import React from "react";
import { TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuLayout from "../MenuLayout";

import { MyContext } from "../App";

const Page2 = () => {
  const location = useLocation();
  const { contextVal, setContextVal } = React.useContext(MyContext);

  React.useEffect(() => {
    console.log("ueEffect@Page2 ");
  }, []);

  return (
    <MenuLayout>
      <h1>Page2</h1>
      <Typography>現在：{contextVal}</Typography>
      <Typography>location：{location.pathname}</Typography>
    </MenuLayout>
  );
};

export default Page2;
