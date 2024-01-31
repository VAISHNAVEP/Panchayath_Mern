const mongoose = require('mongoose');
const UsercomplaintSchema = new mongoose.Schema({
  image: String,
  aadharNumber: String,
  name: String,
  email:String,
  phonenumber:Number,
  complaint:String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  
});

const ComplaintModel = mongoose.model('usercomplaints', UsercomplaintSchema);

module.exports = ComplaintModel;
