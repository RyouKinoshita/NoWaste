import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import {
    MDBInputGroup,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBRow as Row,
    MDBCol as Col,
    MDBCardImage,
    MDBRipple,
    MDBTextArea
} from 'mdb-react-ui-kit';
import Loader from "../../Layout/Loader";
import Sidebar from "../Sidebar";
import Navbar from "../../Layout/Navbar";
import AdminFooter from "../../Layout/Admin/AdminFooter";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../utils/helpers";
import MetaData from "../../Layout/Metadata";

const UpdateArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
    const [article, setArticle] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        const getSingleArticle = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_API}/article/get-single-article/${id}`, config);
                // console.log(data)
                setArticle(data.article);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getSingleArticle();

    }, [id]);

    const onChange = (e) => {
        setImage(e.target.files);
    };

    const updatedArticle = async (formData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_API}/article/update-article/${id}`, formData, config);
            console.log(data)
            setSuccess(data.success);
            navigate('/admin/articleslist')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('Error: ' + error.response.data.message);
            } else {
                setError('Error: Failed to update user profile');
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (title) formData.append('title', title);
        if (author) formData.append('author', author);
        if (description) formData.append('description', description);
        if (image) formData.append('image', image[0]);

        // console.log(formData)
        updatedArticle(formData);
    };

    return (
        <Fragment>
            <Fragment>
                <div style={{ paddingBottom: "20px" }}>
                    <Navbar />
                </div>
            </Fragment>
            <MetaData title={'Article List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10" style={{ justifyContent: "center" }}>
                    <Fragment>
                        {article && (
                            <>
                                <MDBCard>
                                    <form encType="multipart/form-data">
                                        <Row>
                                            <Col>
                                                {article.image && article.image.length > 0 && (
                                                    <>
                                                        <img src={article.image[0].url} alt="Article" style={{ width: '100%', height: '100%' }} />
                                                    </>
                                                )}

                                                <MDBInputGroup className='mb-3 my-3'>
                                                    <input className='form-control' type='file'
                                                        name='avatar'
                                                        onChange={onChange} />
                                                </MDBInputGroup>
                                            </Col>
                                            <Col>
                                                <h1
                                                    className="my-5"
                                                    style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
                                                >
                                                    Update Article
                                                </h1>
                                                <>
                                                    <MDBInputGroup textBefore={article.title} className='mb-3'>
                                                        <MDBInput label='New Title' id='form1' type='text'
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </MDBInputGroup>
                                                    <MDBInputGroup textBefore={article.author} className='mb-3'>
                                                        <MDBInput label='New Author' id='form1' type='text'
                                                            value={author}
                                                            onChange={(e) => setAuthor(e.target.value)}
                                                        />
                                                    </MDBInputGroup>
                                                    <MDBInputGroup textBefore={article.description}>
                                                        <MDBTextArea className='form-control'
                                                            label="New Description"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />
                                                    </MDBInputGroup>


                                                    <button type="submit" className="btn btn-primary" onClick={submitHandler} >Submit</button>
                                                </>
                                            </Col>
                                        </Row>
                                    </form>
                                </MDBCard>
                            </>
                        )}
                    </Fragment>
                </div>
                <AdminFooter />
            </div>
        </Fragment >
    )
}

export default UpdateArticle