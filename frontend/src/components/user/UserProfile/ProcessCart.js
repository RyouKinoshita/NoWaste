import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Footer from "../../Layout/Footer";
import Navbar from "../../Layout/Navbar";
import * as Yup from "yup";

const ProcessCart = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [fullPrice, setFullPrice] = useState(0);
  const [taxPrice, setTax] = useState(0);
  const [itemPrice, setWholePrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const users = JSON.parse(localStorage.getItem("user"));
  const userId = users.user._id;

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // console.log(formData)
  const { id } = useParams();

  const filteredProducts = product.filter((product) =>
    cartItems.some((item) => item.prodID === product._id)
  );

  useEffect(() => {
    const getUserCartItem = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/user/get-cartItems/${id}`,
          config
        );

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
          `${process.env.REACT_APP_API}/products`,
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
      const prod = product.find((prod) => prod._id === item.prodID);
      if (prod) {
        return total + prod.price * item.quantity;
      }
      return total;
    }, 0);
    setFullPrice(totalPrice);
  }, []);

  // console.log(product)
  const updateQuantity = (prodID, newQuantity, action) => {
    const cartItem = cartItems.find((item) => item.prodID === prodID);
    if (!cartItem) {
      return;
    }

    const prod = product.find((prod) => prod._id === prodID);
    if (!prod) {
      return;
    }

    if (newQuantity < 0) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }

    let updatedPrice;
    if (action === "increase") {
      updatedPrice = prod.price * newQuantity;
    } else if (action === "decrease") {
      updatedPrice = prod.price * newQuantity;
    }

    let updatedTax = 0;
    if (newQuantity >= 2) {
      updatedTax = prod.price * 0.03;
    }

    let updatedFullPrice = updatedPrice + updatedTax;

    const updatedCartItems = cartItems.map((item) => {
      if (item.prodID === prodID) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const updatedProducts = product.map((p) => {
      if (p._id === prodID) {
        const newSack = p.sack + cartItem.quantity - newQuantity;
        return { ...p, quantity: newQuantity, sack: newSack };
      }
      return p;
    });
    const WholePrice = prod.price * newQuantity; // Calculate whole price based on new quantity
    console.log("whole Price", WholePrice);
    // const setTaxPrice = (fullPrice + (updatedFullPrice - (prod.price * cartItem.quantity))) - setWholePrice
    // console.log('Tax',setTaxPrice)
    const setTaxPrice = updatedFullPrice - WholePrice;
    console.log("Set Tax", setTaxPrice);

    setCartItems(updatedCartItems);
    setProduct(updatedProducts);
    setWholePrice(WholePrice);
    setTax(setTaxPrice);
    setFullPrice(
      fullPrice + (updatedFullPrice - prod.price * cartItem.quantity)
    );
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      console.log("Form Data:", formData);

      const shippingInfo = {
        address: address,
        city: city,
        phoneNo: phoneNo,
        postalCode: postalCode,
        country: country,
      };
      console.log("Shipping Info:", shippingInfo);

      for (const key in shippingInfo) {
        if (!shippingInfo[key]) {
          throw new Error(`${key} is required`);
        }
      }

      const orderItems = Array.from(formData.keys())
        .filter((key) => key.startsWith("productID"))
        .map((productIdKey) => {
          const productId = productIdKey.split("-")[1];
          return {
            name: formData.get(`productName-${productId}`),
            quantity: formData.get(`productQuantity-${productId}`),
            image: formData.get(`productImage-${productId}`),
            price: formData.get(`productPrice-${productId}`),
            product: productId,
          };
        });

      const paymentInfo = {
        method: paymentMethod,
      };

      // const totalPrice = orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);

      const orderData = {
        ...shippingInfo,
        ...orderItems,
        ...paymentInfo,
        itemsPrice: itemPrice,
        taxPrice: taxPrice,
        totalPrice: fullPrice,
      };
      console.log("Order Data:", orderData);

      cartItems.forEach(async (item) => {
        const prod = product.find((prod) => prod._id === item.prodID);
        if (prod) {
          const updatedSack = prod.sack - item.quantity;
          const productData = {
            sack: updatedSack,
          };
          // await updateProduct(prod._id, productData);
        }
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}order-create`,
        orderData,
        config
      );
      setSuccess(data.data);
      toast.success(data.message);
      navigate("/");
      // console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const outCartStatus = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/cart-status-update/${id}`,
        config
      );
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const onCartStatus = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/oncart-status-update/${id}`,
        config
      );
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleoutCart = (id) => {
    outCartStatus(id);
  };
  const handleonCart = (id) => {
    onCartStatus(id);
  };

  const [showOutCart, setShowOutCart] = useState(false);

  const handleToggleCart = () => {
    setShowOutCart(false);
  };

  const handleToggleBin = () => {
    setShowOutCart(true);
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Card>
            <Row>
              <Col>
                <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
                  Cart
                </h3>
              </Col>{" "}
              <MDBBtn
                style={{
                  backgroundColor: "orange",
                  margin: "20px",
                  maxWidth: "150px",
                }}
                onClick={handleToggleBin}
              >
                <p>Bin</p>
                <i className="fa-solid fa-trash"></i>
              </MDBBtn>{" "}
              <MDBBtn
                style={{
                  backgroundColor: "orange",
                  margin: "20px",
                  maxWidth: "150px",
                }}
                onClick={handleToggleCart}
              >
                <p>Cart</p>
                <i class="fa-brands fa-opencart"></i>
              </MDBBtn>
            </Row>

            <Row className="px-4">
              <form ref={formRef} onSubmit={handleSubmit} className="p-4">
                {/* Render cart items */}
                {cartItems
                  .filter((item) =>
                    showOutCart
                      ? item.status === "outCart"
                      : item.status === "onCart"
                  ) // Filter out items based on status
                  .map((item) => (
                    <Fragment key={item._id}>
                      <Col>
                        <Card>
                          {filteredProducts.map((product) => {
                            if (product._id === item.prodID) {
                              return (
                                <Fragment key={product._id}>
                                  <div className="px-3 my-2">
                                    <Row>
                                      <Col style={{ width: "40px" }}>
                                        {/* Update name attributes here */}
                                        <input
                                          type="text"
                                          name={`productID-${product._id}`}
                                          value={product._id}
                                          hidden
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateQuantity(
                                              item.prodID,
                                              item.quantity - 1,
                                              "decrease"
                                            )
                                          }
                                        >
                                          -
                                        </button>
                                        <span>Quantity: {item.quantity}</span>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateQuantity(
                                              item.prodID,
                                              item.quantity + 1,
                                              "increase"
                                            )
                                          }
                                          disabled={product.sack === 0}
                                        >
                                          +
                                        </button>
                                        <p></p>
                                        {product.images.map((image, index) => (
                                          <>
                                            {/* Update name attribute here */}
                                            <input
                                              type="hidden"
                                              name={`productImage-${product._id}`}
                                              value={image.url}
                                            />
                                            <img
                                              key={index}
                                              src={image.url}
                                              alt={product.name}
                                              style={{
                                                width: "100px",
                                                height: "100px",
                                              }}
                                            />
                                          </>
                                        ))}
                                      </Col>
                                      {showOutCart && (
                                        <>
                                          <Col style={{ marginRight: "20px" }}>
                                            <Row>
                                              <Col>
                                                <p>Name</p>
                                                <input
                                                  type="text"
                                                  name={`productName-${product._id}`}
                                                  value={product.name}
                                                  readOnly
                                                />
                                                <p>Price</p>
                                                <input
                                                  type="number"
                                                  name={`productPrice-${product._id}`}
                                                  value={product.price}
                                                  readOnly
                                                />
                                                <p>Sack</p>
                                                <input
                                                  type="number"
                                                  name={`productSack-${product._id}`}
                                                  value={product.sack}
                                                  readOnly
                                                />
                                              </Col>
                                              <Row>
                                                <Col>
                                                  <p>Quality</p>
                                                  <input
                                                    type="text"
                                                    name={`productQuality-${product._id}`}
                                                    value={product.quality}
                                                    readOnly
                                                  />
                                                  <p>Location</p>
                                                  <input
                                                    type="text"
                                                    name={`productLocation-${product._id}`}
                                                    value={product.location}
                                                    readOnly
                                                  />
                                                  <p>Category</p>
                                                  <input
                                                    type="text"
                                                    name={`productCategory-${product._id}`}
                                                    value={product.category}
                                                    readOnly
                                                  />
                                                </Col>
                                              </Row>
                                            </Row>
                                          </Col>
                                          <Col>
                                            <MDBBtn
                                              style={{
                                                backgroundColor: "orange",
                                              }}
                                              onClick={() =>
                                                handleonCart(item._id)
                                              }
                                            >
                                              <i class="fa-solid fa-repeat"></i>
                                            </MDBBtn>
                                          </Col>
                                        </>
                                      )}
                                      {!showOutCart && (
                                        <>
                                          <Col style={{ marginRight: "20px" }}>
                                            <Row>
                                              <Col>
                                                <p>Name</p>
                                                <input
                                                  type="text"
                                                  name={`productName-${product._id}`}
                                                  value={product.name}
                                                  readOnly
                                                />
                                                <p>Price</p>
                                                <input
                                                  type="number"
                                                  name={`productPrice-${product._id}`}
                                                  value={product.price}
                                                  readOnly
                                                />
                                                <p>Quantity</p>
                                                <input
                                                  type="number"
                                                  name={`productQuantity-${product._id}`}
                                                  value={product.quantity}
                                                  readOnly
                                                />
                                                <p>Sack</p>
                                                <input
                                                  type="number"
                                                  name={`productSack-${product._id}`}
                                                  value={product.sack}
                                                  readOnly
                                                />
                                              </Col>
                                              <Col>
                                                <p>Quality</p>
                                                <input
                                                  type="text"
                                                  name={`productQuality-${product._id}`}
                                                  value={product.quality}
                                                  readOnly
                                                />
                                                <p>Location</p>
                                                <input
                                                  type="text"
                                                  name={`productLocation-${product._id}`}
                                                  value={product.location}
                                                  readOnly
                                                />
                                                <p>Category</p>
                                                <input
                                                  type="text"
                                                  name={`productCategory-${product._id}`}
                                                  value={product.category}
                                                  readOnly
                                                />
                                              </Col>
                                            </Row>
                                          </Col>
                                          <Col style={{ marginRight: "25px" }}>
                                            <MDBBtn
                                              className="btn btn-danger"
                                              onClick={() =>
                                                handleoutCart(item._id)
                                              }
                                            >
                                              <i class="fa-solid fa-trash"></i>
                                            </MDBBtn>
                                          </Col>
                                        </>
                                      )}
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
                {!showOutCart && (
                  <>
                    <p>Tax Price:{taxPrice}</p>
                    <p>Full Price:{fullPrice}</p>
                    <Card className="my-3">
                      <MDBInput
                        className="my-2"
                        label="Set Address"
                        type="text"
                        name={"shippingInfo-address"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <MDBInput
                        className="my-2"
                        label="Set City"
                        type="text"
                        name={"shippingInfo-city"}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <MDBInput
                        className="my-2"
                        label="Phone No.#"
                        type="text"
                        name={"shippingInfo-phoneNo"}
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                      <MDBInput
                        className="my-2"
                        label="Set Postal Code"
                        type="text"
                        name={"shippingInfo-postalCode"}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <MDBInput
                        className="my-2"
                        label="Set Country"
                        type="text"
                        name={"shippingInfo-country"}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <div className="my-2">
                        <label htmlFor="paymentMethod" className="form-label">
                          Select Payment Method:
                        </label>
                        <select
                          className="form-select"
                          id="paymentMethod"
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <option selected>Select Payment Method</option>
                          <option value="Gcash">GCash</option>
                          <option value="Credit_Card">Credit Card</option>
                          <option value="Cash_On_Delivery">
                            Cash on Delivery
                          </option>
                        </select>
                      </div>
                    </Card>
                    <div value={userId} />
                    <MDBBtn type="submit" color="primary" rippleColor="dark">
                      Checkout
                    </MDBBtn>
                  </>
                )}
              </form>
            </Row>
          </Card>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProcessCart;
