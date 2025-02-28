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
  MDBBadge,
} from "mdb-react-ui-kit";
import "../../index.css";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = user._id;
  // console.log(userId)

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/logout`);

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
    window.location.reload();
    navigate("/");
  };

  useEffect(() => {
    // const getUserCartItem = async () => {
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': `Bearer ${getToken()}`,
    //       },
    //     };
    //     const { data } = await axios.get(`${process.env.REACT_APP_API}/user/get-cartItems/${id}`, config);

    //     setCartItems(data.cartItems);
    //     setSuccess(data.message);
    //   } catch (error) {
    //     setError(error.response.data.message);
    //   }
    // };
    // getUserCartItem();

    setUser(getUser());
  }, []);

  return (
    <div
      style={{
        paddingBottom: "60px",
        // backgroundImage: 'url("../assets/images/waster.png")',
      }}
      position="fixed"
    >
      <MDBNavbar
        fixed="top"
        expand="lg"
        light
        bgColor="dark"
        style={{ padding: "10px" }}
      >
        <MDBContainer fluid>
          <Link to="/" style={{ color: "white" }}>
            <MDBNavbarBrand style={{ color: "white", fontSize: "20px" }}>
              <img
                src="../../../assets/images/logo-no-background.png"
                height="60"
                alt=""
                loading="lazy"
              />
            </MDBNavbarBrand>
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
                  style={{
                    color: "white",
                    marginLeft: "15px",
                    fontSize: "15px",
                  }}
                >
                  <MDBIcon fas icon="info-circle" className="me-1" />
                  About Us
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarNav
              style={{ justifyContent: "right" }}
              className="mr-auto mb-2 mb-lg-0"
            >
              <div className="d-flex align-items-center">
                {user && user.role === "buyer" && (
                  <MDBNavbarItem>
                    <Link
                      to={`/user/added-cart/${userId}`}
                      style={{
                        color: "white",
                        marginLeft: "15px",
                        fontSize: "15px",
                      }}
                    >
                      <i
                        class="fa-brands fa-opencart"
                        style={{ color: "white" }}
                      ></i>
                      <MDBBadge notification pill color="danger">
                        {cartItems.length}
                      </MDBBadge>
                    </Link>
                    <Link
                      to={`/user/orders/${userId}`}
                      style={{
                        color: "white",
                        marginLeft: "15px",
                        fontSize: "15px",
                      }}
                    >
                      <MDBIcon fas icon="list" className="me-1" />
                      Orders
                    </Link>
                  </MDBNavbarItem>
                )}
                {user && user.role === "admin" && (
                  <MDBNavbarItem>
                    <Link
                      to="/dashboard"
                      style={{
                        color: "white",
                        marginRight: "5px",
                        fontSize: "15px",
                      }}
                    >
                      <MDBIcon fas icon="tachometer-alt" className="me-1" />
                      Admin Dashboard
                    </Link>
                  </MDBNavbarItem>
                )}
                {user && user.role === "seller" && (
                  <MDBNavbarItem>
                    <Link
                      to="/sellerdashboard"
                      style={{
                        color: "white",
                        marginRight: "5px",
                        fontSize: "15px",
                      }}
                    >
                      <MDBIcon fas icon="tachometer-alt" className="me-1" />
                      Seller Dashboard
                    </Link>
                  </MDBNavbarItem>
                )}

                {user ? (
                  <MDBNavbarItem>
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          color: "white",
                          marginLeft: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Welcome {user && user.name}
                      </span>
                      <MDBDropdown>
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                          style={{ fontSize: "0px" }}
                        >
                          <Avatar>
                            {user.avatar && (
                              <img
                                src={user.avatar.url}
                                alt={user.name}
                                style={{ maxWidth: "50px" }}
                              />
                            )}
                          </Avatar>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu
                          className="dropdown-menu-lg-right"
                          style={{ padding: "12px", fontSize: "17px" }}
                        >
                          <Link to="/profile" style={{ color: "black" }}>
                            <MDBDropdownItem style={{ paddingBottom: "3px" }}>
                              <MDBIcon
                                fas
                                icon="user-circle"
                                className="me-1"
                              />
                              My Profile
                            </MDBDropdownItem>
                          </Link>

                          <MDBDropdownItem style={{ paddingBottom: "3px" }}>
                            <a
                              onClick={logoutHandler}
                              style={{
                                cursor: "pointer",
                                color: "black",
                                marginRight: "20px",
                              }}
                            >
                              <MDBIcon
                                fas
                                icon="sign-out-alt"
                                className="me-1"
                              />
                              Logout
                            </a>
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </div>
                  </MDBNavbarItem>
                ) : (
                  <Fragment>
                    <Link to="/login">
                      <MDBBtn className="me-1" color="light" rippleColor="dark">
                        Login
                      </MDBBtn>
                    </Link>
                    <Link to="/register">
                      <MDBBtn className="me-1" color="dark">
                        Register
                      </MDBBtn>
                    </Link>
                  </Fragment>
                )}
              </div>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
