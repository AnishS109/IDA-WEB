import userRegisterSchema from "../models/userRegisterSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import TokenSchema from "../models/tokenSchema.js"

export const userLogin = async(req, res) => {
  
  const {userName, password, role} = req.body
  const Access_Token = process.env.ACCESS_TOKEN
  const Refresh_Token = process.env.REFRESH_TOKEN

  try {

    if(!role){
      return res.status(400).json({message:"Role is not found"})
    }

    const user = await userRegisterSchema.findOne({userName})
    if(!user){
      console.log("Username Not Found")
      return res.status(404).json({message:"Username Not Found"})
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(matchPassword){
      const accessToken = jwt.sign({
        userName: user.userName, 
        role: user.role
      }, 
        Access_Token, 
        {expiresIn:"24h"})
      const refreshToken = jwt.sign({userName: user.userName, role: user.role}, Refresh_Token)

      const newToken = await TokenSchema({token:refreshToken})
      await newToken.save()
  
      return res.status(200).json({accessToken, refreshToken, name: user.name, userName, role:user.role})
    }
    else{
      console.log("Password is Incorrect")
      return res.status(400).json({message:"Password is Incorrect"})
    }

  } catch (error) {
    console.error("ERROR OCCURED IN LOGIN", error)
    res.status(500).json({msg:"SOMETHING WENT WRONG"})
  }
}