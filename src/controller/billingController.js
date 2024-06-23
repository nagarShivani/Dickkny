const Billing = require("../Schema/billing");



async function generateOrderId() {
    const orderCount = await Billing.countDocuments();
    return orderCount + 1;
  }
  
  exports.payBill = async (req, res) => {
    try {
      const { products, userId, totalAmount } = req.body;
    
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ success: false, error: 'Products must be an array with at least one item.' });
      }
    
      // Validate each product
      for (const product of products) {
        if (!product.productId || !product.productAmount || !product.productQty || !product.productSize) {
          return res.status(400).json({ success: false, error: 'Each product must have a productId, productAmount, productQty, and productSize' });
        }
      }
  
      // Generate order ID for each product
      const orderId = await generateOrderId();
  
      const productsWithOrderId = products.map((product, index) => ({
        ...product,
        orderId: `${index + 1}`
      }));
    
      const billing = new Billing({
        products: productsWithOrderId,
        userId,
        totalAmount,
        status: 'completed' // Assuming payment is completed immediately for the sake of this example
      });
    
      await billing.save();
    
      res.status(201).json({
        success: true,
        message: 'Payment initiated successfully',
        paymentDetails: {
          userId,
          orderId,
          products: productsWithOrderId,
          totalAmount,
          status: 'completed'
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal server error', details: err });
    }
  };
  

exports.getAllBills = async (req, res) => {
    try {
      const bills = await Billing.find().populate('productId').populate('userId');
      if(!bills) {
        return res.status(404).json({ error: 'No Bills found' });
      }
  
      res.status(200).json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'Failed to fetch bills' });
    }
  };
