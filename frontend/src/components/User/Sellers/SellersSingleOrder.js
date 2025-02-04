import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
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

const SellerSingleOrder = () => {

    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const { id } = useParams();

    console.log(order)

    const getSingleOrder = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                },
            };
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}seller/got-singe-order/${id}`,
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
        getSingleOrder(id)
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
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
            pdf.save('OrderReceipt.pdf');
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
                                                <CardBody style={{ width: "500px" }} ref={pdfRef}>
                                                    <CardTitle className="custom-card-title">
                                                        Order Receipt:
                                                    </CardTitle>
                                                    {/* <SellersOrderPerMonth orders={orders} /> */}
                                                    <ul>
                                                        <li>Order ID: {order._id}</li>
                                                        <li>Created At: {formatDate(order.createdAt)}</li>
                                                        <li>Delivered At: {formatDate(order.deliveredAt)}</li>
                                                        <li>Tax Price: {order.taxPrice}</li>
                                                        <li>Items Price: {order.itemsPrice}</li>
                                                        <li>Full Price: {order.totalPrice}</li>
                                                        <li>Order Status: {order.orderStatus}</li>
                                                        {order.orderItems && order.orderItems.length > 0 && (
                                                            <li>
                                                                Order Items:
                                                                <ul>
                                                                    {order.orderItems.map((item, index) => (
                                                                        <li key={index}>
                                                                            <div>
                                                                                <p>Name: {item.name}</p>
                                                                                <p>Price: {item.price}</p>
                                                                                <p>Quantity: {item.quantity}</p>
                                                                                <p>Product ID: {item.product}</p>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        )}
                                                        {order.shippingInfo && (
                                                            <li>
                                                                Shipping Info:
                                                                <ul>
                                                                    <li>Address: {order.shippingInfo.address}</li>
                                                                    <li>City: {order.shippingInfo.city}</li>
                                                                    <li>Country: {order.shippingInfo.country}</li>
                                                                    <li>Phone Number: {order.shippingInfo.phoneNo}</li>
                                                                    <li>Postal Code: {order.shippingInfo.postalCode}</li>
                                                                </ul>
                                                            </li>
                                                        )}
                                                    </ul>

                                                </CardBody>
                                            </Card>
                                            <MDBBtn onClick={downloadPDF}>Download Pdf</MDBBtn>
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

export default SellerSingleOrder
