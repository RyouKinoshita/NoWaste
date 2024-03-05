import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

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
const ArticlesList = () => {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');
    console.log(articles);

    useEffect(() => {
        const getAllArticles = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':` Bearer ${getToken()}`
                    }
                };
                const { data } = await axios.get(`http://localhost:4001/api/v1/article/articles`, config);
                setArticles(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getAllArticles();
    }, []);

    const deleteArticle = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                },
            };
            const { data } = await axios.delete(
            `    ${process.env.REACT_APP_API}/article/delete-article/${id}`,
                config
            );
            window.location.reload();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const deleteArticleHandler = (id) => {
        deleteArticle(id);
    };

    const ArticlesDatatable = () => {
        return {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                },
                {
                    label: 'Author',
                    field: 'author',
                    sort: 'asc',
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc',
                },
                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc',
                },
                {
                    field: 'actions',
                },
            ],
            rows: articles.map(article => ({
                id: article._id,
                title: article.title,
                author: article.author,
                description: article.description,
                image: (
                    <Fragment>
                        {article.image && article.image.length > 0 && (
                            <p>
                                <img src={article.image[0].url} alt={article.title} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            </p>
                        )}
                    </Fragment>
                ),

                actions: (
                    <>
                        <Link to={`/admin/article/update/${article._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil">Update</i>
                        </Link>
                        <Link className="btn btn-danger py-1 px-2" onClick={() => deleteArticleHandler(article._id)}>
                            <i class="fa-solid fa-trash"></i>
                        </Link>
                    </>
                ),
            }))
        };
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
                        <h1
                            className="my-5"
                            style={{ color: "black", fontWeight: "bold", marginLeft: "15px" }}
                        >
                            All Articles
                        </h1>
                        <div className="d-flex justify-content-end mb-3">
                            <Link to={'/admin/article/create'} className="btn btn-primary mr-5">
                                Add New Article
                            </Link>
                        </div>
                        <MDBDataTable
                            data={ArticlesDatatable()}
                            className="px-3"
                            bordered
                            striped
                            style={{ color: "black", fontWeight: "bold" }}
                        />
                    </Fragment>
                </div>
                <AdminFooter />
            </div>
        </Fragment>
    )
}

export default ArticlesList