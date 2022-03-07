import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/sites/Home";
import ListForums from "./components/sites/ListForums";
import News from "./components/sites/News";
import Users from "./components/sites/Users";
import Careers from "./components/sites/Careers";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login pathname={window.location.pathname} />} />
      <Route exact path="/news/:id" element={<News />} />
      <Route exact path="/work" element={<Home />} />
      <Route exact path="/forum" element={<ListForums />} />
      <Route exact path="/superadmin-users" element={<Users />} />
      <Route exact path="/superadmin-careers" element={<Careers />} />
    </Routes>
  </Router>
);

export default App;
