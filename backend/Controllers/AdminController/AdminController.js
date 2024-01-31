const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../Model/adminSchema");
const UserModel = require("../../Model/UserSchema");
const CertificateModel = require("../../Model/CertificateSchema");
const BillModel = require("../../Model/BillAmountSchema");
const ProjectModel = require("../../Model/ProjectSchema");
const BirthCertificateModel = require("../../Model/birthcertificateSchema");
const ComplaintModel = require("../../Model/UserComplaintSchema");
module.exports.adminlogin = async (req, res, next) => {
  try {
   
    const admin = await AdminModel.findOne({ email: req.body.email });

    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      // Password is correct
      const token = jwt.sign(
        {
          name: admin.name,
          email: admin.email,
        },
        'admin-key'
      );
      // res.cookie('token', token, { httpOnly: true });

      return res.json({ status: 'ok', admin: true, token });
    } else {
      // User not found or password is incorrect
      return res.json({ status: 'error', admin: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};


module.exports.getuser = async (req, res, next) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

//add certificatedetails//
module.exports.addcertificate = async (req, res, next) => {
  try {
    const { certificatename, requirements } = req.body;
    const newCertificate = new CertificateModel({
      certificatename,
      requirements,
    });

    await newCertificate.save();

    res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//post bill amount//
module.exports.BillAmount = async (req, res, next) => {
  try {
    const {
      amount,

    } = req.body;
    const newBill = new BillModel({
      amount,
      
    });

    await newBill.save();

    res.status(200).json({ message: "Bill Amount added successfully" });
  } catch (error) {
    console.error("Error adding BillAmount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.Project= async (req, res,next)=> {
  const { name, content, } = req.body;

  const newComplaint = new ProjectModel({
    name,
    content,
    image: req.uploadedFileName,
  });

  newComplaint
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
}

//get birthcertificate details//
module.exports.getbirthcertificatedetails = async (req, res, next) => {
  BirthCertificateModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

//get usercomplaint details//
module.exports.getcomplaintdata = async (req, res, next) => {
  ComplaintModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Block user
const blockUser = async (req, res, next) => {
  const iduser = req.user;
  console.log(iduser,"&&&%%%");
console.log();
  try {
    const user = await UserModel.findById(iduser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.blocked = true;
    await user.save();

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  next();
};

// Unblock user
const unblockUser = async (req, res, next) => {
  const iduser = req.user;

  try {
    const user = await UserModel.findById(iduser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.blocked = false;
    await user.save();

    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  // Your existing methods
  blockUser,
  unblockUser,
};



