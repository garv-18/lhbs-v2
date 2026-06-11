'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { User, Mail, Phone, CreditCard, X } from "lucide-react";

export default function InstamojoButton({ amount, courseSlug, className }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || formData.phone.length < 10) {
            alert("Please fill in all details correctly.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                amount: amount,
                name: formData.name,
                email: formData.email,
                mobileNumber: formData.phone,
                slug: courseSlug
            };

            const res = await fetch("/api/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success && data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                alert("Payment initiation failed: " + (data.message || "Unknown error"));
                console.error("Payment failed details:", data);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) {
        return (
            <button
                className={className}
                onClick={() => setShowModal(true)}
            >
                Pay ₹{amount}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <CreditCard className="text-[#FD5D2F]" size={20} />
                        Secure Payment
                    </h3>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handlePayment} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FD5D2F] focus:ring-1 focus:ring-[#FD5D2F] transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FD5D2F] focus:ring-1 focus:ring-[#FD5D2F] transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FD5D2F] focus:ring-1 focus:ring-[#FD5D2F] transition-all"
                                required
                                minLength={10}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] text-white font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Pay ₹{amount}</>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">
                            Secured by Instamojo
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
