import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../Layout/Metadata";
import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SellerUpdateProduct = () => {
  /**
   * TODO: Make controllers for Sellers and update this component
   * */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState("");
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState([]);

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const categories = ["Vegetable", "Grains", "Fruits", "Nuts", "Root Crops"];
  let { id } = useParams();
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    stock: Yup.number().required("Stock is required"),
    location: Yup.string().required("Location is required"),
    seller: Yup.string().required("Seller is required"),
    images: Yup.array()
      .required("At least one image is required")
      .test("fileSize", "Each file must be no more than 10mb", (value) =>
        value.every((file) => file.size <= 1024 * 1024 * 10)
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const onChange = async (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
    setValue("images", files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const getProductDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/${id}`
      );
      console.log("Fetched Product Details:", data);
      setProduct(data.product);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/admin/product/${id}`,
        productData,
        config
      );
      setIsUpdated(data.success);
    } catch (error) {
      setUpdateError(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/users/sellers`,
          config
        );
        setSellers(data.sellers);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    const setFormValues = () => {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setLocation(product.location);
      setSeller(product.seller);
      setOldImages(product.images);

      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("stock", product.stock);
      setValue("location", product.location);
      setValue("seller", product.seller);
      setValue("images", []); // Clear any previous selected images
    };

    fetchSellers();

    if (product && product._id !== id) {
      getProductDetails(id);
    } else {
      setFormValues();
      setLoading(false);
    }

    if (error) {
      errMsg(error);
    }
    if (updateError) {
      errMsg(updateError);
    }
    if (isUpdated) {
      navigate("/admin/productslist");
      successMsg("Product updated successfully");
    }
  }, [error, isUpdated, updateError, product, id, setValue]);

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("price", data.price);
    formData.set("description", data.description);
    formData.set("category", data.category);
    formData.set("stock", data.stock);
    formData.set("location", data.location);
    const selectedSeller = sellers.find((seller) => seller._id === data.seller);
    if (selectedSeller) {
      formData.set("seller", selectedSeller.name);
    }
    for (let i = 0; i < data.images.length; i++) {
      const file = data.images[i];
      const base64 = await convertFileToBase64(file);
      formData.append("images", base64);
    }
    updateProduct(product._id, formData);
  };

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Product"} />
          <div className="row">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>
            <div className="col-12 col-md-10">
              <Fragment>
                <div className="wrapper my-5">
                  <form
                    className="shadow-lg"
                    onSubmit={handleSubmit(submitHandler)}
                    encType="multipart/form-data"
                    style={{ border: "solid 4px white" }}
                  >
                    <h1 className="mb-4">Update Product</h1>
                    <div className="form-group">
                      <label htmlFor="name_field">Name</label>
                      <input
                        type="text"
                        id="name_field"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="price_field">Price</label>
                      <input
                        type="text"
                        id="price_field"
                        className={`form-control ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        {...register("price")}
                      />
                      {errors.price && (
                        <p className="invalid-feedback">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="description_field">Description</label>
                      <textarea
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        id="description_field"
                        rows="8"
                        {...register("description")}
                      ></textarea>
                      {errors.description && (
                        <p className="invalid-feedback">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="category_field">Category</label>
                      <select
                        className={`form-control ${
                          errors.category ? "is-invalid" : ""
                        }`}
                        id="category_field"
                        {...register("category")}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="invalid-feedback">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="stock_field">Stock</label>
                      <input
                        type="text"
                        id="stock_field"
                        className={`form-control ${
                          errors.stock ? "is-invalid" : ""
                        }`}
                        {...register("stock")}
                      />
                      {errors.stock && (
                        <p className="invalid-feedback">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="location_field">Location</label>
                      <textarea
                        id="location_field"
                        className={`form-control ${
                          errors.location ? "is-invalid" : ""
                        }`}
                        {...register("location")}
                      />
                      {errors.location && (
                        <p className="invalid-feedback">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="seller_field">Seller</label>
                      <select
                        id="seller_field"
                        className={`form-control ${
                          errors.seller ? "is-invalid" : ""
                        }`}
                        {...register("seller")}
                      >
                        {sellers.map((seller) => (
                          <option key={seller._id} value={seller._id}>
                            {seller.name}
                          </option>
                        ))}
                      </select>
                      {errors.seller && (
                        <p className="invalid-feedback">
                          {errors.seller.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Images</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="images"
                          className={`custom-file-input ${
                            errors.images ? "is-invalid" : ""
                          }`}
                          id="customFile"
                          onChange={onChange}
                          multiple
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose Images
                        </label>
                        {oldImages &&
                          oldImages.map((img) => (
                            <img
                              key={img}
                              src={img.url}
                              alt={img.url}
                              className="mt-3 mr-2"
                              width="55"
                              height="52"
                            />
                          ))}
                        {imagesPreview.map((img) => (
                          <img
                            src={img}
                            key={img}
                            alt="Images Preview"
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                          />
                        ))}
                      </div>
                      {errors.images && (
                        <p className="invalid-feedback">
                          {errors.images.message}
                        </p>
                      )}
                    </div>
                    <button
                      id="loginsbut"
                      type="submit"
                      className="buttonforLogin"
                      disabled={loading ? true : false}
                    >
                      UPDATE
                    </button>
                  </form>
                </div>
              </Fragment>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default SellerUpdateProduct;
