const Order = require('../Schema/order');
const User = require('../Schema/userSchema');

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

    // Find orders for the userId
    const orders = await Order.find({ userId }).populate('products.productId');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    // Extract all addressIds from the orders
    const addressIds = orders.map(order => order.addressId);

    // Find user record with matching userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter user's multipleAddressArray to include only addresses with matching addressIds
    const filteredAddresses = user.multipleAddressArray.filter(address =>
      addressIds.includes(address._id.toString())
    );

    // If user found, you can now process orders and filtered user data as needed
    res.status(200).json({ orders, user: { ...user.toObject(), multipleAddressArray: filteredAddresses } });
  } catch (error) {
    console.error('Error fetching orders or user:', error);
    res.status(500).json({ error: 'Failed to fetch orders or user' });
  }
};
