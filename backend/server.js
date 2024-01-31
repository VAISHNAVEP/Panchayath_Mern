const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/UserRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const fileUpload = require("express-fileupload");
const ComplaintModel = require("./Model/UserComplaintSchema");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { config } = require("dotenv");
const path = require("path");

const app = express();
config({path:"./config/config.env"})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(fileUpload());
app.use(cors());
app.use("/", userRoutes);
app.use("/admin", AdminRoutes);
mongoose.connect(process.env.MONGODB_URI);
const RAZORPAY_API_KEY=process.env.RAZORPAY_API_KEY;
const RAZORPAY_API_SECRET=process.env.RAZORPAY_API_SECRET;

const port = process.env.PORT
app.listen(port, () => {
  console.log("server running successfully");
});





