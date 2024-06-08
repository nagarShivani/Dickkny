const Size = require("../Schema/size");

exports.addsize = async (req, res) => {
  try {
    const {
      size,
     
    } = req.body;

    const newsize= new Size({
        size,
    });

    await newsize.save();

    res.status(201).json({ message: "size added successfully", data: newsize });
  } catch (err) {
    console.error("Error adding size:", err);
    res.status(500).json({ error: "Failed to add size" });
  }
};
exports.getAllsize = async (req, res) => {
  try {
    const getAllsize = await Size.find() ;
   
    res
      .status(200)
      .json({ message: "size List fetched successfully", data: getAllsize });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllsizeById = async (req, res) => {
  const Id = req.params.id;

  try {
    const size = await Size.findById(Id);
    if (!size) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(size);
  } catch (error) {
    console.error("Error fetching size Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updatesize = async (req, res) => {
  try {
    const { size} = req.body;
    const updatedEvent = await Size.findByIdAndUpdate(
      req.params.id,
      { size},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "size not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating size:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deletesize = async (req, res) => {
  try {
    const deletedEvent = await Size.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














