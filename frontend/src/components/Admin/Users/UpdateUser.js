import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaData from "../../Layout/Metadata";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, successMsg, errMsg } from "../../utils/helpers";
import axios from "axios";
import Loader from "../../Layout/Loader";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
});

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const getUserDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/user/${id}`,
        config
      );
      setUser(data.user);
      setLoading(false);
      setValue("name", data.user.name);
      setValue("email", data.user.email);
      setValue("role", data.user.role);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/admin/user/${id}`,
        userData,
        config
      );
      setIsUpdated(data.success);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetails(id);

    if (error) {
      errMsg(error);
      setError("");
    }

    if (isUpdated) {
      successMsg("User updated successfully");
      navigate("/admin/userslist");
    }
  }, [error, isUpdated, id]);

  const onSubmit = (data) => {
    updateUser(user._id, data);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div style={{ paddingBottom: "20px" }}>
            <Navbar />
          </div>
          <MetaData title={`Update User`} />
          <div className="row">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>
            <div className="col-12 col-md-10">
              <div className="row wrapper">
                <div className="col-10 col-lg-5">
                  <form
                    className="shadow-lg p-4 rounded"
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ border: "solid 4px white" }}
                  >
                    <h1 className="mt-2 mb-5" style={{ color: "black" }}>
                      Update User
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
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="invalid-feedback">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="role_field">Role</label>
                      <select
                        id="role_field"
                        className={`form-control ${
                          errors.role ? "is-invalid" : ""
                        }`}
                        {...register("role")}
                      >
                        <option value="admin">admin</option>
                        <option value="buyer">buyer</option>
                        <option value="seller">seller</option>
                      </select>
                      {errors.role && (
                        <p className="invalid-feedback">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="buttonforLogin mt-4"
                      style={{ marginLeft: "0px" }}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Fragment>
            <AdminFooter />
          </Fragment>
        </Fragment>
      )}
    </>
  );
};

export default UpdateUser;
