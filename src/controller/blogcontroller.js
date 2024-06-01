const Blog = require("../Schema/Blog");

exports.addBlog = async (req, res) => {
  try {
    const {
      title,
      authorname,
      image,
      description
     
    } = req.body;

    const newBlog= new Blog({
        title,
      authorname,

        image,
        description
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog added successfully", task: newBlog });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add Blog" });
  }
};
exports.getAllBlog = async (req, res) => {
  try {
    const getAllBlog = await Blog.find() ;
   
    res
      .status(200)
      .json({ message: "Blog List fetched successfully", data: getAllBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllBlogById = async (req, res) => {
  const Id = req.params.id;

  try {
    const blog = await Blog.findById(Id);
    if (!blog) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching Blog Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const { title,employeeId} = req.body;
    const updatedEvent = await Blog.findByIdAndUpdate(
      req.params.id,
      { title},
      {employeeId},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating Blog:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const deletedEvent = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};














