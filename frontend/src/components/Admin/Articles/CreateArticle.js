import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MDBInputGroup, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { getToken } from "../../utils/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Layout/Metadata";

const CreateArticle = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    description: yup.string().required("Description is required"),
    image: yup.mixed().required("Image is required"),
  });

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const createArticle = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/article/create`,
        formData,
        config
      );

      if (data.success) {
        // Provide a fallback message if 'success' is not present in the response
        toast.success("Article created successfully");
        navigate("/admin/articleslist");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    createArticle(formData);
  };

  return (
    <Fragment>
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>
      <MetaData title={"Create Article"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10" style={{ justifyContent: "center" }}>
          <div className="wrapper my-5" style={{ maxWidth: "1200px" }}>
            <form
              className="shadow-lg rounded p-4"
              encType="multipart/form-data"
              style={{ border: "solid 4px white" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1
                className="my-3"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Create Article
              </h1>
              <div className="row">
                <div className="col-md-6">
                  <MDBInputGroup textBefore="Article Title" className="mb-3">
                    <MDBInput
                      label="Title"
                      id="form1"
                      type="text"
                      {...register("title")}
                    />
                    {errors.title && (
                      <div className="text-danger">{errors.title.message}</div>
                    )}
                  </MDBInputGroup>
                </div>
                <div className="col-md-4">
                  <MDBInputGroup textBefore="Article Author" className="mb-3">
                    <MDBInput
                      label="Author"
                      id="form1"
                      type="text"
                      {...register("author")}
                    />
                    {errors.author && (
                      <div className="text-danger">{errors.author.message}</div>
                    )}
                  </MDBInputGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <MDBInputGroup textBefore="Description">
                    <textarea
                      className="form-control"
                      {...register("description")}
                      style={{ resize: "both", height: "200px" }}
                    />
                    {errors.description && (
                      <div className="text-danger">
                        {errors.description.message}
                      </div>
                    )}
                  </MDBInputGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <MDBInputGroup className="mb-3 my-3">
                    <input
                      className="form-control"
                      type="file"
                      {...register("image")}
                    />
                    {errors.image && (
                      <div className="text-danger">{errors.image.message}</div>
                    )}
                  </MDBInputGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default CreateArticle;
