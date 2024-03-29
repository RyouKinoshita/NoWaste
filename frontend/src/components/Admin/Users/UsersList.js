import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MetaData from "../../Layout/Metadata";
import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import Toast from "../../Layout/Toast";
import axios from "axios";
import { getToken, successMsg, errMsg } from "../../utils/helpers";

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  let navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const listUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/users`,
        config
      );
      setUsers(data.users);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/admin/user/${id}`,
        config
      );
      setIsDeleted(data.success);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    listUsers();

    if (error) {
      errMsg(error);
      setError("");
    }

    if (isDeleted) {
      successMsg("User deleted successfully");
      navigate("/admin/userslist");
      setIsDeleted(false);
    }
  }, [error, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setTableData = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Avatar",
          field: "avatar",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: (
          <Fragment>
            {user.avatar && user.avatar.url && (
              <img
                src={user.avatar.url}
                alt={user.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            )}
          </Fragment>
        ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
              title="Edit User"
              style={{ marginRight: "15px" }}
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              title="Soft Delete User"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <Fragment>
        <div style={{ paddingBottom: "20px" }}>
          <Navbar />
        </div>
      </Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mb-8">
          <Fragment>
            <h1
              className="my-5"
              style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
            >
              All Users
            </h1>
            <hr className="hr hr-blurry" />
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setTableData()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default UsersList;
