"use client";
import React, { useState } from "react";

export default function CheckoutForm({ amount }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const getBackendUrl = () => '/api/pay';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getBackendUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          mobileNumber: formData.phone,
          ...formData // optional fields
        })
      });

      if (!res.ok) {
        throw new Error('Payment server error');
      }

      const html = await res.text();
      const paymentWin = window.open();
      if (paymentWin) {
        paymentWin.document.write(html);
      } else {
        alert("Please allow popups to complete payment.");
      }
    } catch (err) {
      alert("❌ Something went wrong. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Contact Information</h2>
      <input type="email" name="email" placeholder="Email address" required onChange={handleChange} />

      <h2>Billing Address</h2>
      <input name="firstName" placeholder="First Name" required onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
      <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required placeholder="Phone number (10 digits)" />
      <input name="address" placeholder="Address" required onChange={handleChange} />
      <input name="city" placeholder="City" required onChange={handleChange} />
      <input name="state" placeholder="State" required onChange={handleChange} />
      <input name="pincode" placeholder="PIN Code" required onChange={handleChange} />

      <h2>Phone (for UPI)</h2>
      <input name="phone" placeholder="Phone Number" required onChange={handleChange} />

      <button type="submit">Place Order</button>
    </form>
  );
}
