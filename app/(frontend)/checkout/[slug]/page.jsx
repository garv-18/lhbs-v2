"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

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
    <div className="max-w-md mx-auto mt-32 mb-20 p-8 bg-white border border-gray-200 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-text">Checkout for {slug}</h2>
      
      <div className="space-y-5">
        <div className="relative">
          <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-text" name="name" onChange={handleChange} placeholder="Your Name" autoComplete="name" value={formData.name} />
          {showErrors && errors.name && (
            <div className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium"><span>&#9888;</span> Name is required</div>
          )}
        </div>

        <div className="relative">
          <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-text" name="email" type="email" onChange={handleChange} placeholder="Email" autoComplete="email" value={formData.email} />
          {showErrors && errors.email && (
            <div className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium"><span>&#9888;</span> Email is required</div>
          )}
        </div>

        <div className="relative">
          <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-text" name="phone" type="tel" onChange={handleChange} placeholder="Phone" autoComplete="tel" value={formData.phone} />
          {showErrors && errors.phone && (
            <div className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium"><span>&#9888;</span> Phone is required</div>
          )}
        </div>

        <div className="relative">
          <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 text-text" name="address" onChange={handleChange} placeholder="Address" autoComplete="street-address" value={formData.address} />
          {showErrors && errors.address && (
            <div className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium"><span>&#9888;</span> Address is required</div>
          )}
        </div>

        <button 
          onClick={handlePay}
          className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-md flex justify-center items-center gap-2"
        >
          Pay Rs. {amount}
        </button>
      </div>
    </div>
  );
}
