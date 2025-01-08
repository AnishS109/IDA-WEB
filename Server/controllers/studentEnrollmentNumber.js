import StudentIdCounterSchema from "../models/studentIdCounterSchema.js";

export const getCurrentStudentId = async (req, res) => {
  try {
    const counter = await StudentIdCounterSchema.findOne({});

    if (!counter) {
      return res.status(404).json({ message: "Student ID counter not found" });
    }

    return res.status(200).json({ studentId: `${counter.prefix}${counter.seq}` });
  } catch (error) {
    console.error("Error fetching current student ID:", error);
    return res.status(500).json({ message: "Failed to fetch student ID" });
  }
};



export const updateStudentEnrollment = async (req, res) => {
  try {

    const studentId = req.body.studentId; 
    
    if (!studentId || typeof studentId !== "string" || !studentId.includes("/")) {
      return res.status(400).json({ message: "Invalid studentId format" });
    }

    const parts = studentId.split("/");
    const prefix = parts[0] + "/"; 
    const seq = parseInt(parts[1], 10); 

    if (isNaN(seq)) {
      return res.status(400).json({ message: "Invalid sequence number in studentId" });
    }

    const updatedCounter = await StudentIdCounterSchema.findOneAndUpdate(
      {}, 
      { prefix, seq }, 
      { new: true, upsert: true } 
    );

    return res.status(200).json({
      updatedCounter,
    });
  } catch (error) {
    console.error("Error updating student enrollment:", error);
    return res.status(500).json({ message: "Failed to update student enrollment" });
  }
};

