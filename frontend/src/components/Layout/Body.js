import React, { useState, useEffect } from "react";
import {
  MDBRipple,
  MDBIcon,
  MDBCard,
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import axios from "axios";
import Products from "../User/Products";
import Articles from "../User/Articles";

const Body = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4001/api/v1/products`,
          config
        );
        setProduct(data.products);
        //console.log(data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getAllProducts();
  }, []);

  // console.log(product);

  const [centredModal, setCentredModal] = useState(false);

  const [centredModal1, setCentredModal1] = useState(false);

  const [centredModal2, setCentredModal2] = useState(false);

  const [centredModal3, setCentredModal3] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleOpen1 = () => setCentredModal1(!centredModal1);
  const toggleOpen2 = () => setCentredModal2(!centredModal2);
  const toggleOpen3 = () => setCentredModal3(!centredModal3);

  return (
    <div>
      <main class="my-3 gx-2">
        <div className="container">
          <br />
          {/* <div style={{ width: "100%" }}>
            <iframe
              width={1350}
              height={600}
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=1500&height=600&hl=en&q=G25P+828,%20Taguig,%201630%20Metro%20Manila+(No%20Waste%20System)&t=k&z=14&ie=UTF8&iwloc=B&output=embed"
            >
              &lt;a href="https://www.gps.ie/"&gt;gps devices&lt;/a&gt;
            </iframe>
          </div>
          <hr className="hr hr-blurry" /> */}
          <div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "black" }}>Products</h1>
            </div>
            <Products />
          </div>
          <hr className="hr hr-blurry" />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "black" }}>Articles</h1>
          </div>
          <Articles />
        </div>
      </main>
    </div>
  );
};

export default Body;
