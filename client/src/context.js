import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        // {
        //     id: 1,
        //     title: "1",
        //     author: "1",
        //     content: "ashjbsfa fs nmasf nmasfbmasfbsaf",
        //     addDate: "today",
        // },
        // {
        //     id: 2,
        //     title: "2",
        //     author: "1",
        //     content: "ashjbsfa fs nmasf nmasfbmasfbsaf",
        //     addDate: "today",
        // },
        // {
        //     id: 3,
        //     title: "3",
        //     author: "1",
        //     content: "ashjbsfa fs nmasf nmasfbmasfbsaf",
        //     addDate: "today",
        // },
        // {
        //     id: 4,
        //     title: "4",
        //     author: "1",
        //     content: "ashjbsfa fs nmasf nmasfbmasfbsaf",
        //     addDate: "today",
        // },
        // {
        //     id: 5,
        //     title: "5",
        //     author: "1",
        //     content: "ashjbsfa fs nmasf nmasfbmasfbsaf",
        //     addDate: "today",
        // },
    ]);

    const getPosts = async () => {
        try {
            const res = await axios("/api");
            const posts = await res.data.data;
            setPosts(posts);
            return posts;
        } catch (error) {
            console.log(error);
        }
    };

    const addPost = async (post) => {
        // const config = {
        //     header: {
        //         "Content-Type": "application/json",
        //         // "Content-Type": "multipart/form-data",
        //     },
        // };
        try {
            // console.log(post);
            const { name, author, content, img } = post;
            let postForm = new FormData();

            postForm.append("name", name);
            postForm.append("author", author);
            postForm.append("content", content);
            postForm.append("img", img);

            // console.log(postForm);
            const res = axios({
                method: "post",
                url: "/api",
                data: postForm,
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { data } = await res;

            return data.data._id;
            // await axios.post("/api", post, config);
        } catch (error) {
            console.log(error);
        }
    };

    const updatePost = async (id, post) => {
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        try {
            const { name, author, content, img } = post;
            let postForm = new FormData();
            postForm.append("name", name);
            postForm.append("author", author);
            postForm.append("content", content);
            postForm.append("img", img);
            console.log(id + "isid" + post);
            axios.put(`/api/${id}`, postForm, config);
        } catch (error) {}
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const getFunct = {
        posts: getPosts,
    };
    return (
        <AppContext.Provider
            value={{
                posts,
                getPosts,
                addPost,
                deletePost,
                updatePost,
                getFunct,
                setPosts,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
