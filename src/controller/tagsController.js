const Tags = require("../Schema/Tags");

exports.addTags = async (req, res) => {
  try {
    const {
      name,
    } = req.body;

    const newTags= new Tags({
        name,
    });

    await newTags.save();

    res.status(201).json({ message: "Tags added successfully", data: newTags });
  } catch (err) {
    console.error("Error adding Tags:", err);
    res.status(500).json({ error: "Failed to add Tags" });
  }
};
exports.getAllTags = async (req, res) => {
  try {
    const getAllTags = await Tags.find() ;
   
    res
      .status(200)
      .json({ message: "Tags List fetched successfully", data: getAllTags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
  

exports.getAllTagsById = async (req, res) => {
  const Id = req.params.id;

  try {
    const Tags = await Tags.findById(Id);
    if (!Tags) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(Tags);
  } catch (error) {
    console.error("Error fetching Tags Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateTags = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedTags = await Tags.findByIdAndUpdate(
      req.params.id,
      { name},
      { new :true},
    );
    if (!updatedTags) {
      return res.status(404).json({ error: "Tags not found" });
    }
    res.status(200).json(updatedTags);
  } catch (err) {
    console.error("Error updating Tags:", err);
    res.status(500).json({ error: "Failed to update Tags" });
  }
};
exports.deleteTags = async (req, res) => {
  try {
    const deletedTags = await Tags.findByIdAndDelete(req.params.id);
    if (!deletedTags) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};













