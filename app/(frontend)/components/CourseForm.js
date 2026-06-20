// frontend/CourseForm.jsx
import { useState } from 'react';

export default function CourseForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', amount: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  window.location.href = `http://localhost:3002/pay?amount=${form.amount}`;
};

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="course" placeholder="Course Name" onChange={handleChange} required />
      <input name="amount" placeholder="Amount (₹)" onChange={handleChange} required />
      <button type="submit">Pay with PhonePe</button>
    </form>
  );
}
