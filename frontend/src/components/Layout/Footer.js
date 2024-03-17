import React, { useState } from "react";
import axios from "axios";
import {
  MDBIcon,
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { getUser } from "../utils/helpers";

const Footer = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    

    try {
      await axios.post("http://localhost:4001/api/v1/send-feedback", { message: feedback, email: getUser().email });
      alert("Feedback sent successfully!");
      setFeedback("");
    } catch (error) {
      console.log(error);
      alert("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <div>
      <MDBFooter
        className="text-center"
        color="white"
        bgColor="dark"
        position="relative"
        style={{ top: "0px", width: "100vw" }}
      >
        <MDBContainer className="p-4">
          <section className="">
            <form onSubmit={handleSubmit}>
              <MDBRow className="d-flex justify-content-center">
                <MDBCol size="auto">
                  <p className="pt-2">
                    <strong>Give us your feedback!</strong>
                  </p>
                </MDBCol>

                <MDBCol md="5" start>
                  <MDBInput
                    contrast
                    type="feedback"
                    label="What can we improve on?"
                    className="mb-4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </MDBCol>

                <MDBCol size="auto">
                  <MDBBtn outline color="light" type="submit" className="mb-4">
                    Send
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </section>

          <section className="mb-4">
            <p>
              We value your feedback! Please share your thoughts and suggestions
              by replying to this email or contacting us. Your input helps us
              improve our products and services. Thank you for choosing NoWaste.
            </p>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <a className="text-white">NoWaste</a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
