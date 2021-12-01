import "./edit.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router";

import { useParams } from "react-router";

import axios from "axios";
import addImage from "../../assets/images/addimg.png";

const Edit = () => {
    const { updatePost, posts } = useGlobalContext();
    const navigate = useNavigate();
    const param = useParams();
    const postId = param.id;
    // console.log(postId);
    // console.log(postId);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    // const [submitable, setSubmitable] = useState(false);
    // const [uploaded, setUploaded] = useState(false);
    useEffect(() => {
        const getBlog = async () => {
            const res = await axios(`/api/blog/${postId}`);
            const data = await res.data.data;
            setTitle(data.name);
            setAuthor(data.author);
            setContent(data.content);
        };
        getBlog();
        // console.log("123");
    }, [postId]);

    const imgRef = useRef("");

    const [imgSrc, setImgSrc] = useState(undefined);

    const foundPost = posts.find((posts) => posts._id === postId);

    const submitPost = async (e) => {
        e.preventDefault();

        const post = {
            name: title,
            author: author,
            content: content,
            img: imgRef.current.files[0],
        };

        await updatePost(foundPost._id, post);

        console.log(foundPost._id, post);

        // console.log(id);
        navigate(`/blog/${foundPost._id}`);
    };

    const fileUploaded = () => {
        console.log("uploaded");
        var selectedFile = imgRef.current.files[0];
        var reader = new FileReader();
        imgRef.current.title = selectedFile.name;
        reader.onload = function (event) {
            setImgSrc(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    // useEffect(() => {
    //     if (title && author && content) setSubmitable(true);
    // }, [title, author, content]);

    if (!foundPost) {
        return <div className="not-found">Post Not found</div>;
    }

    // console.log(foundPost.img);

    return (
        <div className="write">
            {/* <img
                src={
                    imgSrc || foundPost.img
                        ? `../../${foundPost.img}`
                        : undefined || postIng
                }
                alt="add-post-img"
                className="post-add-img"
            /> */}

            <label htmlFor="fileInput" className="img-label">
                <img
                    src={
                        imgSrc ||
                        (foundPost.img
                            ? `../../${foundPost.img}`
                            : undefined) ||
                        addImage
                    }
                    style={{
                        objectFit: imgSrc ? "cover" : "contain",
                        border: "1px solid black",
                    }}
                    alt="add-post-img"
                    className="post-add-img"
                />
            </label>
            <form className="write-post" onSubmit={submitPost}>
                <div className="write-form-group ">
                    <label htmlFor="fileInput" className="icon-label">
                        <AiOutlinePlusCircle className="add-img-icon" />
                        {/* <span className="tool-tip-text">Add Image</span> */}
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        ref={imgRef}
                        onChange={fileUploaded}
                    />
                    <input
                        type="text"
                        className="add-input title"
                        placeholder="Enter Title"
                        autoFocus={true}
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="add-input author"
                        placeholder="Enter Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className="write-form-group">
                    <textarea
                        placeholder="Enter Blog Content"
                        type="text"
                        className="add-input content-input"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button className="submit-post" type="submit">
                    {/* <a href={`${submitable ? "/#posts" : "#"}`}> */}
                    Edit and Publish Blog
                    {/* </a> */}
                    {/* /#posts */}
                </button>
            </form>
        </div>
    );
};

export default Edit;
