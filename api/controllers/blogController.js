const Blog = require("../models/blog");

exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            erros: error.message,
        });
    }
};

exports.postBlog = async (req, res, next) => {
    try {
        // console.log(req.file);
        // console.log(req.body);
        const { name, author, content } = req.body;

        let img = undefined;
        if (req.file) {
            img = req.file.path;
        }

        const newBlog = await Blog.create({ name, author, content, img });
        return res.status(201).json({
            success: true,
            data: newBlog,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                success: false,
                error: messages,
            });
        }
        return res.send(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const foundBlog = await Blog.findById(req.params.id);
        if (!foundBlog) {
            // console.log("123");
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Not found",
            });
        }

        await foundBlog.remove();
        return res.status(200).json({
            success: true,
            message: "Delete Successfull",
            data: foundBlog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;

        const foundBlog = await Blog.findById(id);
        console.log(foundBlog);
        // console.log(id);

        const { name, author, content } = req.body;

        let img = undefined;
        if (req.file) {
            img = req.file.path;
        }

        if (!foundBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Not found",
            });
        }
        if (!req.body) {
            return res.status(202).json({
                success: true,
                message: "Updated",
            });
        }

        await foundBlog.update({ name, author, content, img });

        console.log(foundBlog);

        return res.status(202).json({
            success: true,
            message: "Updated",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.findById(req.params.id);
        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            erros: error.message,
        });
    }
};
