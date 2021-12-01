const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
});

const filterFile = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, false);

    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: filterFile,
});

const router = express.Router();

const {
    getBlogs,
    postBlog,
    deleteBlog,
    updateBlog,
    getBlog,
} = require("../controllers/blogController");

router.route("/").get(getBlogs);

router.route("/").post(upload.single("img"), postBlog);

router.route("/:id").delete(deleteBlog);

router.route("/:id/").put(upload.single("img"), updateBlog);

router.route("/blog/:id").get(getBlog);

module.exports = router;
