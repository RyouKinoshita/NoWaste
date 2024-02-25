import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import { Link, useNavigate } from "react-router-dom";
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
import Footer from "./Footer";
import "../../index.css";

const Aboutus = () => {
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    alert("You are now Logout!");
    navigate("/");
  };
  console.log(logoutHandler);

  const handleAnimation = () => {
    setAnimationClass("fade-in-out");
    setTimeout(() => {
      setAnimationClass("");
    }, 1000); // Adjust the duration of the animation as needed
  };
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <p>
          <div className={`row ${animationClass}`}>
            <div className="col-md-5 gx-3">
              <MDBRipple
                className="bg-image hover-overlay shadow-1-strong rounded"
                rippleTag="div"
                rippleColor="primary"
                onClick={handleAnimation}
              >
                <img
                  src="../assets/images/grp4.jpg"
                  className="w-100"
                  alt="Your Image"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </div>
            <div className="col-md-7">
              <h3>Bridging waste from Taguig Palengke to Pig farm</h3>
              <p className="text-muted">
                The researchers conclude that this study is a way to create an
                alternative for both the local market and the local pig farms to
                synergize their resources and create a mutual relationship with
                each other. This research focuses on how to make pig farming
                more efficient, less expensive, and at the same time make the
                dry market vendor’s food waste to be the alternative food source
                of pig farms as a way to combat the wastes that these markets
                produce.
              </p>
              <hr />

              <p className="text-muted">
                In this context, the suggested mobile application "NoWaste"
                seeks to connect the demands of pig farming with dry market
                excess, strengthening and sustaining the Philippines'
                agricultural ecology and creating opportunities that help align
                with the government’s efforts in combating the problems with
                waste management.
              </p>

              <MDBBtn outline rounded>
                Learn More <MDBIcon fas icon="book-open" />
              </MDBBtn>
            </div>
          </div>
        </p>
      </div>

      <Footer />
    </>
  );
};

export default Aboutus;
