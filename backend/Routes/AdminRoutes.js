const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  adminlogin,
  getuser,
  addcertificate,
  BillAmount,
  Project,
  getbirthcertificatedetails,
  getcomplaintdata,
} = require("../Controllers/AdminController/AdminController");
const { verifyAdmin } = require("../MiddleWares/AdminMiddleware");
const ProjectMiddleware = require("../MiddleWares/AdminMiddleware");
const adminauthMiddleware = require("../MiddleWares/AdminMiddleware");
router.post("/adminlogin",adminlogin);
router.get("/", getuser);
router.post("/certificate",addcertificate)
router.post("/billing",BillAmount)
router.post("/adminproject",ProjectMiddleware,Project)
router.get("/usercertificates",getbirthcertificatedetails)
router.get("/complainthome",getcomplaintdata);
module.exports = router;


