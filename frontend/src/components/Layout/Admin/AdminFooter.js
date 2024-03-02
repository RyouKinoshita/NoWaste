import React from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

const AdminFooter = () => {
  return (
    <div style={{ marginTop: "auto", width: "100%" }}>
      <MDBFooter className="text-center" color="white" bgColor="dark">
        <div
          className="text-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            width: "100%", // Ensure the width is 100%
          }}
        >
          © 2024 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            NoWaste
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default AdminFooter;
