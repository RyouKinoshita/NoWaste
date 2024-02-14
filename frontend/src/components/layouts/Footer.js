import React from 'react'
import {
    MDBIcon, MDBBtn,
    MDBContainer,
    MDBFooter,
    MDBInput,
    MDBCol,
    MDBRow,
} from "mdb-react-ui-kit";

const Footer = () => {
    return (
        <div>
            <MDBFooter className="text-center" color="white" bgColor="dark">
                <MDBContainer className="p-4">
                    <section className="mb-4">
                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="facebook-f" />
                        </MDBBtn>

                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="twitter" />
                        </MDBBtn>

                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="google" />
                        </MDBBtn>

                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="instagram" />
                        </MDBBtn>

                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="linkedin-in" />
                        </MDBBtn>

                        <MDBBtn
                            outline
                            color="light"
                            floating
                            className="m-1"
                            href="#!"
                            role="button"
                        >
                            <MDBIcon fab icon="github" />
                        </MDBBtn>
                    </section>

                    <section className="">
                        <form action="">
                            <MDBRow className="d-flex justify-content-center">
                                <MDBCol size="auto">
                                    <p className="pt-2">
                                        <strong>Sign up for our newsletter</strong>
                                    </p>
                                </MDBCol>

                                <MDBCol md="5" start>
                                    <MDBInput
                                        contrast
                                        type="email"
                                        label="Email address"
                                        className="mb-4"
                                    />
                                </MDBCol>

                                <MDBCol size="auto">
                                    <MDBBtn
                                        outline
                                        color="light"
                                        type="submit"
                                        className="mb-4"
                                    >
                                        Subscribe
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </form>
                    </section>

                    <section className="mb-4">
                        <p>
                        We value your feedback! Please share your thoughts and suggestions by replying to this email or contacting us. Your input helps us improve our products and services. Thank you for choosing NoWaste.
                        </p>
                    </section>

                  
                </MDBContainer>

                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    © 2024 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">
                        NoWaste
                    </a>
                </div>
            </MDBFooter>
        </div >
    )
}

export default Footer