import CallingStudentSchema from "../models/callingStudentSchema.js";

export const fetchCallingStudentDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 50; // Default limit to 50 if not provided
    const searchTerm = req.query.searchTerm || ""; // Get the searchTerm from query params

    let query = {};
    let callingStudentData;
    let totalStudents;

    // If a search term is provided, perform exact match
    if (searchTerm) {
      query.$or = [
        { Name: searchTerm }, // Exact match in the Name field
        { response1: searchTerm }, // Exact match in response fields
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

      // Fetch all matching records
      callingStudentData = await CallingStudentSchema.find(query).lean();
      totalStudents = callingStudentData.length; 
    } else {
      // If no search term, return paginated results
      const skip = (page - 1) * limit;

      callingStudentData = await CallingStudentSchema.find()
        .skip(skip)
        .limit(limit)
        .lean();

      totalStudents = await CallingStudentSchema.countDocuments(); // Total records in the collection
    }

    if (!callingStudentData || callingStudentData.length === 0) {
      return res.status(400).json({ msg: "No students found!" });
    }

    const totalPages = Math.ceil(totalStudents / limit);

    return res.status(200).json({
      callingStudentData,
      pagination: searchTerm
        ? null // No pagination for search results
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
};
