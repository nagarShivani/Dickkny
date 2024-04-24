const Department = require("../Schema/Department");

exports.addDepartment = async (req, res) => {
  try {
    const {
      title,
      employeeId,
     
    } = req.body;

    const newdesignation= new Department({
        title,
        employeeId,
        
     
    });

    await newdesignation.save();

    res.status(201).json({ message: "Department added successfully", task: newdesignation });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add Department" });
  }
};
exports.getAllDepartment = async (req, res) => {
  try {
    const getAllDesignation = await Department.find() ;
   
    res
      .status(200)
      .json({ message: "Department List fetched successfully", data: getAllDesignation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
  

exports.getAllDepartmentById = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const user = await Department.findById(employeeId);
    if (!user) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching Department Request by ID:", error);
    res.status(500).json({ error: "Failed to fetch user by ID" });
  }
};
exports.updateDepartment = async (req, res) => {
  try {
    const { title,employeeId} = req.body;
    const updatedEvent = await Department.findByIdAndUpdate(
      req.params.id,
      { title},
      {employeeId},
      // {username},
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating Department:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};
exports.deleteDepartment = async (req, res) => {
  try {
    const deletedEvent = await Department.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const getAllDesignation = await Department.find().populate('employeeId');

    console.log("getAllDesignation:", getAllDesignation); 
    
    const departmentList = getAllDesignation.map(department => ({
      _id: department._id,
      departmentName: department.title, 
      username: department?.employeeId?.username || null, 
    }));

    console.log("departmentList:", departmentList); 

    res.status(200).json({ message: "Department List fetched successfully", data: departmentList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};












