import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import Loader from "../../Layout/Loader";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import MetaData from "../../Layout/Metadata";
import Navbar from "../../Layout/Navbar";
import Sidebar from "../Sidebar";

const OrdersList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/order`,
        config
      );
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const setTableData = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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
          label: "Total Price",
          field: "totalPrice",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      // Concatenate all item names into a single string
      const itemNames = order.orderItems.map((item) => item.name).join(", ");
      data.rows.push({
        id: order._id,
        user: order.user, // Assuming user has a 'name' property
        shippingAddress: `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`,
        items: itemNames,
        totalPrice: order.totalPrice,
        status: order.orderStatus,
      });
    });

    return data;
  };

  return (
    <Fragment>
      <Fragment>
        <div style={{ paddingBottom: "20px" }}>
          <Navbar />
        </div>
      </Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mb-8">
          <Fragment>
            <h1
              className="my-5"
              style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
            >
              All Orders
            </h1>
            <hr className="hr hr-blurry" />
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setTableData()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default OrdersList;
