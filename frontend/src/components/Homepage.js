import React from "react";
import Header from "./Layout/Header";
import Body from "./Layout/Body";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";

const Homepage = () => {
  return (
    <div>
      <>
        {/* <div
          style={{
            padding: "20px",
            backgroundImage: 'url("../assets/images/waster.png")',
          }}
          position="fixed"
        > */}
        <Navbar />
        {/* </div> */}
        <Header />
        <Body />
        <Footer />
      </>
    </div>
  );
};

export default Homepage;
