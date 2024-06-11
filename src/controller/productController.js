const product = require("../Schema/product");
const Size = require("../Schema/size");
const Color = require("../Schema/color");
const Brand = require("../Schema/Brand");

exports.addProduct = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      brandId,
      name,
      tag,
      price,
      salePrice,
      productInformation,
      additionalInformation,
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
        tag,
        productInformation,
        additionalInformation,
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
      tag,
      productInformation,
      additionalInformation,
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
      tag,
      productInformation,
      additionalInformation,
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


exports.getProductByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params; // Ensure this is a single category ID or an array of IDs

    const productByCategory = await product.find({ categoryId: { $in: [categoryId] } }).populate('size')
    .populate('color');
    if (!productByCategory || productByCategory.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(productByCategory);
  } catch (error) {
    console.error("Error fetching product by category:", error);
    res.status(500).json({ error: "Failed to fetch product by category" });
  }
};


exports.getAllProduct = async (req, res) => {
  try {
    // Get pagination parameters from query, set default values if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Get the total count of documents
    const totalProducts = await product.countDocuments();

    // Find products with pagination
    const getAllProduct = await product.find()
      .populate('categoryId')
      .populate('brandId')
      .populate('color')
      .populate('size')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Product List fetched successfully",
      data: getAllProduct,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

};

exports.getAllProductApiforFilter = async (req, res) => {
  try {
    const { price_min, price_max, color, size, page = 1, limit = 10 } = req.query;

    // Construct filter object
    let filter = {};

    // Handle price filter
    if (price_min || price_max) {
      filter.price = {};
      if (price_min) {
        filter.price.$gte = parseFloat(price_min);
      }
      if (price_max) {
        filter.price.$lte = parseFloat(price_max);
      }
    }

    // Handle color filter
    if (color) {
      const colorNames = color.split(',').map(c => c.trim().replace(/"/g, ''));
      const colorDocs = await Color.find({ color: { $in: colorNames } });
      const colorIds = colorDocs.map(c => c._id);
      filter.color = { $in: colorIds };
    }

    // Handle size filter
    if (size) {
      const sizeNames = size.split(',').map(s => s.trim().replace(/"/g, ''));
      const sizeDocs = await Size.find({ size: { $in: sizeNames } });
      const sizeIds = sizeDocs.map(s => s._id);
      filter.size = { $in: sizeIds };
    }

    // Calculate pagination values
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get the total count of filtered products
    const totalProducts = await product.countDocuments(filter);

    // Get the filtered products with pagination
    const getAllProduct = await product.find(filter)
      .populate('categoryId')
      .populate('brandId')
      .populate('color')
      .populate('size')
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      message: "Product List fetched successfully",
      data: getAllProduct,
      pagination: {
        totalProducts: totalProducts,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / parseInt(limit))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getAllProductsById = async (req, res) => {
  const productId = req.params.id;

  try {
    const pro = await product.findById(productId).populate('categoryId').populate('brandId').
    populate('size').populate('color');
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

exports.searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.name; // Assuming the search term is passed as a query parameter
    const regex = new RegExp(searchTerm, 'i');

    // Fetch all products and populate categoryId and brandId
    const allProducts = await product.find({})
      .populate('categoryId')
      .populate('brandId');

    // Filter products based on the search term
    const filteredProducts = allProducts.filter(product => {
      const matchesName = regex.test(product.name);
      const matchesBrand = product.brandId && regex.test(product.brandId.name);
      const matchesCategory = product.categoryId && product.categoryId.some(category => regex.test(category.name));

      return matchesName || matchesBrand || matchesCategory;
    });

    if (filteredProducts.length === 0) {
      console.log('No products found matching the criteria');
    } else {
      console.log(`Found ${filteredProducts.length} products matching the criteria`);
    }

    res.status(200).json(filteredProducts);
  } catch (err) {
    console.error('Error occurred while searching for products:', err);
    res.status(500).json({ message: 'An error occurred while searching for products' });
  }
};









