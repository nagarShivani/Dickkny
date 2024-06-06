const Category = require("../Schema/category");

exports.addCategory = async (req, res) => {
  try {
    const {
      name,
      image
    } = req.body;

    const newCategory= new Category({
        name,image
    });

    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", data: newCategory });
  } catch (err) {
    console.error("Error adding Category:", err);
    res.status(500).json({ error: "Failed to add Category" });
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const getAllCategory = await Category.find() ;
   
    res
      .status(200)
      .json({ message: "Category List fetched successfully", data: getAllCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
  

exports.getAllCategoryById = async (req, res) => {
  const Id = req.params.id;

  try {
    const category = await Category.findById(Id);
    if (!category) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching Category Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { name,image } = req.body;
    

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name},
      { image},
      { new :true},
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error("Error updating Category:", err);
    res.status(500).json({ error: "Failed to update Category" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};













