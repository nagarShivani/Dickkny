const WishList = require("../Schema/wishlist");

exports.addToWishList = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let wish = await WishList.findOne({ userId });
      if (!wish) {
        wish = new WishList({ userId, items: [] });
      }
      const existingItem = wish.items.find(item => item.productId.equals(productId));
      if (existingItem) {
        return res.status(200).json({ message: 'Item already added to wishlist' }); // Added return statement here
      } else {
        wish.items.push({ productId });
      }
      await wish.save();
      return res.json({ message: 'Item added to WishList successfully' }); // Added return statement here
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getWishListOfUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const wish = await WishList.findOne({ userId }).populate('items.productId');
  
      if (!wish) {
        return res.status(404).json({ message: 'Wishlist not found' }); // Changed status code to 404
      }
  
      res.json(wish);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  