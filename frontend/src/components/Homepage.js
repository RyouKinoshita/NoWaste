import React from "react";
import Header from "./Layout/Header";
import Body from "./Layout/Body";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";

const Homepage = () => {
  return (
    <div>
      <>
        <Navbar />
        <Header />
        <Body />
        <Footer />
      </>
    </div>
  );
};

export default Homepage;
