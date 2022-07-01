import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export const MyContext = React.createContext();

export var locationKey = "";
export function setLocationKey(value) {
  locationKey = value;
}

function App() {
  const [contextVal, setContextVal] = React.useState("");

  return (
    <div>
      <MyContext.Provider value={{ contextVal, setContextVal }}>
        <BrowserRouter>
          <Route path="/" component={Home} exact />
          <Route path="/page1" component={Page1} exact />
          <Route path="/page2" component={Page2} exact />
          <Route path="/page3" component={Page3} exact />
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;

/*
          <Route path="/" render={() => <Page1 isMenu={true}/>} exact  />

*/
