const mongoose = require("mongoose");
const DeathCertificateSchema = new mongoose.Schema({
    nameofdeceased: {
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
  dateofdeath: {
    type: Date,
    required: true,
  },
  placeofdeath: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

const DeathCertificateModel = mongoose.model("deathcertificate", DeathCertificateSchema);

module.exports = DeathCertificateModel;
