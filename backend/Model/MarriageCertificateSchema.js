const mongoose = require("mongoose");
const MarriageCertificateSchema = new mongoose.Schema({
    bridegroomname: {
    type: String,
    required: true,
  },
  bridename: {
    type: String,
    required: true,
  },
  dateofmarriage: {
    type: Date,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
  },
  registrationno: {
    type: Number,
    required: true,
  },
  placeofmarriage: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

const MarriageCertificateModel = mongoose.model("marriagecertificate", MarriageCertificateSchema);

module.exports = MarriageCertificateModel;
