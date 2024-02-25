import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../utils/helpers";
import axios from "axios";

import React, { useState } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // const { data } = await axios.post(${process.env.REACT_APP_API}/api/v1/login, form, config)
      const { data } = await axios.post(
        `http://localhost:4001/api/v1/login`,
        { email, password },
        config
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      authenticate(data, () => navigate("/homepage"));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    // <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    //     <form onSubmit={handleSubmit} style={{ width: "300px" }}>
    //         <MDBRow className='mb-4'>
    //             <MDBCol>
    //                 <MDBInput className='mb-4' type='email' label='Email address' value={email}
    //                     onChange={(e) => setEmail(e.target.value)} />
    //                 <MDBInput className='mb-4' type='password' label='Password' value={password}
    //                     onChange={(e) => setPassword(e.target.value)} />
    //             </MDBCol>
    //         </MDBRow>

    //         <MDBRow className='mb-4'>
    //             <MDBCol size='auto'>
    //                 <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
    //             </MDBCol>
    //             <MDBCol size='auto'>
    //                 <a href='#!'>Forgot password?</a>
    //             </MDBCol>
    //         </MDBRow>

    //         <MDBBtn type='submit' size="sm" block>
    //             Sign in
    //         </MDBBtn>
    //     </form>
    // </div>

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
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h2 fw-bold mb-0">No Waste</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign in to your account
                      </h5>
                      <div className="form-outline mb-4">
                        <MDBInput
                          className="mb-4"
                          type="email"
                          label="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <MDBInput
                          className="mb-4"
                          type="password"
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
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
