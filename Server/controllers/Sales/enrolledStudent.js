import EnrolledStudentSchema from "../../models/enrolledStutdentSchema.js"

// -------------- Add Enrolled Student Details (POST REQUEST)---------------

export const postEnrolledStudent = async(req, res) => {
  const {salesName , ...otherDetails } = req.body
  
  try {

    if(!salesName){
      return res.status(400).json({msg:"Something went wrong, PLease Login again!"})
    }

    const enrolledStudentDetails = new EnrolledStudentSchema({salesName , ...otherDetails })
    await enrolledStudentDetails.save()
    res.status(200).json({message:"SuccessFully Submitted"})

  } catch (error) {
    console.error("Error while saving addEnquiry Details", error)
    return res.status(500).json({message:"Error while saving addEnquiry Details"})
  }
}

// -------------- Fetching Student Details (GET REQUEST) ---------------

export const fetchEnrolledStudentDetails = async(req, res) => {
  const salesName = req.params.salesName

  try {
    const salesPersonData = await EnrolledStudentSchema.find({salesName})
    if(!salesPersonData){
      return res.status(400).json({msg:"Something went wrong, PLease Login again!"})
    }

    return res.status(200).json(salesPersonData)
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error)
    return res.status(500).json({message:"Internal Server Error"})
  }
} 