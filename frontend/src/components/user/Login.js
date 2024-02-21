import { useNavigate } from "react-router-dom";
import { authenticate } from "../utils/helpers"
import axios from 'axios'

import React, { useState } from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';

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
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <form onSubmit={handleSubmit} style={{ width: "300px" }}>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput className='mb-4' type='email' label='Email address' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <MDBInput className='mb-4' type='password' label='Password' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </MDBCol>
                </MDBRow>

                <MDBRow className='mb-4'>
                    <MDBCol size='auto'>
                        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
                    </MDBCol>
                    <MDBCol size='auto'>
                        <a href='#!'>Forgot password?</a>
                    </MDBCol>
                </MDBRow>

                <MDBBtn type='submit' size="sm" block>
                    Sign in
                </MDBBtn>
            </form>
        </div>
    );
}