const Billing = require("../Schema/billing");
const { v4: uuidv4 } = require('uuid');
function generateOrderId() {
    const timestamp = Date.now();
    const uuid = uuidv4();
    return `${timestamp}_${uuid}`;
}
exports.payBill = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const orderId = generateOrderId(); 

        const billing = new Billing({
            productId,
            userId,
            orderId,
        });

        await billing.save();
        res.status(201).json({
            success: true,
            message: 'Payment initiated successfully',
            paymentDetails: {
                productId,
                userId,
                orderId,
                status: 'pending'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
