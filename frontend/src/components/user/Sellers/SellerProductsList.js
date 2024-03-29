import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../../Layout/Metadata";
import Loader from "../../Layout/Loader";
import SellerSidebar from "./SellerSidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../utils/helpers";

const SellerProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  //   const [users, setUsers] = useState([]);
  //   const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  let navigate = useNavigate();
  const getSellerProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/seller/products`,
        config
      );
      console.log(data);
      setProducts(data.products);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    getSellerProducts();

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (isDeleted) {
      toast.success("Product deleted successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/sellerproductslist");
    }
  }, [error, deleteError, isDeleted]);

  // const deleteProduct = async (id) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     };
  //     const { data } = await axios.delete(
  //       `${process.env.REACT_APP_API}/admin/product/${id}`,
  //       config
  //     );

  //     setIsDeleted(data.success);
  //     const timeoutId = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     setDeleteError(error.response.data.message);
  //   }
  // };

  const productsList = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price Per Sack",
          field: "price",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Quality",
          field: "quality",
          sort: "asc",
        },
        {
          label: "Sack",
          field: "sack",
          sort: "asc",
        },
        {
          label: "Location",
          field: "location",
          sort: "asc",
        },
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "Seller",
          field: "seller",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `₱${product.price}`,
        category: product.category,
        quality: product.quality,
        sack: product.sack,
        location: product.location,
        seller: product.seller,
        image: (
          <Fragment>
            {product.images && product.images.length > 0 && (
              <p>
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </p>
            )}
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
    setLoading(true);
  };

  return (
    <Fragment>
      <Fragment>
        <div style={{ paddingBottom: "20px" }}>
          <Navbar />
        </div>
      </Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2 mt-4">
          <SellerSidebar />
        </div>

        <div className="col-12 col-md-10" style={{ justifyContent: "center" }}>
          <Fragment>
            <h1
              className="my-5"
              style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
            >
              All Products
            </h1>
            <hr className="hr hr-blurry" />
            <div className="d-flex justify-content-end mb-3">
              <Link to="/sellernewprod  " className="btn btn-primary mr-5">
                Add New Products
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={productsList()}
                className="px-3"
                bordered
                striped
                style={{ color: "black", fontWeight: "bold" }}
              />
            )}
          </Fragment>
        </div>
        <footer>
          <AdminFooter />
        </footer>
      </div>
    </Fragment>
  );
};

export default SellerProductsList;
