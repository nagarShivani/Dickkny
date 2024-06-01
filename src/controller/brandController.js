const Brand = require("../Schema/Brand");

exports.addBrand = async (req, res) => {
  try {
    const {
      name,
     
    } = req.body;

    const newBrand= new Brand({
        name,
    });

    await newBrand.save();

    res.status(201).json({ message: "Brand added successfully", data: newBrand });
  } catch (err) {
    console.error("Error adding brand:", err);
    res.status(500).json({ error: "Failed to add brand" });
  }
};
exports.getAllBrand = async (req, res) => {
  try {
    const getAllBrand = await Brand.find() ;
   
    res
      .status(200)
      .json({ message: "brand List fetched successfully", data: getAllBrand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllBrandById = async (req, res) => {
  const Id = req.params.id;

  try {
    const brand = await Brand.findById(Id);
    if (!brand) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching Brand Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateBrand = async (req, res) => {
  try {
    const { name} = req.body;
    const updatedEvent = await Brand.findByIdAndUpdate(
      req.params.id,
      { name},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating Brand:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deleteBrand = async (req, res) => {
  try {
    const deletedEvent = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














