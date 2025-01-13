import CallingStudentSchema from "../../models/callingStudentSchema.js";

export const fetchCallingStudentDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 50; 
    const searchTerm = req.query.searchTerm || ""; 
    let query = {};
    let callingStudentData;
    let totalStudents;
    if (searchTerm) {
      query.$or = [
        { Name: searchTerm }, 
        { response1: searchTerm }, 
        { response2: searchTerm },
        { response3: searchTerm },
        { response4: searchTerm },
        { response5: searchTerm },
        { response6: searchTerm },
        { response7: searchTerm },
        { response8: searchTerm },
        { response9: searchTerm },
        { response10: searchTerm },
      ];

      callingStudentData = await CallingStudentSchema.find(query).lean();
      totalStudents = callingStudentData.length; 
    } else {
      const skip = (page - 1) * limit;
      callingStudentData = await CallingStudentSchema.find()
        .skip(skip)
        .limit(limit)
        .lean();

      totalStudents = await CallingStudentSchema.countDocuments(); 
    }
    if (!callingStudentData || callingStudentData.length === 0) {
      return res.status(400).json({ msg: "No students found!" });
    }
    const totalPages = Math.ceil(totalStudents / limit);
    return res.status(200).json({
      callingStudentData,
      pagination: searchTerm
        ? null
        : {
            totalItems: totalStudents,
            currentPage: page,
            totalPages,
          },
    });
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



// ------------------ SET RESPONSE CALLING STUDENT (POST REQUEST) -------------------

export const updateCallingDetails = async (req, res) => {
  const { fullName, ...otherDetails } = req.body;
  
  try { 
    const callingData = await CallingStudentSchema.findOne({ Name: fullName });
    
    if (callingData.salesName && callingData.salesName !== otherDetails.salesName) {
      return res.status(403).json({ 
        message: `You are not authorized to update responses for ${fullName}` 
      });
    }

    if (!callingData) {
      return res.status(404).json({ message: "Data not found" });
    }

    Object.keys(otherDetails).forEach((key) => {
      callingData[key] = otherDetails[key];
    });
    
    await callingData.save();
    
    return res.status(200).json(callingData);
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


  // ------------------ DELLETING CALLING STUDENT (POST REQUEST) -------------------

  export const deleteCallingStudentDetails = async (req, res) => {
    const { salesName, fullName } = req.body;
  
    try {
      // Use findOneAndDelete to delete and get the deleted document
      const deletedEnquiry = await CallingStudentSchema.findOneAndDelete({ salesName:salesName ,Name:fullName });
      
      if (!deletedEnquiry) {
        return res.status(404).json({ message: "Student not found or already deleted." });
      }
      
      return res.status(200).json({
        message: "Student deleted successfully.",
        deletedData: deletedEnquiry, // Include the deleted document in the response if needed
      });
    } catch (error) {
      console.error("INTERNAL SERVER ERROR", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


  export const CallBackData = () => async (req, res) => {
    console.log(req.body); // Log the request body to ensure data is received
    const { studentName, salesName, visitDate, visitTime } = req.body;
  
    try {
      // Convert visitDate from string to Date object
      const visitDateObj = new Date(visitDate);
  
      // Find the student by their Name and salesName (to ensure proper authorization)
      const student = await CallingStudentSchema.findOne({ Name: studentName, salesName });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found or unauthorized' });
      }
  
      // Update the callback visit date and time
      student.CallBackvisitDate = visitDateObj;  // Updated to the Date object
      student.visitTime = visitTime;              // Assuming visitTime is passed as a string (e.g., '14:30')
  
      // Save the updated student data
      await student.save();
  
      return res.status(200).json(student);
    } catch (error) {
      console.error('Error while updating callback details:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
