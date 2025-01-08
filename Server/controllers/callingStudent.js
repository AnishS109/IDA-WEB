import CallingStudentSchema from "../models/callingStudentSchema.js";

export const fetchCallingStudentDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit) 

    const skip = (page - 1) * limit;

    const callingStudentData = await CallingStudentSchema.find()
      .skip(skip)        
      .limit(limit)    
      .lean();          

    if (!callingStudentData || callingStudentData.length === 0) {
      return res.status(400).json({ msg: "No students found!" });
    }

    const totalStudents = await CallingStudentSchema.countDocuments();

    const totalPages = Math.ceil(totalStudents / limit);

    return res.status(200).json({
      callingStudentData
    });
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
