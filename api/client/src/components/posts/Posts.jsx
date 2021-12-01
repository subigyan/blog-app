import React, { useEffect } from "react";
import Post from "../post/Post";
import "./posts.css";
import { useGlobalContext } from "../../context";
import axios from "axios";

const Posts = () => {
    const { posts, setPosts } = useGlobalContext();

    useEffect(() => {
        const getData = async () => {
            const res = await axios("/api");
            const blogPosts = await res.data.data;
            setPosts(blogPosts || []);
        };
        getData();
    }, [setPosts]);

    return (
        <div className="posts" id="posts">
            {posts.map((post) => {
                return <Post {...post} key={post._id} />;
            })}
        </div>
    );
};

export default Posts;
