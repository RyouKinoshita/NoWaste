import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBInput } from "mdb-react-ui-kit";

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "../../../assets/images/default-avatar.png"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      console.log(error);
      setError();
    }
  }, [error.isAuthenticated, navigate]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("name", userData.get("name"));
      formData.append("email", userData.get("email"));
      formData.append("password", userData.get("password"));
      formData.append("avatar", avatar);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/register`,
        formData,
        config
      );
      console.log(data.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setIsAuthenticated(false);
      setError(error.response.data.message);
      console.log(error.response.data.message);
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
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        register(formData);
                      }}
                    >
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
                          className="mb-4"
                          type="text"
                          label="Full Name"
                          name="name"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <MDBInput
                          className="mb-4"
                          type="email"
                          label="Email address"
                          name="email"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <MDBInput
                          className="mb-4"
                          type="password"
                          label="Password"
                          name="password"
                        />
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
                              onChange={onChange}
                            />
                            {/* <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Avatar
                            </label> */}
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
