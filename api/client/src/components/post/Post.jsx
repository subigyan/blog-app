import "./post.css";

import { Link } from "react-router-dom";

import noImage from "../../assets/images/noImage.png";

const Post = ({ _id: id, name, content, addDate, img }) => {
    // const date = addDate.toLocaleDateString("en-US");
    const date = new Date(addDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const postDate = date.toLocaleDateString("en-US", options);
    // console.log(img);
    // console.log(id, name);
    return (
        <div className="post">
            <Link
                to={`/blog/${id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
                <img
                    src={img || noImage}
                    className="post-img-card"
                    alt="post-img"
                    style={!img ? { objectFit: "contain" } : {}}
                />

                <div className="post-info">
                    {/* <div className="post-cats">
                    <span className="cat">Life</span>
                    <span className="cat">Humor</span>
                </div> */}

                    <span className="title">{name}</span>
                    <span className="date">{postDate}</span>
                </div>

                <div className="post-content">{content}</div>
            </Link>
        </div>
    );
};

export default Post;
