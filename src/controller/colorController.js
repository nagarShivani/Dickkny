const Color = require("../Schema/color");

exports.addcolor = async (req, res) => {
  try {
    const {
      color,
     
    } = req.body;

    const newcolor= new Color({
        color,
    });

    await newcolor.save();

    res.status(201).json({ message: "color added successfully", data: newcolor });
  } catch (err) {
    console.error("Error adding color:", err);
    res.status(500).json({ error: "Failed to add color" });
  }
};


exports.getAllcolor = async (req, res) => {
  try {
    const getAllcolor = await Color.find() ;
   
    res
      .status(200)
      .json({ message: "Color List fetched successfully", data: getAllcolor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllcolorById = async (req, res) => {
  const Id = req.params.id;

  try {
    const color = await Color.findById(Id);
    if (!color) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(color);
  } catch (error) {
    console.error("Error fetching color Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updatecolor = async (req, res) => {
  try {
    const { color} = req.body;
    const updatedEvent = await Color.findByIdAndUpdate(
      req.params.id,
      { color},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "color not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating color:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deletecolor = async (req, res) => {
  try {
    const deletedEvent = await Color.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














