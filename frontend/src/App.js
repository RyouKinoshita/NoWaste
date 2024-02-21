import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Login from "./components/user/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Aboutus from "./components/layouts/Aboutus";


function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={< Login />} caseSensitive={true}/>
          <Route path="/homepage" element={< Homepage />} exact="true"/>
          <Route path='/' element={<Homepage/>} />
      <Route path='/aboutus' element={<Aboutus/>} />
        </Routes>
      </Router>
      

    </>
  );
}

export default App;
