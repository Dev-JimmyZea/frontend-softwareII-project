import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/sites/Home";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>

);




export default App;
