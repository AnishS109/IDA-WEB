import CallingStudentSchema from "../models/callingStudentSchema.js";

export const callCategoryData = async (req, res) => {
  const salesName = req.query.salesName; // Get salesName from query

  // Define updated response categories (without dynamic salesName part)
  const categoryMapping = {
    "Call Rejected": "Rejected Call",
    "Not Picked Call": "Not Picked Call",
    "Not Interested": "Not Interested",
    "Interested": "Interested",
    "Call Forwarded": "Call Forwarded",
    "Will Visit": "Will Visit",
    "Already Placed": "Already Placed",
    "Not Require Any Course": "Not Require Any Course",
    "Call Back": "Call Back",
    "Joined Other Institute": "Joined Other Institute",
    "Call Rejected In Between": "Call Rejected In Between",
    "Visited": "Visited"
  };

  try {
    // Check if salesName is provided
    if (!salesName) {
      return res.status(400).json({ message: "Sales name is required" });
    }

    // Fetch all data for the given salesName
    const allData = await CallingStudentSchema.find({
      salesName: salesName
    });


    // Process data and categorize based on the most recent response
    const categorizedData = allData.map((data) => {
      // Define response keys
      const responseKeys = [
        "response1", "response2", "response3", "response4", "response5", "response6", "response7", "response8"
      ];

      // Track the highest (most recent) category selected
      let category = null;

      // Loop through responses to find the most recent non-empty response
      for (let i = responseKeys.length - 1; i >= 0; i--) {
        const response = data[responseKeys[i]];

        // Log the current response for each ke

        // Check if the response exists in the categoryMapping (ignoring the salesName part)
        if (response) {
          const cleanedResponse = response.replace(`(By ${salesName})`, "").trim(); // Remove the salesName part
          if (categoryMapping[cleanedResponse]) {
            category = categoryMapping[cleanedResponse];
            break;  // Break once the most recent category is found
          }
        }
      }


      return { ...data.toObject(), category }; // Add category to data
    });

    // If no valid categorized data found, send a 404 response
    if (categorizedData.length === 0) {
      return res.status(404).json({ message: "No categorized data found" });
    }

    // Send the categorized data as response
    res.status(200).json(categorizedData);

  } catch (error) {
    console.error("Error fetching categorized data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
