const Billing = require("../Schema/billing");
const Cart = require('../Schema/cart');  
const Order = require('../Schema/order');  

async function generateOrderId() {
  try {
    const orderCount = await Billing.countDocuments();
    return (orderCount + 1).toString(); // Return as string to maintain consistency
  } catch (err) {
    console.error('Error generating order ID:', err);
    throw new Error('Unable to generate order ID');
  }
}


  
exports.payBill = async (req, res) => {
  try {
    const { products, userId, totalAmount,addressId,paymentId } = req.body;

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, error: 'Products must be an array with at least one item.' });
    }

    // Validate each product in the array
    for (const product of products) {
      if (!product.productId || !product.productAmount || !product.productQty || !product.productSize) {
        return res.status(400).json({ success: false, error: 'Each product must have a productId, productAmount, productQty, and productSize' });
      }
    }

    // Generate unique orderId for the Billing document
    const orderId = await generateOrderId();

    // Create a new Billing document
    const billing = new Billing({
      products,
      userId,
      totalAmount,
      addressId,
      paymentId,
      orderId, // Assign generated orderId
      status: 'completed' // Assuming payment is completed immediately for the sake of this example
    });

    // Save the Billing document
    await billing.save();

    // Update user's cart by removing billed items (if applicable)
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => !products.some(p => p.productId.toString() === item.productId.toString()));
      await cart.save();
    }
    const orderIdfororder = await generateOrderId();


    const order = new Order({
      userId,
      products: products.map(product => ({
        productId: product.productId,
        quantity: product.productQty,
        productSize: product.productSize
      })),
      totalPrice: totalAmount,
      addressId : req.body.addressId,
      paymentId : req.body.paymentId,
      paymentMethod:'Online',
      orderId: orderIdfororder - 1,
      status: 'Pending' 
    });

    // Save the Order document
    await order.save();


    // Send response with payment details
    res.status(201).json({
      success: true,
      message: 'Payment initiated successfully',
      paymentDetails: {
        userId,
        products,
        totalAmount,
        orderId, // Include orderId in the response
        status: 'completed'
      }
    });

  } catch (err) {
    console.error(err);

    // Handle specific errors
    if (err.message === 'Failed to generate orderId') {
      return res.status(500).json({ success: false, error: 'Failed to generate orderId', details: err.message });
    }  else {
      // Handle other errors
      return res.status(500).json({ success: false, error: 'Internal server error', details: err.message });
    }
  }
};

  
  
  

  exports.getAllBills = async (req, res) => {
    try {
      const bills = await Billing.find()
        .populate('products.productId')
        .populate('userId').sort({createdAt:-1});
      
      if (!bills || bills.length === 0) {
        return res.status(404).json({ error: 'No bills found' });
      }
  
      res.status(200).json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'Failed to fetch bills' });
    }
  };

  exports.deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBill = await Billing.findByIdAndDelete(id);
      if (!deletedBill) {
        return res.status(404).json({ error: 'Billing not found' });
      }
      res.status(200).json({ message: 'Billing deleted successfully' });
    } catch (error) {
      console.error('Error deleting Billing:', error);
      res.status(500).json({ error: 'Failed to delete Billing' });
    }
  };
  
