const Order = require("../Schema/order");
const User = require("../Schema/userSchema");
const imagesSchema = require("../Schema/imagesSchema");
const multer = require("multer");
const path = require("path");

// Multer configuration for file storage
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId")
      .populate("userId")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
// update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Ensure status is one of the allowed values
    if (
      ![
        "Pending",
        "Transit",
        "Out for Delivery",
        "Completed",
        "Return Requested",
        "Return Received",
      ].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find the order and update the status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters

    // Find orders for the userId
    const orders = await Order.find({ userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Find user record with matching userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a map of user's addresses
    const addressMap = user.multipleAddressArray.reduce((map, address) => {
      map[address._id.toString()] = address;
      return map;
    }, {});

    // Attach the matched address to each product in the orders
    const ordersWithAddressInProducts = orders.map((order) => {
      const address = addressMap[order.addressId.toString()];
      return {
        ...order.toObject(),
        products: order.products.map((product) => ({
          ...product.toObject(),
          selectedAddress: address,
        })),
      };
    });

    // Send the updated orders
    res.status(200).json({ orders: ordersWithAddressInProducts });
  } catch (error) {
    console.error("Error fetching orders or user:", error);
    res.status(500).json({ error: "Failed to fetch orders or user" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

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
      return res.status(400).json({ error: "Name and image are required" });
    }

    try {
      // Save the image details to MongoDB
      const newImage = new imagesSchema({
        image: image.path,
        name: name,
      });
      await newImage.save();

      res.status(200).json({
        message: "Image uploaded and saved successfully",
        data: {
          name: name,
          imagePath: image.path,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to save image to database" });
    }
  });
};
