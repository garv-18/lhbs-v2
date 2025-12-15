import mongoose from 'mongoose';
import axios from 'axios';

// Add this function at the top
async function fetchAuthToken() {
  // Replace with real logic if needed
  return "test-token";
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;

// initiatePayment function removed as PhonePe is deprecated
