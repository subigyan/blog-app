const express = require("express");
const path = require("path");
const colors = require("colors");

require("dotenv").config({ path: path.join(__dirname, "config", ".env") });

const app = express();

app.use("/uploads", express.static("uploads"));

const crudRouter = require("./routes");
const connectDB = require("./config/db");

app.use(express.json());
app.use("/api", crudRouter);
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`.blue.underline.bold)
);
