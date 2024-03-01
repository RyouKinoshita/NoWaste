import React from "react";
import Navbar from "../Layout/Navbar";
import AdminFooter from "../Layout/Admin/AdminFooter";
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
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>

      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <AdminFooter />
    </div>
  );
};

export default Dashboard;
