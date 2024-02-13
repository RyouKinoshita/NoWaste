import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import '../index.css'

const Header = () => {
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
                <a className="nav-link text-white" href="javascript:;">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="javascript:;">
                  Contact Us
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-white" href="https://twitter.com/CreativeTim">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white mx-2" href="https://www.facebook.com/CreativeTim">
                  <i className="fab fa-facebook" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="https://www.instagram.com/CreativeTimOfficial">
                  <i className="fab fa-instagram" />
                </a>
              </li>
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