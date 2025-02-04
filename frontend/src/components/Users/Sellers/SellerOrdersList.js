import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
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
    MDBBtn,
} from "mdb-react-ui-kit";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SellerOrdersList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUserID = JSON.parse(localStorage.getItem("user"));
    const userId = getUserID.user._id;

    console.log(orders)

    const getSellerOrdersList = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                },
            };
            console.log('userID', userId)
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}seller/got-orderslist/${userId}`,
                config
            );
            console.log('There will be a data', data.orders);
            setOrders(data.orders);
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        if (userId) {
            getSellerOrdersList(userId);
        }
    }, [userId]);

    const completeOrderStatus = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`,
                },
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}order-status-complete/${id}`,
                config
            );
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const completeOrder = (id) => {
        completeOrderStatus(id);
    };

    const SellerOrdersListTable = ({ orders }) => {
        return {
            columns: [
                {
                    label: "Order ID",
                    field: "_id",
                    width: 150,
                },
                {
                    label: "Product Name",
                    field: "productName",
                    width: 150,
                },
                {
                    label: "Price",
                    field: "price",
                    width: 100,
                },
                {
                    label: "Quantity",
                    field: "quantity",
                    width: 100,
                },
                {
                    label: "Total Price",
                    field: "totalPrice",
                    width: 120,
                },
                {
                    label: "Order Status",
                    field: "orderStatus",
                    width: 120,
                },
                {
                    label: "Ordered At",
                    field: "createdAt",
                    width: 150,
                },
                {
                    field: "actions",
                },
            ],
            rows: orders.map((order) => ({
                _id: order._id,
                productName: order.orderItems[0].name,
                price: order.orderItems[0].price,
                quantity: order.orderItems[0].quantity,
                totalPrice: order.totalPrice,
                orderStatus: order.orderStatus,
                createdAt: order.createdAt,
                actions: (
                    <>
                        {order.orderStatus === "Completed" ? (
                            <Link
                                to={`/seller/order/${order._id}`}
                                className="btn btn-danger py-1 px-2"
                                title="Print Order"
                                style={{ marginRight: "15px" }}
                            >
                                <i class="fa-regular fa-eye"></i>
                            </Link>
                        ) : (
                            <Link
                                // to={`/admin/article/update/${article._id}`}
                                onClick={() =>
                                    completeOrder(order._id)
                                }
                                className="btn btn-primary py-1 px-2"
                                title="Edit Status to Complete"
                                style={{ marginRight: "15px" }}
                            >
                                <i className="fa-solid fa-truck"></i>
                            </Link>
                        )}
                    </>
                ),
            })),
        };
    };

    const pdfRef = useRef();

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf');
        });
    };

    return (
        <>
            <div
                style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
            >
                <div style={{ paddingBottom: "20px" }}>
                    <Navbar />
                </div>
                <Fragment>
                    <div className="row">
                        <div className="col-10 col-md-2 ">
                            <Card>
                                <SellerSidebar />
                            </Card>
                        </div>

                        <div className="col-12 col-md-10">
                            <h1
                                className="my-4"
                                style={{ color: "black", marginLeft: "-10px" }}
                            >
                                Seller Orders List
                            </h1>

                            {loading ? (
                                <Loader />
                            ) : (
                                <Fragment>
                                    <div className="row pr-4">
                                        <MetaData title={"Seller Dashboard"} />
                                        <Col className="custom-card-column">
                                            <Card>
                                                <CardBody style={{ width: "500px" }}>
                                                    <CardTitle className="custom-card-title">
                                                        Orders
                                                    </CardTitle>
                                                    {/* <SellersOrderPerMonth orders={orders} /> */}
                                                    <MDBDataTable
                                                        data={SellerOrdersListTable({ orders })}
                                                        className="px-3"
                                                        bordered
                                                        striped
                                                        style={{ color: "black", fontWeight: "bold", width: "500px" }}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Col>

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

            </div>
        </>
    )
}

export default SellerOrdersList
