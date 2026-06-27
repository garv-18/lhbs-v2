import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    
    // PhonePe sends { response: "base64EncodedString" }
    const base64Response = body.response;
    
    // Validate checksum
    const saltKey = process.env.PHONEPE_API_KEY;
    const saltIndex = process.env.PHONEPE_KEY_INDEX || "1";
    
    const xVerifyHeader = req.headers.get('x-verify');
    
    // Checksum = SHA256(responseBase64String + saltKey) + "###" + saltIndex
    const stringToHash = base64Response + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const calculatedChecksum = sha256 + "###" + saltIndex;
    
    if (calculatedChecksum !== xVerifyHeader) {
      console.error("Checksum mismatch in PhonePe callback!");
      return Response.json({ success: false, message: "Invalid checksum" }, { status: 400 });
    }
    
    // Decode response
    const decodedString = Buffer.from(base64Response, 'base64').toString('utf-8');
    const decodedResponse = JSON.parse(decodedString);
    
    console.log("PhonePe S2S Callback decoded:", decodedResponse);
    
    if (decodedResponse.success && decodedResponse.code === 'PAYMENT_SUCCESS') {
      // Payment was successful
      // Here you would typically update your database (e.g. MongoDB/Payload)
      // to mark the transactionId as SUCCESS and give the user access.
      
      const transactionId = decodedResponse.data.merchantTransactionId;
      const amount = decodedResponse.data.amount / 100; // back to rupees
      
      console.log(`Payment successful for ${transactionId} - amount: ${amount}`);
      
      return Response.json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("Payment failed or pending:", decodedResponse);
      return Response.json({ success: true, message: "Payment status recorded" });
    }
    
  } catch (error) {
    console.error("PhonePe callback error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
