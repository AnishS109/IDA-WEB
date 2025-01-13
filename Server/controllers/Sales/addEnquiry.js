import addEnquirySchema from "../../models/addEnquirySchema.js"

// -------------- Add Enquiry Details (POST REQUEST)---------------

export const addEnquiry = async(req, res) => {
  const {salesName, ...otherDetails} = req.body

  try {
    if(!salesName){
      return res.status(404).json({message:"Something went wrong, PLease Login again!"})
    }

    const student = new addEnquirySchema({salesName, ...otherDetails})
    await student.save()

    res.status(200).json({message:"SuccessFully Submitted"})
  } catch (error) {
    console.error("Error while saving addEnquiry Details", error)
    return res.status(500).json({message:"Error while saving addEnquiry Details"})
  }
}

// -------------- Fetch Enquiry Details (GET REQUEST)---------------

export const fetchEnquiryDetails = async(req, res) => {
  const salesName = req.params.salesName

  try {
    const salesPersonData = await addEnquirySchema.find({salesName})
    if(!salesPersonData){
      return res.status(400).json({msg:"Something went wrong, PLease Login again!"})
    }

    return res.status(200).json(salesPersonData)
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error)
    return res.status(500).json({message:"Internal Server Error"})
  }
} 

// -------------- Update Enquiry Details (PUT) REQUEST)---------------

export const updateEnquiryDetails = async (req, res) => {
  const { salesName, fullName, ...otherDetails } = req.body;

  try { 
    const enquiry = await addEnquirySchema.findOne({ salesName, fullName });

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    Object.keys(otherDetails).forEach((key) => {
      enquiry[key] = otherDetails[key];
    });
    
    await enquiry.save();
    
    return res.status(200).json(enquiry);
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Deleted Enquiry Details (DELETE REQUEST)---------------

export const deleteEnquiryDetails = async (req, res) => {
  const { salesName, fullName } = req.body; 

  try {
    const deletedEnquiry = await addEnquirySchema.deleteOne({ salesName, fullName });

    if (deletedEnquiry.deletedCount === 0) {
      return res.status(404).json({ message: "Enquiry not found or already deleted." });
    }

    return res.status(200).json({ message: "Enquiry deleted successfully." });
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};