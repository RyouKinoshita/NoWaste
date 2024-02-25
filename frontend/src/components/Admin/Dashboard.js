import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Dashboard = () => {
  return (
    <div>
      <>
        <Navbar />
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to the Admin Dashoard!</p>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Dashboard;
