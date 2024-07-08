const Order = require('../Schema/order');
const User = require('../Schema/userSchema');
const imagesSchema = require('../Schema/imagesSchema');
const multer = require('multer');
const path = require('path');

// Multer configuration for file storage
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });;
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
    const orders = await Order.find({ userId }).populate('products.productId').sort({ createdAt: -1 });;

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    // Find user record with matching userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a map of user's addresses
    const addressMap = user.multipleAddressArray.reduce((map, address) => {
      map[address._id.toString()] = address;
      return map;
    }, {});

    // Attach the matched address to each product in the orders
    const ordersWithAddressInProducts = orders.map(order => {
      const address = addressMap[order.addressId.toString()];
      return {
        ...order.toObject(),
        products: order.products.map(product => ({
          ...product.toObject(),
          selectedAddress: address
        }))
      };
    });

    // Send the updated orders
    res.status(200).json({ orders: ordersWithAddressInProducts });
  } catch (error) {
    console.error('Error fetching orders or user:', error);
    res.status(500).json({ error: 'Failed to fetch orders or user' });
  }
};



// exports.getMyOrders = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract userId from request parameters

//     // Find orders for the userId
//     const orders = await Order.find({ userId }).populate('products.productId');

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ error: 'No orders found' });
//     }

//     // Extract all addressIds from the orders
//     const addressIds = orders.map(order => order.addressId);

//     // Find user record with matching userId
//     const user = await User.findOne({ _id: userId });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Filter user's multipleAddressArray to include only addresses with matching addressIds
//     const filteredAddresses = user.multipleAddressArray.filter(address =>
//       addressIds.includes(address._id.toString())
//     );

//     // If user found, you can now process orders and filtered user data as needed
//     res.status(200).json({ orders, user: { ...user.toObject(), multipleAddressArray: filteredAddresses } });
//   } catch (error) {
//     console.error('Error fetching orders or user:', error);
//     res.status(500).json({ error: 'Failed to fetch orders or user' });
//   }
// };


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

exports.upload = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    const name = req.body.name;
    const image = req.file;

    if (!name || !image) {
      return res.status(400).json({ error: 'Name and image are required' });
    }

    try {
      // Save the image details to MongoDB
      const newImage = new imagesSchema({
        image: image.path,
        name: name
      });
      await newImage.save();

      res.status(200).json({
        message: 'Image uploaded and saved successfully',
        data: {
          name: name,
          imagePath: image.path
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save image to database' });
    }
  });
};
