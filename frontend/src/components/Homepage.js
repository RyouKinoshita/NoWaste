import React from "react";
import Header from "./layouts/Header";
import Body from "./layouts/Body";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

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
