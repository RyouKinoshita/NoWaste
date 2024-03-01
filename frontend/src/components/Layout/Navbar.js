import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import Avatar from "@mui/material/Avatar";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBInputGroup,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import "../../index.css";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:4001/api/v1/logout`);

      setUser("");

      logout(() => navigate("/"));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logoutHandler = () => {
    logoutUser();

    toast.success("Logged out", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: 'url("../assets/images/waster.png")',
      }}
      position="fixed"
    >
      <MDBNavbar
        fixed="top"
        expand="lg"
        light
        bgColor="dark"
        style={{ padding: "20px" }}
      >
        <MDBContainer fluid>
          <Link to="/homepage" style={{ color: "white" }}>
            <MDBNavbarBrand style={{ color: "white" }}>No Waste</MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setOpenNav(!openNav)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
          </Link>

          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              {" "}
              <MDBNavbarItem>
                <Link
                  to="/aboutus"
                  style={{ color: "white", marginRight: "20px" }}
                >
                  <MDBIcon fas icon="info-circle" className="me-1" />
                  About Us
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link
                  to="/contactus"
                  style={{ color: "white", marginRight: "20px" }}
                >
                  <MDBIcon fas icon="address-book" className="me-1" />
                  Contact Us
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarNav
              style={{ justifyContent: "right" }}
              className="mr-auto mb-2 mb-lg-0"
            >
              <div className="d-flex align-items-center">
                <MDBNavbarItem></MDBNavbarItem>
                <MDBNavbarItem></MDBNavbarItem>
              </div>
              <div className="d-flex align-items-center">
                <MDBNavbarItem>
                  <span id="cart" className="ml-3">
                    <MDBIcon
                      fas
                      icon="cart-plus"
                      aria-label="add to shopping cart"
                      href="/cart"
                      style={{ color: "white" }}
                    ></MDBIcon>
                  </span>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <div className="d-flex align-items-center">
                    <Avatar>
                      {user.avatar && (
                        <img
                          src={user.avatar.url}
                          alt={user.name}
                          style={{ maxWidth: "50px" }}
                        />
                      )}
                    </Avatar>
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag="a"
                        className="nav-link"
                        role="button"
                      >
                        {/* {user.name} */}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem>
                          <Link
                            to="/dashboard"
                            style={{ color: "black", marginRight: "20px" }}
                          >
                            <MDBIcon
                              fas
                              icon="tachometer-alt"
                              className="me-1"
                            />
                            Dashboard
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <a
                            onClick={logoutHandler}
                            style={{
                              cursor: "pointer",
                              color: "black",
                              marginRight: "20px",
                            }}
                          >
                            <MDBIcon fas icon="sign-out-alt" className="me-1" />
                            Logout
                          </a>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <span style={{ color: "white" }}>{user && user.name}</span>
                  </div>
                </MDBNavbarItem>
              </div>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
