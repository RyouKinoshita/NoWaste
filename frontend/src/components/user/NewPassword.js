import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MetaData from "../Layout/Metadata";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MDBInput } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const NewPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const resetPassword = async (token, passwords) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}password/reset/${token}`,
        passwords,
        config
      );
      setSuccess(data.success);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (success) {
      toast.success("Password updated", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/");
    }
  }, [error, success, navigate]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);
    resetPassword(token, formData);
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />
      <section
        className="vh-100"
        style={{ backgroundImage: 'url("../assets/images/wall.jpg")' }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10" style={{ color: "#76FF03" }}>
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="../assets/images/feed-more.jpg"
                      alt="new password form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form
                        className="shadow-lg"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <h1 className="m-3">New Password</h1>

                        <div className="form-group m-4 ">
                          <label htmlFor="password_field">Password</label>
                          <MDBInput
                            {...register("password")}
                            id="password_field"
                            className="form-control"
                            type="password"
                          />
                          {errors.password && (
                            <p className="text-danger">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group m-4">
                          <label htmlFor="confirm_password_field">
                            Confirm Password
                          </label>
                          <MDBInput
                            {...register("confirmPassword")}
                            id="confirm_password_field"
                            className="form-control"
                            type="password"
                          />
                          {errors.confirmPassword && (
                            <p className="text-danger">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div>

                        <button
                          id="new_password_button"
                          type="submit"
                          className="btn btn-block py-3"
                        >
                          Set Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default NewPassword;
