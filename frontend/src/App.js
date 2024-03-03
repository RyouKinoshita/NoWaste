import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Dashboard from "./components/Admin/Dashboard";
import UsersList from "./components/Admin/Users/UsersList";
import UpdateUser from "./components/Admin/Users/UpdateUser";
import ProductsList from "./components/Admin/Products/ProductsList";
import NewProduct from "./components/Admin/Products/NewProduct";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from "./components/Layout/Aboutus";

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
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/productslist" element={<ProductsList />} />
        <Route path="/admin/newproduct" element={<NewProduct />} />
        <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}

export default App;
