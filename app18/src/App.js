import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  return (
    <div> 
      <Router>
        <Switch>
          <Route path="/" component={Page1} exact />
          <Route path="/page1" component={Page1} exact />
          <Route path="/page2" component={Page2} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;


