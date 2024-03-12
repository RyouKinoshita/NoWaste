import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../Layout/Metadata";
import Loader from "../../Layout/Loader";
import SellerSidebar from "./SellerSidebar";
import Navbar from "../../Layout/Navbar";
import { getToken, getUser } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const NewProduct = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [product, setProduct] = useState({});
  const [sellers, setSellers] = useState([]);

  const categories = [
    "Mixed Vegetables",
    "Mixed Fruits",
    "Vegetable",
    "Grains",
    "Fruits",
    "Nuts",
    "Root Crops",
  ];
  const qualities = ["Bruised", "Spoiled", "Good", "Overripe", "Wilted"];

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    quality: Yup.string().required("Quality is required"),
    sack: Yup.number().required("Sack is required"),
    location: Yup.string().required("Location is required"),
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

  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 1000);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files); // Log the selected files
    setImagesPreview([]);
    setImages([]);
    setValue("images", files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const newProduct = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/admin/product/new`,
        formData,
        config
      );
      setLoading(false);
      setSuccess(data.success);
      setProduct(data.product);
    } catch (error) {
      setError(error.response.data.message);
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

    fetchSellers();

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (success) {
      navigate("/sellerproductslist");
      toast.success("Product created successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [error, success]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("price", data.price);
    formData.set("description", data.description);
    formData.set("category", data.category);
    formData.set("quality", data.quality);
    formData.set("sack", data.sack);
    formData.set("location", data.location);
    const currentUser = getUser();
    if (currentUser) {
      formData.set("seller", currentUser.name);
    }

    // Append images to the form data
    for (let i = 0; i < data.images.length; i++) {
      const file = data.images[i];
      const base64 = await convertFileToBase64(file);
      formData.append("images", base64);
    }

    newProduct(formData);
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
          <Fragment>
            <div style={{ paddingBottom: "20px" }}>
              <Navbar />
            </div>
          </Fragment>
          <MetaData title={"Seller New Product"} />
          <div className="row">
            <div className="col-12 col-md-2">
              <SellerSidebar />
            </div>
            <div className="col-12 col-md-10">
              <Fragment>
                <div className="wrapper my-5" style={{ maxWidth: "1200px" }}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="shadow-lg"
                    encType="multipart/form-data"
                    style={{ border: "solid 4px white" }}
                  >
                    <h1
                      className="mb-4"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "15px",
                      }}
                    >
                      New Product
                    </h1>

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
                      <label htmlFor="price_field">Price per sack</label>
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
                      <label htmlFor="sack_field">Sacks</label>
                      <input
                        type="text"
                        id="sack_field"
                        className={`form-control ${
                          errors.sack ? "is-invalid" : ""
                        }`}
                        {...register("sack")}
                      />
                      {errors.sack && (
                        <p className="invalid-feedback">
                          {errors.sack.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="description_field">Description</label>
                      <textarea
                        id="description_field"
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="invalid-feedback">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="category_field">Category</label>
                      <select
                        id="category_field"
                        className={`form-control ${
                          errors.category ? "is-invalid" : ""
                        }`}
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
                      <label htmlFor="quality_field">Quality</label>
                      <select
                        id="quality_field"
                        className={`form-control ${
                          errors.quality ? "is-invalid" : ""
                        }`}
                        {...register("quality")}
                      >
                        {qualities.map((quality) => (
                          <option key={quality} value={quality}>
                            {quality}
                          </option>
                        ))}
                      </select>
                      {errors.quality && (
                        <p className="invalid-feedback">
                          {errors.quality.message}
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
                      <label>Images</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="images"
                          className={`custom-file-input ${
                            errors.images ? "is-invalid" : ""
                          }`}
                          onChange={onChange}
                          multiple
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose images
                        </label>
                        {errors.images && (
                          <p className="invalid-feedback">
                            {errors.images.message}
                          </p>
                        )}
                      </div>
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

                    <button
                      id="loginsbut"
                      type="submit"
                      className="buttonforLogin"
                      style={{ marginLeft: "15px", width: "340px" }}
                    >
                      CREATE
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
export default NewProduct;
