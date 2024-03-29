import React, { Fragment, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import "../../index.css";
import { getUser, logout } from "../utils/helpers";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import UpdateProfile from "../User/UpdateProfile";
import UsersOrders from "./UserProfile/UsersOrders";

const Profile = () => {
  const [user, setUser] = useState("");
  const userId = user._id;

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <Link to="/">Home</Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <span>User Profile</span>
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol lg="12">
              <UpdateProfile />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default Profile;
