const Rating = require("../Schema/Rating");

exports.addRating = async (req, res) => {
    try {
      const { rating, comments, productId, userId } = req.body;
  
      // Check if the user has already rated the product
      const existingRating = await Rating.findOne({ productId, userId });
      
      if (existingRating) {
        return res.status(400).json({ message: "User has already rated this product" });
      }
  
      // If no existing rating is found, create a new rating
      const newRating = new Rating({
        rating,
        comments,
        productId,
        userId,
      });
  
      await newRating.save();
  
      res.status(201).json({ message: "Rating added successfully", data: newRating });
    } catch (err) {
      console.error("Error adding Rating:", err);
      res.status(500).json({ error: "Failed to add Rating" });
    }
  };
  
exports.getAllRating = async (req, res) => {
  try {
    const getAllRating = await Rating.find().populate('productId').populate('userId');
   
    res
      .status(200)
      .json({ message: "Rating List fetched successfully", data: getAllRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllRatingById = async (req, res) => {
  const Id = req.params.id;

  try {
    const Rating = await Rating.findById(Id);
    if (!Rating) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(Rating);
  } catch (error) {
    console.error("Error fetching Rating Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateRating = async (req, res) => {
  try {
    const { rating,comments,productId,userId} = req.body;
    const updatedEvent = await Brand.findByIdAndUpdate(
      req.params.id,
      { rating},
      { comments},
      { productId},
      { userId},
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
exports.deleteRating = async (req, res) => {
  try {
    const deletedRating = await Rating.findByIdAndDelete(req.params.id);
    if (!deletedRating) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














