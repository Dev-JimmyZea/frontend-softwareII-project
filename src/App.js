import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/login/Login"
import Home from "./components/sites/Home"
import ListForums from "./components/sites/ListForums"
import Item from "./components/sites/Item"
import Users from "./components/sites/Users"
import Careers from "./components/sites/Careers"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const App = () => {


  useEffect(() => {
    const token = localStorage.getItem('token')
    const expired = token ? JSON.parse(atob(token.split('.')[1])).exp < Date.now() / 1000 : false
    
    if(expired){
      localStorage.clear()
    }

    const random = Math.floor(Math.random() * 15) + 1
    const url = `https://www.uptc.edu.co/sitio/export/sites/default/portal/.galleries/gal_fon_por/2sem_2021/fot_port_uptc_0${random}.jpg`
    const bodyContainer = document.getElementById('body-container')
    if (bodyContainer) {
      bodyContainer.style.background = `url(${url}) no-repeat center center fixed`
      bodyContainer.style.backgroundSize = 'cover'
    }

  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login pathname={window.location.pathname} />} />
        <Route exact path="/news/:id" element={<Item object={'news'} />} />
        <Route exact path="/work" element={<Home />} />
        <Route exact path="/work/:id" element={<Item object={'work'} />} />
        <Route exact path="/forum" element={<ListForums />} />
        <Route exact path="/superadmin-users" element={<Users />} />
        <Route exact path="/superadmin-careers" element={<Careers />} />
        <Route path="*" element={<Home no_match={true} />} />

      </Routes>
    </Router>
  )
}

export default App
