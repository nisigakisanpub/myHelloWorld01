import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export const ChangeContext = React.createContext();

function App() {
  const [chageContext, setChangeContext] = React.useState("");

  return (
    <div>

        <BrowserRouter>
          <Switch>
            <Route path="/" component={Page1} exact />
            <Route path="/page1" component={Page1} exact />
            <Route path="/page2" component={Page2} exact />
            <Route path="/page3" component={Page3} exact />
          </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;

/*
      <ChangeContext.Provider value={{ chageContext, setChangeContext }}>
      </ChangeContext.Provider>

*/