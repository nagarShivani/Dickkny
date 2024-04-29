const Cart = require("../Schema/cart");
const Product = require("../Schema/product");


   exports.addTocart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      console.log(userId,productId,quantity,'sdddddddddddddd')
      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      if (!Array.isArray(cart.items)) {
        cart.items = [];
      }
  
      const existingItem = cart.items.find(
        (item) => String(item.productId) === productId
      );
      if (existingItem) {
        existingItem.quantity += parseInt(quantity, 10) || 1;
      } else {
        cart.items.push({ productId, quantity: parseInt(quantity, 10) || 1 });
      }
      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" ,error:error});
    }
  };
  
  
    exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => String(item.productId) === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

