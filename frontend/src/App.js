import React, { useState } from "react";
import Homepage from "./components/Homepage";
import { Routes, Route } from 'react-router-dom';
import Aboutus from "./components/layouts/Aboutus";


function App() {
  return (
    <>
      <Routes >
      <Route path='/' element={<Homepage/>} />
      <Route path='/aboutus' element={<Aboutus/>} />
      </Routes>

    </>
  );
}

export default App;
