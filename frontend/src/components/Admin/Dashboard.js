import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import AdminFooter from "../Layout/Admin/AdminFooter";
import Sidebar from "../Admin/Sidebar";
import MetaData from "../Layout/Metadata";
import Loader from "../Layout/Loader";
import { getToken } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderPerMonth from "./Charts/OrderPerMonth";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
} from "mdb-react-ui-kit";
import UserRoleChart from "./Charts/UserRoleChart";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAdminProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        ` ${process.env.REACT_APP_API}/admin/products`,
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

  const allUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/users`,
        config
      );

      setUsers(data.users);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getAdminOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/order`,
        config
      );

      setOrders(data.orders);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getAllArticles = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/v1/article/articles`,
        config
      );
      setArticles(data.data);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminProducts();
    allUsers();
    getAdminOrders();
    getAllArticles();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>
      <Fragment>
        <div className="row">
          <div className="col-10 col-md-2 mt-4">
            <Sidebar />
          </div>

          <div className="col-12 col-md-10">
            <h1
              className="my-4"
              style={{ color: "black", marginLeft: "-10px" }}
            >
              Admin Dashboard
            </h1>
            <hr className="hr hr-blurry" />
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="row pr-4">
                  <MetaData title={"Admin Dashboard"} />
                  <Col className="custom-card-column">
                    <Card>
                      <CardBody style={{ height: "460px", width: "700px" }}>
                        <CardTitle className="custom-card-title">
                          Order Per Month
                        </CardTitle>
                        <OrderPerMonth orders={orders} />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="custom-card-column">
                    <Col className="col-xl-2 col-sm-6 mb-3">
                      <div style={{ height: "250px", width: "600px" }}>
                        <div style={{ height: "250px", width: "600px" }}>
                          <center>
                            <UserRoleChart users={users} />
                          </center>
                        </div>
                      </div>
                    </Col>
                  </Col>

                  {/* THIS IS NO. OF DATA */}
                  <div className="row pr-4 pt-4">
                    <div className="col-xl-10 col-sm-6 mb-3">
                      <Row>
                        <div
                          className="col-xl-3 col-sm-6 mb-3"
                          style={{ height: "125px" }}
                        >
                          <div
                            className="card text-white o-hidden h-100"
                            style={{ backgroundColor: "#195218" }}
                          >
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Products
                                <br /> <b>{products && products.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/productslist"
                              style={{ backgroundColor: "#278726" }}
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
                            style={{ backgroundColor: "#76448A" }}
                          >
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Users
                                <br /> <b>{users && users.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/userslist"
                              style={{ backgroundColor: " #A569BD" }}
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
                            style={{ backgroundColor: "#F51c20" }}
                          >
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Orders
                                <br /> <b>{orders && orders.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/orderslist"
                              style={{ backgroundColor: "#Ee5757" }}
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
                            className="card text-white o-hidden h-100"
                            style={{ backgroundColor: "#2587be" }}
                          >
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Articles
                                <br /> <b>{articles && articles.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/articleslist"
                              style={{ backgroundColor: "#25a5be" }}
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

export default Dashboard;
