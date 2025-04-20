const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/route");
const dbConnect = require('./config/db');
// const path = require("path");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/", routes);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await dbConnect();
    app.listen(PORT, () => {
        console.log(`Server running on the port : ${PORT}`);
    })
}

startServer()


