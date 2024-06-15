const Banner = require("../Schema/Banner");

exports.addBanner = async (req, res) => {
  try {
    const {
      image,
    } = req.body;

    const newBanner= new Banner({

        image,
    });

    await newBanner.save();

    res.status(201).json({ message: "Banner added successfully", task: newBanner });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add Banner" });
  }
};
exports.getAllBanner = async (req, res) => {
  try {
    const getAllBanner = await Banner.find();
   
    res
      .status(200)
      .json({ message: "Banner List fetched successfully", data: getAllBanner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllBannerById = async (req, res) => {
  const Id = req.params.id;
  try {
    const Banner = await Banner.findById(Id);
    if (!Banner) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(Banner);
  } catch (error) {
    console.error("Error fetching Banner Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateBanner = async (req, res) => {
  try {
    const { image} = req.body;
    const updatedEvent = await Banner.findByIdAndUpdate(
      req.params.id,
      { image},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating Banner:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const deletedEvent = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














