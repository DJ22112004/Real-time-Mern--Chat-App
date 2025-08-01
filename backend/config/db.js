const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Direct connect with MONGO_URI from .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:");
        console.error(error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
