"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import './checkoutpage.css'
export default function CheckoutPage() {
  const params = useParams();
  const query = useSearchParams();
  const slug = params.slug;
  const amount = query.get("amount") || 47000;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [touched, setTouched] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isEmpty = (val) => !val || val.trim() === "";
  const validate = () => {
    return {
      name: isEmpty(formData.name),
      email: isEmpty(formData.email),
      phone: isEmpty(formData.phone),
      address: isEmpty(formData.address),
    };
  };

  const handlePay = async () => {
    const errors = validate();
    setShowErrors(true);
    if (Object.values(errors).some(Boolean)) {
      return;
    }
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        slug,
        amount: parseInt(amount),
      }),
    });

    const data = await res.json();
    if (data.success && data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      alert("Payment failed!");
    }
  };

  const errors = validate();
  return (
    <div className="checkout-container">
      <h2>Checkout for {slug}</h2>
      <div style={{ position: 'relative' }}>
        <input name="name" onChange={handleChange} placeholder="Your Name" autoComplete="name" value={formData.name} />
        {showErrors && errors.name && (
          <div className="field-error"><span className="warning-icon">&#9888;</span> Name is required</div>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" autoComplete="email" value={formData.email} />
        {showErrors && errors.email && (
          <div className="field-error"><span className="warning-icon">&#9888;</span> Email is required</div>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <input name="phone" type="tel" onChange={handleChange} placeholder="Phone" autoComplete="tel" value={formData.phone} />
        {showErrors && errors.phone && (
          <div className="field-error"><span className="warning-icon">&#9888;</span> Phone is required</div>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <input name="address" onChange={handleChange} placeholder="Address" autoComplete="street-address" value={formData.address} />
        {showErrors && errors.address && (
          <div className="field-error"><span className="warning-icon">&#9888;</span> Address is required</div>
        )}
      </div>
      <button onClick={handlePay}>Pay Rs. {amount}</button>
    </div>
  );
}
