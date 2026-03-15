const express = require('express');
const router = express.Router();
const Order = require("./Order");
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, paymentStatus } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrdersCount = await Order.countDocuments({ createdAt: { $gte: today } });
    const tokenNumber = todayOrdersCount + 1;

    const order = new Order({
      userId: req.user.userId,
      customerName: req.user.name,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentStatus || 'pending',
      tokenNumber
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    
    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.find({ createdAt: { $gte: today } });
    const totalRevenue = todayOrders.reduce((acc, order) => acc + order.totalAmount, 0);
    const pendingPayments = await Order.countDocuments({ paymentStatus: 'pending' });

    res.json({
      todayOrders: todayOrders.length,
      revenue: totalRevenue,
      pendingPayments: pendingPayments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
