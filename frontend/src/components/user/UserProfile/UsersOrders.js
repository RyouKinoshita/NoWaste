import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/helpers";
import { MDBDataTable } from "mdbreact";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const UsersOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // console.log(userOrders)

  const { id } = useParams();
  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}user/orders/${id}`,
          config
        );

        setUserOrders(data);
        setSuccess(data.message);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getUserOrders();
  }, []);
  console.log("userOrders:", userOrders); // Add this line

  const markOrderAsReceived = async (orderId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}order/${orderId}/status`,
        { status: "Received" },
        config
      );
      // Update the userOrders state after successfully marking the order as received
      setUserOrders((prevOrders) => ({
        ...prevOrders,
        data: prevOrders.data.map((order) =>
          order._id === orderId ? { ...order, status: "Received" } : order
        ),
      }));
      setSuccess(data.message);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const userOrdersDatatables = () => {
    // Check if userOrders is not null or undefined, and if data exists within it
    if (userOrders && userOrders.data) {
      return {
        columns: [
          {
            label: "ID",
            field: "id",
            sort: "asc",
          },
          {
            label: "Shipping Address",
            field: "shippingAddress",
            sort: "asc",
          },
          {
            label: "Items",
            field: "items",
            sort: "asc",
          },
          {
            label: "Status",
            field: "status",
            sort: "asc",
            formatter: (value) => {
              return <span style={{ color: "red" }}>{value}</span>;
            },
          },
          {
            label: "Total Price",
            field: "totalPrice",
            sort: "asc",
          },
          {
            label: "Actions",
            field: "actions",
          },
        ],
        rows: userOrders.data.map((order) => ({
          id: order._id,
          shippingAddress: `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`,
          items: order.orderItems.map((item) => item.name).join(", "),
          status: order.orderStatus,
          totalPrice: order.totalPrice,
          actions: (
            <button
              className="btn btn-success py-1 px-2"
              onClick={() => markOrderAsReceived(order._id)}
            >
              Mark as Received
            </button>
          ),
        })),
      };
    } else {
      // Return an empty object if userOrders is not properly initialized yet
      return {};
    }
  };
  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Card>
            <Col>
              <h3 style={{ textAlign: "center" }}>Your Orders</h3>
            </Col>
            <Card className="my-3">
              <Row className="px-4">
                <Col>
                  <MDBDataTable
                    data={userOrdersDatatables()}
                    className="px-3"
                    bordered
                    striped
                    style={{ color: "black", fontWeight: "bold" }}
                  />
                </Col>
              </Row>
            </Card>
          </Card>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default UsersOrders;
