import React, { useState } from "react";
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
} from "mdb-react-ui-kit";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    alert("You are now logged out!");
    navigate("/");
  };

  return (
    // <header>
    //   <nav
    //     className="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none"
    //     style={{ backgroundImage: 'url("../assets/images/waster.png")' }}
    //   >
    //     <div className="container">
    //       <a className="navbar-brand text-white" href="javascript:;">
    //         No Waste
    //       </a>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#navbar-header-2"
    //         aria-controls="navbar-header-2"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbar-header-2">
    //         <ul className="navbar-nav mx-auto">{/* ... */}</ul>
    //         <ul className="nav navbar-nav">
    //           <li className="nav-item nav-link text-white">
    //             <Link to="/homepage" style={{ color: "white" }}>
    //               <MDBIcon fas icon="home" className="me-1" />
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item nav-link text-white">
    //             <Link to="/aboutus" style={{ color: "white" }}>
    //               <MDBIcon fas icon="info-circle" className="me-1" />
    //               About Us
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link text-white">
    //               <MDBIcon fas icon="address-book" className="me-1" />
    //               Contact Us
    //             </a>
    //           </li>
    //           <li className="nav-item nav-link text-white">
    //             <Link to="/dashboard" style={{ color: "white" }}>
    //               <MDBIcon fas icon="tachometer-alt" className="me-1" />
    //               Dashboard
    //             </Link>
    //           </li>

    //           <li className="nav-item nav-link text-white">
    //             <a onClick={logoutHandler} style={{ cursor: "pointer" }}>
    //               <MDBIcon fas icon="sign-out-alt" className="me-1" />
    //               Logout
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
    <div
      style={{
        padding: "20px",
        backgroundImage: 'url("../assets/images/waster.png")',
      }}
      position="fixed"
    >
      <MDBNavbar expand="lg" light bgColor="light" style={{ padding: "20px" }}>
        <MDBContainer fluid>
          <Link to="/homepage" style={{ color: "white" }}>
            <MDBNavbarBrand href="#">No Waste</MDBNavbarBrand>
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
            <MDBNavbarNav className="mr-auto">
              {/* Left-aligned items */}
              <MDBNavbarItem>
                <Link to="/aboutus" style={{ color: "black" }}>
                  <MDBIcon fas icon="info-circle" className="me-1" />
                  About Us
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to="/contactus" style={{ color: "black" }}>
                  <MDBIcon fas icon="address-book" className="me-1" />
                  Contact Us
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to="/dashboard" style={{ color: "black" }}>
                  <MDBIcon fas icon="tachometer-alt" className="me-1" />
                  Dashboard
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarNav className="ml-auto">
              {/* Right-aligned items */}
              <MDBNavbarItem>
                <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
                  <input
                    className="form-control"
                    placeholder="Type query"
                    aria-label="Search"
                    type="Search"
                  />
                  <MDBBtn outline>Search</MDBBtn>
                </MDBInputGroup>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <a
                  onClick={logoutHandler}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  <MDBIcon fas icon="sign-out-alt" className="me-1" />
                  Logout
                </a>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
