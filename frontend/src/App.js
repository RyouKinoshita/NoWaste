import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Login from "./components/user/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={< Login />} caseSensitive={true}/>
          <Route path="/homepage" element={< Homepage />} exact="true"/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
