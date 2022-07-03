import React from "react";
import { TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuLayout from "../MenuLayout";

import { MyContext } from "../App";
import { locationKey, setLocationKey } from "../App";

const Page1 = (props) => {
  const location = useLocation();
  console.log(location);
  console.log(props);

  /** Contextの利用 */
  const { contextVal, setContextVal } = React.useContext(MyContext);
  //const [value, setValue] = React.useState("default");

  /** PerformanceNavigationTimingを利用してブラウザバック検出しようとしたがNG */
  var perfEntries = performance.getEntriesByType("navigation");
  //const lastEntry = perfEntries.slice(-1)[0];
  const lastEntry = perfEntries[0];

  React.useEffect(() => {
    console.log(
      "ueEffect@Page1 " + "location: " + locationKey + " -> " + location.key
    );
    setLocationKey(location.key);

    /** pageshowイベント取れず */
    // window.addEventListener('pageshow', (event) => {
    //   if (event.persisted) {
    //     console.log('This page was restored from the bfcache.');
    //   } else {
    //     console.log('This page was loaded normally.');
    //   }
    // });
  });

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
        <Typography>どうやってたどり着いた：{lastEntry.type}</Typography>
      </div>
    </MenuLayout>
  );
};

export default Page1;
