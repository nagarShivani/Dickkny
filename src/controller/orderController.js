const Order = require('../Schema/order');

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};