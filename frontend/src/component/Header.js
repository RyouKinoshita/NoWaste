import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import '../index.css'

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem

} from 'mdb-react-ui-kit';


const Header = () => {
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);

  const toggleFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);

  return (

    <header classname="page-header min-vh-100" >


      <nav className="navbar navbar-expand-lg navbar-dark  bg-dark navbar-absolute ">
        <div className="container color='white'">
          <a className="navbar-brand text-white" href="javascript:;">NO WASTE</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-header-2" aria-controls="navbar-header-2" aria-expanded="false" aria-label="Toggle navigation">
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
                <MDBModal tabIndex='-1' open={fullscreenXlModal} setOpen={setFullscreenXlModal}>
                  <MDBModalDialog size='fullscreen'>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>TUP-TAGUIG</MDBModalTitle>
                        <MDBBtn
                          type='button'
                          className='btn-close'
                          color='none'
                          onClick={toggleFullScreen}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>...</MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn type='button' color='secondary' onClick={toggleFullScreen}>
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

              <div className="nav-item ml-auto">
                <MDBDropdown>
                  <MDBDropdownToggle outline rounded>
                    Others
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <a className="nav-link text-black" onClick={toggleFullScreen}>
                        Option 1
                      </a>
                      <MDBModal tabIndex='-1' open={fullscreenXlModal} setOpen={setFullscreenXlModal}>
                        <MDBModalDialog size='fullscreen'>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <MDBModalTitle>TUP-TAGUIG</MDBModalTitle>
                              <MDBBtn
                                type='button'
                                className='btn-close'
                                color='none'
                                onClick={toggleFullScreen}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>...</MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn type='button' color='secondary' onClick={toggleFullScreen}>
                                Close
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <a className="nav-link text-black" onClick={toggleFullScreen}>
                        Option 2
                      </a>
                      <MDBModal tabIndex='-1' open={fullscreenXlModal} setOpen={setFullscreenXlModal}>
                        <MDBModalDialog size='fullscreen'>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <MDBModalTitle>TUP-TAGUIG</MDBModalTitle>
                              <MDBBtn
                                type='button'
                                className='btn-close'
                                color='none'
                                onClick={toggleFullScreen}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>...</MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn type='button' color='secondary' onClick={toggleFullScreen}>
                                Close
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <a className="nav-link text-black" onClick={toggleFullScreen}>
                        Option 3
                      </a>
                      <MDBModal tabIndex='-1' open={fullscreenXlModal} setOpen={setFullscreenXlModal}>
                        <MDBModalDialog size='fullscreen'>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <MDBModalTitle>TUP-TAGUIG</MDBModalTitle>
                              <MDBBtn
                                type='button'
                                className='btn-close'
                                color='none'
                                onClick={toggleFullScreen}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>...</MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn type='button' color='secondary' onClick={toggleFullScreen}>
                                Close
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </div>
            </ul>
          </div>
        </div>
      </nav>



      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem itemId={1}>
          <img src='../assets/images/rr.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src='../assets/images/eee.png' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src='../assets/images/ff.png' className='d-block w-100' alt='...' />
        </MDBCarouselItem>

      </MDBCarousel>
    </header>


  )
}

export default Header