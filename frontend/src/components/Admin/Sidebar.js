import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Sidebar = () => {
  return (
    <MDBCard className="rounded" style={{ height: "100%" }}>
      <MDBCardBody className="d-flex flex-column">
        <div className="sidebar-wrapper">
          <MDBListGroup className="list-group-flush">
            <MDBListGroupItem>
              <Link to="/admin/productslist" className="nav-link">
                <MDBIcon icon="box" className="me-2" /> Products
              </Link>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <Link to="/admin/userslist" className="nav-link">
                <MDBIcon icon="users" className="me-2" /> Users
              </Link>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <Link to="/orders" className="nav-link">
                <MDBIcon icon="clipboard-list" className="me-2" /> Orders
              </Link>
            </MDBListGroupItem>
          </MDBListGroup>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Sidebar;
