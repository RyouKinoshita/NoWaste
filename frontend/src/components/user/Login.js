import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticate } from "../utils/helpers";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data: responseData } = await axios.post(
        `${process.env.REACT_APP_API}login`,
        data,
        config
      );

      localStorage.setItem("user", JSON.stringify(responseData));
      authenticate(responseData, () => navigate("/"));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show toast for incorrect email or password
        toast.error("Incorrect email or password", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(error);
      }
    }
  };

  const onSubmit = (data) => {
    login(data);
  };

  return (
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
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <Link to="/">
                          <span className="h2 fw-bold mb-0">No Waste</span>
                        </Link>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign in to your account
                      </h5>
                      <div className="form-outline mb-4">
                        <MDBInput
                          {...register("email")}
                          className="mb-4"
                          type="email"
                          label="Email address"
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="form-outline mb-4">
                        <MDBInput
                          {...register("password")}
                          className="mb-4"
                          type="password"
                          label="Password"
                        />
                        {errors.password && (
                          <p className="text-danger">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="/forgotPassword">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
