const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    certificatename: String,
    requirements: String,
  });
  
  const CertificateModel= mongoose.model('certificate', CertificateSchema);
  module.exports=CertificateModel;
  