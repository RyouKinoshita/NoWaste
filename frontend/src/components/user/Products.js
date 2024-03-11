import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBModalDialog,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBModal,
  MDBIcon,
  MDBInputGroup,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
  MDBRipple,
  MDBCard as Card,
  MDBCardTitle as CardTitle,
  MDBCardBody as CardBody,
  MDBCardText as CardText,
  MDBCardImage as CardImage,
  MDBCol as Col,
  MDBRow as Row,
  MDBContainer as Container,
} from "mdb-react-ui-kit";
import "../../index.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

const Products = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [error, setError] = useState("");
  const users = JSON.parse(localStorage.getItem("user"));
  const userId = users && users.user ? users.user._id : null;

  // console.log(userId)

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:4001/api/v1/logout`);

      setUser("");

      logout(() => navigate("/"));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const logoutHandler = () => {
    logoutUser();

    toast.success("Logged out", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    localStorage.clear();
    navigate("/");
  };
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
        setFilteredProduct(data.products);
        //console.log(data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getAllProducts();
    setUser(getUser());
  }, []);

  const filterProducts = (quality) => {
    if (quality === "All") {
      setFilteredProduct(product);
    } else {
      const filtered = product.filter(
        (prod) => prod.quality.toLowerCase() === quality.toLowerCase()
      );
      setFilteredProduct(filtered);
    }
  };

  //CART DISPATCH IN THE DATABASE
  const addToCartItem = async (addItems) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/add-to-cart`,
        addItems,
        config
      );
      toast.success(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const addToCart = (prodId) => {
    const formData = new FormData();

    formData.append("userID", userId);
    formData.append("prodID", prodId);
    formData.append("status", "onCart");

    // console.log(userId, prodId)

    addToCartItem(formData);
  };

  return (
    <>
      <div>
        <main class="my-3 gx-2">
          <div className="container">
            <br />
            <div>
              <MDBBtn
                color="light"
                rippleColor="dark"
                onClick={() => filterProducts("Underripped")}
              >
                Underripped
              </MDBBtn>
              <MDBBtn
                color="light"
                rippleColor="dark"
                onClick={() => filterProducts("Spoiled")}
              >
                Spoiled
              </MDBBtn>
              <MDBBtn
                color="light"
                rippleColor="dark"
                onClick={() => filterProducts("Wilted")}
              >
                Wilted
              </MDBBtn>
              <MDBBtn
                color="light"
                rippleColor="dark"
                onClick={() => filterProducts("Good")}
              >
                Good
              </MDBBtn>
              <MDBBtn
                color="light"
                rippleColor="dark"
                onClick={() => filterProducts("Overripe")}
              >
                Overripe
              </MDBBtn>
            </div>
            <div className="container">
              <div className="row my-5">
                {filteredProduct.map((product, index) => (
                  <div key={index} className="col-md-3 mb-2">
                    <Card style={{ height: "500px", width: "270px" }}>
                      {product.images.map((image, index) => (
                        <MDBRipple
                          key={index}
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image hover-overlay"
                        >
                          <CardImage
                            src={image.url}
                            fluid
                            alt={product.name}
                            style={{ height: "220px", width: "350px" }}
                          />
                          <a>
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      ))}
                      <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardText>Price: ₱{product.price}</CardText>
                        <CardText>Sack: {product.sack}</CardText>
                        <CardText>Quality: {product.quality}</CardText>
                        <CardText>Description: {product.description}</CardText>
                        <CardText>Seller: {product.seller}</CardText>
                        <CardText>Location: {product.location}</CardText>
                        {user && user.role === "buyer" ? (
                          <MDBBtn
                            color="dark"
                            rippleColor="dark"
                            disabled={product.sack === 0}
                            onClick={() => addToCart(product._id)}
                          >
                            Add To Cart
                          </MDBBtn>
                        ) : user &&
                          (user.role === "admin" || user.role === "seller") ? (
                          <MDBBtn
                            color="dark"
                            rippleColor="dark"
                            disabled="true"
                          >
                            Must be a buyer to access this
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            color="dark"
                            rippleColor="dark"
                            onClick={() => navigate("/login")}
                          >
                            Log in first to access this
                          </MDBBtn>
                        )}
                        {/* Modal code here */}
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Products;
