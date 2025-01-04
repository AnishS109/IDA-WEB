import userRegisterSchema from "../models/userRegisterSchema.js"
import bcrypt from "bcryptjs"

export const userRegister = async(req, res) => {
  const {userName,phoneNumber,email, password, ...otherDetails} = req.body
  
  try {
    const usernameExist = await userRegisterSchema.findOne({userName})
    if(usernameExist){
      return res.status(400).json({msg:"Username already Exist"})
    }
    const phoneNumberExist = await userRegisterSchema.findOne({phoneNumber})
    if(phoneNumberExist){
      return res.status(400).json({msg:"Phone Number already Exist"})
    }
    const emailExist = await userRegisterSchema.findOne({email})
    if(emailExist){
      return res.status(400).json({msg:"Email already Exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new userRegisterSchema({
      userName,
      phoneNumber,
      email, 
      password:hashedPassword,
       ...otherDetails
      })

    await newUser.save()
    res.status(200).json({msg:"SuccessFully Registered"})
    
  } 
  catch (error) {
    console.error("Error while saving userRegister Details", error)
    return res.status(500).json({msg:"Error while saving userRegister Details"})
  }
}