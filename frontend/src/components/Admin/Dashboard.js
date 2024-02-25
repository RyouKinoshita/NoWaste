import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Sidebar from "../Admin/Sidebar";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBIcon,
} from "mdb-react-ui-kit";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
