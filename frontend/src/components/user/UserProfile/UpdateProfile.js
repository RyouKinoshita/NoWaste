
import React, { Fragment, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBValidationItem,
  MDBInput,
} from "mdb-react-ui-kit";

import "../../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils/helpers";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "../../../public/assets/images/default-avatar.png"
  );
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "" }); // New state for form values
  const [updateMode, setUpdateMode] = useState(false);
  let navigate = useNavigate();

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:4001/api/v1/me`,
        config
      );
      setName(data.user.name);
      setEmail(data.user.email);
      setAvatarPreview(data.user.avatar.url);
      setUser(data.user);
      setLoading(false);
      // Set the initial form values
      setFormValues({ name: data.user.name, email: data.user.email });
    } catch (error) {
      toast.error("user not found", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const updateProfile = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/v1/me/update`,
        userData,
        config
      );
      setIsUpdated(data.success);
      setLoading(false);
      toast.success("user updated", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
      navigate("/profile", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("user not found", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (updateMode) {
      const formData = new FormData();
      formData.set("name", formValues.name);
      formData.set("email", formValues.email);
      formData.set("avatar", avatar);
      updateProfile(formData);
    } else {
      setUpdateMode(true); // Enable update mode
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Fragment>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="3">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  {user.avatar && (
                    <MDBCardImage
                      src={user.avatar.url}
                      alt={user.name}
                      className="rounded-circle mb-4"
                      style={{ width: "150px" }}
                      fluid
                    />
                  )}
                  {/* Display file input only in update mode */}
                  {updateMode && (
                    <div className="mb-3">
                      <label htmlFor="avatarInput" className="form-label">
                        Choose a new avatar:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="avatarInput"
                        onChange={(e) => setAvatar(e.target.files[0])}
                      />
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="6">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem className="col-md-6">
                        <MDBInput
                          value={formValues.name}
                          name="name"
                          onChange={onChange}
                          id="validationCustom01"
                          required
                          disabled={!updateMode}
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBValidationItem className="col-md-6">
                        <MDBInput
                          value={formValues.email}
                          name="email"
                          onChange={onChange}
                          id="validationCustom02"
                          required
                          disabled={!updateMode}
                        />
                      </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Role</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.role}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="3">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn
                      outline
                      onClick={() => setUpdateMode(true)}
                      hidden={updateMode} // Disable button if already in update mode
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Update Profile
                    </MDBBtn>
                    <MDBBtn
                      outline
                      className="ms-1"
                      onClick={submitHandler}
                      hidden={!updateMode}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Confirm Changes
                    </MDBBtn>
                    <MDBBtn
                      outline
                      className="ms-1"
                      onClick={() => setUpdateMode(false)}
                      hidden={!updateMode}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Cancel
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </Fragment>
  );
};

export default UpdateProfile;