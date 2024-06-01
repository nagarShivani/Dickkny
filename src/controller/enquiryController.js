const Enquiry = require("../Schema/enquiry");

exports.addEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      quantity,
      product,
      message,
     
    } = req.body;

    const newEnquiry= new Enquiry({
        name,
        phone,
        email,
        quantity,
        product,
        message,
    });

    await newEnquiry.save();

    res.status(201).json({ message: "Enquiry added successfully", data: newEnquiry });
  } catch (err) {
    console.error("Error adding Enquiry:", err);
    res.status(500).json({ error: "Failed to add Enquiry" });
  }
};
exports.getAllEnquiry = async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find() ;
   
    res
      .status(200)
      .json({ message: "Enquiry List fetched successfully", data: getAllEnquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllEnquiryById = async (req, res) => {
  const Id = req.params.id;

  try {
    const enquiry = await Enquiry.findById(Id);
    if (!enquiry) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    console.error("Error fetching enquiry Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateEnquiry = async (req, res) => {
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
exports.deleteEnquiry = async (req, res) => {
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














