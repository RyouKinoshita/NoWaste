import React from "react";
import Header from "./Layout/Header";
import Body from "./Layout/Body";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";

const Homepage = () => {
  return (
    <div>
      <>
        <div style={{ paddingBottom: "10px" }}>
          <Navbar />
        </div>

        <Header />
        <Body />
        <Footer />
      </>
    </div>
  );
};

export default Homepage;
