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
            label: "User",
            field: "user",
            sort: "asc",
          },
          {
            label: "Status",
            field: "status",
            sort: "asc",
          },
          {
            label: "Price",
            field: "price",
            sort: "asc",
          },
          {
              field: "actions",
          },
        ],
        rows: userOrders.data.map((order) => ({
          id: order._id,
          user: order.user,
          status: order.orderStatus,
          price: order.totalPrice,
          actions: (
            <>
              {order.orderStatus === "Completed" ? (
                <Link
                  to={`/user/order/${order._id}`}
                  className="btn btn-danger py-1 px-2"
                  title="Print Order"
                  style={{ marginRight: "15px" }}
                >
                  <i class="fa-regular fa-eye"></i>
                </Link>
              ) : (
                // <Link
                //   // to={`/admin/article/update/${article._id}`}
                //   onClick={() =>
                //     completeOrder(order._id)
                //   }
                //   className="btn btn-primary py-1 px-2"
                //   title="Edit Status to Complete"
                //   style={{ marginRight: "15px" }}
                // >
                //   <i className="fa-solid fa-truck"></i>
                // </Link>
                <p></p>
              )}
            </>
          ),
        })),
      };
    } else {
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
