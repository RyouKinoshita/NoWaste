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
} from "mdb-react-ui-kit";
import "../../index.css";

const Header = () => {
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);

  const toggleFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);

  return (
    <header classname="page-header min-vh-100 ">
      <MDBNavbar className="navbar navbar-expand-lg navbar-dark  bg-dark navbar-toggler ">
        <div className="container color='white'">
          <a className="navbar-brand text-white" href="javascript:;">
            NO WASTE
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
              <li className="nav-item">
                <a className="nav-link text-white" href="javascript:;">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" onClick={toggleFullScreen}>
                  About Us
                </a>
                <MDBModal
                  tabIndex="-1"
                  open={fullscreenXlModal}
                  setOpen={setFullscreenXlModal}
                >
                  <MDBModalDialog size="fullscreen">
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle style={{ color: "black" }}>
                          TUP-TAGUIG
                        </MDBModalTitle>
                        <MDBBtn
                          type="button"
                          className="btn-close"
                          color="none"
                          onClick={toggleFullScreen}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody style={{ color: "black" }}>
                        <p>
                          <div class="clearfix">
                            <img
                              src="../assets/images/tup.jpg"
                              class="col-md-6 float-md-end mb-3 ms-md-3"
                              alt="..."
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                            Taguig City, a bustling urban center in the
                            Philippines, is a dynamic locale characterized by
                            its vibrant culture, modern infrastructure, and
                            burgeoning economic opportunities. At the heart of
                            this city lies the district of Bonifacio Global City
                            (BGC), affectionately known as "The Fort" or simply
                            "Fort Bonifacio." Within this district, nestled
                            amidst towering skyscrapers and bustling streets,
                            lies the vibrant community of Tup Taguig. Tup
                            Taguig, an abbreviation for "Taguig Urban Poor,"
                            represents a diverse and resilient community within
                            the city. Despite facing challenges, Tup Taguig
                            embodies a spirit of perseverance and community
                            strength, fostering a rich tapestry of stories,
                            traditions, and aspirations. As Taguig continues to
                            evolve and thrive, Tup Taguig remains an integral
                            part of its cultural landscape, contributing to its
                            vibrancy and diversity.
                            <hr />
                            The researchers conclude that this study is a way to
                            create an alternative for both the local market and
                            the local pig farms to synergize their resources and
                            create a mutual relationship with each other. This
                            research focuses on how to make pig farming more
                            efficient, less expensive, and at the same time make
                            the dry market vendor’s food waste to be the
                            alternative food source of pig farms as a way to
                            combat the wastes that these markets produce. With
                            this in mind, there is a substantial issue of food
                            waste in the local wet markets in Taguig City and it
                            requires an innovative approach. This research will
                            help to identify the pros and cons of the food waste
                            management in the local markets, finding the key to
                            help the local farmers and vendors in the most
                            effective and efficient way. Exploring
                            substitutional solutions for food waste and pig
                            feeds that could affect both the environment and
                            economy will be a great help to our community. With
                            the effort to create a sustainable and efficient
                            platform for both food waste and pig feeds in the
                            Philippines.
                          </div>
                        </p>
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          type="button"
                          color="secondary"
                          onClick={toggleFullScreen}
                        >
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="javascript:;">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="javascript:;">
                  Products
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-item ml-auto">
            <MDBDropdown className="dropstart">
              <MDBDropdownToggle outline rounded>
                <i class="fas fa-user"></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-menu-xxl-end">
                <form className="px-4 py-3 me-5">
                  {/* Email input */}
                  <div className="form-outline mb-4" data-mdb-input-init>
                    <input
                      type="email"
                      id="form1Example1"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form1Example1">
                      Email address
                    </label>
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-4" data-mdb-input-init>
                    <input
                      type="password"
                      id="form1Example2"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form1Example2">
                      Password
                    </label>
                  </div>
                  {/* 2 column grid layout for inline styling */}
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      {/* Checkbox */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="form1Example3"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form1Example3"
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      {/* Simple link */}
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    data-mdb-ripple-init
                  >
                    Sign in
                  </button>
                </form>
                <div className="dropdown-divider" />

                {/* THIS IS MODAL */}

                <a className="dropdown-item" href="#">
                  Forgot password?
                </a>
              </MDBDropdownMenu>
            </MDBDropdown>
            {/* <MDBBtn onClick={toggleOpen}>Register</MDBBtn>
                <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Modal title</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        
                          <form className="px-4 py-3">
                      
                            <div className="form-outline mb-4" data-mdb-input-init>
                              <input type="email" id="form1Example1" className="form-control" />
                              <label className="form-label" htmlFor="form1Example1">Email address</label>
                            </div>
                      
                            <div className="form-outline mb-4" data-mdb-input-init>
                              <input type="password" id="form1Example2" className="form-control" />
                              <label className="form-label" htmlFor="form1Example2">Password</label>
                            </div>
                    
                            <div className="row mb-4">
                              <div className="col d-flex justify-content-center">
                      
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" defaultChecked />
                                  <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                </div>
                              </div>
                              <div className="col">
                     
                                <a href="#!">Forgot password?</a>
                              </div>
                            </div>
                   
                            <button type="submit" className="btn btn-primary btn-block" data-mdb-ripple-init>Sign in</button>
                          </form>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">New around here? Sign up</a>
                          <a className="dropdown-item" href="#">Forgot password?</a>
                   

                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen}>
                          Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal> */}
          </div>
        </div>
      </MDBNavbar>

      <div>
        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem itemId={1}>
            <img
              src="../assets/images/rr.jpg"
              className="d-block w-100"
              style={{ height: "450px", width: "40%", objectFit: "cover" }}
              alt="..."
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img
              src="../assets/images/eee.png"
              className="d-block w-100"
              style={{ height: "450px", width: "40%", objectFit: "cover" }}
              alt="..."
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img
              src="../assets/images/ff.png"
              className="d-block w-100"
              style={{ height: "450px", width: "40%", objectFit: "cover" }}
              alt="..."
            />
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
    </header>
  );
};

export default Header;
