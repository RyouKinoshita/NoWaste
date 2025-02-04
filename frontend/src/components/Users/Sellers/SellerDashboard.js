import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import SellerSidebar from "./SellerSidebar";
import MetaData from "../../Layout/Metadata";
import Loader from "../../Layout/Loader";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
} from "mdb-react-ui-kit";
import SellersOrderPerMonth from "./SellersOrderPerMonth";
import SellersOrderEveryMonth from "./SellersOrderEveryMonth";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserID = JSON.parse(localStorage.getItem("user"));
  const userId = getUserID.user._id;

  console.log(userId);
  const getSellerProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        ` ${process.env.REACT_APP_API}seller/products`,
        config
      );
      setProducts(data.products);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getSellerOrdersCompleted = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      console.log("userID", userId);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}seller/got-order/${userId}`,
        config
      );
      // console.log('There will be a data', data.orders);
      setOrders(data.orders);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const getSellerOrdersAll = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      console.log("userID", userId);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}seller/got-all-order/${userId}`,
        config
      );
      console.log("There will be a data", data.orders);
      setAllOrders(data.orders);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getSellerProducts();
    if (userId) {
      getSellerOrdersCompleted(userId);
      getSellerOrdersAll(userId);
    }
  }, [userId]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>
      <Fragment>
        <div className="row">
          <div className="col-10 col-md-2 ">
            <SellerSidebar />
          </div>

          <div className="col-12 col-md-10">
            <h1
              className="my-4"
              style={{ color: "black", marginLeft: "-10px" }}
            >
              Seller Dashboard
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="row pr-4">
                  <MetaData title={"Seller Dashboard"} />
                  <Col className="custom-card-column">
                    <Card>
                      <CardBody style={{ height: "460px", width: "80%" }}>
                        <CardTitle className="custom-card-title">
                          Accumulated Sales
                        </CardTitle>
                        <Row>
                          <Col>
                            <SellersOrderPerMonth orders={orders} />
                          </Col>
                          <Col>
                            <CardTitle className="custom-card-title">
                              Orders Per Month
                            </CardTitle>
                            <SellersOrderEveryMonth allOrders={allOrders} />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>

                  {/* THIS IS NO. OF DATA */}
                  <div className="row pr-4">
                    <div className="col-xl-10 col-sm-6 mb-3">
                      <Row>
                        <div
                          className="col-xl-3 col-sm-6 mb-3"
                          style={{ height: "125px" }}
                        >
                          <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Products Listed
                                <br /> <b>{products && products.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/sellerproductslist"
                            >
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div
                          className="col-xl-3 col-sm-6 mb-3"
                          style={{ height: "125px" }}
                        >
                          <div
                            className="card text-white  o-hidden h-100"
                            style={{ backgroundColor: "#1F618D" }}
                          >
                            <div
                              className="card-body"
                              style={{ backgroundColor: "red" }}
                            >
                              <div className="text-center card-font-size">
                                Products Sold
                                <br /> <b>{orders && orders.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/userslist"
                              style={{ backgroundColor: "red" }}
                            >
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </div>
                </div>
                <div
                  className="row pr-4"
                  style={{
                    justifyContent: "center",

                    marginBottom: "40px",
                    alignItems: "center",
                  }}
                ></div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>

      <AdminFooter />
    </div>
  );
};

export default SellerDashboard;
