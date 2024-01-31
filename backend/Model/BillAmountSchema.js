const mongoose = require('mongoose');

const BillAmountSchema = new mongoose.Schema({
    amount: Number,
    
});

const BillModel = mongoose.model('billamount', BillAmountSchema);
module.exports = BillModel;
