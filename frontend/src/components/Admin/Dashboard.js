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
} from 'mdb-react-ui-kit';
import UserRoleBuyer from "./Charts/UserRoleBuyer";
import UserRoleSellers from "./Charts/UserRoleSellers";
import UserRoleAdmin from "./Charts/UserRoleAdmin";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAdminProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
       ` ${process.env.REACT_APP_API}/admin/products`,
        config
      );
      console.log('There will be a data', data);
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
          'Authorization': `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/users`,
        config
      );
      // console.log(data);
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
          'Authorization': `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
      `${process.env.REACT_APP_API}/admin/order`,
        config
      );
      // console.log('There will be a data', data);
      setOrders(data.orders);
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
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh",}}
    >
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>
      <Fragment>
        <div className="row">
          <div className="col-12 col-md-2 " >
            <Sidebar />
          </div>

          <div className="col-12 col-md-10" >
            <h1
              className="my-4"
              style={{ color: "black", marginLeft: "-10px" }}
            >
              Dashboard
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="row pr-4">

                  <MetaData title={"Admin Dashboard"} />
                  <Col className="custom-card-column" >
                    <Card>
                      <CardBody style={{ height: '460px', width: '700px' }}>
                        <CardTitle className="custom-card-title">Order Per Month</CardTitle>
                        <OrderPerMonth orders={orders} />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="custom-card-column">
                    <Row>
                      <Col style={{ height: '250px', width: '200px' }}>
                        <div>
                          <div style={{ height: '250px', width: '250px' }} >
                            <center>
                              <UserRoleBuyer users={users} />
                            </center>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <div style={{ height: '250px', width: '250px' }}>
                            <center>
                              <UserRoleSellers users={users} />
                            </center>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Col className="col-xl-2 col-sm-6 mb-3">
                      <div style={{ height: '250px', width: '600px' }}>
                        <div style={{ height: '250px', width: '600px' }}>
                          <center>
                            <UserRoleAdmin users={users} />
                          </center>
                        </div>
                      </div>
                    </Col>
                  </Col>

                  {/* THIS IS NO. OF DATA */}
                  <div className="row pr-4" >
                    <div className="col-xl-10 col-sm-6 mb-3" >
                      <Row >
                        <div className="col-xl-3 col-sm-6 mb-3" style={{height:'125px'}}>
                          <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">
                                Products
                                <br /> <b>{products && products.length}</b>
                              </div>
                            </div>

                            <Link
                              className="card-footer text-white clearfix small z-1"
                              to="/admin/productslist"
                            >
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3" style={{height:'125px'}}>
                          <div
                            className="card text-white  o-hidden h-100"
                            style={{ backgroundColor: "#76448A" }}
                          >
                            <div
                              className="card-body"
                              style={{ backgroundColor: "#76448A" }}
                            >
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
                        <div className="col-xl-3 col-sm-6 mb-3" style={{height:'125px'}}> 
                          <div
                            className="card text-white  o-hidden h-100"
                            style={{ backgroundColor: "#1F618D" }}
                          >
                            <div
                              className="card-body"
                              style={{ backgroundColor: "red" }}
                            >
                              <div className="text-center card-font-size">
                                Orders
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

export default Dashboard;
