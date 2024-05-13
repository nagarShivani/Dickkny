const product = require("../Schema/product");

exports.addProduct = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      name,
      price,
      image,
      description,
      color,
      size,
     
    } = req.body;

    const newproduct= new product({
      userId,
      categoryId,
      name,
        price,
        image,
        description,
        color,
        size,
    });

    await newproduct.save();

    res.status(201).json({ message: "Product added successfully", data: newproduct });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add Product" });
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const getAllProduct = await product.find().populate('categoryId');
    res.status(200)
      .json({ message: "Product List fetched successfully", data: getAllProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProductsById = async (req, res) => {
  const productId = req.params.id;

  try {
    const pro = await product.findById(productId);
    if (!pro) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(pro);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product by ID" });
  }
};
  











