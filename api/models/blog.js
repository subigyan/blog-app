const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter blog name"],
    },
    author: {
        type: String,
        trim: true,
        required: [true, "Author required"],
    },
    content: {
        type: String,
        required: [true, "Blog Content Required"],
    },
    addDate: {
        type: Date,
        default: Date.now,
    },

    img: {
        type: String,
    },
});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
