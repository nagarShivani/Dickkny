const Billing = require("../Schema/billing");
const { v4: uuidv4 } = require('uuid');
function generateOrderId() {
    const timestamp = Date.now();
    const uuid = uuidv4();
    return `${timestamp}_${uuid}`;
}
exports.payBill = async (req, res) => {
    try {
        const { productId, userId,amount } = req.body;
        const orderId = generateOrderId(); 

        const billing = new Billing({
            productId,
            userId,
            orderId,
            amount
        });

        await billing.save();
        res.status(201).json({
            success: true,
            message: 'Payment initiated successfully',
            paymentDetails: {
                productId,
                userId,
                orderId,
                status: 'completed'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal server error',error:err });
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
