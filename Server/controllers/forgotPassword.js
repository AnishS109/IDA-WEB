import userRegisterSchema from "../models/userRegisterSchema.js"
import OtpSchema from "../models/otpSchema.js"
import { sendEmail } from '../utils/emailService.js';
import bcrypt from "bcryptjs"

// -------------- FUNCTION FOR SENDING MAIL --------------

const mailSender = async(email, code) => {
  try {
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>
        <p style="font-size: 16px; color: #333;">
          You recently requested to reset your password. Please use the One-Time Password (OTP) below to proceed with changing your password:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #333; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 8px;">
            ${code}
          </span>
        </div>
        <p style="font-size: 16px; color: #333;">
          This OTP is valid for the next <strong>5 minutes</strong>. If you did not request a password reset, please ignore this email or contact our support team immediately.
        </p>
        <p style="font-size: 16px; color: #333;">
          Thank you,<br/>
          <strong>Insta Dot Analytics</strong>
        </p>
        <footer style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
          If you have any issues, please contact us at <a href="mailto:support@DemoMail.com" style="color: #4CAF50;">www.instadotanalytics.com</a>.
        </footer>
      </div>
    `;
    await sendEmail(email, 'Password Reset OTP', emailMessage);
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
  }
};

// -------------- FOR OTP SENDING (POST REQUEST) --------------

export const forgotPasswordEmailSend = async(req,res) => {
  const {email} = req.body
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }
  
  try {
    const emailExist = await userRegisterSchema.findOne({email})

    if(!emailExist){
      return res.status(404).json({message:"User not found"})
    }
    
    const otpCode = Math.floor(100000 + Math.random() * 900000)
    const otpData = new OtpSchema({
      name:emailExist.name,
      email:email,
      code:otpCode,
      expireIN: Date.now() + 300*1000
    })
    await otpData.save()
    mailSender(email,otpCode)

    return res.status(200).json({message:"Please check your mail"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Something went wrong! Please try again later"})
  }
}

// -------------- FOR OTP VERIFYING AND PASSWORD CHANGE (POST REQUEST) --------------

export const changePassword = async(req, res) => {
  const {email,code,password} = req.body

  try {
    const otpRecord = await OtpSchema.findOne({email,code})

    if(!otpRecord){
      return res.status(404).json({message:"Invalid OTP or Email"})
    }
    
    const currentTime = Date.now()
    if(otpRecord.expireIN < currentTime){
      return res.status(400).json({message:"OTP is expired! Try again later"})
    }

    const hassedPassword = await bcrypt.hash(password, 5)

    const user = await userRegisterSchema.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    user.password = hassedPassword
    await user.save()

    await OtpSchema.deleteOne({email,code})

    return res.status(200).json({message:"Password Successfully Changed"})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong! Please try again later" });
  }
}