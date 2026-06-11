'use client';
import { useState } from 'react';

export default function SignUp() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);

  async function sendOtp() {
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const res = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp: generatedOtp }),
  });
  const data = await res.json();
  console.log(data); // This will show the error from your API
  localStorage.setItem('otp', generatedOtp);
  setSent(true);
}

  function verifyOtp() {
    if (otp === localStorage.getItem('otp')) {
      alert('OTP verified! (You can now log in the user)');
      // Implement your user creation/session logic here
    } else {
      alert('Invalid OTP');
    }
  }

  return (
    <div>
      <h2>Sign Up with Phone</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      {sent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}