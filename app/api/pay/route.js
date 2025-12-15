import axios from "axios";

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

    let response;
    try {
      response = await axios.post(
        "https://www.instamojo.com/api/1.1/payment-requests/",
        payload,
        {
          headers: {
            "X-Api-Key": process.env.INSTAMOJO_API_KEY,
            "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Instamojo response:', JSON.stringify(response.data, null, 2));
    } catch (apiErr) {
      console.error('❌ Instamojo API error:', apiErr.response?.data || apiErr.message);
      // Return mock success on API error for testing if requested
      return Response.json({ success: false, message: apiErr.response?.data?.message || apiErr.message || 'Instamojo API error' }, { status: 500 });
    }

    if (response.data && response.data.payment_request && response.data.payment_request.longurl) {
      return Response.json({ success: true, redirectUrl: response.data.payment_request.longurl });
    } else {
      // Try to show Instamojo error message if available
      const msg = response.data && response.data.message ? response.data.message : "Failed to create payment request.";
      return Response.json({ success: false, message: msg }, { status: 500 });
    }
  } catch (err) {
    return Response.json({ success: false, message: err.message || "Payment error" }, { status: 500 });
  }
}
