
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import {
    MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBModalDialog,
    MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse, MDBModal,
    MDBIcon, MDBInputGroup, MDBBtn, MDBDropdown, MDBDropdownToggle,
    MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter,
    MDBDropdownMenu, MDBDropdownItem, MDBBadge, MDBRipple, MDBCard as Card,
    MDBCardTitle as CardTitle, MDBCardBody as CardBody, MDBCardText as CardText,
    MDBCardImage as CardImage, MDBCol as Col, MDBRow as Row, MDBContainer as Container,
} from "mdb-react-ui-kit";
import "../../index.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Products = () => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [openNav, setOpenNav] = useState(false);
    const [product, setProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [error, setError] = useState("");
    const users = JSON.parse(localStorage.getItem('user'));
    const userId = users.user._id

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
        if (quality === 'All') {
            setFilteredProduct(product);
        } else {
            const filtered = product.filter(prod => prod.quality.toLowerCase() === quality.toLowerCase());
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
            const { data } = await axios.post(`${process.env.REACT_APP_API}add-to-cart`, addItems, config);
            toast.success(data.message);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const addToCart = (prodId) => {
        const formData = new FormData();

        formData.append('userID', userId);
        formData.append('prodID', prodId);
        formData.append('status', 'onCart');

        // console.log(userId, prodId)

        addToCartItem(formData);
    }

    return (
        <>
            {/* NAVBAR */}
            <div style={{ paddingBottom: "0px" }}>
                <div style={{ paddingBottom: "60px", }} position="fixed">
                    <MDBNavbar
                        fixed="top"
                        expand="lg"
                        light
                        bgColor="dark"
                        style={{ padding: "20px" }}
                    >
                        <MDBContainer fluid>
                            <Link to="/" style={{ color: "white" }}>
                                <MDBNavbarBrand style={{ color: "white", fontSize: "20px" }}>
                                    No Waste
                                </MDBNavbarBrand>
                                <MDBNavbarToggler
                                    type="button"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                    onClick={() => setOpenNav(!openNav)}
                                >
                                    <MDBIcon icon="bars" fas />
                                </MDBNavbarToggler>
                            </Link>

                            <MDBCollapse navbar open={openNav}>
                                <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                                    {" "}
                                    <MDBNavbarItem>
                                        <Link
                                            to="/products"
                                            style={{
                                                color: "white",
                                                // marginRight: "20px",
                                                fontSize: "15px",
                                            }}
                                        >
                                            <MDBIcon fas icon="info-circle" className="me-1" />
                                            Products
                                        </Link>
                                        <Link
                                            to="/aboutus"
                                            style={{
                                                color: "white",
                                                marginLeft: "15px",
                                                fontSize: "15px",
                                            }}
                                        >
                                            About Us
                                        </Link>
                                        <Link
                                            to={`/user/added-cart/${userId}`}
                                            style={{
                                                color: "white",
                                                marginLeft: "15px",
                                                fontSize: "15px",
                                            }}
                                        >
                                            <i class="fa-brands fa-opencart" style={{ color: '#B197FC' }}></i>
                                        </Link>
                                    </MDBNavbarItem>
                                </MDBNavbarNav>

                                <MDBNavbarNav
                                    style={{ justifyContent: "right" }}
                                    className="mr-auto mb-2 mb-lg-0"
                                >
                                    <div className="d-flex align-items-center">
                                        {user && user.role === "buyer" && (
                                            <MDBNavbarItem>
                                                <span id="cart" className="ml-3">
                                                    <MDBIcon
                                                        fas
                                                        icon="cart-plus"
                                                        aria-label="add to shopping cart"
                                                        href="/cart"
                                                        style={{
                                                            color: "white",
                                                            paddingRight: "10px",
                                                            paddingLeft: "5px",
                                                        }}
                                                        size="lg"
                                                    ></MDBIcon>
                                                    <MDBBadge notification pill color="danger">
                                                        4
                                                    </MDBBadge>
                                                </span>
                                            </MDBNavbarItem>
                                        )}
                                        {user && user.role === "admin" && (
                                            <MDBNavbarItem>
                                                <Link
                                                    to="/dashboard"
                                                    style={{
                                                        color: "white",
                                                        marginRight: "5px",
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    <MDBIcon fas icon="tachometer-alt" className="me-1" />
                                                    Admin Dashboard
                                                </Link>
                                            </MDBNavbarItem>
                                        )}
                                        {user && user.role === "seller" && (
                                            <MDBNavbarItem>
                                                <Link
                                                    to="/sellerdashboard"
                                                    style={{
                                                        color: "white",
                                                        marginRight: "5px",
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    <MDBIcon fas icon="tachometer-alt" className="me-1" />
                                                    Seller Dashboard
                                                </Link>
                                            </MDBNavbarItem>
                                        )}

                                        {user ? (
                                            <MDBNavbarItem>
                                                <div className="d-flex align-items-center">
                                                    <span
                                                        style={{
                                                            color: "white",
                                                            marginLeft: "10px",
                                                            fontSize: "20px",
                                                        }}
                                                    >
                                                        Welcome {user && user.name}
                                                    </span>
                                                    <MDBDropdown>
                                                        <MDBDropdownToggle
                                                            tag="a"
                                                            className="nav-link"
                                                            role="button"
                                                            style={{ fontSize: "0px" }}
                                                        >
                                                            <Avatar>
                                                                {user.avatar && (
                                                                    <img
                                                                        src={user.avatar.url}
                                                                        alt={user.name}
                                                                        style={{ maxWidth: "50px" }}
                                                                    />
                                                                )}
                                                            </Avatar>
                                                        </MDBDropdownToggle>
                                                        <MDBDropdownMenu
                                                            className="dropdown-menu-lg-right"
                                                            style={{ padding: "12px", fontSize: "17px" }}
                                                        >
                                                            <Link to="/profile" style={{ color: "black" }}>
                                                                <MDBDropdownItem style={{ paddingBottom: "3px" }}>
                                                                    <MDBIcon
                                                                        fas
                                                                        icon="user-circle"
                                                                        className="me-1"
                                                                    />
                                                                    My Profile
                                                                </MDBDropdownItem>
                                                            </Link>

                                                            <MDBDropdownItem style={{ paddingBottom: "3px" }}>
                                                                <a
                                                                    onClick={logoutHandler}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        color: "black",
                                                                        marginRight: "20px",
                                                                    }}
                                                                >
                                                                    <MDBIcon
                                                                        fas
                                                                        icon="sign-out-alt"
                                                                        className="me-1"
                                                                    />
                                                                    Logout
                                                                </a>
                                                            </MDBDropdownItem>
                                                        </MDBDropdownMenu>
                                                    </MDBDropdown>
                                                </div>
                                            </MDBNavbarItem>
                                        ) : (
                                            <Fragment>
                                                <Link to="/login">
                                                    <MDBBtn className="me-1" color="light" rippleColor="dark">
                                                        Login
                                                    </MDBBtn>
                                                </Link>
                                                <Link to="/register">
                                                    <MDBBtn className="me-1" color="dark">
                                                        Register
                                                    </MDBBtn>
                                                </Link>
                                            </Fragment>
                                        )}
                                    </div>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                </div>
            </div>
            <Header />
            <div>
                <main class="my-3 gx-2">
                    <div className="container">
                        <div className="container text-center">
                            <div className="card">
                                <figure class="text-center">
                                    <blockquote class="blockquote">
                                        <p>
                                            "A Zero Waste Lifestyle is a journey. Not a destination."
                                        </p>
                                    </blockquote>
                                    <figcaption class="blockquote-footer">
                                        Someone famous in{" "}
                                        <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <hr className="hr hr-blurry" />
                        <br />
                        <div>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => filterProducts('Underripped')}>
                                Underripped
                            </MDBBtn>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => filterProducts('Spoiled')}>
                                Spoiled
                            </MDBBtn>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => filterProducts('Wilted')}>
                                Wilted
                            </MDBBtn>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => filterProducts('Good')}>
                                Good
                            </MDBBtn>
                            <MDBBtn color='light' rippleColor='dark' onClick={() => filterProducts('Overripe')}>
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
                                                <MDBBtn color='dark' rippleColor='dark' disabled={product.sack === 0} onClick={() => addToCart(product._id)}>
                                                    Add To Cart
                                                </MDBBtn>
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
            <Footer />
        </>
    );
}

export default Products