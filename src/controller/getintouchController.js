const getInTouch = require("../Schema/getInTouch");

exports.addgetInTouch = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      quantity,
      product,
      message,
     
    } = req.body;

    const newgetInTouch= new getInTouch({
        name,
        phone,
        email,
        quantity,
        product,
        message,
    });

    await newgetInTouch.save();

    res.status(201).json({ message: "getInTouch added successfully", data: newgetInTouch });
  } catch (err) {
    console.error("Error adding getInTouch:", err);
    res.status(500).json({ error: "Failed to add getInTouch" });
  }
};
exports.getAllgetInTouch = async (req, res) => {
  try {
    const getAllgetInTouch = await getInTouch.find() ;
   
    res
      .status(200)
      .json({ message: "getInTouch List fetched successfully", data: getAllgetInTouch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllgetInTouchById = async (req, res) => {
  const Id = req.params.id;

  try {
    const getInTouch = await getInTouch.findById(Id);
    if (!getInTouch) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(getInTouch);
  } catch (error) {
    console.error("Error fetching getInTouch Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updategetInTouch = async (req, res) => {
  try {
    const { name,email} = req.body;
    const updatedEvent = await Brand.findByIdAndUpdate(
      req.params.id,
      { name},
      { email},
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
exports.deletegetInTouch = async (req, res) => {
  try {
    const deletedgetInTouch = await getInTouch.findByIdAndDelete(req.params.id);
    if (!deletedgetInTouch) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














