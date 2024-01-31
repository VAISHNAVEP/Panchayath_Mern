  const express = require("express");
  const router = express.Router();
  const cors = require("cors");
  const handlers = require('../MiddleWares/razorpay');
  const {
    signup,
    login,
    complaintregister,
    birthcertificate,
    deathcertificate,
    marriagecertificate,
    getBirthCertificateInfo,
    getDeathCertificateInfo,
    getMarriageCertificateInfo,
    uploadImage,
    registerComplaint,
    getHarithakeralamInfo,
    getImpactKeralaInfo,
    getVathilpadiSevanamInfo,
    getKeralaSolidInfo,
    getUserDetails,
  } = require("../Controllers/UserController/UserController");
  const { checkFileUpload, upload, verifyUser } = require("../MiddleWares/UserMiddleware");
  const uploadMiddleware = require("../MiddleWares/UserMiddleware");
const authMiddleware = require("../MiddleWares/UserMiddleware");
const { handleRazorpayCallback } = require("../Controllers/RazorPayController/RazorPayController");
  router.post("/signup", signup);
  router.post("/login",authMiddleware, login);
  router.post("/complaintregister/:userId", uploadMiddleware, registerComplaint);
  router.post("/birthcertificateform", birthcertificate);
  router.post("/deathcertificateform", deathcertificate);
  router.post("/marriagecertificateform", marriagecertificate);
  router.get("/", getBirthCertificateInfo);
  router.get("/deathcertificatehome", getDeathCertificateInfo);
  router.get("/marriagecertificatehome", getMarriageCertificateInfo);
  router.get("/harithakeralam",getHarithakeralamInfo);
  router.get("/impactkerala",getImpactKeralaInfo);
  router.get("/vathilpadisevanam",getVathilpadiSevanamInfo);
  router.get("/keralasolid",getKeralaSolidInfo);
  router.get("/header",authMiddleware,getUserDetails);
  router.post('/api/razorpay/create-order', (req, res) => handlers.CreateOrder(req,res));
  router.post('/razorpay/callback', handleRazorpayCallback);
  // router.post('/verify-payment', handlers.verifyPayment);
  module.exports = router;



