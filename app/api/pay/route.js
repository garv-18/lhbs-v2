import crypto from 'crypto';

// Next.js API route for PhonePe payment
export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, mobileNumber, name, email, address, ...rest } = body;

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_API_KEY;
    const saltIndex = process.env.PHONEPE_KEY_INDEX || "1";
    const env = process.env.PHONEPE_ENV || "PRODUCTION";

    if (!merchantId || !saltKey) {
      return Response.json({
        success: false,
        message: "Server Error: PhonePe API keys are missing. Please check .env"
      }, { status: 500 });
    }

    // PhonePe uses amounts in paisa (rupees * 100)
    const amountInPaisa = Math.round(Number(amount) * 100);
    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const courseSlug = rest.slug || "Martial Arts Course";

    // Setup Callback URL and Redirect URL
    // We redirect to PhonePe, and after payment, PhonePe redirects back to MERCHANT_REDIRECT_URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.martialartsschool.in';
    const redirectUrl = `${baseUrl}/payment-success?course=${encodeURIComponent(courseSlug)}`;
    const callbackUrl = `${baseUrl}/api/phonepe-callback`;

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: `MUID_${Date.now()}`,
      amount: amountInPaisa,
      redirectUrl: redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl,
      mobileNumber: mobileNumber || rest.phone || "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // 1. Base64 encode the payload
    const jsonPayload = JSON.stringify(payload);
    const base64Payload = Buffer.from(jsonPayload).toString("base64");

    // 2. Calculate X-VERIFY checksum: SHA256(base64Payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
    const endpoint = "/pg/v1/pay";
    const stringToHash = base64Payload + endpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256 + "###" + saltIndex;

    // 3. Make the API call to PhonePe
    const phonePeUrl = env === "PRODUCTION" 
      ? "https://api.phonepe.com/apis/hermes/pg/v1/pay" 
      : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const response = await fetch(phonePeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: base64Payload
      })
    });

    const responseData = await response.json();
    console.log("PhonePe Initiate Response:", responseData);

    if (responseData.success && responseData.data && responseData.data.instrumentResponse && responseData.data.instrumentResponse.redirectInfo) {
      return Response.json({ success: true, redirectUrl: responseData.data.instrumentResponse.redirectInfo.url });
    } else {
      console.error("PhonePe Error:", responseData);
      return Response.json({ success: false, message: responseData.message || "Failed to initiate payment with PhonePe" }, { status: 500 });
    }

  } catch (err) {
    console.error("Payment Exception:", err);
    return Response.json({ success: false, message: err.message || "Payment processing error" }, { status: 500 });
  }
}
