import CollegeFormSchema from "../../models/HR-model/colegeFormSchema.js"
import CompanyFormSchema from "../../models/HR-model/companyFormSchema.js"

// -------------  SUBMIT COMPANY DATA (POST REQUEST) --------------

export const CompanyData = async(req, res) => {
  const {HRName, companyName, companyType, companyLocation, contactDetails, email, dealWith} = req.body
  
  try {
    if(!HRName){
      return res.status(400).json({message:"Something Went Wrong. Please login again!"})
    }
    const Company = new CompanyFormSchema({
      HRName, 
      companyName, 
      companyType, 
      companyLocation, 
      contactDetails, 
      email, 
      dealWith
    })
    await Company.save()
    return res.status(200).json({message:"Successfully Submitted"})
  } catch (error) {
    console.log("ERROR WHILE SUBMITTING COMPANY DETAILS:", error)
    return res.status(500).json({message:"Something went wrong. Please try again later."})
  }
}

// -------------  SUBMIT COLLEGE DATA (POST REQUEST) --------------

export const CollegeData = async(req, res) => {
  const {HRName, collegeName, collegeType, collegeLocation, contactDetails, email, dealWith} = req.body
  
  try {
    if(!HRName){
      return res.status(400).json({message:"Something Went Wrong. Please login again!"})
    }
    const College = new CollegeFormSchema({
      HRName, 
      collegeName, 
      collegeType, 
      collegeLocation, 
      contactDetails, 
      email, 
      dealWith
    })
    await College.save()
    return res.status(200).json({message:"Successfully Submitted"})
  } catch (error) {
    console.log("ERROR WHILE SUBMITTING COLLEGE DETAILS:", error)
    return res.status(500).json({message:"Something went wrong. Please try again later."})
  }
}

// -------------  FETCHING TECH COMPANY DATA (GET REQUEST) --------------

export const fetchTechCompany = async(req, res) => {
  const { HRName } = req.query;
  const companyType = "Technical"
  
  try {
    if(!HRName){
      return res.status(400).json({message:"Something Went Wrong. Please login again!"})
    }

    const TechData = await CompanyFormSchema.find({HRName,companyType})
    if(!TechData){
      return res.status(404).json({message:"No Data Available"})
    }

    return res.status(200).json(TechData)
  } catch (error) {
    console.log("ERROR WHILE FETCHING COMPANY DETAILS:", error)
    return res.status(500).json({message:"Something went wrong. Please try again later."})
  }
}

// -------------  FETCHING NON TECH COMPANY DATA (GET REQUEST) --------------

export const fetchNonTechCompany = async(req, res) => {
  const { HRName } = req.query;
  
  try {
    if(!HRName){
      return res.status(400).json({message:"Something Went Wrong. Please login again!"})
    }
    
    const NonTechData = await CompanyFormSchema.find({
      HRName,
      companyType: { $ne: "Technical" }, 
    });
    if(!NonTechData){
      return res.status(404).json({message:"No Data Available"})
    }
    
    return res.status(200).json(NonTechData)
  } catch (error) {
    console.log("ERROR WHILE FETCHING COMPANY DETAILS:", error)
    return res.status(500).json({message:"Something went wrong. Please try again later."})
  }
}

  // -------------  FETCHING TECH COLLEGE DATA (GET REQUEST) --------------
  
  export const fetchTechCollege = async(req, res) => {
    const { HRName } = req.query;
    const collegeType = "Technical"
    
    try {
      if(!HRName){
        return res.status(400).json({message:"Something Went Wrong. Please login again!"})
      }
  
      const TechData = await CollegeFormSchema.find({HRName,collegeType})
      if(!TechData){
        return res.status(404).json({message:"No Data Available"})
      }
  
      return res.status(200).json(TechData)
    } catch (error) {
      console.log("ERROR WHILE FETCHING COMPANY DETAILS:", error)
      return res.status(500).json({message:"Something went wrong. Please try again later."})
    }
  }

  // -------------  FETCHING NON TECH COLLEGE DATA (GET REQUEST) --------------

  export const fetchNonTechCollege = async(req, res) => {
    const { HRName } = req.query;
    
    try {
      if(!HRName){
        return res.status(400).json({message:"Something Went Wrong. Please login again!"})
      }
  
      const NonTechData = await CollegeFormSchema.find({
        HRName,
        collegeType: { $ne: "Technical" }, 
      });
      if(!NonTechData){
        return res.status(404).json({message:"No Data Available"})
      }
  
      return res.status(200).json(NonTechData)
    } catch (error) {
      console.log("ERROR WHILE FETCHING COMPANY DETAILS:", error)
      return res.status(500).json({message:"Something went wrong. Please try again later."})
    }
  }