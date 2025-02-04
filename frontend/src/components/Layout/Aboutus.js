import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
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

function scrollToNextSection() {
  const nextSection = document.getElementById("nextSection");
  nextSection.scrollIntoView({ behavior: "smooth" });
}

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
      <div className="bg-image d-flex justify-content-center align-items-center">
        <img
          src="../assets/images/wall.jpg"
          className="img-fluid"
          alt="Sample"
        />
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="animated-text-container d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="text-white mb-4 slide-in-from-left">About Us</h1>
            <i class="fas fa-angles-down" onClick={scrollToNextSection}></i>
          </div>
        </div>
      </div>
      <section id="nextSection" style={{ backgroundColor: "white" }} />

      {/* NOWASTE ABOUT */}

      <section className="mb-10 my-5">
        <div className="container md-5">
          <div className="row gx-0 align-items-center">
            {/* First column */}
            <div className="col-lg-6 mb-5 mb-lg-0 animate-on-scroll animate-zoom-in">
              <div
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                  zIndex: 1,
                }}
                className="card rounded-7 me-lg-n5"
              >
                <div className="card-body p-lg-5 shadow-5">
                  <h2 className="fw-bold">
                    <span className="text-primary">No Waste System</span>
                  </h2>
                  <p className="fw-bold">
                    <em>
                      Bridging Waste from New Taytay Public Market(Rizal)
                      Vegetable Vendors to Pig Farm
                    </em>
                  </p>

                  <p className="text-muted mb-4">
                    In this context, the suggested mobile application "NoWaste"
                    seeks to connect the demands of pig farming with dry market
                    excess, strengthening and sustaining the Philippines'
                    agricultural ecology and creating opportunities that help
                    align with the government’s efforts in combating the
                    problems with waste management.
                  </p>
                  <p className="text-muted">
                    The researchers conclude that this study is a way to create
                    an alternative for both the local market and the local pig
                    farms to synergize their resources and create a mutual
                    relationship with each other. This research focuses on how
                    to make pig farming more efficient, less expensive, and at
                    the same time make the dry market vendor’s food waste to be
                    the alternative food source of pig farms as a way to combat
                    the wastes that these markets produce.
                  </p>
                </div>
              </div>
            </div>
            {/* First column */}

            {/* Second column */}
            <div className="col-lg-6 mb-5 mb-lg-0 animate-on-scroll animate-zoom-in">
              <div className="bg-image hover-overlay rounded-7 shadow-4 rotate-lg">
                <img src="../assets/images/grp4.jpg" className="w-100" alt="" />
                <div
                  className="mask"
                  style={{
                    background:
                      "linear-gradient(45deg, hsla(169, 84.5%, 52%, 0.3), hsla(263, 87.7%, 44.7%, 0.3) 100%)",
                  }}
                ></div>
              </div>
            </div>
            {/* Second column */}
          </div>
        </div>
      </section>
      <hr className="hr hr-blurry" />
      {/* MULTIPLE IMAGES  */}
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 pic-zoom-in">
            <img
              src="../assets/images/1.jpg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="Hollywood Sign on The Hill"
              style={{ height: 300 }}
            />
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pic-zoom-in-2">
            <img
              src="../assets/images/4.jpg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="Five Lands National Park"
              style={{ height: 300 }}
            />
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pic-zoom-in-3">
            <img
              src="../assets/images/5.jpeg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="Los Angeles Skyscrapers"
              style={{ height: 300 }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 pic-zoom-in-4">
            <img
              src="../assets/images/piggy.jpg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="Skyscrapers"
              style={{ height: 300 }}
            />
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pic-zoom-in-5">
            <img
              src="../assets/images/pigfarm.jpg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="New York City"
              style={{ height: 300 }}
            />
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pic-zoom-in-6">
            <img
              src="../assets/images/1.jpg"
              className="img-fluid rounded-4 shadow-2-strong"
              alt="American Home"
              style={{ height: 300 }}
            />
          </div>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <h3 align="center">Future Features Planned</h3>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "30vh" }}
      >
        <div className="container">
          <div
            className="row justify-content-center"
            style={{ textAlign: "center" }}
          >
            <div className="col-lg-3 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
              <i className="fas fa-cubes fa-3x text-primary mb-4 zoom-in" />
              <h5 className="text-primary fw-bold mb-3 ">Physical Store</h5>
              <h6 className="fw-normal mb-0">Integration</h6>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0" />
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
              <i className="fas fa-map-location fa-3x text-primary mb-4 zoom-in" />
              <h5 className="text-primary fw-bold mb-3">Live Map</h5>
              <h6 className="fw-normal mb-0">Order Tracking</h6>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0" />
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
              <i className="fas fa-tags fa-3x text-primary mb-4 zoom-in" />
              <h5 className="text-primary fw-bold mb-3">Pricing Standards</h5>
              <h6 className="fw-normal mb-0">For Economic Viability</h6>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0" />
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* CODER SECTION */}

      <section>
        <div
          className="bg-image"
          style={{
            backgroundImage:
              "url(https://mdbootstrap.com/img/Photos/new-templates/glassmorphism-article/img2.jpg)",
            height: 500,
          }}
        >
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="card mask-custom py-5 text-black">
                    <div className="card-body">
                      <img
                        className="rounded-circle shadow-2-strong mb-5"
                        src="../assets/images/ryou.jpg"
                        alt="avatar"
                        style={{ width: 100 }}
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={200}
                      />
                      <h5
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={300}
                      >
                        Ryou G. Kinoshita{" "}
                      </h5>
                      <p
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={400}
                      >
                        Backend Developer
                      </p>
                      <ul className="list-unstyled mb-0">
                        <a
                          href="https://www.facebook.com/kinoshtaryou"
                          className="px-1"
                        >
                          <i
                            className="fab fa-facebook text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={600}
                          />
                        </a>
                        <a
                          href="https://github.com/RyouKinoshita"
                          className="px-1"
                        >
                          <i
                            className="fab fa-github text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={500}
                          />
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="card mask-custom py-5 text-black">
                    <div className="card-body">
                      <img
                        className="rounded-circle shadow-2-strong mb-5"
                        src="../assets/images/kel.jpg"
                        alt="avatar"
                        style={{ width: 100 }}
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={200}
                      />
                      <h5
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={300}
                      >
                        Kellyn B. Codon
                      </h5>
                      <p
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={400}
                      >
                        Frontend Developer
                      </p>
                      <ul className="list-unstyled mb-0">
                        <a href="#!" className="px-1">
                          <i
                            className="fab fa-facebook-f text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={500}
                          />
                        </a>
                        <a href="https://github.com/itsk2" className="px-1">
                          <i
                            className="fab fa-github text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={500}
                          />
                        </a>
                        <a
                          href="#https://www.instagram.com/kewin_sy/!"
                          className="px-1"
                        >
                          <i
                            className="fab fa-instagram text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={700}
                          />
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-0">
                  <div className="card mask-custom py-5 text-black">
                    <div className="card-body">
                      <img
                        className="rounded-circle shadow-2-strong mb-5"
                        src="../assets/images/ians.png "
                        lt="avatar"
                        style={{ width: 100, height: 135 }}
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={200}
                      />
                      <h5
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={300}
                      >
                        Christian S. Paningbatan
                      </h5>
                      <p
                        className="mb-4"
                        data-mdb-toggle="animation"
                        data-mdb-animation-start="onLoad"
                        data-mdb-animation="fade-in-down"
                        data-mdb-animation-duration={1000}
                        data-mdb-animation-delay={400}
                      >
                        Frontend Developer
                      </p>
                      <ul className="list-unstyled mb-0">
                        <a
                          href="https://www.facebook.com/Kleeeeptomacy"
                          className="px-1"
                        >
                          <i
                            className="fab fa-facebook-f text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={500}
                          />
                        </a>
                        <a href="https://github.com/Dottyyyyy" className="px-1">
                          <i
                            className="fab fa-github text-black"
                            data-mdb-toggle="animation"
                            data-mdb-animation-start="onLoad"
                            data-mdb-animation="fade-in-down"
                            data-mdb-animation-duration={1000}
                            data-mdb-animation-delay={500}
                          />
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Aboutus;
