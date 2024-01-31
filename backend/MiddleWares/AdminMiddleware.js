
const path = require("path");
const fileUpload = require("express-fileupload");
const AdminModel = require("../Model/adminSchema");
const jwt = require("jsonwebtoken");
function ProjectMiddleware(req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
    const file = req.files.file;
    const fileName = file.name;
  
    // Specify the path where you want to save the file
    // const uploadPath = path.join(__dirname, '../public/images', fileName);
    const uploadPath = path.join(__dirname, '../public/images', fileName);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      req.uploadedFileName = fileName;
      req.imageUrl = `/public/images/${fileName}`; //NEW ADDED//
      next();
    });
  }
  
  module.exports = ProjectMiddleware;

  // admin jwt verification
  // const adminauthMiddleware = async (req, res, next) => {
  //   try {
  //     const admintoken = req.headers.authorization;
  // console.log(admintoken,"!!!!");
  //     if (!admintoken) {
  //       return res
  //         .status(401)
  //         .json({ message: "Unauthorized access: No token provided" });
  //     }
  
  //     const decoded = jwt.verify(admintoken, 'admin-key');
  
  //     const admin = await AdminModel.findOne({ email: decoded.email });
  
  //     if (!admin) {
  //       return res.status(401).json({ message: "Unauthorized: Invalid token" });
      
  //     }
  
  //     req.admin = admin;
  //     next();
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  // };
  
  // module.exports = adminauthMiddleware;
  

  
  