// Next.js API route for Instamojo payment
export async function POST(req) {
  try {
    const body = await req.json();
    // Destructure required fields
    const { amount, mobileNumber, name, email, address, ...rest } = body;

    // Debug: Log env and payload
    const apiKey = process.env.INSTAMOJO_API_KEY;
    const authToken = process.env.INSTAMOJO_AUTH_TOKEN;

    console.log('INSTAMOJO_API_KEY:', apiKey ? 'Set' : 'Missing');
    console.log('INSTAMOJO_AUTH_TOKEN:', authToken ? 'Set' : 'Missing');

    if (!apiKey || !authToken) {
      return Response.json({
        success: false,
        message: "Server Error: Instamojo API keys are missing. Please restart the server if you just added them."
      }, { status: 500 });
    }

    console.log('Instamojo payload:', JSON.stringify({
      amount,
      buyer_name: name,
      email,
      phone: mobileNumber || rest.phone,
      purpose: rest.slug || "Martial Arts Course",
      redirect_url: `https://martialartsschool.in/payment-success?course=${encodeURIComponent(rest.slug || "Martial Arts Course")}`,
      ...rest,
    }, null, 2));

    const payload = {
      amount,
      buyer_name: name,
      email,
      phone: mobileNumber || rest.phone,
      purpose: rest.slug || "Martial Arts Course",
      // Always use the correct redirect URL and pass course slug for access page
      redirect_url: `https://martialartsschool.in/payment-success?course=${encodeURIComponent(rest.slug || "Martial Arts Course")}`,
      ...rest,
    };

    let responseData;
    try {
      const res = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Instamojo API Error");
      }
      console.log('Instamojo response:', JSON.stringify(responseData, null, 2));
    } catch (apiErr) {
      console.error('❌ Instamojo API error:', apiErr.message);
      // Return mock success on API error for testing if requested
      return Response.json({ success: false, message: apiErr.message || 'Instamojo API error' }, { status: 500 });
    }

    if (responseData && responseData.payment_request && responseData.payment_request.longurl) {
      return Response.json({ success: true, redirectUrl: responseData.payment_request.longurl });
    } else {
      // Try to show Instamojo error message if available
      const msg = responseData && responseData.message ? responseData.message : "Failed to create payment request.";
      return Response.json({ success: false, message: msg }, { status: 500 });
    }
  } catch (err) {
    return Response.json({ success: false, message: err.message || "Payment error" }, { status: 500 });
  }
}
