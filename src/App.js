import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/sites/Home";
import Forum from "./components/sites/Forum";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<Home />} />
      <Route path="/work" element={<Home />} />
      <Route path="/work/:id" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
    </Routes>
  </Router>
);

export default App;
