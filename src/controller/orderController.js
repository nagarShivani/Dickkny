const Order = require('../Schema/order');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if(!orders) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters

    const orders = await Order.find({ userId }).populate('products.productId');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
