import mongoose from "mongoose";

const otpschema = new mongoose.Schema({
  name:{
    type: String
  },
  email:{
    type:String
  },
  code:{
    type:String
  },
  expireIN:{
    type:Number
  }
},{
  timestamps:true
})

const OtpSchema = mongoose.model("opt", otpschema, "otp")
export default OtpSchema;