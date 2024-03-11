import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import "../../index.css";

const NoAuth = () => {
  return (
    <div>
      <>
        <div style={{ paddingBottom: "0px" }}>
          <Navbar />
        </div>

        <div>
          <section style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol lg="12">
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText
                            className="mb-12 text-center"
                            style={{
                              fontSize: "75px",
                              fontWeight: "bold",
                              width: "100%",
                              height: "50vh",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Sorry, you do not have access to this page!
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </>
    </div>
  );
};

export default NoAuth;
