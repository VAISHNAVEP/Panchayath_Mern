const crypto = require('crypto');

const verifySignature = (order_id, razorpay_payment_id, razorpay_signature, secret) => {
  
  const generated_signature = crypto.createHmac('sha256', secret)
    .update(order_id + "|" + razorpay_payment_id)
    .digest('hex');

  
  return generated_signature === razorpay_signature;
};

const handleRazorpayCallback = (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = '1O2SC9NGkQV0fqkqdOObgwqC'; 

  // Verify the signature
  const isSignatureValid = verifySignature(order_id, razorpay_payment_id, razorpay_signature, secret);

  if (isSignatureValid) {
    console.log('Payment is successful');

    
    
    res.status(200).json({ status: 'success' });
  } else {
    console.log('Payment verification failed');

    res.status(400).json({ status: 'failure', error: 'Payment verification failed' });
  }
};

module.exports = {
  handleRazorpayCallback,
};
