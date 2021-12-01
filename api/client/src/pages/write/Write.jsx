import "./write.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router";

import addImage from "../../assets/images/addimg.png";

const Write = () => {
    const { addPost } = useGlobalContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    // const [submitable, setSubmitable] = useState(false);
    // const [uploaded, setUploaded] = useState(false);
    const imgRef = useRef("");
    const [imgSrc, setImgSrc] = useState(undefined);

    const submitPost = async (e) => {
        e.preventDefault();

        // const id = uuidv4();

        const post = {
            name: title,
            author: author,
            content: content,
            img: imgRef.current.files[0],
        };
        // let postForm = new FormData();
        // postForm.append("name", title);
        // postForm.append("author", author);
        // postForm.append("content", content);
        // console.log("123");
        // console.log(postForm);

        const id = await addPost(post);

        // console.log(id);
        navigate(`/blog/${id}`);
    };

    const fileUploaded = () => {
        console.log("uploaded");
        var selectedFile = imgRef.current.files[0];
        var reader = new FileReader();
        imgRef.current.title = selectedFile.name || "name";
        reader.onload = function (event) {
            setImgSrc(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    // useEffect(() => {
    //     if (title && author && content) setSubmitable(true);
    // }, [title, author, content]);

    return (
        <div className="write">
            <label htmlFor="fileInput" className="img-label">
                <img
                    src={imgSrc || addImage}
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
                        className="add-input"
                        placeholder="Enter Title"
                        autoFocus={true}
                        value={title}
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
                    Publish Blog
                    {/* </a> */}
                    {/* /#posts */}
                </button>
            </form>
        </div>
    );
};

export default Write;
