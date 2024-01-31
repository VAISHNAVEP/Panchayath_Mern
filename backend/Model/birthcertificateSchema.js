const mongoose = require("mongoose");
const BirthCertificateSchema = new mongoose.Schema({
  childname: {
    type: String,
    required: true,
  },
  nameofmother: {
    type: String,
    required: true,
  },
  nameoffather: {
    type: String,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  placeofbirth: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

const BirthCertificateModel = mongoose.model("birthcertificate", BirthCertificateSchema);

module.exports = BirthCertificateModel;
