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
  MDBIcon
} from "mdb-react-ui-kit";
import "../../index.css";
import { Link } from 'react-router-dom';


const Header = () => {
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);

  const toggleFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);

  return (


    <header >


      <nav className="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none" style={{ backgroundImage: 'url("../assets/images/waster.png")' }} >
        <div className="container">
          <a className="navbar-brand text-white" href="javascript:;">No waste System</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-header-2" aria-controls="navbar-header-2" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar-header-2">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
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
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-white" href="https://twitter.com/CreativeTim">
                <MDBIcon fas icon="user-plus" />
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>


      <div className="page-header min-vh-100" style={{
        backgroundImage: 'url("../assets/images/waster.png")', backgroundSize: 'cover', // You can adjust this property
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
        loading="lazy" >


        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column my-5">
              <h1 className="text-white mb-6" style={{ fontSize: '4rem' }}>Bridging waste from Taguig Palengke to Pig Farms</h1>
              <p className="text-white opacity-8 lead pe-5 me-5">Strengthening and sustaining the Philippines' agricultural ecology and creating opportunities that help align with the government’s efforts in combating the problems with waste management.</p>
              <div className="buttons">
                <button type="button" className="btn btn-white mt-4">Get Started</button>
                <button type="button" className="btn text-white shadow-none mt-4">Read more</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>

  );
};

export default Header;



