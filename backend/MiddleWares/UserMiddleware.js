const multer = require("multer");
const path = require("path");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserSchema");
//complaint register//
// middlewares/uploadMiddleware.js

function uploadMiddleware(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  const file = req.files.file;
  const fileName = file.name;

  // Specify the path where you want to save the file
  const uploadPath = path.join(__dirname, "../public/images", fileName);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.uploadedFileName = fileName;
    next();
  });
}

module.exports = uploadMiddleware;

//jwt varification user//
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, "secret123");

    const user = await UserModel.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;
  
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
