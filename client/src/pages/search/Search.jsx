import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Post from "../../components/post/Post";
import "./search.css";
import axios from "axios";

const Search = () => {
    const { posts, setPosts } = useGlobalContext();
    // const getPostCallback = useCallback(() => getPosts(), []);
    useEffect(() => {
        console.log("123");
        const getData = async () => {
            const res = await axios("/api");
            const blogPosts = await res.data.data;
            // console.log(blogPosts);
            setPosts(blogPosts || []);
        };
        getData();
    }, [setPosts]);
    const [searchVal, setSearchVal] = useState("");

    return (
        <div>
            <div className="search-box">
                <h1 className="search-title">Search</h1>
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                />
            </div>
            <div className="search-posts">
                {posts.map((post) => {
                    const title = post.name.replace(/\s/g, "").toLowerCase();
                    if (title.indexOf(searchVal) > -1) {
                        return <Post {...post} key={post._id} />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Search;
