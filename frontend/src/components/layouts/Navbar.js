import React, { useState } from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBNavbar,
  MDBRipple,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);
  const toggleFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    alert("You are now Logout!");
    navigate("/");
  };
  console.log(logoutHandler);
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none"
        style={{ backgroundImage: 'url("../assets/images/waster.png")' }}
      >
        <div className="container">
          <a className="navbar-brand text-white" href="javascript:;">
            No waste System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-header-2"
            aria-controls="navbar-header-2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar-header-2">
            <ul className="navbar-nav mx-auto">
              {/* <li className="nav-item">
                <a className="nav-link text-white" >
                  Home
                </a>
              </li>
              <li className="nav-item nav-link text-white">
                <Link to='/aboutus' style={{ color: "white" }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" >
                  Contact Us
                </a>
              </li> */}
            </ul>
            <ul className="nav navbar-nav">
              <li className="nav-item nav-link text-white">
                <Link to="/homepage" style={{ color: "white" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item nav-link text-white">
                <Link to="/aboutus" style={{ color: "white" }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white">Contact Us</a>
              </li>
              {/* <li className="nav-item nav-link text-white"  >
                <Link to='/login' style={{ color: "white" }}>
                  <MDBIcon fas icon="user-plus" />
                </Link>
              </li> */}
              <li className="nav-item nav-link text-white">
                <Link to="/dashboard" style={{ color: "white" }}>
                  Dashboard
                </Link>
              </li>

              <li className="nav-item nav-link text-white">
                <a onClick={logoutHandler}>
                  <i
                    class="fa-solid fa-user-xmark"
                    style={{ cursor: "pointer" }}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
