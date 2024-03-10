import React, { Fragment, useEffect, useState, useRef } from "react";
import { getUser, logout } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import { getToken } from "../utils/helpers";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardImage,
    MDBBtn,
    MDBInput,
    MDBInputGroup,
} from 'mdb-react-ui-kit';
import Footer from '../Layout/Footer';
import Navbar from "../Layout/Navbar";
import * as Yup from "yup";

const ProcessCart = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState(null);

    const [cartItems, setCartItems] = useState([])
    const [product, setProduct] = useState([]);
    const [fullPrice, setFullPrice] = useState(0);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const [success, setSuccess] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const users = JSON.parse(localStorage.getItem('user'));
    const userId = users.user._id

    // console.log(formData)
    const { id } = useParams();

    const filteredProducts = product.filter(product =>
        cartItems.some(item => item.prodID === product._id)
    );

    const filteredProductsNames = filteredProducts.map(product => product.price);

    useEffect(() => {
        const getUserCartItem = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${getToken()}`,
                    },
                };
                const { data } = await axios.get(`${process.env.REACT_APP_API}/user/get-cartItems/${id}`, config);

                setCartItems(data.cartItems);
                setSuccess(data.message);
            } catch (error) {
                setError(error.response.data.message);
            }
        };
        const getAllProducts = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
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
        getUserCartItem();
        const totalPrice = cartItems.reduce((total, item) => {
            const prod = product.find(prod => prod._id === item.prodID);
            if (prod) {
                return total + (prod.price * item.quantity);
            }
            return total;
        }, 0);
        setFullPrice(totalPrice);
    }, []);

    // console.log(product)
    const updateQuantity = (prodID, newQuantity, action) => {
        const cartItem = cartItems.find(item => item.prodID === prodID);
        if (!cartItem) {
            return;
        }

        const prod = product.find(prod => prod._id === prodID);
        if (!prod) {
            return;
        }

        if (newQuantity < 0) {
            toast.error("Quantity cannot be less than 1.");
            return;
        }

        let updatedPrice;
        if (action === 'increase') {
            updatedPrice = prod.price * newQuantity;
        } else if (action === 'decrease') {
            updatedPrice = prod.price * newQuantity;
        }

        const updatedCartItems = cartItems.map(item => {
            if (item.prodID === prodID) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        const updatedProducts = product.map(p => {
            if (p._id === prodID) {
                const newSack = p.sack + cartItem.quantity - newQuantity;
                return { ...p, quantity: newQuantity, sack: newSack };
            }
            return p;
        });

        setCartItems(updatedCartItems);
        setProduct(updatedProducts);
        setFullPrice(fullPrice + (updatedPrice - (prod.price * cartItem.quantity))); // Update the fullPrice
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        price: Yup.number()
            .required("Price is required")
            .positive("Price must be a positive number"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        quality: Yup.string().required("Quality is required"),
        sack: Yup.number().required("Sack is required"),
        location: Yup.string().required("Location is required"),
        seller: Yup.string().required("Seller is required"),
        images: Yup.array()
            .required("At least one image is required")
            .test("fileSize", "Each file must be no more than 10mb", (value) =>
                value.every((file) => file.size <= 1024 * 1024 * 10)
            ),
    });

    const handleSubmit = (e) => {
        // e.preventDefault();
        // const formData = new FormData(formRef.current);
        // const productName = formData.get('productName');
        // const productPrice = formData.get('productPrice');
        // const productQuantity = formData.get('productQuantity');
        // const productId = formData.get('productID');
        // const productImageUrl = formData.get('productImage');

        // // setFormData(formData);
        // console.log(productName, productPrice, productQuantity, productId, productImageUrl, fullPrice)
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const productData = {};

        for (const [key, value] of formData.entries()) {
            const [fieldName, productId] = key.split('-');

            if (!productData[productId]) {
                productData[productId] = {};
            }

            productData[productId][fieldName] = value;
        }

        console.log(productData);
    };


    const {
        register,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    return (
        <>
            <Navbar />
            <Container className='my-5'>
                <Row>
                    <Card>
                        <h3 style={{ textAlign: 'center' }}>The Cart</h3>
                        <Card className='my-3'>
                            <Row className="px-4">
                                <form ref={formRef} onSubmit={handleSubmit} className="shadow-lg" encType="multipart/form-data" style={{ border: "solid 4px white" }}>
                                    {cartItems.map(item => (
                                        <Fragment key={item._id}>
                                            <Col>
                                                <Card>
                                                    {filteredProducts.map(product => {
                                                        if (product._id === item.prodID) {
                                                            return (
                                                                <Fragment key={product._id}>
                                                                    <div className="px-3 my-2">
                                                                        <Row>
                                                                            <Col style={{ width: '40px' }}>
                                                                                <input type="text" name={`productID-${product._id}`} value={product._id} hidden />
                                                                                <button onClick={() => updateQuantity(item.prodID, item.quantity - 1, 'decrease')}>-</button>
                                                                                <span>Quantity: {item.quantity}</span>
                                                                                <button onClick={() => updateQuantity(item.prodID, item.quantity + 1, 'increase')} disabled={product.sack === 0}>+</button>
                                                                                <p></p>
                                                                                {product.images.map((image, index) => (
                                                                                    <>
                                                                                        <input type="hidden" name={`productImage-${product._id}`} value={image.url} />
                                                                                        <img key={index} src={image.url} alt={product.name} style={{ width: "100px", height: "100px" }} />
                                                                                    </>
                                                                                ))}
                                                                            </Col>
                                                                            <Col style={{ marginRight: '300px' }}>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <p>Name</p>
                                                                                        <input type="text" name={`productName-${product._id}`} value={product.name} readOnly />
                                                                                        <p>Price</p>
                                                                                        <input type="number" name={`productPrice-${product._id}`} value={product.price} readOnly />
                                                                                        <p>Quantity</p>
                                                                                        <input type="number" name={`productQuantity-${product._id}`} value={product.quantity} readOnly />
                                                                                        <p>Sack</p>
                                                                                        <input type="number" name={`productSack-${product._id}`} value={product.sack} readOnly />
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <p>Quality</p>
                                                                                        <input type="text" name={`productQuality-${product._id}`} value={product.quality} readOnly />
                                                                                        <p>Location</p>
                                                                                        <input type="text" name={`productLocation-${product._id}`} value={product.location} readOnly />
                                                                                        <p>Category</p>
                                                                                        <input type="text" name={`productCategory-${product._id}`} value={product.category} readOnly />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </Fragment>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </Card>
                                            </Col>
                                        </Fragment>
                                    ))}
                                    <hr />
                                    <p >Full Price:{fullPrice} </p>
                                    <Card className="my-3">
                                        <MDBInput className="my-2" label='Set Address' type='text'
                                            name={'address'}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <MDBInput className="my-2" label='Set City' type='text'
                                            name={'city'}
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <MDBInput className="my-2" label='Phone No.#' type='text'
                                            name={'phoneNo'}
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                        />
                                        <MDBInput className="my-2" label='Set Postal Code' type='text'
                                            name={'postalCode'}
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                        />
                                        <MDBInput className="my-2" label='Set Country' type='text'
                                            name={'country'}
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </Card>
                                    <MDBBtn type="submit" color='light' rippleColor='dark'>
                                        Checkout
                                    </MDBBtn>
                                </form>
                            </Row>
                        </Card>
                    </Card>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default ProcessCart
