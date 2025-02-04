import React, { useState } from "react";
import MetaData from "../Layout/Metadata";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBInput } from "mdb-react-ui-kit";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}password/forgot`,
        formData,
        config
      );

      if (data && data.message) {
        setLoading(false);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        alert("Email Received");
        navigate("/");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setLoading(false); // Disable the button on error
      if (error.response && error.response.status === 400) {
        // Invalid email
        toast.error("Invalid email", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        // An error occurred
        toast.error(error.response?.data?.message || "Invalid email", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const submitHandler = (data) => {
    setLoading(true);
    forgotPassword(data);
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      <section
        className="vh-100"
        style={{ backgroundImage: 'url("../assets/images/wall.jpg")' }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10" style={{ color: "#76FF03" }}>
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-6 col-lg-5 d-none d-md-block"
                    style={{ background: "#57311e" }}
                  >
                    <img
                      src="../assets/images/logo-color.png"
                      alt="login form"
                      className="img-fluid "
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        paddingTop: "10px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <Link to="/">
                            <span className="h2 fw-bold mb-0">No Waste</span>
                          </Link>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Forgot Password
                        </h5>
                        <div className="form-outline mb-4">
                          <MDBInput
                            {...register("email")}
                            id="email_field"
                            className="mb-4"
                            type="email"
                            label="Email address"
                          />
                          {errors.email && (
                            <p className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <button
                          id="forgot_password_button"
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          variant="dark"
                          disabled={loading ? true : false}
                        >
                          Send Email
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
    </>
  );
};

export default ForgotPassword;
