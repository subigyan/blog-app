const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            process.env.MONGO_URI || "mongodb://localhost:27017/blog",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const { host, port, name } = connect.connection;
        console.log(
            `Connected to ${name} database on host ${host} on port ${port}`
                .yellow
        );
    } catch (e) {
        console.log(`Error: ${e.message}`);
        process.exit();
    }
};

module.exports = connectDB;
