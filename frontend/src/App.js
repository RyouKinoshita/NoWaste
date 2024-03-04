import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Dashboard from "./components/Admin/Dashboard";
import Profile from "./components/User/Profile";
import UsersList from "./components/Admin/Users/UsersList";
import UpdateUser from "./components/Admin/Users/UpdateUser";
import ProductsList from "./components/Admin/Products/ProductsList";
import NewProduct from "./components/Admin/Products/NewProduct";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import Aboutus from "./components/Layout/Aboutus";
import ProtectedRoute from "./components/Route/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} caseSensitive={true} />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/profile" element={<Profile />} />
        //Admin routes
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route
          path="/admin/productslist"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/newproduct" element={<NewProduct />} />
        <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}

export default App;
