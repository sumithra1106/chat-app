const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully");
    }
    catch (error) {
        console.log("db connection failed", error);
    }

}

module.exports = dbConnect;