import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MDBInput } from "mdb-react-ui-kit";

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(6, "Your password must be at least 6 characters")
    .required("Please enter your password"),
  avatar: yup
    .mixed()
    .test("fileSize", "File size too large. Maximum is 10MB.", (value) => {
      if (!value) return true; // Allow empty file (no avatar)
      return value[0].size <= 10 * 1024 * 1024; // 10MB limit
    }),
});

const Register = () => {
  const [avatarPreview, setAvatarPreview] = useState(
    "../../../assets/images/default-avatar.png"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      console.log(error);
      setError();
    }
  }, [error, isAuthenticated, navigate]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const { data: responseData } = await axios.post(
        `${process.env.REACT_APP_API}register`,
        formData,
        config
      );

      console.log(responseData.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setIsAuthenticated(false);
      setError(error.response?.data?.message || "An error occurred");
      console.error(error.response?.data?.message || "An error occurred");
    }
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
                      paddingTop: "160px",
                    }}
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
                        Register for an account
                      </h5>
                      <div className="form-outline mb-4">
                        <MDBInput
                          {...register("name")}
                          className="mb-4"
                          type="text"
                          label="Full Name"
                        />
                        {errors.name && (
                          <p className="text-danger">{errors.name.message}</p>
                        )}
                      </div>
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
                      <div className="form-outline mb-4">
                        <div className="d-flex align-items-center">
                          <div>
                            <figure className="avatar mr-3 item-rtl">
                              <img
                                src={avatarPreview}
                                className="rounded-circle"
                                alt="Avatar Preview"
                                style={{ maxWidth: "75%", height: "auto" }}
                              />
                            </figure>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="avatar"
                              className="custom-file-input"
                              id="customFile"
                              accept="image/*"
                              onChange={(e) => {
                                onChange(e);
                                setValue("avatar", e.target.files);
                              }}
                            />
                            {errors.avatar && (
                              <p className="text-danger">
                                {errors.avatar.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Login here
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
};

export default Register;
