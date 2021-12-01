import "./singlePost.css";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
    const { posts, deletePost, setPosts } = useGlobalContext();

    useEffect(() => {
        const getData = async () => {
            const res = await axios("/api");
            const blogPosts = await res.data.data;
            // console.log(blogPosts);
            setPosts(blogPosts || []);
        };
        getData();
    }, [setPosts]);

    const param = useParams();
    const postId = param.id;
    // console.log(postId);
    const foundPost = posts.find((posts) => posts._id === postId);
    // console.log(foundPost);
    if (!foundPost) {
        return <div className="not-found">Post Not found</div>;
    }

    const date = new Date(foundPost.addDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const postDate = date.toLocaleDateString("en-US", options);

    const ondelete = (id) => {
        deletePost(id);
    };
    // console.log(foundPost.img);
    return (
        <div className="single-post">
            <div className="post-container">
                <div className="head">
                    {foundPost.img && (
                        <img
                            src={`../${foundPost.img}`}
                            alt="single-post-img"
                            className="post-img"
                        />
                    )}
                    <div className="single-info">
                        <h1 className="single-post-title">
                            {foundPost.name}
                            <div className="edit-icons">
                                <Link to={`/edit/${foundPost._id}`}>
                                    <AiOutlineEdit className="edit" />
                                </Link>
                                <a href="/#posts">
                                    <AiOutlineDelete
                                        className="delete"
                                        onClick={() => ondelete(foundPost._id)}
                                    />
                                </a>
                            </div>
                        </h1>

                        <div className="single-post-info">
                            <span className="post-author">
                                Author: <b>{foundPost.author}</b>
                            </span>
                            <span className="post-date"> {postDate} </span>
                        </div>
                    </div>
                </div>

                <div className="single-post-content">{foundPost.content}</div>
            </div>
        </div>
    );
};

export default SinglePost;
