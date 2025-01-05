import confirmStudentSchema from "../models/confirmStudentSchema.js"


// -------------- Add ConfirmStudent Details (POST REQUEST)---------------

export const addConfirmStudentDetails = async(req, res) => {
  const {salesName, ...otherDetails} = req.body

  try {
    if(!salesName){
      return res.status(404).json({message:"Something went wrong, PLease Login again!"})
    }

    const confirmedStudentDetails = new confirmStudentSchema({salesName, ...otherDetails})
    await confirmedStudentDetails.save()

    res.status(200).json({message:"SuccessFully Submitted"})
  } catch (error) {
    console.error("Error while saving confirmedStudent Details", error)
    return res.status(500).json({message:"Error while saving confirmedStudent Details"})
  }
}

// -------------- Fetch ConfirmStudent Details (GET REQUEST)---------------

export const fetchConfirmStudentDetails = async(req, res) => {
  const salesName = req.params.salesName

  try {
    const salesPersonData = await confirmStudentSchema.find({salesName})
    if(!salesPersonData){
      return res.status(400).json({msg:"Something went wrong, PLease Login again!"})
    }

    return res.status(200).json(salesPersonData)
  } catch (error) {
    console.error("INTERNAL SERVER ERROR", error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}