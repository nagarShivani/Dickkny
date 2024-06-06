const product = require("../Schema/product");

exports.addProduct = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      brandId,
      name,
      price,
      salePrice,
      image,
      multipleimage,
      description,
      color,
      size,
     
    } = req.body;

    const newproduct= new product({
      userId,
      categoryId,
      brandId,

      name,
        price,
        salePrice,
        image,
        multipleimage,
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


exports.updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params; // Extract productId from URL parameters
    const {
      userId,
      categoryId,
      brandId,
      name,
      price,
      salePrice,
      image,
      multipleimage,
      description,
      color,
      size,
    } = req.body;

    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      {
        userId,
        categoryId,
      brandId,
        name,
        salePrice,
        price,
        image,
        multipleimage,
        description,
        color,
        size,
      },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const getAllProduct = await product.find().populate('categoryId').populate('brandId');
    res.status(200)
      .json({ message: "Product List fetched successfully", data: getAllProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProductApiforFilter = async (req, res) => {
  try {
    const { price_min, price_max, color, size } = req.query;
    let filter = {};
    if (price_min) {
      filter.price = { ...filter.price, $gte: parseFloat(price_min) };
    }
    if (price_max) {
      filter.price = { ...filter.price, $lte: parseFloat(price_max) };
    }
    if (color) {
      filter.color = color;
    }
    if (size) {
      filter.size = size;
    }
    const getAllProduct = await product.find(filter);
    res.status(200).json({
      message: "Product List fetched successfully",
      data: getAllProduct
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getProductByCategoryId = async (req, res) => {
  try {

    const productByCategory = await product.find({ categoryId: req.body.categoryId });
    if (!productByCategory) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(productByCategory);
    console.log(productByCategory);
  }
  catch (error) {
    console.error("Error fetching product by category:", error);
    res.status(500).json({ error: "Failed to fetch product by category" });
  }
}

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
  
exports.deleteProduct = async (req, res) => {
  try {
    const deletedproduct = await product.findByIdAndDelete(req.params.id);
    if (!deletedproduct) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting prpduct:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};











