
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

const Header = () => {
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);
  const toggleFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    alert("You are now logged out!");
    navigate("/");
  };
  // console.log(logoutHandler);
  return (
    <header>
      <div
        className="page-header min-vh-50"
        style={{
          backgroundImage: 'url("../assets/images/waster.png")',
          backgroundSize: "cover", // You can adjust this property
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "60vh",
        }}
        loading="lazy"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column my-5">
              <h1 className="text-white mb-6" style={{ fontSize: "4rem" }}>
                Bridging waste from Taguig Palengke to Pig Farms
              </h1>
              <p className="text-white opacity-8 lead pe-5 me-5">
                Strengthening and sustaining the Philippines' agricultural
                ecology and creating opportunities that help align with the
                government’s efforts in combating the problems with waste
                management.
              </p>
              <div className="buttons">
                <button
                  type="button"
                  className="btn text-white shadow-none mt-4"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

