import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/sites/Home";
import ListForums from "./components/sites/ListForums";
import ValidateUser from "./components/login/UserVerification";
import News from "./components/sites/News";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<ValidateUser><News /></ValidateUser>} />
      <Route path="/work" element={<Home />} />
      <Route path="/work/:id" element={<ValidateUser><Home /></ValidateUser>} />
      <Route path="/forum" element={<ListForums />} />
      <Route path="/forum/:code" element={<ValidateUser><ListForums /></ValidateUser>} />
    </Routes>
  </Router>
);

export default App;
