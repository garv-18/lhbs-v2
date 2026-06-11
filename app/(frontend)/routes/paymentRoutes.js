// import express from 'express';
// import { initiatePayment } from '../utils/phonepe.js';
// import Order from '../../models/order.js';
// // filepath: c:\Users\thees\OneDrive\Compound\Desktop\masterpramod.com\lhbs\app\routes\paymentRoutes.js

// const router = express.Router();

// router.post('/create-payment', async (req, res) => {
//   try {
//     const { name, email, phone, course, amount } = req.body;
//     if (!amount) {
//       return res.status(400).json({ error: 'Amount is required' });
//     }
//     const transactionId = `order_${Date.now()}`;

//     await Order.create({ name, email, phone, course, amount, transactionId });

//     console.log("Calling initiatePayment with:", { transactionId, amount, redirectBase: `${process.env.FRONTEND_URL}/payment-success` });

//     const redirectUrl = await initiatePayment({
//       transactionId,
//       amount,
//       redirectBase: `${process.env.FRONTEND_URL}/payment-success`,
//     });

//     console.log("Received redirectUrl:", redirectUrl);

//     res.json({ redirectUrl });
//   } catch (err) {
//     console.error("Error in /create-payment:", err);
//     res.status(500).json({ error: 'Payment initiation failed', details: err.message });
//   }
// });

// router.get('/check-status', async (req, res) => {
//   try {
//     const { tx } = req.query;
//     const order = await Order.findOne({ transactionId: tx });

//     if (!order || order.status !== 'SUCCESS') {
//       return res.status(403).json({ valid: false });
//     }

//     res.json({ valid: true });
//   } catch (err) {
//     res.status(500).json({ error: 'Error checking status' });
//   }
// });

// export default router;