const Razorpay = require('razorpay')
module.exports = {
    CreateOrder: (req, res) => {
        var OrderID;
        var instance = new Razorpay({
            key_id: 'rzp_test_g4AQDry3kiOG7o',
            key_secret: '1O2SC9NGkQV0fqkqdOObgwqC'
        })
        var options = {
            amount: req.body.amount,
            receipt: req.body.receipt,
            currency: "INR",
            payment_capture: '0'
        }
        instance.orders.create(options, function (err, order) {
            res.send(order)
        })
    }
  }

//   const verifyPayment = (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//     const body = razorpay_order_id + '|' + razorpay_payment_id;
  
//     const expectedSignature = crypto
//       .createHmac('sha256', '1O2SC9NGkQV0fqkqdOObgwqC')
//       .update(body)
//       .digest('hex');
  
//     const isAuthentic = expectedSignature === razorpay_signature;
  
//     if (isAuthentic) {
//       res.status(200).json({ success: true });
//     } else {
//       res.status(400).json({ success: false, error: 'Invalid signature' });
//     }
//   };
  
//   module.exports = {
//     verifyPayment
//   };
  
  
  
  