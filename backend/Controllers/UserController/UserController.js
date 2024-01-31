const bcrypt = require("bcrypt");
const UserModel = require("../../Model/UserSchema");
const jwt = require("jsonwebtoken");
const ComplaintModel = require("../../Model/UserComplaintSchema");
const BirthCertificateModel = require("../../Model/birthcertificateSchema");
const DeathCertificateModel = require("../../Model/DeathcertificateSchema");
const MarriageCertificateModel = require("../../Model/MarriageCertificateSchema");
const CertificateModel = require("../../Model/CertificateSchema");
const ProjectModel = require("../../Model/ProjectSchema");
// Registration of user
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.json("Already have an account");
    }

    // Create a new user
    await UserModel.create({
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: hash,
    });

    return res.json({ message: "Account created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};



module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email: req.body.email });
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // Password is correct
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );

      // res.cookie('token', token, { httpOnly: true });

      return res.json({ status: "ok", user: user, token });
    } else {
      // User not found or password is incorrect
      return res.json({ status: "error", user: false });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//complaint register//
module.exports.registerComplaint = async (req, res, next) => {
  const {userId}=req.body;
  const { name, aadharNumber, email, phonenumber, complaint } = req.body;
  const newComplaint = new ComplaintModel({
    name,
    aadharNumber,
    email,
    phonenumber,
    complaint,
    image: req.uploadedFileName,
    userId,
  });

  newComplaint
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};

//insert birthcertificate data//
module.exports.birthcertificate = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      childname,
      nameofmother,
      nameoffather,
      aadhar,
      gender,
      address,
      dateofbirth,
      placeofbirth,
      userId: { _id },
    } = req.body;
    

    const newCertificate = new BirthCertificateModel({
      childname,
      nameofmother,
      nameoffather,
      aadhar,
      gender,
      address,
      dateofbirth,
      placeofbirth,
      userId: { _id },
    });


    await newCertificate.save();

    res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//insert deathcertificate data//
module.exports.deathcertificate = async (req, res, next) => {
  try {
    const {
      nameofdeceased,
      nameofmother,
      nameoffather,
      address,
      aadhar,
      gender,
      dateofdeath,
      placeofdeath,
      userId: { _id },
    } = req.body;
    const newCertificate = new DeathCertificateModel({
      nameofdeceased,
      nameofmother,
      nameoffather,
      address,
      aadhar,
      gender,
      dateofdeath,
      placeofdeath,
      userId: { _id },
    });

    await newCertificate.save();

    res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//insert marriagecertificate data//
module.exports.marriagecertificate = async (req, res, next) => {
  try {
    const {
      bridegroomname,
      bridename,
      dateofmarriage,
      placeofmarriage,
      registrationno,
      address,
      aadhar,
      userId: { _id },
    } = req.body;
    const newCertificate = new MarriageCertificateModel({
      bridegroomname,
      bridename,
      dateofmarriage,
      placeofmarriage,
      registrationno,
      address,
      aadhar,
      userId: { _id },
    });

    await newCertificate.save();

    res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get birthcertificate info from admin//
module.exports.getBirthCertificateInfo = async (req, res, next) => {
  try {
    
    // Query the database for the birth certificate
    const birthCertificateInfo = await CertificateModel.findOne({
      certificatename: "BirthCertificate",
    });

    if (!birthCertificateInfo) {
      return res.status(404).json({ error: "Birth certificate not found" });
    }

    res.status(200).json(birthCertificateInfo);
  } catch (error) {
    console.error("Error getting birth certificate info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get death certificate info from admin//
module.exports.getDeathCertificateInfo = async (req, res, next) => {
  try {
    // Query the database for the birth certificate
    const DeathCertificateInfo = await CertificateModel.findOne({
      certificatename: "DeathCertificate",
    });

    if (!DeathCertificateInfo) {
      return res.status(404).json({ error: "Death certificate not found" });
    }

    res.status(200).json(DeathCertificateInfo);
  } catch (error) {
    console.error("Error getting Death certificate info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get marriagecertificate info from admin//
module.exports.getMarriageCertificateInfo = async (req, res, next) => {
  try {
    // Query the database for the birth certificate
    const MarriageCertificateInfo = await CertificateModel.findOne({
      certificatename: "MarriageCertificate",
    });

    if (!MarriageCertificateInfo) {
      return res.status(404).json({ error: "Marriage certificate not found" });
    }

    res.status(200).json(MarriageCertificateInfo);
  } catch (error) {
    console.error("Error getting Marriage certificate info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get harithakeral info from admin//
module.exports.getHarithakeralamInfo = async (req, res, next) => {
  try {
    const HarithaKeralamInfo = await ProjectModel.findOne({
      name: "HarithaKeralam",
    });

    if (!HarithaKeralamInfo) {
      return res.status(404).json({ error: "HarithaKeralam info not found" });
    }

    res.status(200).json(HarithaKeralamInfo);
  } catch (error) {
    console.error("Error getting harithakeralam info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get impactkerala info from admin//
module.exports.getImpactKeralaInfo = async (req, res, next) => {
  try {
    const ImpactKeralaInfo = await ProjectModel.findOne({
      name: "ImpactKerala",
    });

    if (!ImpactKeralaInfo) {
      return res.status(404).json({ error: "ImpactKerala info not found" });
    }

    res.status(200).json(ImpactKeralaInfo);
  } catch (error) {
    console.error("Error getting ImpactKerala info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get vathilpadisevanam info//
module.exports.getVathilpadiSevanamInfo = async (req, res, next) => {
  try {
    const VathilpadiSevanamInfo = await ProjectModel.findOne({
      name: "VathilpadiSevanam",
    });

    if (!VathilpadiSevanamInfo) {
      return res
        .status(404)
        .json({ error: "Vathilpadisevanam info not found" });
    }

    res.status(200).json(VathilpadiSevanamInfo);
  } catch (error) {
    console.error("Error getting VathilpadiSevanam info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get kerala solid info//
module.exports.getKeralaSolidInfo = async (req, res, next) => {
  try {
    const KeralaSolidInfo = await ProjectModel.findOne({
      name: "KeralaSolidWasteManagementProject",
    });

    if (!KeralaSolidInfo) {
      return res.status(404).json({ error: "KeralaSolidInfo  not found" });
    }

    res.status(200).json(KeralaSolidInfo);
  } catch (error) {
    console.error("Error getting KeralaSolidInfo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get user details from middleware//
module.exports.getUserDetails = async (req,res,next) =>{
  try {
    const iduser = req.user;
    res.json({user:iduser});
  } catch (error) {
    console.log(error);
    
  }
  next(); 
}

// controllers/UserController.js






