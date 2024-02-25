import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Dashboard from "./components/Admin/Dashboard";
import UsersList from "./components/Admin/UsersList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from "./components/layouts/Aboutus";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} caseSensitive={true} />
        <Route path="/homepage" element={<Homepage />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/userslist" element={<UsersList />} />
      </Routes>
    </>
  );
}

export default App;
