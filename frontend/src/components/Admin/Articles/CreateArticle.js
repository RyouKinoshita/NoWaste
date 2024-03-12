import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MDBInputGroup, MDBInput, MDBBtn } from "mdb-react-ui-kit";

import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../utils/helpers";
import MetaData from "../../Layout/Metadata";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    setImage(e.target.files);
  };

  const addArticle = async (articleData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/article/create`,
        articleData,
        config
      );
      setSuccess(data.success);
      navigate("/admin/articleslist");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const createArticle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("image", image[0]);

    addArticle(formData);
  };

  return (
    <Fragment>
      <Fragment>
        <div style={{ paddingBottom: "20px" }}>
          <Navbar />
        </div>
      </Fragment>
      <MetaData title={"Create Article"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10" style={{ justifyContent: "center" }}>
          <Fragment>
            <h1
              className="my-5"
              style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
            >
              Create Article
            </h1>
            <>
              <form encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-6">
                    <MDBInputGroup textBefore="Article Title" className="mb-3">
                      <MDBInput
                        label="Title"
                        id="form1"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </MDBInputGroup>
                  </div>
                  <div className="col-md-4">
                    <MDBInputGroup textBefore="Article Author" className="mb-3">
                      <MDBInput
                        label="Author"
                        id="form1"
                        type="text"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </MDBInputGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <MDBInputGroup textBefore="Description">
                      <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ resize: "both", height: "200px" }}
                      />
                    </MDBInputGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <MDBInputGroup className="mb-3 my-3">
                      <input
                        className="form-control"
                        type="file"
                        name="avatar"
                        onChange={onChange}
                      />
                    </MDBInputGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={createArticle}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </>
          </Fragment>
        </div>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default CreateArticle;
